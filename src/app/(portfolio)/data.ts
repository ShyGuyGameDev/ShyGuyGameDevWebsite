/**
 * data.ts
 *
 * All content for the v2 portfolio. Pages and components read from here; nothing else holds copy.
 * Every internal link is built from `BASE`. It is empty now that this portfolio is the site root,
 * so `${BASE}/work` resolves to `/work`. Home links use `BASE || "/"` because an empty href
 * would stay on the current page.
 */

export const BASE = ""

export const contact = {
  email: "shyguygamedev@gmail.com",
  github: "https://github.com/ShyGuyGameDev",
  discord: "shyguygamedev",
  substack: "https://shyguygamedev.substack.com",
  emptyConsole: "https://www.emptyconsole.com/",
}

export type Category = "Apps" | "Robotics" | "Games" | "Teaching"

export const categories: Category[] = ["Apps", "Robotics", "Games", "Teaching"]

export type ProjectImage = {
  src: string
  alt: string
  width: number
  height: number
  /** "contain" keeps a wide logo fully visible. Defaults to filling the frame. */
  fit?: "cover" | "contain"
}

export type ExternalLink = {
  label: string
  href: string
  /** Filled green button. When omitted, the first link is filled and the rest are outlined. */
  filled?: boolean
}

export type CaseStudy = {
  team: string
  problem: string
  built: string
  result: string
  learned: string
  /** Replaces the default "What he built" heading when the work was not something he built. */
  builtHeading?: string
  links: ExternalLink[]
  extraVideo?: { src: string; caption: string }
}

export type Project = {
  slug: string
  title: string
  category: Category
  date: string
  year: number
  summary: string
  image?: ProjectImage
  href?: string
  result?: string
  withEmptyConsole: boolean
  featured: boolean
  mention?: ExternalLink
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: "streetcode",
    title: "StreetCode Academy",
    category: "Teaching",
    date: "Nov 2026",
    year: 2026,
    summary: "Volunteered as a class mentor in StreetCode Academy's weekly Unboxing AI class.",
    image: {
      src: "/images.png",
      alt: "StreetCode Academy logo",
      width: 512,
      height: 512,
    },
    withEmptyConsole: false,
    featured: true,
    caseStudy: {
      team: "Solo",
      problem:
        "In a world where AI is the undeniable future, many still are not getting the education they need in order to use the tools available to them.",
      built:
        "ShyGuy volunteers at StreetCode Academy, which runs weekly technology-based classes where anyone can sign up. His students range from 13-70 yrs old.",
      builtHeading: "What he does",
      result:
        'By becoming a "class mentor" in the Unboxing AI class, ShyGuy is able to use his skills in AI to help others.',
      learned:
        "How to simply explain complex concepts and how to customize explanations for people with different experience levels.",
      links: [{ label: "StreetCode Academy", href: "https://streetcode.org/", filled: false }],
    },
  },
  {
    slug: "student-atlas",
    title: "Student Atlas",
    category: "Apps",
    date: "Oct 2026",
    year: 2026,
    summary: "A simpler system for reading and ranking his school's electives, built with Empty Console.",
    image: {
      src: "/student-atlas.png",
      alt: "Student Atlas logo",
      width: 290,
      height: 124,
      fit: "contain",
    },
    withEmptyConsole: true,
    featured: true,
    caseStudy: {
      team: "Empty Console: ShyGuy, HF_ang, Emey",
      problem:
        "ShyGuy's school has a lot of incredible electives for students to choose from, but the system to read and pick them has been incredibly disorganized in the past. It has always been difficult to switch between reading and choosing while also having it be difficult to understand which details in a course are important.",
      built:
        "With his team called Empty Console, ShyGuy designed and built a replacement system. The system is capable of using the exact same info about courses, while also making the student UI and UX significantly simpler. All of Student Atlas's data is safely held by an extremely secure Supabase, along with other security measures implemented throughout the code.",
      builtHeading: "What they built",
      result:
        "They are currently trying to get Student Atlas implemented in their school as the system to read and rank elective choices.",
      learned:
        "How to redesign a system, how to keep UI and UX simple and clean, and how to keep sensitive information safe.",
      links: [
        { label: "Source on GitHub", href: "https://github.com/EmptyConsole/Student-Atlas", filled: true },
        { label: "Student Version", href: "https://student-atlas-xi.vercel.app/", filled: true },
        { label: "Teacher Version", href: "https://student-atlas-xi.vercel.app/teacher", filled: true },
      ],
    },
  },
  {
    slug: "news-digest",
    title: "News Digest",
    category: "Apps",
    date: "Sep 2026",
    year: 2026,
    summary: "An automated news briefing emailed every Monday, Wednesday, and Friday at 6:45 AM.",
    image: {
      src: "/news-digest.jpeg",
      alt: "News Digest email preview",
      width: 738,
      height: 414,
    },
    href: "https://github.com/ShyGuyGameDev/NewsDigest",
    result: "Runs 3× a week",
    withEmptyConsole: false,
    featured: true,
    caseStudy: {
      team: "Solo",
      problem:
        "ShyGuy wanted a dependable way to stay on top of current events without digging through a dozen sites every morning.",
      built:
        "A fully automated briefing covering the latest in politics, technology, science, business, and more. It lands at 6:45 AM every Monday, Wednesday, and Friday. Everyone on the list is BCC'd on the same email, and addresses are stored encrypted in Supabase and never shown anywhere else.",
      result:
        "What started as a personal tool now goes out to other students at his school. Anyone can join by pinging ShyGuy on Discord.",
      learned:
        "How to build something that runs on its own, and how fast a tool made for one person turns into a service once other people rely on it.",
      links: [{ label: "Source on GitHub", href: "https://github.com/ShyGuyGameDev/NewsDigest" }],
    },
  },
  {
    slug: "hackathon-digest",
    title: "Hackathon Digest",
    category: "Apps",
    date: "Aug 2026",
    year: 2026,
    summary:
      "A weekly email, built with Claude Routines, that finds a high-school-friendly hackathon and sends his team the details every Wednesday at 7 AM.",
    href: "https://github.com/ShyGuyGameDev/hackathon-digest",
    withEmptyConsole: false,
    featured: false,
  },
  {
    slug: "open-stage",
    title: "Open Stage",
    category: "Apps",
    date: "Oct 2025",
    year: 2025,
    summary: "An app that helps local musicians earn more through lower upfront costs and real-time tipping.",
    image: {
      src: "/open-stage.png",
      alt: "Open Stage app screens",
      width: 2874,
      height: 1370,
    },
    href: "https://open-stage.vercel.app/signin",
    result: "3rd, Congressional App Challenge CA-15",
    withEmptyConsole: true,
    featured: true,
    caseStudy: {
      team: "Empty Console: ShyGuy, HF_ang, Emey",
      problem:
        "ShyGuy's school music teacher runs a local band, and keeping it going is hard. Upfront costs are high and income is unpredictable.",
      built:
        "With Empty Console, he built Open Stage for the Congressional App Challenge. The team worked with local Bay Area bands to shape the experience and a revenue model built around lower upfront costs and real-time tipping.",
      result:
        "Third place in California's 15th district, one of the most competitive districts in the country. Open Stage was a competition entry and won't be launched as a product.",
      learned:
        "Start from a real person's problem, test with the people who will actually use it, and be able to explain the solution clearly to judges.",
      links: [
        { label: "Try the app", href: "https://open-stage.vercel.app/signin" },
        { label: "Congressional App Challenge", href: "https://www.congressionalappchallenge.us/" },
      ],
    },
  },
  {
    slug: "robotic-dog",
    title: "Robotic Dog",
    category: "Robotics",
    date: "Apr – Jun 2026",
    year: 2026,
    summary: "A robot that spots an object, identifies it with computer vision, and walks toward it.",
    image: {
      src: "/evodyne-robotic-dog.png",
      alt: "The legged robotic dog, version two",
      width: 712,
      height: 396,
    },
    href: "https://www.youtube.com/watch?v=y8NtMZ7VGmU",
    result: "Led to a teaching invite",
    withEmptyConsole: false,
    featured: true,
    caseStudy: {
      team: "Solo",
      problem:
        "The next frontier of AI is spatial intelligence: machines that understand the physical world around them. ShyGuy wanted to try it on his own hardware instead of only reading about it.",
      built:
        "Version one (April 2026) took six months. He wired YOLO11n, a computer vision model that detects and recognizes objects, into a wheeled robot so it could find a chosen object and drive to it. For version two (June 2026) he rebuilt it through the Evodyne Robotics Genesis course. His favorite upgrade was trading the wheels for realistic legs.",
      result:
        "A working robotic dog that sees, identifies, and moves toward a target. Showing it to the teacher of Cumberland Elementary's after-school robotics program led to an invitation to speak to the students.",
      learned:
        "Combining ready-made tools like YOLO11n with custom work, building on an old project instead of starting over, and learning faster with a structured course.",
      links: [
        { label: "1st Version Source on GitHub", href: "https://github.com/ShyGuyGameDev/OriginalRobot" },
        { label: "2nd Version Source on GitHub", href: "https://github.com/ShyGuyGameDev/NewVersionDog" },
      ],
      extraVideo: {
        src: "/robotic-dog-v1.mp4",
        caption: "Version one: wheels and YOLO11n.",
      },
    },
  },
  {
    slug: "ftc-robotics",
    title: "FTC Robotics",
    category: "Robotics",
    date: "Feb 2025",
    year: 2025,
    summary: "Led his school's First Tech Challenge team of 15 students through a competitive season.",
    href: "https://www.firstinspires.org/programs/ftc/",
    withEmptyConsole: false,
    featured: false,
  },
  {
    slug: "bugged-out",
    title: "Bugged Out",
    category: "Games",
    date: "Sep 2025",
    year: 2025,
    summary: "A platformer made in 3 days where glitches are the core mechanic.",
    image: {
      src: "/bugged-out.png",
      alt: "A level from Bugged Out",
      width: 960,
      height: 540,
    },
    href: "https://emptyconsole.itch.io/bugged-out",
    result: "17th of 474",
    withEmptyConsole: true,
    featured: true,
    caseStudy: {
      team: "Empty Console: ShyGuy, HF_ang, Emey",
      problem:
        "The Patch Notes Game Jam handed out the theme 'The Error is the Feature' and three days to build something with it. Most games treat a glitch as the thing to patch out, so the team had to make one fun on purpose.",
      built:
        "A platformer where the glitches are the level design. Broken collision, vanishing platforms, and misbehaving controls are the obstacles, so clearing a room takes logic, memory, and reflexes rather than a clean jump arc.",
      result:
        "17th out of 474 entries. Three days, start to finish, with the whole team working on it at once.",
      learned:
        "How to build a game around a theme instead of bolting the theme on at the end, how much platformer feel improves with a few rounds of iteration, and how to split work across three people when the deadline is measured in hours.",
      links: [
        { label: "Source on GitHub", href: "https://github.com/EmptyConsole/Bugged-Out" },
        { label: "Play on itch.io", href: "https://emptyconsole.itch.io/bugged-out" },
        { label: "Patch Notes Game Jam", href: "https://itch.io/jam/patch-notes-v-1-0" },
      ],
    },
  },
  {
    slug: "space-looper",
    title: "Space Looper",
    category: "Games",
    date: "Aug 2025",
    year: 2025,
    summary: "A strategy game about circling meteors with limited rope and energy, made in 4 days for the GMTK Game Jam.",
    href: "https://emptyconsole.itch.io/space-looper",
    withEmptyConsole: true,
    featured: false,
  },
  {
    slug: "malice-and-mercy",
    title: "Malice and Mercy",
    category: "Games",
    date: "Jun 2025",
    year: 2025,
    summary:
      "A p5.js platformer about choosing to save or kill, with a physics engine and level editor built from scratch.",
    href: "https://emptyconsole.github.io/Malice-and-Mercy/",
    result: "Honorable Mention",
    withEmptyConsole: true,
    featured: false,
    mention: {
      label: "Featured in the q5js Substack",
      href: "https://q5js.substack.com/p/p5play-game-jam-2025-results",
    },
  },
  {
    slug: "dimensional-rifter",
    title: "Dimensional Rifter",
    category: "Games",
    date: "Mar 2025",
    year: 2025,
    summary: "His first game: a platformer where a thrown javelin hits nodes that reshape the level.",
    href: "https://shyguygamedev.github.io/Dimensional-Rifter/",
    withEmptyConsole: false,
    featured: false,
  },
]

const featuredOrder = [
  "streetcode",
  "student-atlas",
  "news-digest",
  "robotic-dog",
  "open-stage",
  "bugged-out",
]

export const featuredProjects = featuredOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p?.featured && p.caseStudy))

export function projectHref(project: Project) {
  return project.caseStudy ? `${BASE}/work/${project.slug}` : project.href
}

export type Post = {
  title: string
  date: string
  summary: string
  href: string
}

export const posts: Post[] = [
  {
    title: "Intro to Spatial Intelligence",
    date: "Jul 2026",
    summary: "Why AI's next frontier is understanding the 3D world, and who is racing to build it",
    href: "https://shyguygamedev.substack.com/p/intro-to-spatial-intelligence",
  },
  {
    title: "Game Jam Tips",
    date: "Jun 2025",
    summary: "Five strategies from the p5play jam that apply to any game jam",
    href: "https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam",
  },
  {
    title: "Engagement in Beginner Games",
    date: "Mar 2025",
    summary: "Seven ways new game designers can use player psychology to keep people playing",
    href: "https://shyguygamedev.substack.com/p/game-design-for-beginners",
  },
]
