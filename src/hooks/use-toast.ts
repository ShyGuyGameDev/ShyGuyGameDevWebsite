/**
 * use-toast.ts
 *
 * A tiny global state store for "toasts" (the little pop-up notification cards that slide
 * in to say things like "Copied!" or "Something went wrong"). It exports two things:
 *   - `toast(...)`, a plain function anyone can call from anywhere to show a notification.
 *   - `useToast()`, the hook the `<Toaster />` component calls to read the current list of
 *     toasts and re-render when that list changes.
 *
 * NOTE: nothing in this site's own components uses either export right now. This file, along
 * with `components/ui/toast.tsx` and `components/ui/toaster.tsx`, arrived as part of the
 * shadcn/ui component set. It is worth reading anyway, because it is the densest and most
 * instructive file in the project.
 *
 * The big idea, and the reason this file looks unusual:
 *   Normally React state lives *inside* a component, created by `useState`. But a toast can
 *   be triggered from anywhere, including code that is not a component at all, and every
 *   caller must feed the same single on-screen list. So the state is deliberately kept
 *   *outside* React, in ordinary module-level variables (`memoryState` and `listeners`).
 *   `useToast` then subscribes each interested component to that external store, and
 *   `dispatch` pushes the new state into every subscriber so React re-renders them.
 *   This is a hand-rolled version of the pattern that libraries like Redux and Zustand
 *   formalise, and that React's own `useSyncExternalStore` hook exists to support.
 *
 * Concepts to notice:
 *  - A reducer: `(currentState, action) => newState`, a pure function with a `switch`.
 *  - A discriminated union of action types, and how the `type` field lets TypeScript narrow
 *    down which other fields exist on each action.
 *  - Module-level mutable state and the publish/subscribe (listener) pattern.
 *  - `useEffect` cleanup used to unsubscribe.
 *  - A `Map` of pending `setTimeout` handles, used to schedule delayed removal.
 *  - Immutable updates: every case returns a brand-new object rather than editing the old
 *    one, because React decides whether to re-render by comparing object identity.
 */

// This store touches timers and is read by client components, so it is client-only.
'use client'

// Inspired by react-hot-toast library
import * as React from 'react'

// Type-only import of the props shape used by the toast UI component, so the toast objects
// stored here line up exactly with what `<Toast />` can render. The `type` keyword means
// nothing is imported at runtime.
import type { ToastActionElement, ToastProps } from '@/components/ui/toast'

// How many toasts may be on screen at once. Set to 1, so a new toast replaces the old one
// rather than stacking up (see the `.slice` in the ADD_TOAST case below).
const TOAST_LIMIT = 1
// How long, in milliseconds, to wait after a toast is dismissed before deleting it from the
// list entirely. Be aware: 1,000,000 ms is about 16 minutes and 40 seconds, so in practice
// toasts are *never* auto-removed during a normal visit. The number is intentional in the
// upstream library: dismissing a toast sets `open: false`, which is what actually animates
// it away, and this long delay just means the now-invisible entry lingers in the array. If
// you ever want real auto-expiry, this is the constant to change.
const TOAST_REMOVE_DELAY = 1000000

// The shape of one stored toast: everything the UI component accepts, plus the extra fields
// this store manages. `&` is an intersection type, meaning "all of ToastProps and also these".
type ToasterToast = ToastProps & {
  // The unique id used to update or dismiss this specific toast later.
  id: string
  // `React.ReactNode` means these can be plain strings *or* JSX, so a toast can contain
  // formatted markup, not just text. The `?` makes each one optional.
  title?: React.ReactNode
  description?: React.ReactNode
  // An optional button rendered inside the toast, for example "Undo".
  action?: ToastActionElement
}

// The four things that can happen to the toast list, written as an object rather than as
// loose strings so they can be referenced by name and typo-checked.
const actionTypes = {
  // Show a new toast.
  ADD_TOAST: 'ADD_TOAST',
  // Change the contents of a toast that is already showing.
  UPDATE_TOAST: 'UPDATE_TOAST',
  // Start hiding a toast: this closes it visually and schedules its removal.
  DISMISS_TOAST: 'DISMISS_TOAST',
  // Delete a toast from the array for good.
  REMOVE_TOAST: 'REMOVE_TOAST',
  // `as const` freezes the object and, more importantly, narrows each value's type from the
  // general `string` to its exact literal (so `ADD_TOAST` has the type `'ADD_TOAST'`). That
  // is what makes the `Action` union below precise enough for TypeScript to check.
} as const

// A module-level counter that survives for the lifetime of the page.
let count = 0

// The id generator. Rather than pulling in a UUID library, ids are just an incrementing
// number turned into a string: "1", "2", "3", and so on. Ids only need to be unique among
// the handful of toasts alive at once, so a counter is plenty.
function genId() {
  // The modulo wraps back to 0 if the counter ever reaches JavaScript's largest safely
  // representable integer, which guards against losing precision. Reaching it would take
  // roughly nine quadrillion toasts, so this is defensive rather than practical.
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// `typeof actionTypes` in a *type* position asks TypeScript for the type of that object, so
// `ActionType['ADD_TOAST']` below resolves to the literal type `'ADD_TOAST'`. This is a
// slightly roundabout way to avoid writing those strings out twice.
type ActionType = typeof actionTypes

// A discriminated union: an `Action` is exactly one of these four object shapes. The shared
// `type` field is the "discriminant", and that is the payoff of this pattern. Once the
// reducer's `switch` checks `action.type === 'ADD_TOAST'`, TypeScript knows inside that
// branch that `action.toast` exists and is a full `ToasterToast`, and it will flag
// `action.toastId` there as an error. Each action carries only the data it actually needs.
type Action =
  | {
      type: ActionType['ADD_TOAST']
      // A complete toast, since a new one needs every field including its id.
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      // `Partial<T>` makes every field of `T` optional, so an update can carry just the one
      // or two fields that changed (plus the id identifying which toast to change).
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      // Optional on purpose: passing an id dismisses that one toast, and leaving it out
      // means "dismiss them all".
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      // Same convention as dismiss: omitted means "remove every toast".
      toastId?: ToasterToast['id']
    }

// The shape of the whole store. It is an object wrapping a single array rather than a bare
// array, which leaves room to add more fields later without changing every consumer.
interface State {
  toasts: ToasterToast[]
}

// A lookup table of the removal timers that are currently pending, keyed by toast id. A
// `Map` is used instead of a plain object because it has clean `has`/`get`/`set`/`delete`
// methods. `ReturnType<typeof setTimeout>` is a portable way to spell the timer handle type,
// which is a number in browsers but an object in Node.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Schedules a toast to be deleted from the array after the delay above.
const addToRemoveQueue = (toastId: string) => {
  // Guard against double-scheduling. Without this, dismissing the same toast twice would
  // queue two timers, and the second would fire a REMOVE for an id that is already gone.
  if (toastTimeouts.has(toastId)) {
    return
  }

  // Start the countdown. `setTimeout` returns a handle immediately and runs the callback
  // later, so this function does not block.
  const timeout = setTimeout(() => {
    // Forget the timer first, since it has now fired and is no longer pending.
    toastTimeouts.delete(toastId)
    // Then tell the store to actually drop this toast. Note the reducer itself never calls
    // `setTimeout`; the scheduling lives out here, and only the resulting state change goes
    // back through `dispatch`.
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  // Record the handle so the guard above can see this id is already queued. Nothing in this
  // file ever calls `clearTimeout`, which is the one loose end in the design.
  toastTimeouts.set(toastId, timeout)
}

// The reducer: given the current state and an action describing what happened, return the
// new state. It is exported mainly so tests can call it directly. The rule for a reducer is
// that it must be *pure*: no mutating the old state, no surprises, same inputs always give
// the same output. (The DISMISS case below bends that rule, as its own comment admits.)
export const reducer = (state: State, action: Action): State => {
  // `switch` on the discriminant field. Because `Action` is a union covering exactly four
  // `type` values, TypeScript can verify every case is handled, which is why this function
  // needs no `default` branch or trailing `return`.
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        // Copy the existing state, then replace `toasts` with a new array. Spreading rather
        // than pushing is what keeps the update immutable: React sees a different object and
        // therefore knows something changed.
        ...state,
        // Put the new toast at the front, then `slice(0, TOAST_LIMIT)` trims the array back
        // down to the limit. With the limit at 1 this means "the newest toast wins and any
        // older one is discarded".
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        // `.map` walks the list and builds a new array. The matching toast is replaced by a
        // copy that merges the new fields over the old ones (`{ ...t, ...action.toast }`);
        // every other toast is passed through untouched.
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      }

    // Braces around this case body create a block scope, which is required because it
    // declares a `const` with `let`/`const` semantics inside a switch.
    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      // Worth understanding why the author flagged this: starting timers inside a reducer
      // makes it impure, which breaks the "same input, same output" guarantee and is exactly
      // the kind of thing React's Strict Mode double-invocation is designed to surface.
      // It works here only because `addToRemoveQueue` is idempotent thanks to its guard.
      if (toastId) {
        // An id was given: queue just that toast for removal.
        addToRemoveQueue(toastId)
      } else {
        // No id: dismiss everything, so queue each currently-open toast in turn.
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          // Match either the one requested id, or every toast when no id was supplied.
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                // Setting `open: false` is what visually closes the toast: the underlying
                // Radix UI toast component watches this prop and plays its exit animation.
                // The entry stays in the array until the REMOVE_TOAST timer fires.
                open: false,
              }
            : t,
        ),
      }
    }
    case 'REMOVE_TOAST':
      // No id means "clear the whole list".
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        // `.filter` keeps everything whose id does *not* match, which is the immutable way
        // to delete one item from an array.
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// The subscriber list. Every mounted component that called `useToast` puts its `setState`
// function in here, so `dispatch` has a way to notify them all. This array plus the variable
// below *are* the external store.
const listeners: Array<(state: State) => void> = []

// The one and only copy of the current state, living in a module variable rather than in a
// component. Because an ES module is evaluated once per page load, everything that imports
// this file shares this exact variable, which is what makes the store global.
let memoryState: State = { toasts: [] }

// The bridge between the outside world and React. Anyone can call this from anywhere.
function dispatch(action: Action) {
  // Step 1: run the reducer to compute the next state and store it.
  memoryState = reducer(memoryState, action)
  // Step 2: hand the new state to every subscriber. Each listener is a React `setState`
  // function, so calling it tells React that component's state changed and triggers a
  // re-render. This push is the mechanism that gets external state onto the screen.
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// The argument type for the public `toast()` function: everything a stored toast has except
// the id, because the id is generated for you. `Omit<T, K>` copies a type minus some keys.
type Toast = Omit<ToasterToast, 'id'>

// The public function for showing a toast. Call it as `toast({ title: 'Saved!' })` from a
// click handler, an async function, anywhere at all: it does not need to be inside a
// component, because it talks to the module-level store rather than to React.
function toast({ ...props }: Toast) {
  // Mint an id up front, so the returned handle and the stored toast agree on it.
  const id = genId()

  // A closure that lets the caller edit this specific toast later. It captures `id`, so the
  // caller never has to pass it back in.
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  // A closure that closes this specific toast.
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  // Actually add the toast to the store, which pushes the new state to every subscriber and
  // makes the notification appear.
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      // The caller's fields (title, description, action, variant, ...).
      ...props,
      id,
      // Start out visible.
      open: true,
      // Radix calls this whenever the toast opens or closes for *any* reason, including the
      // user clicking its X or swiping it away. Mapping "closed by the UI" back to a
      // `dismiss()` dispatch is what keeps this store in sync with what the user did.
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Hand back a small control handle so the caller can update or dismiss the toast it just
  // created, for example turning a "Saving..." toast into "Saved!".
  return {
    id: id,
    dismiss,
    update,
  }
}

// The hook that connects a component to the store. The `<Toaster />` component calls this
// and renders whatever toasts come back.
function useToast() {
  // Seed local state from the shared `memoryState`, so a component that mounts while a toast
  // is already showing renders it immediately rather than starting empty.
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Subscribe: hand this component's own setter to the store. From now on every `dispatch`
    // calls it with the latest state, and this component re-renders.
    listeners.push(setState)
    // Cleanup: unsubscribe on unmount. Find this component's setter in the array and splice
    // it out. Forgetting this would leave the store holding setters for dead components,
    // which leaks memory and makes React warn about updating an unmounted component.
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
    // The `[state]` dependency array means this effect tears down and re-subscribes after
    // every state change, which is wasteful and a known wart in this widely-copied file:
    // `setState` is guaranteed stable by React, so `[]` would be correct and would subscribe
    // exactly once. It is harmless in practice (the unsubscribe and resubscribe cancel out)
    // but it is not what you would write from scratch.
  }, [state])

  return {
    // Spread the state so callers can read `toasts` directly off the returned object.
    ...state,
    // Re-export the global trigger for convenience, so a component can do
    // `const { toast } = useToast()`.
    toast,
    // A dismiss helper bound to the store; omitting the id dismisses every toast.
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

// Both the hook and the plain function are exported: use the hook inside components that
// need to *render* toasts, and the bare function anywhere that just needs to *fire* one.
export { useToast, toast }
