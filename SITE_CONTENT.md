# ShyGuy site content

Captured September 27, 2026 from the live copy in this repo. This file is the content backup for the UI/UX rebuild. If the pages and components are deleted, the words, links, dates, and facts below are still here.

Content is not in a CMS. It is hardcoded in the section components listed under each heading. The live site is [https://shy-guy-game-dev-website.vercel.app](https://shy-guy-game-dev-website.vercel.app).

The site is written in the third person and uses the handle **ShyGuy**. One debate entry uses the name Shaayer; that is recorded where it appears.

---

## Who ShyGuy is

ShyGuy is a high-school student developer. He started by making video games, taught himself how they work, and has since branched into apps, robotics and computer vision, competitive debate, Model United Nations, and teaching younger students.

The handle is a reference to the Mario character Shy Guy. It is the name on his games, his writing, and his Discord.

He cofounded **Empty Console** with HF_ang and Emey. They began by making games together and now compete in hackathons and ship products. Within Empty Console, ShyGuy leads marketing, communications, and product positioning, and contributes to development.

His work is organized into seven topics: **Games, Apps, Robotics, MUN, Debate, Teaching, and Design.**

He writes at [shyguygamedev.substack.com](https://shyguygamedev.substack.com).

---

## Site-wide chrome

### Metadata

Used for the browser tab, search results, and link previews (Open Graph and Twitter).

- **Title / site name:** ShyGuy
- **Description:** Student developer building games, apps, and robotics, speaking at debate tournaments, leading model United Nations conferences, teaching other students, and building his own startup.
- **Favicon and preview image:** `/shyguy-gamedev-logo.png` (alt: "ShyGuy Game Dev logo", 576×576)
- **Language:** English
- **Font:** Inter

### Navigation

Fixed header on every page. Logo image plus the word **ShyGuy**, linking home. Logo alt text is "Empty Console Logo".

| Label | URL | Dropdown sections |
| --- | --- | --- |
| Home | `/` | none |
| Projects | `/projects` | Featured Currently, Apps, Robotics, Design, MUN, Debate, Games, Teaching |
| Posts & Media Mentions | `/posts` | Media Mention, Post |
| Empty Console | `/team` | none |

Clicking the link for the page you are already on scrolls to the top. Section links jump to anchors such as `/projects#games` and `/posts#media-mention`.

### Footer

Left: logo plus **ShyGuy**. Right:

- Email: [shyguygamedev@gmail.com](mailto:shyguygamedev@gmail.com)
- Discord: `shyguygamedev` (plain text, not a link)

A commented-out line, not shown: "© 2025 Empty Console".

### Other contact (from the README, not all shown in the UI)

- Substack: [https://shyguygamedev.substack.com](https://shyguygamedev.substack.com)
- GitHub: [https://github.com/ShyGuyGameDev](https://github.com/ShyGuyGameDev)
- Empty Console site: [https://www.emptyconsole.com/](https://www.emptyconsole.com/)
- HF_ang Discord: `hfanggamedev`
- Emey Discord: `qorachniuphorbia`

News Digest goes out Monday, Wednesday, and Friday at 6:45 AM. To join, ping ShyGuy on Discord. Addresses are stored encrypted in Supabase and are not displayed on the site. Other recipients are BCC'd.

### 404 page

- **404**
- **Page Not Found**
- The page you're looking for doesn't exist or has been moved.
- Button: **Return Home** (links to `/`)

---

## Home (`/`)

Order on the page: hero, divider, achievements, divider, topic switcher. A song-quote band used to sit under that and is currently turned off.

### Hero

- **Headline:** Meet ShyGuy
- **Body:** He is a student developer building games, apps, and robots; speaking at debate tournaments; leading model United Nations conferences; teaching other students; and building his own startup.
- **Button:** See My Work (goes to `/projects`)

The headline types out one character at a time. On large screens, six icons arc around the text:

| Side | Icon file | Topic |
| --- | --- | --- |
| Left, top | `/HomeIcons/games.png` | Games |
| Left, middle | `/HomeIcons/robotics.png` | Robotics |
| Left, bottom | `/HomeIcons/debate.png` | Debate |
| Right, top | `/HomeIcons/apps.png` | Apps |
| Right, middle | `/HomeIcons/mun.png` | MUN |
| Right, bottom | `/HomeIcons/teaching.png` | Teaching |

A video-orbit background is coded but commented out. It would have played clips from `/public/Clips` via `GET /api/videos`, with these fallbacks if the folder is empty: OpenStage, SpaceLooper, BuggedOut, MaliceAndMercy.

### Achievements

Home section under the hero. Cards show an image, the competition name, and the result. Order is fixed (not sorted by date).

| Competition | Result | Image |
| --- | --- | --- |
| Patch Notes Game Jam 2025 | 17th Out Of 474 Entries | `/achievement-patch-notes-jam.png` |
| Congressional App Challenge 2025 | 3rd Place In California District 15 | `/achievement-congressional-app-challenge.png` |
| Berkeley Model United Nations 2025 | Outstanding Award | `/achievement-berkeley-mun.png` |
| Georgiana Hays Invitational 2026 | 1st Place In Novice Parliamentary Debate | `/HomeTopics/Debate/georgiana-hays-trophy.png` |

### Topic switcher

Chevrons labeled "Previous topic" and "Next topic". The starting topic is chosen at random. Order of the cycle:

Games, Apps, Robotics, MUN, Debate, Teaching, Design.

Each topic shows up to four images, the first four files alphabetically in `public/HomeTopics/<Topic>/`. Empty slots say "Image".

**Games**

Video games hold a special place in ShyGuy's heart, as they started ShyGuy on his technical journey. Hooked on games ever since he could understand them, they propelled his curiosity into how technology works, operates, and evolves.

As he grew older, he started to learn how to design and build his own games, working in Scratch, Python and Pygame, p5.js, Unity, Godot, and more. Along his video game development journey, he met HF_ang and Emey, which led to the founding of their startup, Empty Console.

Even today, ShyGuy shows his love and appreciation for games through his name, which is a reference to the world famous Mario character, Shy Guy.

**Apps**

Since 2025, ShyGuy has started to transition to building apps with real use cases instead of games. Planning to work both individually and with his startup called Empty Console, ShyGuy wants to help those around him with new innovative solutions.

ShyGuy's first exposure to building real products was in 2025, with the Congressional App Challenge, which he managed to score 3rd place in with Empty Console. Their submission was called Open Stage, an app directly inspired by the story of his school's music teacher and how hard it is for him to manage and grow his local band. Though this app won't be deployed as a real product, it taught ShyGuy a lot about how to build real solutions by learning from those around him.

**Robotics**

Designing, building, and programming robots lets ShyGuy bring code into the physical world, a dream he's had ever since seeing Tony Stark's creations in Iron Man.

ShyGuy's robotic interest started with the First Tech Challenge, where he led a team of 15 students from his school. Leading this team helped him learn how to deal with many opinions, low team engagement, and even failure in a competitive setting.

Nowadays, ShyGuy spends most of his time in robotics learning about computer vision and spatial intelligence, which is AI's next frontier. With computer vision, AI will be able to understand the world around it, and science fiction creations like the Terminator finally become a possibility.

**MUN**

Even with a name like his, ShyGuy is the opposite of shy. He has always been a naturally confident speaker and leader, skills that he has been able to hone throughout his Model United Nations journey.

ShyGuy has attended many conferences around Silicon Valley, though his most notable conference was actually NHSMUN, or National High School Model United Nations, in New York. This is notable as NHSMUN is the most prestigious pre-collegiate MUN conference in the world, and ShyGuy learned so much attending it. During this conference, ShyGuy the delegate for China in the High-Level Advisory Body on Aritifical Intelligence, a committee tied to his other work in technology.

(Live typos to fix in the rewrite: "ShyGuy the delegate" is missing "was"; "Aritifical".)

**Debate**

Parliamentary debate has shaped the way ShyGuy thinks and constructs arguments. In this format, ShyGuy and his debate partner, ZeedleDee, get the round's topic and their side 20 minutes before the round, leaving very little time for full preparation. Through this, ShyGuy's impromptu speaking skills have grown tremendously.

Even though he started this format in 2026, ShyGuy quickly improved, winning his first novice tournament, the Georginia Hays Tournament, after only a few months. Now that he has moved past novice, ShyGuy is competing in the open division, and will continue to improve his speaking and debating skills throughout high school.

(Live typo: "Georginia". The rest of the site spells it Georgiana.)

**Teaching**

Throughout his life, ShyGuy has learned from many mentors, each being a valuable part of his journey. Wanting to fill that space for others like him, ShyGuy has started teaching whenever possible, always doing his best to support other curious students.

ShyGuy's first experience teaching was in 2026, where he was asked to speak at a session of Cumberland Elementary's after-school robotics program. Here, he spoke about experimenting with the idea of a robotic dog paired with computer vision during a recent project, the best way to tackle new problems, and how to communicate complex robotic ideas to non-technical audiences.

**Design**

Design is where ShyGuy's technical skills meet his creative instincts. Whether he is sketching a game level, laying out an app screen, or planning how a city might function a hundred years from now, he thinks about how form, function, and feeling work together.

For example, in the Future City competition, he worked with five teammates to design a sustainable city of the future, write an essay defending its feasibility, and build a physical scale model of its layout. The project pushed him to research real engineering concepts, coordinate across different strengths, and explain complex ideas in a way anyone could understand.

### Song quote of the day (off)

Not rendered. The import in `src/app/page.tsx` is commented out. The heading was "Song Quote of the Day": one random lyric, with song title and artists, and a refresh button.

The lyric library is copyrighted song text stored in `src/components/song-quote-section.tsx`. It is not copied into this document. Keep that file if the feature should survive the rebuild.

---

## Projects (`/projects`)

Page title: **Projects**. Search placeholder: "Search projects...". Topic filter defaults to "All topics" and offers Apps, Robotics, Design, MUN, Debate, Games, Teaching.

Empty states:

- No projects match "[query]".
- No projects match the selected topics.
- No projects yet. Check back soon!

Sections, in order: **Featured Currently**, then each tag. Featured projects also appear again under their own tag. Featured ignores search and filters. Within a tag, newest date first, then title A–Z. Untagged items would fall under "Other".

Each card has a title (linked when a URL exists), date, tag pill, description, key learnings, and an image. Missing images use a coming-soon placeholder.

**Featured currently:** News Digest (September 2026), Evodyne Robotic Dog (June 2026), Georgiana Hays Invitational (May 2026).

### Apps

**Open Stage** — October 2025 — [https://open-stage.vercel.app/signin](https://open-stage.vercel.app/signin) — image `/open-stage.png`

A Congressional App Challenge project designed to help musicians earn more revenue via reduced upfront costs and real-time tipping. Empty Console collaborated with local SF Bay Area bands to develop a user-friendly UX and sustainable revenue model. The project placed third in district CA-15, one of the hardest and most competitive districts in the nation.

Links in the copy: [Congressional App Challenge](https://www.congressionalappchallenge.us/).

Learnings: Building a real product. UX design and gathering real user feedback. Addressing a problem. Presenting solutions to judges. Creating socially impactful technology.

**Hackathon Digest** — August 2026 — [https://github.com/ShyGuyGameDev/hackathon-digest](https://github.com/ShyGuyGameDev/hackathon-digest) — image `/hackathon-digest.png`

Built using Claude Routines, Hackathon Digest is a fully automated tool that sends an email to ShyGuy's team every Wednesday. It finds an interesting high-school friendly hackathon, finds all of the data it can on it, then sends the email exactly at 7 AM. This was ShyGuy's first project that only consisted of a README, because it's all natural language AI automated.

Link in the copy: [Claude Routines](https://claude.com/product/claude-code) (the live href also carries ad-tracking query parameters).

Learnings: Fully automated. Email send. Hackathon finder.

**News Digest** — September 2026 — featured — [https://github.com/ShyGuyGameDev/NewsDigest](https://github.com/ShyGuyGameDev/NewsDigest) — image `/news-digest.jpeg`

Originally, News Digest started off as a tool for ShyGuy to stay on top of current events, though it quickly scaled up to more users when he opened it up to his school's debate team as well. It is a fully automated tool that sends an email to ShyGuy every Monday, Wednesday, and Friday at 6:45 AM, covering the most recent news in politics, technology, science, business, and more. All the other recipients are also BCCed on the same email. If you are interested in receiving the email, just ping ShyGuy on Discord and he'll add you to the list. Your email will never be displayed anywhere besides the supabase, where it is encrypted.

Learnings: Fully automated. Email send. News finder.

### Robotics

**Evodyne Robotic Dog** — June 2026 — featured — [https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/](https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/) — image `/evodyne-robotic-dog.png`

In April of 2026, ShyGuy built his first computer vision robotic "dog," which was capable of seeing a specific object, identifying it, and moving towards it. Here, he wanted to build on that idea, this time with help. By learning through the Evodyne Robotics Genesis Course, ShyGuy learned how to make his original robotic dog so much better, his favorite addition being realistic limbs instead of wheels.

Learnings: Spatial intelligence and computer vision. Building on old projects. Learning from courses. Building realistic limbs.

**Computer Vision Robot** — April 2026 — [https://www.youtube.com/watch?v=y8NtMZ7VGmU](https://www.youtube.com/watch?v=y8NtMZ7VGmU) — image `/computer-vision-robot.png`

The next frontier of AI is spatial intelligence, which ShyGuy chose to explore by attempting to implement it in his own robot. After 6 months, ShyGuy was able to implement YOLO11n, a computer vision program able to distinguish objects and recognize what they are, into his project to create a robotic "dog" capable of moving towards a specified object.

Link in the copy: [YOLO11n](https://docs.ultralytics.com/models/yolo11#overview).

Learnings: Spatial intelligence and computer vision. Combining old technology with new technology. Experimenting with new programs. Combining premade tools with custom creations.

**FTC Competition** — February 2025 — [https://www.firstinspires.org/programs/ftc/](https://www.firstinspires.org/programs/ftc/) — image `/ftc-competition.jpg`

ShyGuy's first time leading a large team was through his school's competitive robotics program called the First Tech Challenge. On the team he joined, he quickly took a leadership role and learned many useful life skills like how to work on a team with varying engagement levels, how to deal with unexpected failures, and how to efficiently use limited resources.

Learnings: Leading a large team. Dealing with unexpected failure. Efficiently use limited resources. Competitive robotics.

### Design

**Future City** — February 2026 — [https://futurecity.org/](https://futurecity.org/) — image `/HomeTopics/Design/future-city-model.png`

ShyGuy entered the Future City competition with 5 other students, and came out learning so much more than he originally thought he would. Designing a city, writing an essay about it, and creating a model of its layout, taught ShyGuy how to put multiple proven concepts together to verify the possibility of a futuristic technology, how to lead a team where everyone comes from a different background, and how to present complex topics simply.

Learnings: Verifying the possibility of future technologies. Bringing different fields together. Presenting complex topics simply. Designing for the future.

### MUN

**National High School Model United Nations** — March 2026 — [https://imuna.org/nhsmun/nyc/](https://imuna.org/nhsmun/nyc/) — image `/HomeTopics/MUN/nhsmun-logo.png`

New York's NHSMUN is the most prestigious pre-collegiate MUN conference in the world, and ShyGuy had the honor of attending as China in the High Level Advisory Body on Artificial Intelligence committee. ShyGuy loved being in this conference, and found the topics of AI in education and a global AI fund very interesting to debate about with the other delegates. From this conference, he learned many critical MUN skills such as how to better engage audiences and how to easily propose plans in speeches.

Links in the copy: [NHSMUN](https://imuna.org/nhsmun/nyc/) (live href also has ad-tracking parameters), [High Level Advisory Body on Artificial Intelligence](https://www.un.org/digital-emerging-technologies/ai-advisory-body).

Learnings: Speaking on AI. AI in education and a global AI fund. Engaging audiences. Proposing plans during speeches.

**Nueva Model United Nations Conference** — February 2026 — [https://sites.google.com/nuevaschool.org/nuevamunconference/conference](https://sites.google.com/nuevaschool.org/nuevamunconference/conference) — image `/HomeTopics/MUN/nmunc-logo.png`

In NMUNC, ShyGuy represented Poland in the EU committee. The topic for the EU was green energy and green technology. This was ShyGuy's second conference with the format of general assembly, meaning he knew what to expect. Due to this, he decided to prepare a lot more than he had in the past, which turned out to be a good decision. During committee, he led discussions, was a key writer of his resolution, and used his influence to make important allies in the committee.

Links in the copy: [NMUNC](https://sites.google.com/nuevaschool.org/nuevamunconference/conference), [EU](https://european-union.europa.eu/index_en).

Learnings: Green energy and green technology. Thorough preparation. Leading committee. Making allies.

**San Francisco Model United Nations** — February 2026 — [https://www.sfmun.org/](https://www.sfmun.org/) — image `/HomeTopics/MUN/sfmun-logo.png`

In the 2026 SFMUN, ShyGuy represented the Philippines in the United Nations Office on Drugs and Crime. This year, the topic was narcoterrorism, which is a topic ShyGuy had never known much about. During his prep, he learned much more on how narcoterrorism works and how to fight it, as well as how the UN is actually able to make changes in the real world.

Links in the copy: [United Nations Office on Drugs and Crime](https://www.unodc.org/), [UN](https://www.un.org/en/).

Learnings: Fighting narcoterrorism. Learning about new topics. Preparing for committee.

**Berkeley Model United Nations** — November 2025 — [https://www.bmun.org/](https://www.bmun.org/) — image `/berkeley-mun.png`

ShyGuy's first MUN conference was BMUN, where ShyGuy was in a crisis committee, meaning among other things, he represented a person, not a country. He was Nina Witkofsky, the communications director and acting deputy director of the CDC, in a committee set in a future where a new virus is terrorizing the world. ShyGuy won Outstanding at this conference, which is equivalent to 2nd place in the committee.

Learnings: Representing the CDC. Trying new experiences. Representing an individual.

### Debate

**Georgiana Hays Invitational** — May 2026 — featured — [tabroom tournament 39687](https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=39687) — image `/georgiana-hays-invitational.png`

ShyGuy ended his second tournament with his debate partner with a 5-0 record, meaning they won 1st place in their division, novice parli debate. Post-debate, the judges said ShyGuy spoke confidently, was able to explain the logic behind his arguments, and was always able to address all of his opponent's points. However, he was told that his arguments could benefit from more concrete evidence from studies, as most were rooted in logic instead of scientifically proven facts.

Learnings: Speaking confidently. Explaining logic in arguments. Addressing opponent points. Finding proven evidence.

**Tessellations Middle School Invitational** — April 2026 — [tabroom tournament 39640](https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=39640) — image `/tessellations-invitational.png`

ShyGuy's second debate tournament, but his first with his future partner, ended in a record of 3-1, making it the first time Shaayer broke. At this tournament, ShyGuy learned how to work with his partner, stay confident even with complex topics, how to explain his ideas to his partner, and more.

Learnings: Working with a new partner. Staying confident in hard times. Explaining ideas.

**Karen Keefer Novice Invitational** — November 2025 — [tabroom tournament 37170](https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=37170) — image `/karen-keefer-invitational.png`

Keefer was ShyGuy's first parliamentary debate tournament, and it was also his only tournament without his current partner. In this tournament, ShyGuy learned how to use the debate organizing software called tabroom, structure of parli debate, how to prepare for a debate in extremely limited time, and how to shape a speech towards a specific audience. His final record for this tournament was 2-2.

Link in the copy: [tabroom](https://www.tabroom.com/index/index.mhtml).

Learnings: Navigating new sites. Learning the structure of debate. Preparing in limited time. Knowing the audience.

### Games

**Bugged Out** — September 2025 — [https://emptyconsole.itch.io/bugged-out](https://emptyconsole.itch.io/bugged-out) — image `/bugged-out.png`

Created by Empty Console for the Patch Notes Game Jam with the theme 'The Error is the Feature' in a 3-day jam, placing 17th out of 474 entries. This platformer intentionally uses glitches as core gameplay mechanics, requiring players to use logic, memory, and reflexes to navigate levels.

Link in the copy: [Patch Notes Game Jam](https://itch.io/jam/patch-notes-v-1-0).

Learnings: Building around a theme. Iterative design and refining platformer feel. Playtesting and incorporating user feedback. Improving teamwork coordination.

**Space Looper** — August 2025 — [https://emptyconsole.itch.io/space-looper](https://emptyconsole.itch.io/space-looper) — image `/space-looper.png`

A GMTK Game Jam strategy game created by Empty Console for the 4 day competition with 9,574 submissions. Players circle meteors with limited rope and energy, managing resources across 20 research centers. The game challenges players with precise movement mechanics and strategic resource allocation.

Link in the copy: [GMTK Game Jam](https://itch.io/jam/gmtk-2025).

Learnings: Rapid prototyping. Trying new solutions. Collaboration under tight deadlines. Iterative design and precise gameplay mechanics.

**Malice and Mercy** — June 2025 — [https://emptyconsole.github.io/Malice-and-Mercy/](https://emptyconsole.github.io/Malice-and-Mercy/) — image `/malice-and-mercy.png`

A p5.js platformer by Empty Console created for the p5Play game jam that earned Honorable Mention. The game explores ethical decision-making in fast-paced platforming. Players choose to save or kill characters while balancing points and time using three throwable abilities. Features a fully custom physics engine, tilemap system, collision detection, particles, and a level editor coded from scratch.

Links in the copy: [p5.js](https://p5js.org/), [p5Play](https://p5play.org/).

Learnings: Building a full game. Implementing custom physics. Level design and choice-based gameplay. Teamwork under time pressure. Managing deadlines while collaborating on art and music.

**Dimensional Rifter** — March 2025 — [https://shyguygamedev.github.io/Dimensional-Rifter/](https://shyguygamedev.github.io/Dimensional-Rifter/) — image `/dimensional-rifter.png`

ShyGuy's technical curiosity started by playing video games, and eventually learning how to build them. His first ever game was Dimensional Rifter, a simple platformer where the user has to get around obstacles by throwing their javelin at nodes capable of altering the environment around them. This game taught ShyGuy how to organize a project, design a product, and incorporate user feedback.

Learnings: Beginner game. Organizing the project. Designing a product. Incorporating user feedback.

### Teaching

**Cumberland Elementary** — May 2026 — [https://cumberland.sesd.org/](https://cumberland.sesd.org/) — image `/HomeTopics/Teaching/cumberland-elementary-logo.png`

After meeting the lead of Cumberland Elementary's after school robotics program and showing him his computer vision robot, ShyGuy was invited to speak at one of the program's weekly sessions. At this session, ShyGuy spoke about his robotics journey, how he built this robot, and answered questions from the students about their own projects. ShyGuy has always loved his mentors, and was incredibly thankful for the opportunity to help others like him.

The phrase "lead of Cumberland Elementary's after school robotics program" links to [https://www.linkedin.com/in/ahmedmakkawy/](https://www.linkedin.com/in/ahmedmakkawy/).

Learnings: Speaking at a school. Answering questions from students. Helping others learn.

---

## Posts and media mentions (`/posts`)

Page title: **Posts & Media Mentions**.

Subtitle: Subscribe to [ShyGuy's Substack](https://shyguygamedev.substack.com/)!

Search placeholder: "Search posts & media mentions...". Topic filter: Media Mention, Post.

Empty states:

- No posts or media mentions match "[query]".
- No posts or media mentions match the selected topics.
- No media mentions yet. Check back soon!

Media Mention is listed before Post. Within a tag, newest first, then title A–Z. Cards are two per row. Each card has title, date, external URL, tag, themes, image, and description.

### Media Mention

**P5Play Game Jam Results** — June 2025 — [https://q5js.substack.com/p/p5play-game-jam-2025-results](https://q5js.substack.com/p/p5play-game-jam-2025-results) — image `/malice-and-mercy.png`

Themes: Game design, Puzzle, Game Review.

Malice and Mercy, an Empty Console game, earned an "honorable mention" in the 2025 p5play game jam, which is equivalent to winning 2nd place in the competition. Quinton Ashley was the game jam judge, and is also the original designer and developer of p5.js, p5play, q5.js, and q5play. After the competition, he posted his review of Malice and Mercy, where he highlighted the game's physics and functionality.

Links in the copy:

- [Malice and Mercy](https://emptyconsole.github.io/Malice-and-Mercy/)
- [p5play game jam](https://q5play.org/jam/)
- [Quinton Ashley](https://www.linkedin.com/in/quinton-ashley/)
- [p5.js](https://p5js.org/)
- [p5play](https://p5play.org/)
- [q5.js](https://q5js.org/home/)
- [q5play](https://q5play.org/home/)

### Posts

**Intro to Spatial Intelligence** — July 2026 — [https://shyguygamedev.substack.com/p/intro-to-spatial-intelligence](https://shyguygamedev.substack.com/p/intro-to-spatial-intelligence) — image `/post-spatial-intelligence.png`

Themes: AI, Future, Introduction, Spatial Intelligence.

AI's next frontier isn't just seeing and talking, it's doing. In this post, ShyGuy introduces spatial intelligence, the field built around teaching AI to understand the 3D world and how the objects within it relate, behave, and change. He breaks the frontier into its two sides, interpretive and generative, covers the tech giants and startups racing to lead it, shares the lessons learned from early world models like Oasis, and explains why the challenge ahead is no longer possibility, but purpose.

**Game Jam Tips** — June 2025 — [https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam](https://shyguygamedev.substack.com/p/five-strategies-to-win-a-game-jam) — image `/post-game-jam-tips.png`

Themes: Game Design, Game Jam, Strategies.

Creating a game for a game jam is entirely different than creating a game for yourself to play. In this post, ShyGuy summarizes the top 5 lessons he learned from his experience competing in the 2025 p5play game jam with Empty Console. Each of these strategies are broad enough to be applied to any game jam, but are specific enough to be actually useful in creating a better game and placing higher in the competition.

**Engagement in Beginner Games** — March 2025 — [https://shyguygamedev.substack.com/p/game-design-for-beginners](https://shyguygamedev.substack.com/p/game-design-for-beginners) — image `/post-game-engagement.png`

Themes: Game Design, Strategies, Engagement, Beginner, User Psychology.

Every good game has one goal: Keep the player engaged. However, that's a lot easier said than done. In this post, ShyGuy shares his top 7 strategies for beginner game designers to use, all of which use the player's own psychology to their advantage. ShyGuy explains each of these strategies through providing details from one of his own first games, Dimensional Rifter.

**Competitive Robotics Strategies** — February 2025 — [https://shyguygamedev.substack.com/p/strategies-for-competitive-robotics](https://shyguygamedev.substack.com/p/strategies-for-competitive-robotics) — image `/ftc-competition.jpg`

Themes: Robotics, Stategies, Teamwork. ("Stategies" is misspelled in the data.)

Working as a team throughout a competitive robotics season is hard, but there a few strategies to make it much easier. In this post, ShyGuy draws on his experience from working in his school's FTC (First Tech Challenge) team, breaks it down, and shares what worked for him and his team. From what to do when creating the team, to how to handle yourself at the actual competition, this post has strategies that apply to the entire season.

Link in the copy: [FTC](https://www.firstinspires.org/programs/ftc/). The visible link text is "FTC(First Tech Challenge)" with no space before the parenthesis.

---

## Empty Console (`/team`)

Heading: logo `/empty-console-logo.png` plus **Empty Console**.

Empty Console is a startup team cofounded by ShyGuy, HF_ang, and Emey. From a shared passion, the team has evolved into a collaborative space where each member can pursue their unique talents, contribute meaningfully to projects, and develop skills while learning from each other. Everyone on the team brings a unique perspective, balancing technical expertise, creativity, and teamwork to produce innovative projects and products, all while learning more about vibe coding and of the world's future. We started with games, though are now competing in hackathons and building real apps.

The team name in that paragraph links to [https://www.emptyconsole.com/](https://www.emptyconsole.com/).

Three flip cards. Front: portrait, name, role, Discord, and "Click to read bio". Back: name, bio, and "Click to flip back". Order is Emey, ShyGuy (larger, centered), HF_ang. The outer cards tilt inward.

**Emey** — Cofounder — Discord `qorachniuphorbia` — image `/team-emey.png`

Emey is the team's composer and lead artist, bringing a unique creative perspective to every project. He picked up coding after meeting ShyGuy and HF_ang and quickly mastered key software skills.

**ShyGuy** — Cofounder — Discord `shyguygamedev` — image `/team-shyguy.jpeg` — featured (scaled up)

ShyGuy leads marketing, communications, and product positioning while contributing to development. With a knack for leadership and strategy, he shapes product vision and keeps the team aligned.

**HF_ang** — Cofounder — Discord `hfanggamedev` — image `/team-hfang.png`

HF_ang found his passion for programming through video games. Since teaming up with ShyGuy and Emey in 2024, he's focused on UI/UX design and user engagement.

Older HF_ang bio, commented out and not shown: "HF_ang discovered coding through video games and has since developed a passion for problem-solving, creating digital art, and experimenting with physics in code. Adding his video game skills of code and art, he brings easy to read UI and user engagement to the team's creations. He also constantly experiments with new concepts in his work."

---

## Not on the site yet

From `ToDo.txt`, intended additions:

Projects:

- NMUNC Chairing
- Student Atlas
- Spatial Intelligence Research Projects

Posts / media mentions: the list is blank.

UI note in the same file: "Flip cards?"

---

## Where the copy lives in code

| Content | File |
| --- | --- |
| Tab title, description, preview image | `src/app/layout.tsx` |
| Nav labels | `src/components/navigation.tsx` and tag lists in `src/lib/utils.ts` |
| Footer contact | `src/components/footer.tsx` |
| Hero | `src/components/hero-section.tsx` |
| Home awards | `src/components/achievements-section.tsx` |
| Home topic essays | `src/components/topic-switcher.tsx` |
| Projects | `completedProjects` in `src/components/projects-section.tsx` |
| Posts | `mediaMentions` in `src/components/posts-section.tsx` |
| Team | `teamMembers` in `src/components/team-section.tsx` |
| 404 | `src/app/not-found.tsx` |
| Song quotes (off) | `src/components/song-quote-section.tsx` |

Tag colors, for when the pills are redesigned: Games purple, Apps blue, Robotics cyan, MUN fuchsia, Debate orange, Teaching lime, Design pink, Miscellaneous slate, Post rose, Media Mention sky. Unknown tags fall back to yellow.
