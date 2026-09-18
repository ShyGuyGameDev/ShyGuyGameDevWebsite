module.exports = [
"[project]/ShyGuyGameDevWebsite/src/lib/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FEATURED_SECTION_LABEL",
    ()=>FEATURED_SECTION_LABEL,
    "POST_TAG_ORDER",
    ()=>POST_TAG_ORDER,
    "PROJECT_NAV_SECTIONS",
    ()=>PROJECT_NAV_SECTIONS,
    "PROJECT_TAG_ORDER",
    ()=>PROJECT_TAG_ORDER,
    "cn",
    ()=>cn,
    "compareByDateThenTitle",
    ()=>compareByDateThenTitle,
    "compareByPostTagThenDateThenTitle",
    ()=>compareByPostTagThenDateThenTitle,
    "compareByProjectTagThenDateThenTitle",
    ()=>compareByProjectTagThenDateThenTitle,
    "createCompareByTagThenDateThenTitle",
    ()=>createCompareByTagThenDateThenTitle,
    "getNodeText",
    ()=>getNodeText,
    "getTagColorClasses",
    ()=>getTagColorClasses,
    "getYearFromDate",
    ()=>getYearFromDate,
    "matchesSearch",
    ()=>matchesSearch,
    "tagToSlug",
    ()=>tagToSlug
]);
/**
 * lib/utils.ts
 *
 * The site's shared helper functions and shared constants. Almost every component imports
 * something from here: `cn()` for class names, the comparator functions for ordering the
 * project and post grids, `matchesSearch` and `getNodeText` for the search boxes, and the
 * tag constants and colour lookup for the coloured tag pills.
 *
 * There is no `"use client"` here on purpose. This file is plain TypeScript with no hooks
 * and no browser APIs, so it can be imported by Server Components and Client Components
 * alike.
 *
 * Concepts to notice:
 *  - `cn()`, and why simply concatenating Tailwind classes is not enough.
 *  - Recursion: `getNodeText` walks a tree by calling itself.
 *  - Comparator functions, the little `(a, b) => number` functions that `Array.sort` uses,
 *    and the convention that a negative result means "a comes first".
 *  - A factory function: `createCompareByTagThenDateThenTitle` returns a *function*, so one
 *    implementation can be reused with different tag orders.
 *  - `as const` and the readonly tuple types it produces.
 *  - The `??` nullish-coalescing operator as a default-value fallback.
 */ // `clsx` joins class names together and knows how to handle conditionals, arrays, and
// objects. `ClassValue` is its type for anything it accepts.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
// `tailwind-merge` understands Tailwind's class groups and resolves conflicts between them.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
;
;
function cn(...inputs) {
    // Note the order: clsx runs first to build the string, then twMerge de-duplicates it.
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function getNodeText(node) {
    // Base case 1: nothing to read. `node == null` with two equals signs matches both `null`
    // and `undefined`. Booleans are skipped because `{isActive && <span/>}` leaves a literal
    // `false` in the tree when the condition fails, and "false" is not text a user searched for.
    if (node == null || typeof node === 'boolean') return '';
    // Base case 2: an actual leaf of text. Numbers are valid React children too, so they are
    // converted to strings rather than ignored.
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    // Recursive case 1: a list of children (which is what JSX siblings and `.map()` produce).
    // Each entry is flattened by calling this same function, then joined with spaces so words
    // from adjacent elements do not run together into one unsearchable blob.
    if (Array.isArray(node)) return node.map(getNodeText).join(' ');
    // Recursive case 2: a single React element. Every element object has a `props` field, and
    // its text lives in `props.children`, so recurse one level down.
    if (typeof node === 'object' && 'props' in node) {
        // The inline cast tells TypeScript the shape being read. `ReactNode` is a broad union and
        // TypeScript cannot prove `props.children` exists on it, so this asserts it. Both `?.`
        // guards handle elements that have no props or no children, in which case `undefined` is
        // passed back in and caught by the first base case above.
        return getNodeText(node.props?.children);
    }
    // Anything else (a Fragment symbol, a Promise, an iterator) has no readable text.
    return '';
}
function getYearFromDate(date) {
    // `new Date(...)` parses the string, and `getFullYear()` returns a four-digit number.
    return new Date(date).getFullYear();
}
function compareByDateThenTitle(// Only the fields actually compared are required in the parameter types, so this works on
// any object that happens to have a `date` and a `title`. TypeScript calls this structural
// typing: the shape matters, not the class or interface name.
a, b) {
    // `getTime()` turns each date into a millisecond number so they can be subtracted.
    // Note `b` minus `a`, not `a` minus `b`: that reversal is what makes newer dates sort
    // first, because a later `b` produces a positive result and pushes `b` ahead.
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    // If the dates differ at all, the date decides and we are done.
    if (dateDiff !== 0) return dateDiff;
    // Tie-break: `localeCompare` compares two strings alphabetically and already returns the
    // negative/zero/positive numbers a comparator needs, so it can be returned directly. It
    // also handles accents and non-English characters more correctly than `<` would.
    return a.title.localeCompare(b.title);
}
const PROJECT_TAG_ORDER = [
    'Apps',
    'Robotics',
    'Design',
    'MUN',
    'Debate',
    'Games',
    'Teaching'
];
const FEATURED_SECTION_LABEL = 'Featured Currently';
const PROJECT_NAV_SECTIONS = [
    FEATURED_SECTION_LABEL,
    ...PROJECT_TAG_ORDER
];
const POST_TAG_ORDER = [
    'Media Mention',
    'Post'
];
function tagToSlug(tag) {
    return tag// Fragments are case-insensitive in practice and lowercase looks tidier in a URL.
    .toLowerCase()// Drop surrounding whitespace before it can be turned into stray dashes.
    .trim()// Replace every run of characters that is *not* a letter or digit with a single dash.
    // The `+` matters: it collapses "Media  Mention" into one dash, not two. `/g` means
    // replace every match, not just the first.
    .replace(/[^a-z0-9]+/g, '-')// Tidy up: strip a dash at the very start (`^-`) or the very end (`-$`), which would
    // otherwise appear for a tag like "(Games)".
    .replace(/^-|-$/g, '');
}
// Compares two tags by their position in a given order list. Not exported: it is a private
// helper used only by the factory below.
function compareTags(// Both may be `undefined`, because an item is allowed to have no tag at all.
aTag, bTag, // `readonly string[]` accepts the `as const` tuples above without complaining that they
// cannot be mutated, and documents that this function will not modify the list.
tagOrder) {
    // `??` is nullish coalescing: use the left value unless it is null or undefined, in which
    // case fall back to the right. So a missing tag is treated as an empty string from here on.
    const a = aTag ?? '';
    const b = bTag ?? '';
    // `indexOf` gives each tag's rank in the canonical order, or -1 if the tag is not listed.
    // Turning a name into a number is the trick that lets an arbitrary custom order be sorted.
    const aIndex = tagOrder.indexOf(a);
    const bIndex = tagOrder.indexOf(b);
    // The happy path: both tags are known, so subtract their ranks. An earlier tag has a
    // smaller index, so the result is negative and it sorts first, exactly as intended.
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // Only `a` is a known tag, so it wins. Negative means "a comes first".
    if (aIndex !== -1) return -1;
    // Mirror image: only `b` is known, so the positive 1 means "b comes first".
    if (bIndex !== -1) return 1;
    // From here neither tag is in the order list. Both empty means genuinely equal.
    if (!a && !b) return 0;
    // One side has no tag at all: untagged items sink to the bottom. `!a` returns 1 to push
    // `a` down, and `!b` returns -1 to push `b` down.
    if (!a) return 1;
    if (!b) return -1;
    // Last resort: two unlisted-but-present tags are sorted alphabetically, so the ordering
    // stays stable and predictable even for a tag someone forgot to add to the list above.
    return a.localeCompare(b);
}
function createCompareByTagThenDateThenTitle(tagOrder) {
    return (// `tag?` is optional here, matching `compareTags`, so untagged items can still be sorted.
    a, b)=>{
        // Priority 1: the tag group. Items are grouped into sections before anything else.
        const tagDiff = compareTags(a.tag, b.tag, tagOrder);
        if (tagDiff !== 0) return tagDiff;
        // Priority 2: within a tag group, newest first (again note the reversed b-minus-a).
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        // Priority 3: identical dates fall back to alphabetical title order, which keeps the grid
        // layout stable between builds instead of shuffling on every deploy.
        return a.title.localeCompare(b.title);
    };
}
const compareByProjectTagThenDateThenTitle = createCompareByTagThenDateThenTitle(PROJECT_TAG_ORDER);
const compareByPostTagThenDateThenTitle = createCompareByTagThenDateThenTitle(POST_TAG_ORDER);
function matchesSearch(haystack, query) {
    // Normalise the query once: trimmed and lowercased so the comparison is case-insensitive.
    const trimmed = query.trim().toLowerCase();
    // An empty search box should show everything, not nothing, so return true immediately.
    if (!trimmed) return true;
    // Lowercase the target too, so both sides of the comparison are in the same case.
    const text = haystack.toLowerCase();
    // Split on any run of whitespace (`\s+`) to get the individual words, then `.every(...)`
    // returns true only if *all* of them are found. `.some(...)` would give an OR search.
    return trimmed.split(/\s+/).every((token)=>text.includes(token));
}
// The tag-to-colour lookup used by the tag pills. `Record<string, string>` is TypeScript's
// type for "an object used as a dictionary with string keys and string values".
const TAG_COLOR_CLASSES = {
    // One row per tag. Each value is a set of Tailwind classes giving a pale background with
    // matching darker text, plus `dark:` variants that swap to a translucent dark background
    // (the `/20` is an opacity modifier) with light text so the pills stay readable in dark
    // mode. Note several tags are listed in both singular and plural forms ("Post"/"Posts",
    // "Media Mention"/"Media Mentions") so either spelling used in the data still finds a
    // colour. Tags with the same colour, like those pairs, are intentional duplicates.
    Games: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    Apps: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    Robotics: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
    MUN: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/20 dark:text-fuchsia-300',
    Debate: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    Teaching: 'bg-lime-50 text-lime-700 dark:bg-lime-900/20 dark:text-lime-300',
    Design: 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    Miscellaneous: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
    Post: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
    Posts: 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300',
    // Keys containing a space must be written in quotes, since they are not valid identifiers.
    'Media Mention': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
    'Media Mentions': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
};
// The fallback styling for any tag not listed above, in the site's accent yellow. Having a
// default means a brand-new tag renders as a sensible pill instead of an unstyled one.
const DEFAULT_TAG_COLOR_CLASSES = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
function getTagColorClasses(tag) {
    // `??` supplies the default when the lookup misses. Using `??` rather than `||` is the
    // right choice for a lookup like this, because `||` would also replace a legitimately
    // empty-string value.
    return TAG_COLOR_CLASSES[tag] ?? DEFAULT_TAG_COLOR_CLASSES;
}
}),
"[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * src/app/not-found.tsx  —  the 404 PAGE
 *
 * WHAT THIS FILE IS
 * `not-found.tsx` is another reserved App Router filename. Unlike `page.tsx` it is not tied to a URL you
 * can type; Next.js renders it automatically as the fallback UI when no route matches, and also when
 * server code explicitly calls the `notFound()` function from `next/navigation`. Placed here in
 * `src/app`, it is the catch-all 404 for the whole site.
 *
 * WHEN NEXT.JS RENDERS IT
 * Any time a visitor lands on a URL that does not exist, such as `/projcts` (a typo) or an old link that
 * has been removed. Next.js also sends the correct HTTP 404 status code alongside it, which matters so
 * search engines do not index the mistyped URL as a real page.
 *
 * CONCEPTS TO NOTICE
 * 1. Still a **Server Component** (no `"use client"` directive), so it renders to static HTML. Nothing
 *    on this page needs browser state — it is just text and one link.
 * 2. `next/link` versus a plain `<a>`: `<Link>` performs a *client-side* navigation, swapping the page
 *    content in React without a full browser reload, and prefetches the destination when the link
 *    scrolls into view. That is why internal links on the site should always use `<Link>`.
 * 3. The `asChild` prop on `<Button>` (see below) is a composition trick worth understanding.
 * 4. WORTH KNOWING: this file renders `<Navigation />`, `<main>`, and `<Footer />` itself, but the root
 *    layout in `src/app/layout.tsx` already wraps everything in those. That means the 404 page ends up
 *    with two navigation bars, two footers, and nested `<main>` elements. It is left as-is here, but it
 *    is the kind of duplication worth looking at.
 */ // The Next.js link component for internal navigation (see concept 2 above).
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
// A reusable styled button from the local UI kit (this project uses shadcn/ui-style components that
// live in the repo rather than in `node_modules`, so you can read and edit them).
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx [app-rsc] (ecmascript)");
// The shared navigation bar and footer components.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/components/footer.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
function NotFound() {
    return(// `min-h-screen` makes this fill at least the full viewport height so the footer sits at the bottom
    // even though there is very little content; `bg-background` is the theme background color variable.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$navigation$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Navigation"], {}, void 0, false, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-6xl md:text-8xl font-bold text-primary mb-4",
                            children: "404"
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl md:text-3xl font-semibold text-primary mb-4",
                            children: "Page Not Found"
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-muted-foreground mb-8",
                            children: "The page you're looking for doesn't exist or has been moved."
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                            asChild: true,
                            size: "lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                children: "Return Home"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this));
}
}),
"[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=ShyGuyGameDevWebsite_src_0vufmzn._.js.map