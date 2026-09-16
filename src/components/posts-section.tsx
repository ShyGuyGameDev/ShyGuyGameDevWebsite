/**
 * PostsSection - the entire body of the "Posts & Media Mentions" page. It renders a heading, a link
 * to ShyGuy's Substack, a search box with a topic filter, and then the matching cards grouped under
 * a divider heading for each tag ("Media Mention" first, then "Post", per POST_TAG_ORDER).
 *
 * Where it appears: the posts page (the route that imports this component and renders it once).
 *
 * Key concepts a learner should notice here, roughly in the order they appear:
 * 1. "use client" - this file needs browser features (state, refs, effects), so it opts out of being
 *    a Server Component.
 * 2. A TypeScript `interface` (`MediaMention`) describing the shape of one entry, with `?` for the
 *    optional fields, and `description: string | React.ReactNode` so prose can contain JSX links.
 * 3. Small helper components (`SectionHeading`, `MentionRows`) defined in the same file, because they
 *    are only used here.
 * 4. `useRef` for a handle on the <section> DOM node, and `useState` for the search text and the
 *    selected topics (multi-select state stored as an array of strings).
 * 5. LIFTING STATE UP: this component owns the search/filter state and passes it DOWN to
 *    `SearchFilterBar` as `value` + `onChange` style props. The bar itself stores nothing.
 * 6. `useMemo` to avoid re-doing the filtering and grouping work on every single render.
 * 7. `useEffect` + `IntersectionObserver` for the fade-in-on-scroll animation, including the
 *    dependency array and the cleanup function.
 * 8. `.map()` with stable `key` props to turn data into a list of elements.
 */

// Must be the first statement in the file. Marks everything here as a Client Component so the hooks
// below (useState/useRef/useEffect) and the click handlers can run in the browser.
"use client"

// The four React hooks this file uses. `useEffect` = run code after render; `useMemo` = cache an
// expensive calculation; `useRef` = keep a value (here a DOM node) without causing re-renders;
// `useState` = component memory that re-renders the UI when it changes.
import { useEffect, useMemo, useRef, useState } from "react"
// Type-only import, erased at runtime. Needed just for the `React.ReactNode` type below.
import type React from "react"
// Lays cards out in rows and coordinates which card in a row is expanded (so a row grows together).
import { ExpandableCardRows } from "@/components/expandable-card-rows"
// The single-card component that renders each post / media mention.
import { PostCard } from "@/components/post-card"
// The combined search box + topic dropdown, shared with the projects page.
import { SearchFilterBar } from "@/components/search-filter-bar"
// Custom hook: if the URL ends with something like "#post", scroll that section into view on load.
import { useHashScroll } from "@/hooks/use-hash-scroll"
// Shared helpers, all defined in src/lib/utils.ts:
//   compareByPostTagThenDateThenTitle - sort comparator: tag order first, then newest date, then A-Z.
//   getNodeText - flattens JSX prose into a plain string so it can be searched.
//   matchesSearch - true when every word of the query appears somewhere in the text.
//   POST_TAG_ORDER - ['Media Mention', 'Post'], which fixes both group order and the filter list.
//   tagToSlug - turns "Media Mention" into "media-mention" for use as an HTML id / anchor.
import { compareByPostTagThenDateThenTitle, getNodeText, matchesSearch, POST_TAG_ORDER, tagToSlug } from "@/lib/utils"

// The shape of one entry in the data array below. Writing this out means TypeScript will warn you if
// you mistype a field name or forget a required one when adding a new post.
interface MediaMention {
  // Headline. Required, and used as the React list `key`, so keep it unique.
  title: string
  // A human-written month/year string like "February 2025", parsed by `new Date(...)` when sorting.
  date: string
  // The external link (Substack post, or the article that mentioned ShyGuy).
  url: string
  // A UNION type: plain text OR any React content. `React.ReactNode` is what lets the descriptions
  // below be JSX fragments containing <a> links instead of just strings.
  description: string | React.ReactNode
  // `?` = OPTIONAL. Which group the entry belongs to: "Post" (written by ShyGuy) or "Media Mention"
  // (written by someone else about his work). Also drives the coloured pill on the card.
  tag?: string
  // Optional topic keywords. Shown as bullets on the card and included in the search text.
  themes?: string[]
  // Optional preview image path inside `public/`; PostCard falls back to a placeholder if omitted.
  image?: string
}

/**
 * The page's content, written as data rather than markup. Each object in this array is one card and
 * follows the `MediaMention` interface above; here is what each field feeds:
 *   `title`       -> the card's linked heading, and the React `key` for the list (so keep it unique).
 *   `date`        -> the small grey line on the card, and the date used when sorting newest-first.
 *   `url`         -> where the image and the title link to, opened in a new tab.
 *   `tag`         -> the coloured pill on the card, which divider section the card is filed under,
 *                    and the value matched against the topic filter dropdown.
 *   `themes`      -> the bulleted "Themes" list on the card, plus extra searchable words.
 *   `image`       -> the 16:9 preview picture at the top of the card.
 *   `description` -> the body text. Written as a JSX fragment (`<>...</>`) so it can include links.
 *                    `getNodeText` later flattens it to plain text so search still works.
 * Note the HTML entities like `&apos;` and `&quot;`: JSX text cannot contain a raw apostrophe or
 * quote in some spots without upsetting the linter, so escaped versions are used. `{" "}` is an
 * explicit space, needed because JSX collapses the whitespace around line breaks.
 * ORDER DOES NOT MATTER here - the array is sorted immediately below. Add new entries anywhere.
 * (Everything lives at module scope, outside the component, so it is built once when the file loads.)
 */
const mediaMentions: MediaMention[] = [
  // ShyGuy's own Substack post about surviving an FTC robotics season as a team.
  {
    title: "Competitive Robotics Strategies",
    date: "February 2025",
    url: "https://shyguygamedev.substack.com/p/strategies-for-competitive-robotics",
    tag: "Post",
    themes: ["Robotics", "Stategies", "Teamwork"],
    image: "/ftc-competition.jpg",
    description: (
      <>
        Working as a team throughout a competitive robotics season is hard, but there a few strategies to make it much easier. In this post, ShyGuy draws on his experience from working in his school&apos;s{" "}
        <a
          href="https://www.firstinspires.org/programs/ftc/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          FTC(First Tech Challenge)
        </a>{" "}
        team, breaks it down, and shares what worked for him and his team. From what to do when creating the team, to how to handle yourself at the actual competition, this post has strategies that apply to the entire season.
      </>
    ),
  },
  // A media mention: the p5play game jam judge's results post, where Empty Console's game placed.
  {
    title: "P5Play Game Jam Results",
    date: "June 2025",
    url: "https://q5js.substack.com/p/p5play-game-jam-2025-results",
    tag: "Media Mention",
    themes: ["Game design", "Puzzle", "Game Review"],
    image: "/malice-and-mercy.png",
    description: (
      <>
        <a
          href="https://emptyconsole.github.io/Malice-and-Mercy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Malice and Mercy
        </a>
        , an Empty Console game, earned an &quot;honorable mention&quot; in the 2025{" "}
        <a
          href="https://q5play.org/jam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play game jam
        </a>
        , which is equivalent to winning 2nd place in the competition.{" "}
        <a
          href="https://www.linkedin.com/in/quinton-ashley/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Quinton Ashley
        </a>{" "}
        was the game jam judge, and is also the original designer and developer of{" "}
        <a
          href="https://p5js.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5.js
        </a>
        ,{" "}
        <a
          href="https://p5play.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play
        </a>
        ,{" "}
        <a
          href="https://q5js.org/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          q5.js
        </a>
        , and{" "}
        <a
          href="https://q5play.org/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          q5play
        </a>
        . After the competition, he posted his review of{" "}
        <a
          href="https://emptyconsole.github.io/Malice-and-Mercy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Malice and Mercy
        </a>
        , where he highlighted the game&apos;s physics and functionality.
      </>
    ),
  },
  // ShyGuy's own post: seven psychology-based tips for keeping players engaged in beginner games.
  {
    title: "Engagement in Beginner Games",
    date: "March 2025",
    url: "https://shyguygamedev.substack.com/p/game-design-for-beginners",
    tag: "Post",
    themes: ["Game Design", "Strategies", "Engagement", "Beginner", "User Psychology"],
    image: "/post-game-engagement.png",
    description: (
      <>
        Every good game has one goal: Keep the player engaged. However, that&apos;s a lot easier said than done. In this post, ShyGuy shares his top 7 strategies for beginner game designers to use, all of which use the player&apos;s own psychology to their advantage. ShyGuy explains each of these strategies through providing details from one of his own first games,{" "}
        <a
          href="https://shyguygamedev.github.io/Dimensional-Rifter/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Dimensional Rifter
        </a>
        .
      </>
    ),
  },
  // ShyGuy's own post: five lessons from competing in the 2025 p5play game jam.
  {
    title: "Game Jam Tips",
    date: "June 2025",
    url: "https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam",
    tag: "Post",
    themes: ["Game Design", "Game Jam", "Strategies"],
    image: "/post-game-jam-tips.png",
    description: (
      <>
        Creating a game for a game jam is entirely different than creating a game for yourself to play. In this post, ShyGuy summarizes the top 5 lessons he learned from his experience competing in the 2025{" "}
        <a
          href="https://q5play.org/jam/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5play game jam
        </a>{" "}
        with Empty Console. Each of these strategies are broad enough to be applied to any game jam, but are specific enough to be actually useful in creating a better game and placing higher in the competition.
      </>
    ),
  },
  // ShyGuy's own post introducing spatial intelligence; description is plain prose, no links.
  {
    title: "Intro to Spatial Intelligence",
    date: "July 2026",
    url: "https://shyguygamedev.substack.com/p/intro-to-spatial-intelligence?r=6434dw&utm_campaign=post-expanded-share&utm_medium=web&triedRedirect=true",
    tag: "Post",
    themes: ["AI", "Future", "Introduction", "Spatial Intelligence"],
    image: "/post-spatial-intelligence.png",
    description: (
      <>
        AI&apos;s next frontier isn&apos;t just seeing and talking, it&apos;s doing. In this post, ShyGuy introduces spatial intelligence, the field built around teaching AI to understand the 3D world and how the objects within it relate, behave, and change. He breaks the frontier into its two sides, interpretive and generative, covers the tech giants and startups racing to lead it, shares the lessons learned from early world models like Oasis, and explains why the challenge ahead is no longer possibility, but purpose.
      </>
    ),
  },
]

// Sort the entries once, when the module loads, instead of on every render.
// `[...mediaMentions]` makes a COPY first because `.sort()` rearranges the array in place, and
// mutating the original data array would be a nasty surprise for anyone else importing it.
// The comparator orders by tag (using POST_TAG_ORDER), then newest date first, then title A-Z.
const sortedMediaMentions = [...mediaMentions].sort(compareByPostTagThenDateThenTitle)

// A tiny local component: the horizontal rule / label / horizontal rule divider printed above each
// group of cards. Defined here (not exported) because only this file needs it.
// Instead of a separate `interface`, its props are typed INLINE with `{ ... }: { ... }` - handy for
// one-off components. `className?: string` is optional.
function SectionHeading({
  id,
  label,
  className,
}: {
  id: string
  label: string
  className?: string
}) {
  return (
    // `id` becomes the HTML id, which makes this heading a link target for URLs like "#post"
    // (that is what `useHashScroll` scrolls to). `scroll-mt-24` leaves room for the fixed navbar so
    // the heading is not hidden underneath it after scrolling.
    // A template literal builds the class string; `className ?? ""` substitutes an empty string when
    // the optional prop was not passed, so we never print the word "undefined" into the class list.
    <div
      id={id}
      className={`scroll-mt-24 flex items-center gap-4 mb-4 ${className ?? ""}`}
    >
      {/* Left rule. `flex-1` makes it absorb the leftover width, which centres the label. */}
      {/* `border-0 border-t-2` draws only a top border, i.e. a 2px line. */}
      <hr className="flex-1 border-0 border-t-2 border-border" />
      {/* The group name. `shrink-0` stops flexbox from squeezing the text. */}
      <span className="shrink-0 text-sm font-semibold text-primary">
        {label}
      </span>
      {/* Right rule, mirroring the left one. */}
      <hr className="flex-1 border-0 border-t-2 border-border" />
    </div>
  )
}

// Another small local component: renders one group's cards through `ExpandableCardRows`.
// `mentions: typeof mediaMentions` is a neat TypeScript trick - "whatever type that array is",
// i.e. `MediaMention[]` - so the type stays in sync automatically if the data type ever changes.
function MentionRows({
  mentions,
}: {
  mentions: typeof mediaMentions
}) {
  return (
    // `ExpandableCardRows` handles the grid and remembers which card is expanded per row.
    // `items` is the data to lay out.
    // `getItemKey` tells it how to produce the stable React `key` for each item (the title here).
    // `cardsPerRow={2}` = two cards side by side on wide screens.
    // `renderCard` is a RENDER PROP: instead of hard-coding what a card looks like,
    // `ExpandableCardRows` calls this function and we decide. It hands back the item plus the
    // expanded flag and a toggle callback it controls.
    <ExpandableCardRows
      items={mentions}
      getItemKey={(mention) => mention.title}
      cardsPerRow={2}
      renderCard={(mention, expanded, onToggleExpanded) => (
        // `{...mention}` is the SPREAD operator on props: it passes every field of the object
        // (title, date, url, description, tag, themes, image) as an individual prop. This works
        // because PostCardProps has matching names. The two expansion props are passed explicitly,
        // which puts PostCard into its "controlled" mode.
        <PostCard
          {...mention}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
        />
      )}
    />
  )
}

// The exported component the posts page renders.
export function PostsSection() {
  // A handle on the <section> element below, filled in by React after mount. Used by the
  // IntersectionObserver effect to find the elements it should animate.
  const sectionRef = useRef<HTMLElement>(null)
  // The search box's text. This component OWNS it (state is "lifted up" to here) so it can both
  // display it in the search bar and filter the cards with it. Starts as an empty string.
  const [searchQuery, setSearchQuery] = useState("")
  // The multi-select topic filter, stored as an ARRAY OF STRINGS. Empty array = no filter, show all.
  // `useState<string[]>([])` needs the explicit type because TypeScript cannot infer the element
  // type of an empty array on its own.
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  // Custom hook that reads the "#..." part of the URL and scrolls to that section heading.
  useHashScroll()

  // `useMemo(fn, deps)` runs `fn` and remembers the result. On later renders it returns the cached
  // value UNLESS something in `deps` changed. Here it means we only re-filter when the query or the
  // selected topics change - not when, say, some unrelated state elsewhere causes a re-render.
  const filteredMediaMentions = useMemo(() => {
    // `.filter()` returns a new array containing only the entries whose callback returns true.
    return sortedMediaMentions.filter((mention) => {
      // TOPIC FILTER: skip this test entirely when nothing is selected (so an empty array shows
      // everything). Otherwise the entry's tag must be one of the selected strings.
      // `mention.tag ?? ""` substitutes an empty string for entries with no tag, so they get
      // filtered out rather than crashing.
      if (
        selectedTopics.length > 0 &&
        !selectedTopics.includes(mention.tag ?? "")
      ) {
        return false
      }

      // TEXT SEARCH: build one big "haystack" string out of every searchable part of the entry, so
      // a single query can match the title, the date, the tag, a theme, or the description.
      const haystack = [
        mention.title,
        mention.date,
        mention.tag ?? "",
        // `...` spreads the themes array's items into this array; `?? []` covers a missing `themes`.
        ...(mention.themes ?? []),
        // The description may be JSX, and you cannot run `.includes()` on JSX. `getNodeText` walks
        // the element tree and returns just the words, which is exactly why that helper exists.
        getNodeText(mention.description),
      ].join(" ")
      // True when every whitespace-separated word in the query appears somewhere in the haystack.
      return matchesSearch(haystack, searchQuery)
    })
  }, [searchQuery, selectedTopics])

  // Second memo: take the flat filtered list and bundle CONSECUTIVE entries that share a tag into
  // groups, so the page can print a divider heading above each run of cards. This works precisely
  // because the list was already sorted by tag, so all "Media Mention" entries sit next to each other.
  const groupedMentions = useMemo(() => {
    // The accumulator. Its type says: an array of objects, each with a tag and its own list of
    // mentions. `typeof filteredMediaMentions` reuses the type of the array computed above.
    const groups: { tag: string; mentions: typeof filteredMediaMentions }[] = []
    // `for...of` walks the entries in their already-sorted order.
    for (const mention of filteredMediaMentions) {
      // Entries with no tag are filed under a fallback "Other" heading.
      const tag = mention.tag ?? "Other"
      // Peek at the group we are currently filling (the last one added).
      const last = groups[groups.length - 1]
      // If there is no group yet, or the tag just changed, start a brand-new group...
      if (!last || last.tag !== tag) {
        groups.push({ tag, mentions: [mention] })
      } else {
        // ...otherwise this entry belongs to the group we are already building.
        last.mentions.push(mention)
      }
    }
    return groups
  }, [filteredMediaMentions])

  // Scroll-triggered fade-in, the same pattern used in achievements-section.tsx.
  useEffect(() => {
    // The browser watches elements for us and reports when they enter the viewport.
    const observer = new IntersectionObserver(
      // Called with one `entry` per watched element whose visibility changed.
      (entries) => {
        entries.forEach((entry) => {
          // `isIntersecting` is true once the element has scrolled into view.
          if (entry.isIntersecting) {
            // Adding this class starts the fade-up keyframe animation. Elements begin at
            // `opacity-0` (invisible) and this class reveals them. It is never removed, so each
            // element animates once.
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      // Trigger as soon as 10% of the element is visible rather than waiting for all of it.
      { threshold: 0.1 },
    )

    // Collect every element inside this section that opted in with the `.animate-on-scroll` class.
    // `?.` guards against `current` still being null.
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    // Start watching each of them.
    elements?.forEach((el) => observer.observe(el))

    // CLEANUP: the function an effect returns runs before the effect re-runs and when the component
    // unmounts. Disconnecting drops all the old observations so we do not leak observers or keep
    // watching DOM nodes that no longer exist.
    return () => observer.disconnect()
    // DEPENDENCY ARRAY: re-run whenever the filtered list changes. That matters because filtering
    // swaps in different cards, and those brand-new elements need to be observed too - the old
    // observer only knew about the elements that existed when it was created.
  }, [filteredMediaMentions])

  return (
    // The page section. `ref` connects it to `sectionRef`. `relative` anchors the decorative blobs
    // below, `overflow-hidden` clips them, `min-h-screen` keeps short pages from looking empty, and
    // the padding values give extra top space to clear the fixed navbar (larger from `md:` up).
    <section ref={sectionRef} className="relative overflow-hidden min-h-screen py-[64px] md:py-[100px] pt-[132px] md:pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      {/* Purely decorative layer stretched over the whole section (`inset-0`). `zIndex: 1` puts it */}
      {/* behind the content, which sits at `z-10`. */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* Three large translucent circles with a heavy blur, creating soft colour washes. Each is */}
        {/* positioned differently and uses a low-opacity accent colour (e.g. `bg-accent/10`). */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        {/* This one is centred with the `left-1/2` + `-translate-x-1/2` (and vertical) technique. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      {/* The real content column: above the blobs (`z-10`), centred, capped at 1100px wide. */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        {/* Centred header block: title, Substack invitation, and the search/filter row. */}
        <div className="text-center mb-8">
          {/* Page title. `animate-on-scroll opacity-0` are the two classes the observer above looks */}
          {/* for and reveals - remove them and the text would simply appear with no animation. */}
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-4">
            {/* `&amp;` is the HTML entity for "&". */}
            Posts &amp; Media Mentions
          </h2>
          {/* Subtitle. `animate-delay-100` staggers it 100ms behind the title. */}
          <p className="animate-on-scroll opacity-0 animate-delay-100 text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {/* `{" "}` forces a real space before the link, since JSX would otherwise swallow the */}
            {/* whitespace created by the line break. */}
            Subscribe to{" "}
            {/* Link to the Substack, opened in a new tab with the usual security `rel` attributes. */}
            <a
              href="https://shyguygamedev.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {/* `&apos;` is the escaped apostrophe. */}
              ShyGuy&apos;s Substack
            </a>
            !
          </p>
          {/* Wrapper that fades the controls in 200ms after the title. */}
          <div className="animate-on-scroll opacity-0 animate-delay-200">
            {/* LIFTING STATE UP in action: the bar gets the current values plus the state setters. */}
            {/* `onSearchChange={setSearchQuery}` passes the setter function itself, so when the bar */}
            {/* calls it with the new text, this component's state updates and everything re-renders */}
            {/* with a freshly filtered list. Same idea for the topics array. */}
            {/* `topics={POST_TAG_ORDER}` reuses the shared constant, so the dropdown offers exactly */}
            {/* the tags this page groups by and nothing can drift out of sync. */}
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search posts & media mentions..."
              selectedTopics={selectedTopics}
              onTopicsChange={setSelectedTopics}
              topics={POST_TAG_ORDER}
            />
          </div>
        </div>

        {/* A ternary in JSX: if any group survived filtering, render the groups; otherwise render */}
        {/* the "nothing found" message further below. */}
        {groupedMentions.length > 0 ? (
          // One block per tag group. `groupIndex` is the group's position, used for spacing.
          groupedMentions.map((group, groupIndex) => (
            // `key={group.tag}` is the stable unique identity React needs for list items; tags are
            // unique across groups because the list was sorted, so each tag forms one group.
            <div key={group.tag} className="mb-4">
              {/* The divider heading. `tagToSlug` turns "Media Mention" into the id "media-mention" */}
              {/* so the navbar can link to "#media-mention" and `useHashScroll` can jump there. */}
              {/* The first group gets no extra top margin; later ones are pushed down slightly. */}
              <SectionHeading
                id={tagToSlug(group.tag)}
                label={group.tag}
                className={groupIndex === 0 ? "mt-0" : "mt-4"}
              />
              {/* This group's cards, laid out two per row. */}
              <MentionRows mentions={group.mentions} />
            </div>
          ))
        ) : (
          // EMPTY STATE. A nested ternary picks the most helpful wording:
          //   typed something -> name the query back to the user;
          //   only topics selected -> say the topics matched nothing;
          //   neither -> the list itself is genuinely empty.
          <p className="text-center text-muted-foreground">
            {searchQuery.trim()
              ? `No posts or media mentions match "${searchQuery.trim()}".`
              : selectedTopics.length > 0
                ? "No posts or media mentions match the selected topics."
                : "No media mentions yet. Check back soon!"}
          </p>
        )}
      </div>
    </section>
  )
}
