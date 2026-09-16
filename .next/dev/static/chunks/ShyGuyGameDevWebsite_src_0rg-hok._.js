(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ShyGuyGameDevWebsite/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function getNodeText(node) {
    if (node == null || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join(' ');
    if (typeof node === 'object' && 'props' in node) {
        return getNodeText(node.props?.children);
    }
    return '';
}
function getYearFromDate(date) {
    return new Date(date).getFullYear();
}
function compareByDateThenTitle(a, b) {
    const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateDiff !== 0) return dateDiff;
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
    return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function compareTags(aTag, bTag, tagOrder) {
    const a = aTag ?? '';
    const b = bTag ?? '';
    const aIndex = tagOrder.indexOf(a);
    const bIndex = tagOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;
    return a.localeCompare(b);
}
function createCompareByTagThenDateThenTitle(tagOrder) {
    return (a, b)=>{
        const tagDiff = compareTags(a.tag, b.tag, tagOrder);
        if (tagDiff !== 0) return tagDiff;
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return a.title.localeCompare(b.title);
    };
}
const compareByProjectTagThenDateThenTitle = createCompareByTagThenDateThenTitle(PROJECT_TAG_ORDER);
const compareByPostTagThenDateThenTitle = createCompareByTagThenDateThenTitle(POST_TAG_ORDER);
function matchesSearch(haystack, query) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return true;
    const text = haystack.toLowerCase();
    return trimmed.split(/\s+/).every((token)=>text.includes(token));
}
const TAG_COLOR_CLASSES = {
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
    'Media Mention': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300',
    'Media Mentions': 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
};
const DEFAULT_TAG_COLOR_CLASSES = 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
function getTagColorClasses(tag) {
    return TAG_COLOR_CLASSES[tag] ?? DEFAULT_TAG_COLOR_CLASSES;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// `type MouseEvent` imports only a type. React's MouseEvent is its own synthetic-event type, distinct
// from the browser's global MouseEvent, and the `type` keyword makes clear nothing is imported at
// runtime — it disappears when TypeScript compiles.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// usePathname returns the current URL path, e.g. "/projects".
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/navigation.js [app-client] (ecmascript)");
// next/link renders an <a> but intercepts the click to do a fast client-side navigation, keeping React
// state alive and prefetching the target page. A plain <a href> would reload the whole document.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
// lucide-react provides icons as React components: the dropdown chevron, and the hamburger/close icons.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx [app-client] (ecmascript)");
// next/image optimises images (sizing, modern formats, lazy loading) instead of a raw <img>.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/image.js [app-client] (ecmascript)");
// The single source of truth for section names, shared with the Projects and Posts pages. Because both
// the pages and this menu read the same lists, the anchors can never drift out of sync.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
/**
 * Navigation — the site-wide header bar, fixed to the top of every page (it is rendered once in the
 * root layout, so it appears above the content on the home page, /projects, /posts and /team).
 *
 * What it renders:
 *  - the "ShyGuy" logo on the left, which always links back to the home page,
 *  - on desktop, a row of top-level links; Projects and Posts each open a hover dropdown listing the
 *    sections on that page, built from the shared tag lists in src/lib/utils.ts,
 *  - on mobile, a hamburger button that toggles a stacked version of the same links, with each page's
 *    sections indented underneath it.
 *
 * Concepts a learner should notice in this file:
 *  - useState for the three independent pieces of UI state (mobile menu, scrolled flag, open dropdown),
 *  - useEffect with cleanup for the scroll and keyboard listeners, plus one effect that watches
 *    `pathname` so the menus close automatically after navigating,
 *  - useRef used here NOT for a DOM node but to remember a timeout id across renders,
 *  - usePathname to know which page is currently showing, so the active link can be highlighted,
 *  - next/link, which navigates without a full page reload,
 *  - deriving the nav from data (the navLinks array) instead of hard-coding each <li>,
 *  - accessibility attributes: aria-haspopup, aria-expanded, aria-hidden, aria-label, role="menu"
 *    and role="menuitem", which tell screen readers this is a menu and whether it is open.
 */ // Required because this component uses state, effects and browser APIs, so it must run in the browser.
"use client";
;
;
;
;
;
;
;
// The nav is described as data and rendered with .map below, so adding a page means adding one line
// here. Only entries with `sections` get a dropdown.
const navLinks = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/projects",
        label: "Projects",
        sections: __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROJECT_NAV_SECTIONS"]
    },
    {
        href: "/posts",
        label: "Posts & Media Mentions",
        sections: __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POST_TAG_ORDER"]
    },
    {
        href: "/team",
        label: "Empty Console"
    }
];
// A helper that builds the class string for a top-level link. Sharing it means every link stays
// visually consistent, and the active one is highlighted in the accent colour.
// focus-visible:ring-* draws a focus ring only for keyboard users (not on mouse clicks), which is why
// removing the browser default with focus:outline-none is acceptable here.
// The negative margins (-mx-1, -my-4) paired with padding enlarge the clickable/hover area without
// pushing the neighbouring links apart.
const linkClassName = (isActive)=>`text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-1 -my-4 py-4 h-full block ${isActive ? "text-accent" : "text-secondary hover:bg-gray-200 dark:hover:bg-gray-800"}`;
function Navigation() {
    _s();
    // Is the mobile hamburger menu expanded?
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Has the user scrolled down at all? Used only to swap the header's shadow.
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Which dropdown is open, stored as the href of its top-level link, or null for "none". Storing the
    // href rather than a boolean per menu means one piece of state can never show two menus at once.
    // The <string | null> type argument is needed because React cannot infer it from the initial null.
    const [openMenu, setOpenMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // A ref used as a plain instance variable, not for a DOM node: it remembers the pending "close the
    // dropdown" timeout so a later mouse-enter can cancel it. State would be wrong here, because storing
    // a timer id should never trigger a re-render.
    const closeTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // The current path, so the matching link can be highlighted and same-page clicks handled specially.
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Effect: keep isScrolled in sync with the scroll position.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleScroll = {
                "Navigation.useEffect.handleScroll": ()=>{
                    // window.scrollY is the pixels scrolled from the top; > 10 avoids flickering on tiny scrolls.
                    // Passing the same boolean again is cheap: React skips the re-render if the value is unchanged.
                    setIsScrolled(window.scrollY > 10);
                }
            }["Navigation.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll);
            // Cleanup: without removing the listener, every remount would add another one.
            return ({
                "Navigation.useEffect": ()=>{
                    window.removeEventListener("scroll", handleScroll);
                }
            })["Navigation.useEffect"];
        // Runs once on mount, because the dependency array is empty.
        }
    }["Navigation.useEffect"], []);
    // Effect: close both menus whenever the URL path changes. Listing `pathname` as the dependency is
    // what makes this happen — the effect re-runs after each navigation. Without it, the mobile menu
    // would stay open covering the new page.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            setIsOpen(false);
            setOpenMenu(null);
        }
    }["Navigation.useEffect"], [
        pathname
    ]);
    // Effect: let the Escape key close an open dropdown, which keyboard users expect.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleKeyDown = {
                "Navigation.useEffect.handleKeyDown": (event)=>{
                    // event.key is the name of the key pressed, e.g. "Escape", "Enter", "a".
                    if (event.key === "Escape") {
                        setOpenMenu(null);
                    }
                }
            }["Navigation.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "Navigation.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    // Effect: this one exists *only* for its cleanup. It sets nothing up on mount; on unmount it cancels
    // any pending close timer, so a timeout cannot fire and call setOpenMenu on a component that is gone.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            return ({
                "Navigation.useEffect": ()=>{
                    if (closeTimer.current) clearTimeout(closeTimer.current);
                }
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    // Cancel a scheduled close and forget the id. Resetting to null keeps the ref honest, so later checks
    // of closeTimer.current are not looking at a stale, already-fired timer.
    const clearCloseTimer = ()=>{
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };
    // Mouse entered a menu area: cancel any pending close first (the pointer may have re-entered during
    // the grace period), then open this menu.
    const handleMenuEnter = (href)=>{
        clearCloseTimer();
        setOpenMenu(href);
    };
    // Mouse left the menu area: do NOT close immediately. The dropdown sits slightly below the link, so
    // an instant close would make it vanish while the pointer travels across the gap. A 150 ms delay
    // gives the pointer time to arrive, and handleMenuEnter cancels the timer when it does.
    const handleMenuLeave = ()=>{
        clearCloseTimer();
        closeTimer.current = setTimeout(()=>{
            setOpenMenu(null);
        }, 150);
    };
    // Click on a top-level link (Home, Projects, ...).
    const handleTopLinkClick = (event, href)=>{
        setOpenMenu(null);
        // If this link points at the page already showing, navigating would be pointless.
        if (pathname === href) {
            // preventDefault stops the browser (and next/link) from handling the click at all...
            event.preventDefault();
            // ...and instead we just jump to the top of the current page.
            window.scrollTo({
                top: 0
            });
            // replaceState rewrites the address bar without navigating and without adding a history entry,
            // so the back button does not fill up with clicks that never actually changed the page.
            window.history.replaceState(null, "", href);
        }
    };
    // Click on a section link inside a dropdown, e.g. "Robotics" under Projects.
    // The parameters are split across lines purely for readability; `slug` is the id of the target
    // heading on that page, produced by tagToSlug (so "Media Mention" becomes "media-mention").
    const handleSectionClick = (event, href, slug)=>{
        // Close the desktop dropdown and the mobile menu, since this handler serves both.
        setOpenMenu(null);
        setIsOpen(false);
        // Already on the right page, so scroll to the section instead of re-navigating to it.
        if (pathname === href) {
            event.preventDefault();
            // getElementById finds the section by its id; `?.` means nothing happens if no such id exists,
            // rather than crashing on null.
            document.getElementById(slug)?.scrollIntoView();
            // Keep the URL in step (e.g. /projects#robotics) so it can be copied and shared.
            window.history.replaceState(null, "", `${href}#${slug}`);
        }
    };
    return(// <header> and <nav> are semantic landmark elements: screen readers can jump straight to the
    // site navigation because of them. `fixed` with top/left/right 0 pins the bar to the top of the
    // window as the page scrolls, and z-50 keeps it above the page content.
    // The template literal adds a subtle shadow once scrolled, so the bar visually lifts off the page.
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card shadow-sm" : "bg-card"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "max-w-[1100px] mx-auto px-6 py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2 text-xl font-semibold text-primary hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-3 -mx-3 -my-4 py-4 h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/shyguy-gamedev-logo.png",
                                    alt: "Empty Console Logo",
                                    width: 32,
                                    height: 32,
                                    className: "object-contain",
                                    unoptimized: true
                                }, void 0, false, {
                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                    lineNumber: 220,
                                    columnNumber: 13
                                }, this),
                                "ShyGuy"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "hidden md:flex items-center gap-8",
                            children: navLinks.map((link)=>{
                                // Is this the page currently being viewed?
                                const isActive = pathname === link.href;
                                // Boolean(...) turns a possibly-undefined length into a real true/false. `?.length` is
                                // undefined when there are no sections, and 0 is falsy, so an empty array counts as none.
                                const hasSections = Boolean(link.sections?.length);
                                // Compare the stored href against this link's href to see if its dropdown is the open one.
                                const isMenuOpen = openMenu === link.href;
                                // Simple case: a link with no dropdown, so render just the link and stop here.
                                if (!hasSections) {
                                    return(// key is required on list items; the href is unique, so it makes a good key.
                                    // The arrow wrapper is needed because the handler takes extra arguments: passing
                                    // onClick={handleTopLinkClick} could not supply the href.
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: link.href,
                                            className: linkClassName(isActive),
                                            onClick: (event)=>handleTopLinkClick(event, link.href),
                                            children: link.label
                                        }, void 0, false, {
                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                            lineNumber: 253,
                                            columnNumber: 21
                                        }, this)
                                    }, link.href, false, {
                                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                        lineNumber: 252,
                                        columnNumber: 19
                                    }, this));
                                }
                                return(// `relative` makes this <li> the positioning context, so the absolutely positioned
                                // dropdown below is placed relative to this link rather than the whole page.
                                // The hover handlers live on the <li> — which contains both the link and the dropdown —
                                // so moving the pointer down into the menu never counts as leaving.
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "relative",
                                    onMouseEnter: ()=>handleMenuEnter(link.href),
                                    onMouseLeave: handleMenuLeave,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: link.href,
                                            className: `${linkClassName(isActive)} inline-flex items-center gap-1`,
                                            "aria-haspopup": "menu",
                                            "aria-expanded": isMenuOpen,
                                            onClick: (event)=>handleTopLinkClick(event, link.href),
                                            children: [
                                                link.label,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: `h-3.5 w-3.5 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`,
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                            lineNumber: 279,
                                            columnNumber: 19
                                        }, this),
                                        isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-0 top-full pt-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                role: "menu",
                                                className: "min-w-56 rounded-md border border-border bg-card shadow-lg py-2",
                                                children: link.sections.map((section)=>{
                                                    const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagToSlug"])(section);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        role: "none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `${link.href}#${slug}`,
                                                            role: "menuitem",
                                                            className: "block text-sm px-3 py-2 text-secondary hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors",
                                                            onClick: (event)=>handleSectionClick(event, link.href, slug),
                                                            children: section
                                                        }, void 0, false, {
                                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 31
                                                        }, this)
                                                    }, section, false, {
                                                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 29
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                lineNumber: 297,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                            lineNumber: 296,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, link.href, true, {
                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                    lineNumber: 269,
                                    columnNumber: 17
                                }, this));
                            })
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "icon",
                            className: "md:hidden",
                            onClick: ()=>setIsOpen(!isOpen),
                            "aria-label": isOpen ? "Close menu" : "Open menu",
                            "aria-expanded": isOpen,
                            children: isOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                lineNumber: 335,
                                columnNumber: 23
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                lineNumber: 335,
                                columnNumber: 51
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden mt-4 pb-4 border-t border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "flex flex-col gap-4 pt-4",
                        children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: `block text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1 ${pathname === link.href ? "text-accent" : "text-secondary hover:text-accent"}`,
                                        onClick: (event)=>handleTopLinkClick(event, link.href),
                                        children: link.label
                                    }, void 0, false, {
                                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                        lineNumber: 345,
                                        columnNumber: 19
                                    }, this),
                                    link.sections && link.sections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-2 ml-4 flex flex-col gap-2 border-l border-border pl-3",
                                        children: link.sections.map((section)=>{
                                            const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tagToSlug"])(section);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `${link.href}#${slug}`,
                                                    className: "block text-sm text-secondary hover:text-accent transition-colors py-0.5",
                                                    onClick: (event)=>handleSectionClick(event, link.href, slug),
                                                    children: section
                                                }, void 0, false, {
                                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 29
                                                }, this)
                                            }, section, false, {
                                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                                lineNumber: 361,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                        lineNumber: 357,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, link.href, true, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                                lineNumber: 344,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                        lineNumber: 342,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
                    lineNumber: 341,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
            lineNumber: 208,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/ShyGuyGameDevWebsite/src/components/navigation.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this));
}
_s(Navigation, "3pfg2bbD3sh8UFCm6DwlZ01NYds=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=ShyGuyGameDevWebsite_src_0rg-hok._.js.map