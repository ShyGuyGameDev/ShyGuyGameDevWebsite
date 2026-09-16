/**
 * ProjectsSection: the entire body of the Projects page.
 *
 * What it renders, top to bottom:
 *   1. a heading and a search + topic filter bar,
 *   2. a "Featured Currently" group containing every project marked `featured: true`,
 *   3. then one group per topic tag, in the order listed by PROJECT_TAG_ORDER in src/lib/utils.ts
 *      (Apps, Robotics, Design, MUN, Debate, Games, Teaching),
 *   4. or a friendly "nothing matched" message when the search or filters exclude everything.
 *
 * Each group is drawn by <ExpandableCardRows>, which lays the cards out three per row, matches the
 * heights of the cards within a row, and lets a card expand when clicked. Each card itself is a
 * <ProjectCard>.
 *
 * Key ideas a learner should notice in this file:
 *  - All the project content lives in one plain JavaScript array at the top of the file. There is no
 *    database and no CMS: adding a project means adding an object to that array.
 *  - The `description` fields store real JSX (prose with <a> links) inside that data array, which is
 *    possible because JSX is just a value in JavaScript, like a string or a number.
 *  - Derived types: `(typeof completedProjects)[number]` asks TypeScript to infer the type of one
 *    element of the array, so the helpers stay in sync automatically when the data changes.
 *  - `useMemo` is used three times to avoid redoing filtering, sorting and grouping on every render.
 *  - An IntersectionObserver adds the fade-in animation as sections scroll into view.
 */

// Client Component: this file uses `useState`, `useMemo`, `useEffect` and a ref, none of which can
// run during server rendering. See the same note at the top of expandable-card-rows.tsx.
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
// The generic three-per-row grid that owns expansion and height-matching.
import { ExpandableCardRows } from "@/components/expandable-card-rows"
// The visual card for a single project.
import { ProjectCard } from "@/components/project-card"
// The search box plus topic chips shown above the groups.
import { SearchFilterBar } from "@/components/search-filter-bar"
// A custom hook that scrolls to the right section when the URL ends in something like #mun.
import { useHashScroll } from "@/hooks/use-hash-scroll"
// Shared helpers, all defined in src/lib/utils.ts:
//   compareByDateThenTitle                  - newest first, then A-Z by title
//   compareByProjectTagThenDateThenTitle    - group by tag order first, then date, then title
//   FEATURED_SECTION_LABEL                  - the string "Featured Currently"
//   getNodeText                             - pulls the plain text back out of a JSX description
//   matchesSearch                           - true when every word of the query appears in the text
//   PROJECT_TAG_ORDER                       - the canonical order the topic groups appear in
//   tagToSlug                               - "Media Mention" -> "media-mention", for anchor ids
import { compareByDateThenTitle, compareByProjectTagThenDateThenTitle, FEATURED_SECTION_LABEL, getNodeText, matchesSearch, PROJECT_TAG_ORDER, tagToSlug } from "@/lib/utils"

/**
 * THE PROJECT DATA.
 *
 * This is the single source of truth for the Projects page: one object per project, written in the
 * order they happened to be added (the code sorts them later, so this order does not matter).
 *
 * The shape of one entry:
 *   title       string   - shown as the card's heading, and used as the React key, so it must be
 *                          unique across the whole array. Also searched.
 *   url         string   - optional. When present, the screenshot and the title become links that
 *                          open in a new tab. Leave it out for a project with nothing to link to.
 *   date        string   - a human-readable "Month Year". It is fed to `new Date(...)` by the sort
 *                          helpers, so it must stay parseable. Also searched and displayed.
 *   tag         string   - which group the project lands in. Use one of the tags in
 *                          PROJECT_TAG_ORDER; anything else sorts to the end under "Other".
 *                          It also picks the pill colour via `getTagColorClasses`.
 *   description JSX      - a fragment (`<>...</>`) of prose, sometimes containing <a> links styled
 *                          with `text-accent hover:underline`. Storing JSX rather than a plain
 *                          string is what allows those links. Because it is JSX and not text,
 *                          `getNodeText` is needed to make it searchable.
 *   learnings   string[] - the "Key Learnings" bullets on the card. Also searched.
 *   image       string   - a path inside the `public/` folder, so "/open-stage.png" means the file
 *                          public/open-stage.png. Omit it and the card shows a "coming soon"
 *                          placeholder instead.
 *   featured    boolean  - optional. When true the project ALSO appears in the "Featured Currently"
 *                          group at the top of the page, in addition to its normal tag group.
 *
 * Lines that look like `// video: "/Clips/....mp4"` are switched-off leftovers from the hover-video
 * experiment still sitting commented out in project-card.tsx. Leave them alone.
 *
 * WRITING TIP: inside a `description` fragment, an ordinary code comment (`//`) would be printed on
 * the page as literal text. Comments there must use the `{/* ... *\/}` form instead.
 */
const completedProjects = [
  // Games: a p5.js platformer by Empty Console that won Honorable Mention at the p5Play game jam.
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
  // Games: the Empty Console entry for the 4-day GMTK Game Jam, a rope-and-energy strategy game.
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
  // Games: Patch Notes Game Jam platformer built around glitches, 17th of 474 entries.
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
  // Apps: the Congressional App Challenge tipping platform for musicians, 3rd in district CA-15.
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
  // Apps: a Claude Routines automation that emails the team a hackathon every Wednesday at 7 AM.
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
  // Apps: the thrice-weekly automated news email, now shared with the debate team. Marked featured,
  // so it also shows up in the "Featured Currently" group at the top of the page.
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
  // Robotics: leading a First Tech Challenge team at school. Note that this entry's inner lines are
  // indented with 3 spaces instead of 4 - it is only cosmetic, and it is left as-is on purpose.
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
  // Games: ShyGuy's very first game, a javelin-throwing platformer.
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
  // Robotics: a robotic "dog" that uses the YOLO11n vision model to find and walk to an object.
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
  // Design: the Future City competition - essay, city design and a physical model, with 5 others.
  // Its description keeps an older draft of the prose inside a {/* ... */} JSX comment.
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
  // Teaching: speaking about the computer vision robot at an elementary after-school robotics club.
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
  // MUN: first conference, a crisis committee at BMUN, awarded Outstanding (second place).
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
  // MUN: NMUNC, representing Poland in the EU committee on green energy.
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
  // MUN: SFMUN, representing the Philippines in the UNODC on narcoterrorism.
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
  // MUN: NHSMUN in New York, representing China on the UN's AI advisory body.
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
  // Debate: the first parliamentary debate tournament, finishing 2-2. Its `learnings` array has
  // ragged indentation on the first two bullets; that is left untouched deliberately.
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
  // Robotics: rebuilding the robotic dog with real limbs via the Evodyne Genesis course. Featured.
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
  // Debate: first tournament with a regular partner, a 3-1 record and a first break.
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
  // Debate: a 5-0 record and 1st place in novice parli. Featured.
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

// Sort the projects once, when the module first loads, rather than on every render.
// `[...completedProjects]` makes a COPY first, because `.sort()` rearranges the array in place and
// mutating the original data array would be a nasty surprise for anything else reading it.
// The comparator orders by tag (following PROJECT_TAG_ORDER), then newest date, then title A-Z,
// which is exactly the reading order the page wants.
const sortedProjects = [...completedProjects].sort(compareByProjectTagThenDateThenTitle)

// Does one project match what the user typed in the search box?
function projectMatchesSearch(
  // A DERIVED TYPE. `typeof completedProjects` is the inferred type of the whole array, and
  // `[number]` means "the type you get when you index it with a number" - that is, one element.
  // Writing it this way means the type updates automatically whenever the data array changes; you
  // never have to hand-maintain a separate `interface Project`.
  project: (typeof completedProjects)[number],
  searchQuery: string,
) {
  // Build one big "haystack" string holding every searchable piece of the project.
  const haystack = [
    project.title,
    project.date,
    // `?? ""` substitutes an empty string when there is no tag, so `.join` cannot print "undefined".
    project.tag ?? "",
    // The spread operator drops all the learning strings in as separate array elements.
    ...project.learnings,
    // The description is JSX, not text, so `getNodeText` walks the element tree and pulls out the
    // readable words - including the text inside the <a> links.
    getNodeText(project.description),
  ].join(" ")
  // True when every whitespace-separated word of the query appears somewhere in the haystack.
  return matchesSearch(haystack, searchQuery)
}

// A small private component: the group label with a horizontal rule running out to each side.
// It is declared in this file and not exported, because nothing else needs it.
function SectionHeading({
  id,
  label,
  className,
}: {
  // The HTML id doubles as the anchor target, so /projects#mun can jump straight here.
  id: string
  label: string
  className?: string
}) {
  return (
    // A template literal builds the class string. `scroll-mt-24` adds a top margin that only
    // applies when the browser scrolls to this anchor, so the sticky header does not cover it.
    // `${className ?? ""}` appends the caller's extra classes, or nothing when none were given.
    <div
      id={id}
      className={`scroll-mt-24 flex items-center gap-4 mb-4 ${className ?? ""}`}
    >
      {/* Two <hr> rules with `flex-1` share the leftover width equally, which centres the label
          between them no matter how long the label is. */}
      <hr className="flex-1 border-0 border-t-2 border-border" />
      {/* `shrink-0` keeps the label at its natural width instead of letting flexbox squash it. */}
      <span className="shrink-0 text-sm font-semibold text-primary">
        {label}
      </span>
      <hr className="flex-1 border-0 border-t-2 border-border" />
    </div>
  )
}

// A thin wrapper that plugs project data into the generic grid, so the page body below does not
// have to repeat the same five props for every group.
function ProjectRows({
  projects,
  keyPrefix = "",
}: {
  // `typeof completedProjects` here means "an array shaped like the data array" - note there is no
  // `[number]`, so this is the whole array type rather than a single element.
  projects: typeof completedProjects
  keyPrefix?: string
}) {
  return (
    <ExpandableCardRows
      items={projects}
      // Titles are unique across the data array, so they make a fine key.
      getItemKey={(project) => project.title}
      // Keeps keys distinct when a project appears in two grids at once - a featured project is
      // rendered both in "Featured Currently" and in its own tag group.
      keyPrefix={keyPrefix}
      // The render prop: ExpandableCardRows calls this once per card, handing back the item plus
      // the expansion state it is managing.
      renderCard={(project, expanded, onToggleExpanded) => (
        // `{...project}` is JSX spread: it passes every field of the object (title, description,
        // learnings, image, url, date, tag) as an individual prop, saving a lot of typing.
        <ProjectCard
          {...project}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
        />
      )}
    />
  )
}

// The exported component. The page at src/app/projects (or wherever it is used) renders just this.
export function ProjectsSection() {
  // A handle on the outer <section> element, used further down to find the elements that should
  // fade in as they scroll into view.
  const sectionRef = useRef<HTMLElement>(null)
  // What the user has typed into the search box. The empty string means "no search".
  const [searchQuery, setSearchQuery] = useState("")
  // Which topic chips are switched on. An empty array means "no filter, show every topic".
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  // A custom hook (src/hooks/use-hash-scroll.ts). Custom hooks are just functions whose names start
  // with "use" and which may call other hooks; this one scrolls to the section named in the URL
  // hash, for example /projects#games. It returns nothing - it exists purely for its side effect.
  useHashScroll()

  // Apply the topic filter and the search box to the pre-sorted list.
  // `useMemo` caches the resulting array and only recomputes when the search text or the selected
  // topics change, so typing one letter does not redo the work for unrelated re-renders.
  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      // With at least one chip selected, drop anything whose tag is not among them.
      // When nothing is selected the first half of the `&&` is false, so no filtering happens.
      if (
        selectedTopics.length > 0 &&
        !selectedTopics.includes(project.tag ?? "")
      ) {
        return false
      }

      // Survived the topic filter, so the search text decides. Returning true keeps the project.
      return projectMatchesSearch(project, searchQuery)
    })
    // The DEPENDENCY ARRAY. React re-runs the function above only when one of these changes.
  }, [searchQuery, selectedTopics])

  // The "Featured Currently" list. Note it starts from `completedProjects`, not the filtered list,
  // so the featured group deliberately ignores the search box and the topic chips.
  const featuredProjects = useMemo(() => {
    return completedProjects
      // `"featured" in project` checks the key exists before reading it, which also tells
      // TypeScript the property is safe to access - most entries do not have it at all.
      .filter((project) => "featured" in project && project.featured)
      // Newest first, ties broken A-Z. Sorting in place is safe here because `.filter` already
      // handed back a brand-new array.
      .sort(compareByDateThenTitle)
    // An EMPTY dependency array means "compute this once and never again", which is right because
    // nothing it reads can change while the page is open.
  }, [])

  // Chop the filtered list into consecutive runs that share a tag, ready to render one heading per
  // group. This works only because `sortedProjects` already put same-tag projects next to each
  // other, so a single pass is enough - no need to build a lookup object.
  const groupedProjects = useMemo(() => {
    // An explicit type annotation, since TypeScript cannot guess the shape of an empty array.
    const groups: { tag: string; projects: typeof filteredProjects }[] = []
    for (const project of filteredProjects) {
      // Untagged projects fall into a group literally called "Other".
      const tag = project.tag ?? "Other"
      // The group currently being filled, or undefined on the very first pass.
      const last = groups[groups.length - 1]
      // New tag (or no group yet) means start a fresh group...
      if (!last || last.tag !== tag) {
        groups.push({ tag, projects: [project] })
      } else {
        // ...otherwise keep adding to the group already open.
        last.projects.push(project)
      }
    }
    return groups
  }, [filteredProjects])

  // The scroll-triggered fade-in animation.
  // `useEffect` runs AFTER React has painted, which is the right choice here: unlike the height
  // measuring in expandable-card-rows.tsx, nothing visible depends on this happening before paint.
  useEffect(() => {
    // An `IntersectionObserver` tells you when an element enters or leaves the viewport, without
    // the performance cost of listening to every scroll event yourself.
    const observer = new IntersectionObserver(
      // The callback receives every element whose visibility just changed.
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adding the class starts the CSS animation. Note it is never removed, so each element
            // animates once and then stays visible.
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      // Fire once 10% of the element is on screen, rather than waiting for a single pixel.
      { threshold: 0.1 },
    )

    // `?.` (optional chaining) short-circuits to undefined if the ref is not attached yet, instead
    // of throwing. Every element marked `animate-on-scroll` starts at `opacity-0` and fades in.
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    // Cleanup: stop watching when the effect re-runs or the component unmounts.
    return () => observer.disconnect()
    // Re-run after filtering, because filtering swaps in different elements to watch.
  }, [filteredProjects])

  return (
    // The page section. `ref={sectionRef}` is what lets the effect above search inside it.
    // `relative` anchors the absolutely positioned background blobs; `overflow-hidden` clips them.
    // The `md:` prefixes are Tailwind's responsive variants: those values apply from medium screens
    // up, and the unprefixed ones are the mobile defaults.
    <section ref={sectionRef} className="relative overflow-hidden py-[64px] md:py-[100px] pt-[132px] md:pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      {/* Three big blurred circles behind the content, purely decorative. `inset-0` pins this layer
          to all four edges of the section, and `zIndex: 1` keeps it beneath the text. */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {/* `bg-accent/10` is the accent colour at 10% opacity; `blur-3xl` is what turns each circle
            into a soft glow. Negative offsets like `-left-1/4` push them partly off-screen. */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        {/* Centred by putting its top-left at the middle, then pulling it back by half its own
            width and height with the two `-translate` classes. */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      {/* The real content. `z-10` floats it above the blobs, `max-w-[1100px] mx-auto` centres a
          fixed-width column, and `px-6` keeps text off the screen edges on phones. */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-8">
          {/* `animate-on-scroll opacity-0` is the pair the IntersectionObserver looks for: the
              element starts invisible and the observer adds the class that fades it in. */}
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-8">
            Projects
          </h2>
          {/* `animate-delay-200` staggers this fade slightly after the heading's. */}
          <div className="animate-on-scroll opacity-0 animate-delay-200">
            {/* The search box and topic chips. This is a CONTROLLED component: it does not keep its
                own state, it renders whatever `searchQuery`/`selectedTopics` say and calls the
                setters when the user interacts. Passing `setSearchQuery` straight through works
                because a `useState` setter is already a function taking the new value.
                `topics={PROJECT_TAG_ORDER}` makes the chips match the group order on the page. */}
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

        {/* Another named anchor, so links to /projects#completed-projects land here. */}
        <div id="completed-projects" className="scroll-mt-20">
          {/* The "Featured Currently" group, shown only when at least one project is featured.
              Ending the ternary with `null` renders nothing at all in the other case. */}
          {featuredProjects.length > 0 ? (
            <div className="mb-4">
              {/* `tagToSlug` turns "Featured Currently" into "featured-currently" for the id, so
                  the side navigation can link to /projects#featured-currently. */}
              <SectionHeading
                id={tagToSlug(FEATURED_SECTION_LABEL)}
                label={FEATURED_SECTION_LABEL}
              />
              {/* The prefix matters: these same projects also appear in their own tag group below,
                  and two grids on one page must not generate identical React keys. */}
              <ProjectRows projects={featuredProjects} keyPrefix="featured-" />
            </div>
          ) : null}

          {/* One heading plus one grid per tag group - or the fallback message if nothing matched */}
          {groupedProjects.length > 0 ? (
            // `.map` receives the group and its position; `groupIndex` is only used to decide the
            // top margin of the very first heading.
            groupedProjects.map((group, groupIndex) => (
              // The tag is unique per group, so it works as the key.
              <div key={group.tag} className="mb-4">
                {/* If this is the first heading on the page AND there is no featured group above
                    it, remove the top margin so it does not float too far from the search bar. */}
                <SectionHeading
                  id={tagToSlug(group.tag)}
                  label={group.tag}
                  className={groupIndex === 0 && featuredProjects.length === 0 ? "mt-0" : "mt-4"}
                />
                {/* No `keyPrefix` here: these grids hold each project only once. */}
                <ProjectRows projects={group.projects} />
              </div>
            ))
          ) : (
            // The empty state. Nested ternaries pick the most helpful wording: blame the search
            // text first, then the topic chips, and only otherwise assume the data is genuinely
            // empty. `.trim()` ignores a query of nothing but spaces.
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
