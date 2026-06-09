module.exports = [
"[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ShyGuyGameDevWebsite/src/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// Shuffle array function
function shuffleArray(array) {
    const shuffled = [
        ...array
    ];
    for(let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];
    }
    return shuffled;
}
const HERO_TITLE = "Who is ShyGuy?";
const HERO_PARAGRAPH = "Empty Console is a team of students who came together due to their love of programming. From a shared passion, the team has evolved into a collaborative space where each member can pursue their unique talents, contribute meaningfully to projects, and develop skills while learning from each other. Everyone on the team brings a unique perspective, balancing technical expertise, creativity, and teamwork to produce innovative projects and products, all while learning more about video coding and of the world's future.";
const HERO_BUTTON_TEXT = "Meet the Team";
const HERO_TITLE_SPEED = 55;
const HERO_TITLE_DELAY = 250;
function useTypewriter(text, speed = 16, startDelay = 0) {
    const [displayed, setDisplayed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const effectiveSpeed = Math.max(speed, 4);
        const effectiveDelay = Math.max(startDelay, 0);
        setDisplayed("");
        let intervalId;
        const delayId = setTimeout(()=>{
            let index = 0;
            intervalId = setInterval(()=>{
                index += 1;
                setDisplayed(text.slice(0, index));
                if (index >= text.length) {
                    if (intervalId) clearInterval(intervalId);
                }
            }, effectiveSpeed);
        }, effectiveDelay);
        return ()=>{
            if (intervalId) clearInterval(intervalId);
            clearTimeout(delayId);
        };
    }, [
        text,
        speed,
        startDelay
    ]);
    return displayed;
}
function Typewriter({ text, speed, startDelay, className, as, showCursor = true, style }) {
    const Component = as ?? "span";
    const typedText = useTypewriter(text, speed, startDelay);
    const isComplete = typedText.length === text.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: className,
        style: style,
        "aria-label": text,
        children: [
            typedText,
            showCursor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `typewriter-caret${isComplete ? " typewriter-caret-done" : ""}`,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
function HeroSection() {
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [videoList, setVideoList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [scrollProgress, setScrollProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Fetch video list from API (automatically detects all videos in /public/Clips)
    // useEffect(() => {
    //   const fetchVideos = async () => {
    //     try {
    //       const response = await fetch("/api/videos")
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch videos")
    //       }
    //       const data = await response.json()
    //       if (data.videos && data.videos.length > 0) {
    //         const shuffled = shuffleArray(data.videos as string[])
    //         setVideoList(shuffled)
    //         console.log("Videos loaded:", shuffled)
    //       } else {
    //         console.warn("No videos found in API response")
    //         useFallbackVideos()
    //       }
    //     } catch (error) {
    //       console.error("Error fetching videos:", error)
    //       useFallbackVideos()
    //     }
    //   }
    //
    //   const useFallbackVideos = () => {
    //     const fallbackVideos = [
    //       "/Clips/OpenStage.mp4",
    //       "/Clips/SpaceLooper.mp4",
    //       "/Clips/BuggedOut.mp4",
    //       "/Clips/MaliceAndMercy.mp4",
    //     ]
    //     const shuffled = shuffleArray(fallbackVideos)
    //     setVideoList(shuffled)
    //     console.log("Using fallback videos:", shuffled)
    //   }
    //
    //   fetchVideos()
    // }, [])
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const scrollFromTop = -rect.top;
            // Calculate progress: 0 at top, 1 when bottom of section is at top of viewport
            const progress = Math.max(0, Math.min(1, scrollFromTop / sectionHeight));
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up");
                }
            });
        }, {
            threshold: 0.1
        });
        const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
        elements?.forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up");
                }
            });
        }, {
            threshold: 0.1
        });
        const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
        elements?.forEach((el)=>observer.observe(el));
        return ()=>observer.disconnect();
    }, []);
    const handleScrollToTeam = ()=>{
        router.push("/team");
    };
    const handleVideoHover = (e, isHovering)=>{
        if (isHovering) {
            e.currentTarget.classList.add("hovered");
        } else {
            e.currentTarget.classList.remove("hovered");
        }
    };
    const handleVideoClick = ()=>{
        router.push("/projects");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: `
        .hero-text {
          color: black;
        }
        .typewriter-caret {
          display: inline-block;
          width: 0.18em;
          margin-left: 0.08em;
          border-left: 2px solid currentColor;
          animation: typewriter-caret-blink 1s steps(1) infinite;
        }
        .typewriter-caret-done {
          opacity: 0;
          animation: none;
        }
        @keyframes typewriter-caret-blink {
          50% { opacity: 0; }
        }

        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1200px;
        }

        .videos-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }

        .video-box {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 300px;
          height: 225px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.3);
          transform-origin: center center;
          transform-box: fill-box;
          transition: filter 0.3s ease-out, box-shadow 0.3s ease-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          pointer-events: auto;
          will-change: transform;
          touch-action: auto;
        }

        .video-box:hover {
          filter: brightness(1.1);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6);
        }

        .video-box.hovered {
          --hover-scale: 1.15;
        }

        .video-box:nth-child(1).hovered {
          transform: translate(calc(-50% - 400px - var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(-15deg) scale(calc(var(--scale) * var(--hover-scale, 1)));
        }

        .video-box:nth-child(2).hovered {
          transform: translate(calc(-50% + 400px + var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(15deg) scale(calc(var(--scale) * var(--hover-scale, 1)));
        }

        .video-box:nth-child(3).hovered {
          transform: translate(calc(-50% - 450px - var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12 * var(--hover-scale, 1)));
        }

        .video-box:nth-child(4).hovered {
          transform: translate(calc(-50% + 450px + var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12 * var(--hover-scale, 1)));
        }

        .video-box video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .video-box:nth-child(1) {
          transform: translate(calc(-50% - 400px - var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(-15deg) scale(var(--scale));
        }

        .video-box:nth-child(2) {
          transform: translate(calc(-50% + 400px + var(--spread-offset)), calc(-50% - 250px - var(--vertical-offset))) rotate(15deg) scale(var(--scale));
        }

        .video-box:nth-child(3) {
          transform: translate(calc(-50% - 450px - var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12));
        }

        .video-box:nth-child(4) {
          transform: translate(calc(-50% + 450px + var(--spread-offset) * 1.6), calc(-50% + 200px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12));
        }

        @media (max-width: 768px) {
          .video-box {
            width: 200px;
            height: 150px;
          }

          .video-box:nth-child(1) {
            transform: translate(calc(-50% - 260px - var(--spread-offset)), calc(-50% - 160px - var(--vertical-offset))) rotate(-15deg) scale(var(--scale));
          }

          .video-box:nth-child(2) {
            transform: translate(calc(-50% + 260px + var(--spread-offset)), calc(-50% - 160px - var(--vertical-offset))) rotate(15deg) scale(var(--scale));
          }

          .video-box:nth-child(3) {
            transform: translate(calc(-50% - 280px - var(--spread-offset) * 1.6), calc(-50% + 130px + var(--vertical-offset))) rotate(-20deg) scale(calc(var(--scale) * 1.12));
          }

          .video-box:nth-child(4) {
            transform: translate(calc(-50% + 280px + var(--spread-offset) * 1.6), calc(-50% + 130px + var(--vertical-offset))) rotate(20deg) scale(calc(var(--scale) * 1.12));
          }
        }
      `
                }
            }, void 0, false, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "home",
                ref: sectionRef,
                className: "relative min-h-screen flex items-center justify-center py-[100px] pt-[72px] overflow-hidden",
                style: {
                    background: 'transparent'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        style: {
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 337,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[1100px] mx-auto px-6 text-center",
                        style: {
                            position: 'relative',
                            zIndex: 10
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Typewriter, {
                                as: "h1",
                                className: "animate-on-scroll text-5xl md:text-6xl lg:text-[48px] font-semibold mb-6 text-balance hero-text hero-text-h1",
                                style: {
                                    pointerEvents: 'none'
                                },
                                text: HERO_TITLE,
                                speed: HERO_TITLE_SPEED,
                                startDelay: HERO_TITLE_DELAY
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "animate-on-scroll animate-delay-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed text-pretty hero-text hero-text-p",
                                style: {
                                    pointerEvents: 'none'
                                },
                                children: HERO_PARAGRAPH
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-on-scroll animate-delay-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleScrollToTeam,
                                    className: "bg-accent hover:bg-accent/95 active:bg-accent/92 text-accent-foreground font-medium uppercase tracking-wide px-10 py-7 text-base rounded-2xl shadow-lg hover:shadow-2xl active:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 transform",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mr-3 inline-block",
                                            children: HERO_BUTTON_TEXT
                                        }, void 0, false, {
                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-10 w-10",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 2v18"
                                                }, void 0, false, {
                                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$ShyGuyGameDevWebsite$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 14l6 6 6-6"
                                                }, void 0, false, {
                                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                            lineNumber: 393,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/ShyGuyGameDevWebsite/src/components/hero-section.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=ShyGuyGameDevWebsite_src_components_hero-section_tsx_0sewcjt._.js.map