"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type React from "react"
import { ProjectCard } from "@/components/project-card"
import { SearchBar } from "@/components/search-bar"
import { getNodeText, matchesSearch } from "@/lib/utils"

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
    image: "/malice_and_mercy-Picsart-AiImageEnhancer.png",
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
    image: "/Untitled_presentation_1-Picsart-AiImageEnhancer.png",
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
    image: "/buggedout.png",
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
    image: "/openstage.png",
    // video: "/Clips/OpenStage.mp4",
  },
  {
   title: "First Tech Challenge",
   url: "https://www.firstinspires.org/programs/ftc/",
   date: "February 2025",
   tag: "Robotics",
   description: (
     <>
	ShyGuy’s first time leading a large team was through his school’s competitive robotics program. On the team he joined, he quickly took a leadership role and learned many useful life skills like how to work on a team with varying engagement levels, how to deal with unexpected failures, and how to efficiently use limited resources.
     </>
   ),
   learnings: [
     "Leading a large team",
     "Dealing with unexpected failure",
     "Efficiently use limited resources",
     "Competitive robotics",
   ],
   image: "/FTCPosts.jpg",
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
    image: "/Dimensional Rifter.png",
  },
  {
    title: "Computer Vision Robot",
    //url: "https://shyguygamedev.github.io/Dimensional-Rifter/",
    date: "April 2026",
    tag: "Robotics",
    description: (
      <>
        The next frontier of AI is spatial intelligence, which ShyGuy chose to explore by attempting to implement it in his own robot. After 6 months, ShyGuy was able to implement YOLO11n, a computer vision program able to distinguish objects and recognize what they are, into his project to create a robotic “dog” capable of moving towards a specified object whenever it sees it.
      </>
    ),
    learnings: [
      "Spatial intelligence and computer vision",
      "Combining old technology with new technology",
      "Experimenting with new programs",
      "Combining premade tools with custom creations",
    ],
    image: "/Screenshot 2026-06-26 at 4.19.34 PM.png",
    // image: "/futurecity.png",
  },
  {
    title: "Future City",
    url: "",
    date: "February 2026",
    tag: "Miscellaneous",
    description: (
      <>
        ShyGuy entered the Future City competition with 5 other students, and he came out learning so much more than he originally thought he would. Designing a city, writing an essay about it, and creating a model of it’s layout, taught ShyGuy how to put multiple proven concepts together to verify the possiblity of a futuristic technology, how to lead a team where everyone comes from a different background, and how to present complex topics simply.
      </>
    ),
    learnings: [
      "Verifying the possiblity of future technologies",
      "Bringing different fields together",
      "Presenting complex topics simply",
      "Designing for the future",
    ],
    image: "/futurecity.png",
  },
  {
    title: "Cumberland Elementary",
    url: "",
    date: "May 2026",
    tag: "Teaching",
    description: (
      <>
        After meeting the lead of Cumberland Elementary’s after school robotics program and showing him his Computer Vision Dog, ShyGuy was invited to speak at one of the program’s weekly sessions. At this session, ShyGuy spoke about his robotics journey, how he built this robot, and answered questions from the students about their own projects. ShyGuy has always loved his mentors, and was incredibly thankful to Cumberland Elementary for the opportunity to help others like him.
      </>
    ),
    learnings: [
      "Speaking at a school",
      "Answering questions from students",
      "Helping others learn",
    ],
    image: "/HomeTopics/Teaching/A.png",
  },
  {
    title: "Berkeley Model United Nations",
    url: "",
    date: "November 2025",
    tag: "MUN",
    description: (
      <>
        ShyGuy’s first MUN conference was BMUN, where ShyGuy was in a crisis commitee, meaning among other things, he represented a person, not a country. He was Nina Witkofsky, the communications director and acting deputy director of the CDC, in a commitee set in a future where a new virus is terorizing the world. ShyGuy won Outstanding at this conference, which is equivalent to 2nd place in the committee.
      </>
    ),
    learnings: [
      "Representing the CDC",
      "Trying new experiences",
      "Representing an individual",
    ],
    image: "/HomeTopics/MUN/download (6).png",
  },
  {
    title: "Nueva Model United Nations Conference",
    url: "",
    date: "February 2026",
    tag: "MUN",
    description: (
      <>
        In NMUNC, ShyGuy represented Poland in the EU committee. The topic for the EU was green energy and green technology. This was ShyGuy’s second conference with the format of general assembly, meaning he knew what to expect. Due to this, he decided to prepare a lot more than he had in the past, which turned out to be a good decision. During committee, he lead discussions, was a key writer of his resolution, and used his influence to make important allies in the committee.
      </>
    ),
    learnings: [
      "Green energy and green technology",
      "Thorough preparation",
      "Leading committee",
      "Making allies",
    ],
    image: "/HomeTopics/MUN/Screenshot 2026-06-11 at 7.57.46 PM.png",
  },
 
 
 
  
  
 
 
]

// Sort newest first so the most recent project is top-left and the
// earliest ends up farthest down and farthest to the right.
const sortedProjects = [...completedProjects].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
)

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter((project) => {
      const haystack = [
        project.title,
        project.date,
        project.tag ?? "",
        ...project.learnings,
        getNodeText(project.description),
      ].join(" ")
      return matchesSearch(haystack, searchQuery)
    })
  }, [searchQuery])

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
    <section ref={sectionRef} className="relative overflow-hidden py-[100px] pt-[172px] bg-background">
      {/* Abstract gradient background overlay */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent-light/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl" />
      </div>
      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll opacity-0 text-4xl md:text-[32px] font-semibold text-primary mb-8">
            Projects
          </h2>
          <div className="animate-on-scroll opacity-0 animate-delay-200">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search projects..."
            />
          </div>
        </div>

        {/* Completed Projects */}
        <div id="completed-projects" className="scroll-mt-20">
          {/* <h3 className="animate-on-scroll opacity-0 text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
            Completed Projects
          </h3> */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.title}
                  className="animate-on-scroll opacity-0"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              {searchQuery.trim()
                ? `No projects match "${searchQuery.trim()}".`
                : "No projects yet. Check back soon!"}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
