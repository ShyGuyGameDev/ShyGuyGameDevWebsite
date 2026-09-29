/**
 * data.ts
 *
 * All content for the v2 portfolio. Pages and components read from here; nothing else holds copy.
 * Every internal link is built from `BASE`, so moving v2 to the site root is a matter of changing
 * `BASE` to "" and moving the route folders.
 */

export const BASE = "/test"

export const contact = {
  email: "shyguygamedev@gmail.com",
  github: "https://github.com/ShyGuyGameDev",
  discord: "shyguygamedev",
  substack: "https://shyguygamedev.substack.com",
  emptyConsole: "https://www.emptyconsole.com/",
}

export type Category = "Apps" | "Robotics" | "Games"

export const categories: Category[] = ["Apps", "Robotics", "Games"]

export type ProjectImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type ExternalLink = {
  label: string
  href: string
}

export type CaseStudy = {
  team: string
  problem: string
  built: string
  result: string
  learned: string
  links: ExternalLink[]
  extraImage?: ProjectImage & { caption: string }
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
        "How to build something that runs on its own, and how fast a tool made for one person turns into a product once other people rely on it.",
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
        "A working robotic dog that sees, identifies, and moves toward a target. Showing it to the lead of Cumberland Elementary's after-school robotics program led to an invitation to speak to the students.",
      learned:
        "Combining ready-made tools like YOLO11n with custom work, building on an old project instead of starting over, and learning faster with a structured course.",
      links: [
        { label: "Watch version one", href: "https://www.youtube.com/watch?v=y8NtMZ7VGmU" },
        {
          label: "Evodyne Genesis course",
          href: "https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/",
        },
      ],
      extraImage: {
        src: "/computer-vision-robot.png",
        alt: "The wheeled computer vision robot, version one",
        width: 2106,
        height: 1532,
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
    href: "https://emptyconsole.itch.io/bugged-out",
    result: "17th of 474",
    withEmptyConsole: true,
    featured: false,
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

const featuredOrder = ["news-digest", "robotic-dog", "open-stage"]

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
    summary: "Why AI's next frontier is understanding the 3D world, and who is racing to build it.",
    href: "https://shyguygamedev.substack.com/p/intro-to-spatial-intelligence",
  },
  {
    title: "Game Jam Tips",
    date: "Jun 2025",
    summary: "Five strategies from the p5play jam that apply to any game jam.",
    href: "https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam",
  },
  {
    title: "Engagement in Beginner Games",
    date: "Mar 2025",
    summary: "Seven ways new game designers can use player psychology to keep people playing.",
    href: "https://shyguygamedev.substack.com/p/game-design-for-beginners",
  },
]
