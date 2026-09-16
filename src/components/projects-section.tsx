"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { SearchFilterBar } from "@/components/search-filter-bar"
import { useHashScroll } from "@/hooks/use-hash-scroll"
import { compareByDateThenTitle, compareByProjectTagThenDateThenTitle, FEATURED_SECTION_LABEL, getNodeText, matchesSearch, PROJECT_TAG_ORDER, tagToSlug } from "@/lib/utils"

const completedProjects = [
  {
    title: "Malice and Mercy",
    url: "https://emptyconsole.github.io/Malice-and-Mercy/",
    date: "June 2025",
    tag: "Games",
    description: (
      <>
        A{" "}
        <a
          href="https://p5js.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5.js
        </a>{" "}
        platformer by Empty Console created for the{" "}
        <a
          href="https://p5play.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          p5Play
        </a>{" "}
        game jam that earned Honorable Mention. The game explores ethical decision-making in fast-paced platforming. Players choose to save or kill characters while balancing points and time using three throwable abilities. Features a fully custom physics engine, tilemap system, collision detection, particles, and a level editor coded from scratch. 
      </>
    ),
    learnings: [
      "Building a full game",
      "Implementing custom physics",
      "Level design and choice-based gameplay",
      "Teamwork under time pressure",
      "Managing deadlines while collaborating on art and music",
    ],
    image: "/malice-and-mercy.png",
    // video: "/Clips/MaliceAndMercy.mp4",
  },
  {
    title: "Space Looper",
    url: "https://emptyconsole.itch.io/space-looper",
    date: "August 2025",
    tag: "Games",
    description: (
      <>
        A{" "}
        <a
          href="https://itch.io/jam/gmtk-2025"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          GMTK Game Jam
        </a>{" "}
        strategy game created by Empty Console for the 4 day competition with 9,574 submissions. Players circle meteors with limited rope and energy, managing resources across 20 research centers. The game challenges players with precise movement mechanics and strategic resource allocation.
      </>
    ),
    learnings: [
      "Rapid prototyping",
      "Trying new solutions",
      "Collaboration under tight deadlines",
      "Iterative design and precise gameplay mechanics",
    ],
    image: "/space-looper.png",
    // video: "/Clips/SpaceLooper.mp4",
  },
  {
    title: "Bugged Out",
    url: "https://emptyconsole.itch.io/bugged-out",
    date: "September 2025",
    tag: "Games",
    description: (
      <>
        Created by Empty Console for the{" "}
        <a
          href="https://itch.io/jam/patch-notes-v-1-0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Patch Notes Game Jam
        </a>{" "}
        with the theme &apos;The Error is the Feature&apos; in a 3-day jam, placing 17th out of 474 entries. This platformer intentionally uses glitches as core gameplay mechanics, requiring players to use logic, memory, and reflexes to navigate levels.
      </>
    ),
    learnings: [
      "Building around a theme",
      "Iterative design and refining platformer feel",
      "Playtesting and incorporating user feedback",
      "Improving teamwork coordination",
    ],
    image: "/bugged-out.png",
    // video: "/Clips/BuggedOut.mp4",
  },
  {
    title: "Open Stage",
    url: "https://open-stage.vercel.app/signin",
    date: "October 2025",
    tag: "Apps",
    description: (
      <>
        A{" "}
        <a
          href="https://www.congressionalappchallenge.us/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Congressional App Challenge
        </a>{" "}
        project designed to help musicians earn more revenue via reduced upfront costs and real-time tipping. Empty Console collaborated with local SF Bay Area bands to develop a user-friendly UX and sustainable revenue model. The project placed third in district CA-15, one of the hardest and most competitive districts in the nation.
      </>
    ),
    learnings: [
      "Building a real product",
      "UX design and gathering real user feedback",
      "Addressing a problem",
      "Presenting solutions to judges",
      "Creating socially impactful technology",
    ],
    image: "/open-stage.png",
    // video: "/Clips/OpenStage.mp4",
  },
  {
    title: "Hackathon Digest",
    url: "https://github.com/ShyGuyGameDev/hackathon-digest",
    date: "August 2026",
    tag: "Apps",
    description: (
      <>
        Built using{" "}
        <a
          href="https://claude.com/product/claude-code?utm_source=google_brand&utm_campaign={campaign}&utm_medium=cpc&utm_content=823276214395&utm_term=anthropic%20code&targetid=kwd-2477510644317&gad_source=1&gad_campaignid=23948930353&gbraid=0AAAAAqwcL8m57bf3GmSHVfdt_9z5WVn93&gclid=CjwKCAjw2aPVBhBkEiwA0Cptt4LUDp0vtZE8uEClEOOQyLv5YSCh94XhSK_wKkbSZRxQxQOYKA1g3xoCRvQQAvD_BwE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Claude Routines
        </a>
        , Hackathon Digest is a fully automated tool that sends an email to ShyGuy's team every Wednesday. It finds an interesting high-school friendly hackathon, finds all of the data it can on it, then sends the email exactly at 7 AM. This was ShyGuy's first project that only consisted of a README, because it's all natural language AI automated.
      </>
    ),
    learnings: [
      "Fully automated",
      "Email send",
      "Hackathon finder"
    ],
    image: "/hackathon-digest.png",
    // video: "/Clips/OpenStage.mp4",
  },
  {
    title: "News Digest",
    url: "https://github.com/ShyGuyGameDev/NewsDigest",
    date: "September 2026",
    tag: "Apps",
    description: (
      <>
        Originally, News Digest started off as a tool for ShyGuy to stay on top of current events, though it quickly scaled up to more users when he opened it up to his school's debate team as well. It is a fully automated tool that sends an email to ShyGuy every Monday, Wednesday, and Friday at 6:45 AM, covering the most recent news in politics, technology, science, business, and more. All the other recipients are also BCCed on the same email. If you are interested in receiving the email, just ping ShyGuy on Discord and he'll add you to the list. Your email will never be displayed anywhere besides the supabase, where it is encrypted.
      </>
    ),
    learnings: [
      "Fully automated",
      "Email send",
      "News finder"
    ],
    image: "/news-digest.jpeg",
    featured: true,
    // video: "/Clips/OpenStage.mp4",
  },
  {
   title: "FTC Competition",
   url: "https://www.firstinspires.org/programs/ftc/",
   date: "February 2025",
   tag: "Robotics",
   description: (
     <>
	ShyGuy’s first time leading a large team was through his school’s competitive robotics program called the First Tech Challenge. On the team he joined, he quickly took a leadership role and learned many useful life skills like how to work on a team with varying engagement levels, how to deal with unexpected failures, and how to efficiently use limited resources.
     </>
   ),
   learnings: [
     "Leading a large team",
     "Dealing with unexpected failure",
     "Efficiently use limited resources",
     "Competitive robotics",
   ],
   image: "/ftc-competition.jpg",
  },
  {
    title: "Dimensional Rifter",
    url: "https://shyguygamedev.github.io/Dimensional-Rifter/",
    date: "March 2025",
    tag: "Games",
    description: (
      <>
        ShyGuy’s technical curiosity started by playing video games, and eventually learning how to build them. His first ever game was Dimensional Rifter, a simple platformer where the user has to get around obstacles by throwing their javelin at nodes capable of altering the environment around them. This game taught ShyGuy how to organize a project, design a product, and incorporate user feedback.
      </>
    ),
    learnings: [
      "Beginner game",
      "Organizing the project",
      "Designing a product",
      "Incorporating user feedback",
    ],
    image: "/dimensional-rifter.png",
  },
  {
    title: "Computer Vision Robot",
    url: "https://www.youtube.com/watch?v=y8NtMZ7VGmU",
    date: "April 2026",
    tag: "Robotics",
    description: (
      <>
        The next frontier of AI is spatial intelligence, which ShyGuy chose to explore by attempting to implement it in his own robot. After 6 months, ShyGuy was able to implement{" "}
        <a
          href="https://docs.ultralytics.com/models/yolo11#overview"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          YOLO11n
        </a>
        , a computer vision program able to distinguish objects and recognize what they are, into his project to create a robotic “dog” capable of moving towards a specified object.
      </>
    ),
    learnings: [
      "Spatial intelligence and computer vision",
      "Combining old technology with new technology",
      "Experimenting with new programs",
      "Combining premade tools with custom creations",
    ],
    image: "/computer-vision-robot.png",
    // image: "/HomeTopics/Design/future-city-model.png",
  },
  {
    title: "Future City",
    url: "https://futurecity.org/",
    date: "February 2026",
    tag: "Design",
    description: (
      <>
        {/* ShyGuy entered the Future City competition with 5 other students, and he came out learning so much more than he originally thought he would. Designing a city, writing an essay about it, and creating a model of it’s layout, taught ShyGuy how to put multiple proven concepts together to verify the possiblity of a futuristic technology, how to lead a team where everyone comes from a different background, and how to present complex topics simply. */}
        ShyGuy entered the{" "}
        <a
          href="https://futurecity.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Future City
        </a>{" "}
        competition with 5 other students, and came out learning so much more than he originally thought he would. Designing a city, writing an essay about it, and creating a model of its layout, taught ShyGuy how to put multiple proven concepts together to verify the possibility of a futuristic technology, how to lead a team where everyone comes from a different background, and how to present complex topics simply.
      </>
    ),
    learnings: [
      "Verifying the possibility of future technologies",
      "Bringing different fields together",
      "Presenting complex topics simply",
      "Designing for the future",
    ],
    image: "/HomeTopics/Design/future-city-model.png",
  },
  {
    title: "Cumberland Elementary",
    url: "https://cumberland.sesd.org/",
    date: "May 2026",
    tag: "Teaching",
    description: (
      <>
        {/* After meeting the lead of Cumberland Elementary’s after school robotics program and showing him his Computer Vision Dog, ShyGuy was invited to speak at one of the program’s weekly sessions. At this session, ShyGuy spoke about his robotics journey, how he built this robot, and answered questions from the students about their own projects. ShyGuy has always loved his mentors, and was incredibly thankful to Cumberland Elementary for the opportunity to help others like him. */}
        After meeting the{" "}
        <a
          href="https://www.linkedin.com/in/ahmedmakkawy/?isSelfProfile=false"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          lead of Cumberland Elementary’s after school robotics program
        </a>{" "}
        and showing him his computer vision robot, ShyGuy was invited to speak at one of the program’s weekly sessions. At this session, ShyGuy spoke about his robotics journey, how he built this robot, and answered questions from the students about their own projects. ShyGuy has always loved his mentors, and was incredibly thankful for the opportunity to help others like him.
      </>
    ),
    learnings: [
      "Speaking at a school",
      "Answering questions from students",
      "Helping others learn",
    ],
    image: "/HomeTopics/Teaching/cumberland-elementary-logo.png",
  },
  {
    title: "Berkeley Model United Nations",
    url: "https://www.bmun.org/",
    date: "November 2025",
    tag: "MUN",
    description: (
      <>
        {/* ShyGuy’s first MUN conference was BMUN, where ShyGuy was in a crisis commitee, meaning among other things, he represented a person, not a country. He was Nina Witkofsky, the communications director and acting deputy director of the CDC, in a commitee set in a future where a new virus is terorizing the world. ShyGuy won Outstanding at this conference, which is equivalent to 2nd place in the committee. */}
        ShyGuy’s first MUN conference was{" "}
        <a
          href="https://www.bmun.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          BMUN
        </a>
        , where ShyGuy was in a crisis committee, meaning among other things, he represented a person, not a country. He was Nina Witkofsky, the communications director and acting deputy director of the CDC, in a committee set in a future where a new virus is terrorizing the world. ShyGuy won Outstanding at this conference, which is equivalent to 2nd place in the committee.
      </>
    ),
    learnings: [
      "Representing the CDC",
      "Trying new experiences",
      "Representing an individual",
    ],
    image: "/berkeley-mun.png",
  },
  {
    title: "Nueva Model United Nations Conference",
    url: "https://sites.google.com/nuevaschool.org/nuevamunconference/conference",
    date: "February 2026",
    tag: "MUN",
    description: (
      <>
        In{" "}
        <a
          href="https://sites.google.com/nuevaschool.org/nuevamunconference/conference"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          NMUNC
        </a>
        , ShyGuy represented Poland in the{" "}
        <a
          href="https://european-union.europa.eu/index_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          EU
        </a>{" "}
        committee. The topic for the{" "}
        <a
          href="https://european-union.europa.eu/index_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          EU
        </a>{" "}
        was green energy and green technology. This was ShyGuy’s second conference with the format of general assembly, meaning he knew what to expect. Due to this, he decided to prepare a lot more than he had in the past, which turned out to be a good decision. During committee, he led discussions, was a key writer of his resolution, and used his influence to make important allies in the committee.
      </>
    ),
    learnings: [
      "Green energy and green technology",
      "Thorough preparation",
      "Leading committee",
      "Making allies",
    ],
    image: "/HomeTopics/MUN/nmunc-logo.png",
  },
  {
    title: "San Francisco Model United Nations",
    url: "https://www.sfmun.org/",
    date: "February 2026",
    tag: "MUN",
    description: (
      <>
        In the 2026 SFMUN, ShyGuy represented the Philippines in the{" "}
        <a
          href="https://www.unodc.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          United Nations Office on Drugs and Crime
        </a>
        . This year, the topic was narcoterrorism, which is a topic ShyGuy had never known much about. During his prep, he learned much more on how narcoterrorism works and how to fight it, as well as how the{" "}
        <a
          href="https://www.un.org/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          UN
        </a>{" "}
        is actually able to make changes in the real world.
      </>
    ),
    learnings: [
      "Fighting narcoterrorism",
      "Learning about new topics",
      "Preparing for committee",
    ],
    image: "/HomeTopics/MUN/sfmun-logo.png",
  },
  {
    title: "National High School Model United Nations",
    url: "https://imuna.org/nhsmun/nyc/?gad_source=1&gad_campaignid=1884743221&gbraid=0AAAAAC7vSIv-W5Ef_Z7M_5h1Tj3iuyig3&gclid=CjwKCAjw6f3RBhApEiwAMaCqWTTIVF6du7ZmKNgc5Itk6n6oitFqayIrLID7gEXqgkGnvTotXa7kzxoCDLgQAvD_BwE",
    date: "March 2026",
    tag: "MUN",
    description: (
      <>
        New York’s{" "}
        <a
          href="https://imuna.org/nhsmun/nyc/?gad_source=1&gad_campaignid=1884743221&gbraid=0AAAAAC7vSIv-W5Ef_Z7M_5h1Tj3iuyig3&gclid=CjwKCAjw6f3RBhApEiwAMaCqWTTIVF6du7ZmKNgc5Itk6n6oitFqayIrLID7gEXqgkGnvTotXa7kzxoCDLgQAvD_BwE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          NHSMUN
        </a>{" "}
        is the most prestigious pre-collegiate MUN conference in the world, and ShyGuy had the honor of attending as China in the{" "}
        <a
          href="https://www.un.org/digital-emerging-technologies/ai-advisory-body"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          High Level Advisory Body on Artificial Intelligence
        </a>{" "}
        committee. ShyGuy loved being in this conference, and found the topics of AI in education and a global AI fund very interesting to debate about with the other delegates. From this conference, he learned many critical MUN skills such as how to better engage audiences and how to easily propose plans in speeches.
      </>
    ),
    learnings: [
      "Speaking on AI",
      "AI in education and a global AI fund",
      "Engaging audiences",
      "Proposing plans during speeches",
    ],
    image: "/HomeTopics/MUN/nhsmun-logo.png",
  },
  {
    title: "Karen Keefer Novice Invitational",
    url: "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=37170",
    date: "November 2025",
    tag: "Debate",
    description: (
      <>
        Keefer was ShyGuy’s first parliamentary debate tournament, and it was also his only tournament without his current partner. In this tournament, ShyGuy learned how to use the debate organizing software called{" "}
        <a
          href="https://www.tabroom.com/index/index.mhtml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          tabroom
        </a>
        , structure of parli debate, how to prepare for a debate in extremely limited time, and how to shape a speech towards a specific audience. His final record for this tournament was 2-2.
      </>
    ),
    learnings: [
        "Navigating new sites",
 "Learning the structure of debate",
      "Preparing in limited time",
      "Knowing the audience",
    ],
    image: "/karen-keefer-invitational.png",
  },
  {
    title: "Evodyne Robotic Dog",
    url: "https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/",
    date: "June 2026",
    tag: "Robotics",
    description: (
      <>
        In April of 2026, ShyGuy built his first computer vision robotic “dog,” which was capable of seeing a specific object, identifying it, and moving towards it. Here, he wanted to build on that idea, this time with help. By learning through the{" "}
        <a
          href="https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Evodyne Robotics Genesis Course
        </a>
        , ShyGuy learned how to make his original robotic dog so much better, his favorite addition being realistic limbs instead of wheels.
      </>
    ),
    learnings: [
      "Spatial intelligence and computer vision",
      "Building on old projects",
      "Learning from courses",
      "Building realistic limbs",
    ],
    image: "/evodyne-robotic-dog.png",
    featured: true,
  },
  {
    title: "Tessellations Middle School Invitational",
    url: "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=39640",
    date: "April 2026",
    tag: "Debate",
    description: (
      <>
        ShyGuy’s second debate tournament, but his first with his future partner, ended in a record of 3-1, making it the first time Shaayer broke. At this tournament, ShyGuy learned how to work with his partner, stay confident even with complex topics, how to explain his ideas to his partner, and more.
      </>
    ),
    learnings: [
      "Working with a new partner",
      "Staying confident in hard times",
      "Explaining ideas",
    ],
    image: "/tessellations-invitational.png",
  },
  {
    title: "Georgiana Hays Invitational",
    url: "https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=39687#:~:text=The%20Hays%20Invitational%20will%20be,DI%2C%20Impromptu%20and%20Original%20Oratory.",
    date: "May 2026",
    tag: "Debate",
    description: (
      <>
        ShyGuy ended his second tournament with his debate partner with a 5-0 record, meaning they won 1st place in their division, novice parli debate. Post-debate, the judges said ShyGuy spoke confidently, was able to explain the logic behind his arguments, and was always able to address all of his opponent’s points. However, he was told that his arguments could benefit from more concrete evidence from studies, as most were rooted in logic instead of scientifically proven facts.
      </>
    ),
    learnings: [
      "Speaking confidently",
      "Explaining logic in arguments",
      "Addressing opponent points",
      "Finding proven evidence",
    ],
    image: "/georgiana-hays-invitational.png",
    featured: true,
  },
]

const sortedProjects = [...completedProjects].sort(compareByProjectTagThenDateThenTitle)

function projectMatchesSearch(
  project: (typeof completedProjects)[number],
  searchQuery: string,
) {
  const haystack = [
    project.title,
    project.date,
    project.tag ?? "",
    ...project.learnings,
    getNodeText(project.description),
  ].join(" ")
  return matchesSearch(haystack, searchQuery)
}

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

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
    <div
      id={id}
      className={`scroll-mt-24 flex items-center gap-4 mb-4 ${className ?? ""}`}
    >
      <hr className="flex-1 border-0 border-t-2 border-border" />
      <span className="shrink-0 text-sm font-semibold text-primary">
        {label}
      </span>
      <hr className="flex-1 border-0 border-t-2 border-border" />
    </div>
  )
}

const CARDS_PER_ROW = 3

type PlacedProject = {
  project: (typeof completedProjects)[number]
  row: number
  column: number
  /** A trailing pair is nudged right by half a column so the row reads centered. */
  centered: boolean
}

function placeProjects(projects: typeof completedProjects): PlacedProject[][] {
  const fullRows = Math.floor(projects.length / CARDS_PER_ROW)
  const leftover = projects.length % CARDS_PER_ROW
  const columns: PlacedProject[][] = Array.from({ length: CARDS_PER_ROW }, () => [])

  projects.forEach((project, index) => {
    const row = Math.floor(index / CARDS_PER_ROW)
    const positionInRow = index % CARDS_PER_ROW
    const isLeftoverRow = row === fullRows
    const column = isLeftoverRow && leftover === 1 ? 1 : positionInRow
    columns[column].push({
      project,
      row,
      column,
      centered: isLeftoverRow && leftover === 2,
    })
  })

  return columns
}

function ProjectRows({
  projects,
  keyPrefix = "",
}: {
  projects: typeof completedProjects
  keyPrefix?: string
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [expandedTitles, setExpandedTitles] = useState<string[]>([])
  const [rowHeights, setRowHeights] = useState<number[]>([])
  const projectKey = projects.map((project) => project.title).join("|")
  const rowCount = Math.ceil(projects.length / CARDS_PER_ROW)

  const columns = useMemo(() => placeProjects(projects), [projects])

  useIsomorphicLayoutEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const measure = () => {
      const slots = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-project-slot]"),
      )
      const expandedRows = new Set(
        slots
          .filter((slot) => slot.dataset.expanded === "true")
          .map((slot) => Number(slot.dataset.row)),
      )
      const collapsed = slots.filter(
        (slot) =>
          slot.dataset.expanded !== "true" &&
          !expandedRows.has(Number(slot.dataset.row)),
      )

      // Drop the shared height before reading so a row can shrink again.
      const applied = collapsed.map((slot) => slot.style.height)
      collapsed.forEach((slot) => {
        slot.style.height = ""
      })
      const measured = new Map<number, number>()
      collapsed.forEach((slot) => {
        const row = Number(slot.dataset.row)
        const height = slot.getBoundingClientRect().height
        measured.set(row, Math.max(measured.get(row) ?? 0, height))
      })
      collapsed.forEach((slot, index) => {
        slot.style.height = applied[index]
      })

      setRowHeights((current) => {
        const next = current.slice(0, rowCount)
        measured.forEach((height, row) => {
          next[row] = height
        })
        const unchanged =
          next.length === current.length &&
          next.every((height, index) => height === current[index])
        return unchanged ? current : next
      })
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(grid)
    window.addEventListener("resize", measure)
    // Late-loading fonts change how much room the text needs.
    document.fonts?.ready.then(measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [projectKey, rowCount, expandedTitles])

  return (
    <div ref={gridRef} className="flex items-start justify-center gap-4">
      {columns.map((column, columnIndex) => (
        <div
          key={`${keyPrefix}column-${columnIndex}`}
          className="flex w-[calc((100%-2rem)/3)] min-w-0 flex-col gap-4"
        >
          {column.map(({ project, row, centered }) => {
            const expanded = expandedTitles.includes(project.title)
            const collapsedHeight = rowHeights[row]
            return (
              <div
                key={`${keyPrefix}${project.title}`}
                data-project-slot
                data-row={row}
                data-expanded={expanded ? "true" : "false"}
                className="flex w-full"
                style={{
                  ...(centered
                    ? { transform: "translateX(calc(50% + 0.5rem))" }
                    : null),
                  ...(!expanded && collapsedHeight
                    ? { height: collapsedHeight }
                    : null),
                }}
              >
                <ProjectCard
                  {...project}
                  expanded={expanded}
                  onToggleExpanded={() => {
                    setExpandedTitles((current) =>
                      current.includes(project.title)
                        ? current.filter((title) => title !== project.title)
                        : [...current, project.title],
                    )
                  }}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  useHashScroll()

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      if (
        selectedTopics.length > 0 &&
        !selectedTopics.includes(project.tag ?? "")
      ) {
        return false
      }

      return projectMatchesSearch(project, searchQuery)
    })
  }, [searchQuery, selectedTopics])

  const featuredProjects = useMemo(() => {
    return completedProjects
      .filter((project) => "featured" in project && project.featured)
      .sort(compareByDateThenTitle)
  }, [])

  const groupedProjects = useMemo(() => {
    const groups: { tag: string; projects: typeof filteredProjects }[] = []
    for (const project of filteredProjects) {
      const tag = project.tag ?? "Other"
      const last = groups[groups.length - 1]
      if (!last || last.tag !== tag) {
        groups.push({ tag, projects: [project] })
      } else {
        last.projects.push(project)
      }
    }
    return groups
  }, [filteredProjects])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredProjects])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-[64px] md:py-[100px] pt-[132px] md:pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-8">
            Projects
          </h2>
          <div className="animate-on-scroll opacity-0 animate-delay-200">
            <SearchFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search projects..."
              selectedTopics={selectedTopics}
              onTopicsChange={setSelectedTopics}
              topics={PROJECT_TAG_ORDER}
            />
          </div>
        </div>

        <div id="completed-projects" className="scroll-mt-20">
          {featuredProjects.length > 0 ? (
            <div className="mb-4">
              <SectionHeading
                id={tagToSlug(FEATURED_SECTION_LABEL)}
                label={FEATURED_SECTION_LABEL}
              />
              <ProjectRows projects={featuredProjects} keyPrefix="featured-" />
            </div>
          ) : null}

          {groupedProjects.length > 0 ? (
            groupedProjects.map((group, groupIndex) => (
              <div key={group.tag} className="mb-4">
                <SectionHeading
                  id={tagToSlug(group.tag)}
                  label={group.tag}
                  className={groupIndex === 0 && featuredProjects.length === 0 ? "mt-0" : "mt-4"}
                />
                <ProjectRows projects={group.projects} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              {searchQuery.trim()
                ? `No projects match "${searchQuery.trim()}".`
                : selectedTopics.length > 0
                  ? "No projects match the selected topics."
                  : "No projects yet. Check back soon!"}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
