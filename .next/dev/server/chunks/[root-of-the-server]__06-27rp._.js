module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/ShyGuyGameDevWebsite/src/app/api/videos/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * src/app/api/videos/route.ts  —  an API ROUTE HANDLER
 *
 * WHAT THIS FILE IS
 * `route.ts` is the third reserved App Router filename you should know, alongside `layout.tsx` and
 * `page.tsx`. A folder containing `route.ts` becomes an **API endpoint** instead of a page: it returns
 * data (JSON here) rather than HTML. Because this file lives at `src/app/api/videos/`, the endpoint's
 * URL is `/api/videos`. Note that a single folder may contain `page.tsx` OR `route.ts`, never both —
 * one URL cannot be a page and an endpoint at the same time.
 *
 * WHEN NEXT.JS RENDERS IT
 * There is nothing to render. Next.js runs the exported HTTP-method function when a request with that
 * method arrives. This file exports `GET`, so a browser or `fetch('/api/videos')` call hits the function
 * below. You would add `export async function POST()` in the same file to handle POST requests.
 *
 * WHAT IT DOES HERE
 * It lists the video clips sitting in `public/Clips` and returns their public URLs as JSON, roughly:
 * `{ "videos": ["/Clips/a.mp4", "/Clips/b.webm"] }`. The hero section that used to fetch this and play
 * the clips as a background reel is currently commented out, so at the moment nothing on the site calls
 * this endpoint — it is live but unused.
 *
 * CONCEPTS TO NOTICE
 * 1. Route handlers always run on the **server**, never in the browser. That is what makes the Node
 *    built-ins `fs` and `path` usable here, and it is why every `console.log` below shows up in your
 *    terminal (or the Vercel deployment logs) rather than in the browser devtools console.
 * 2. Why an endpoint exists at all: a *client* component (one with `"use client"`) cannot read the disk
 *    itself, so it asks this server endpoint over HTTP. Compare `src/app/page.tsx`, which is a Server
 *    Component and therefore just calls `fs` directly with no endpoint in between.
 * 3. The `public/` folder is served from the site root, so the on-disk file `public/Clips/intro.mp4` is
 *    fetchable at the URL `/Clips/intro.mp4`. This handler's whole job is translating one to the other.
 * 4. Error handling: every failure path still returns valid JSON with an empty `videos` array, so the
 *    calling code never has to deal with a crashed or half-written response.
 */ // `NextResponse` is Next.js's convenience wrapper around the web-standard `Response` object. Its
// `.json()` helper serializes a JavaScript value to JSON and sets the `Content-Type` header for you.
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/server.js [app-route] (ecmascript)");
// Node's file-system module, for checking that a folder exists and listing what is inside it.
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
// Node's path module, for building file paths in an OS-independent way instead of concatenating strings.
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
async function GET() {
    // Wrap everything in try/catch. If an unexpected error escaped a route handler the client would get a
    // generic 500 with an HTML error body, which is awkward for code expecting JSON.
    try {
        // `process.cwd()` ("current working directory") is the project root when Next.js is running, so
        // joining those three segments produces an absolute path such as `/Users/you/project/public/Clips`.
        // `path.join` inserts the right separator for the operating system and collapses redundant slashes.
        const clipsDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'Clips');
        // Guard clause: bail out early if the folder is missing (for example on a fresh clone where the
        // clips were never committed). Calling `readdirSync` on a path that does not exist would throw.
        // Check if directory exists
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(clipsDirectory)) {
            // `console.error` here writes to the *server* log, not the browser console.
            console.error('Clips directory not found:', clipsDirectory);
            // Respond with an empty list and an implicit HTTP 200. Returning a valid-but-empty result means
            // the caller's rendering code takes the same "no videos" path it would for an empty folder.
            return __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                videos: []
            });
        }
        // Read the folder's contents as an array of plain filename strings, e.g. `['intro.mp4', 'a.txt']`.
        // The `Sync` suffix means this blocks until the disk responds, which is acceptable for a small local
        // folder; the async `fs.promises.readdir` would be preferable for anything heavier.
        const files = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(clipsDirectory);
        // Two array transformations chained together: `filter` narrows the list down, then `map` reshapes
        // each surviving item. Neither one mutates `files`; each returns a brand-new array.
        const videos = files// Keep only the entries that look like video files.
        .filter((file)=>{
            // Lowercase the whole name first so the extension check is case-insensitive (`CLIP.MP4` counts).
            // The variable is called `ext` but it actually holds the entire lowercased filename — a slightly
            // misleading name; `endsWith` is what isolates the extension.
            const ext = file.toLowerCase();
            // Accept the three formats the site plays. Anything else (a `.DS_Store`, a thumbnail, a stray
            // sub-folder name) is filtered out.
            return ext.endsWith('.mp4') || ext.endsWith('.webm') || ext.endsWith('.mov');
        })// Turn each filename into the URL the browser can request. This works because files in `public/`
        // are served from the site root, so `public/Clips/intro.mp4` is available at `/Clips/intro.mp4`.
        .map((file)=>`/Clips/${file}`);
        // A leftover debugging log. It prints to the terminal / deployment logs on every request, so it is
        // a reasonable candidate for removal once the endpoint is known to work.
        console.log('Videos found:', videos);
        // The success response. `{ videos }` is shorthand for `{ videos: videos }`, so the JSON body is
        // `{"videos": [...]}`. Wrapping the array in an object (rather than returning a bare array) leaves
        // room to add fields like a count or a timestamp later without breaking existing callers.
        return __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            videos
        });
    // `catch (error)` receives whatever was thrown — a permissions failure, a disappearing folder, etc.
    // In TypeScript its type is `unknown`, which is why it is only logged rather than inspected.
    } catch (error) {
        console.error('Error reading clips directory:', error);
        // Same empty-list shape as the happy path, but with an explicit HTTP 500 status so the caller (and
        // any monitoring) can tell "something broke" apart from "there are genuinely no clips".
        return __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            videos: []
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06-27rp._.js.map