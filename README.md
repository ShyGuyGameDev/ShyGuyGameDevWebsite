# ShyGuy

This is the source code for [ShyGuy's personal website](https://shy-guy-game-dev-website.vercel.app) — a portfolio of the games, apps, and robots he builds, the tournaments and conferences he competes in, and the students he teaches.

## Who is ShyGuy?

ShyGuy is a high-school student developer. He started out making video games, taught himself how they work from the ground up, and has since branched into building real apps, robotics and computer vision, competitive debate, Model United Nations, and teaching younger students.

The handle is a reference to the Mario character, and it stuck: it's the name on his games, his writing, and his Discord.

A few things worth knowing about him:

- He cofounded **Empty Console**, a startup team, with HF_ang and Emey. They began by making games together and now compete in hackathons and ship real products.
- Within Empty Console, ShyGuy leads product, strategy, marketing, and communications, and contributes to development.
- The site groups his work into four areas: **Apps, Robotics, Games, and Teaching.** The previous version of the site, which also covers MUN, Debate, and Design, is still available at `/old-view`.
- He writes about what he learns at [shyguygamedev.substack.com](https://shyguygamedev.substack.com).

### Awards

| Competition | Result |
| --- | --- |
| Patch Notes Game Jam 2025 | 17th out of 474 entries |
| Congressional App Challenge 2025 | 3rd place in California District 15 |
| Berkeley Model United Nations 2025 | Outstanding Award |
| Georgiana Hays Invitational 2026 | 1st place in novice parliamentary debate |

### Select Work

**Apps** — [Student Atlas](https://github.com/EmptyConsole/Student-Atlas), a simpler system for ranking and choosing high school electives, built with Empty Console, which is working with his school's administration to adopt it. [Open Stage](https://github.com/EmptyConsole/open-stage), an app that helps local musicians increase earnings through real-time tipping at concerts, which won 3rd place in California's 15th district for the Congressional App Challenge. [Hackathon Digest](https://github.com/ShyGuyGameDev/hackathon-digest), a fully automated weekly email that finds high-school-friendly hackathons. [News Digest](https://github.com/ShyGuyGameDev/NewsDigest), an automated politics/tech/science briefing that now goes out to other students at his school as well.

**Robotics** — A [robotic dog](https://www.youtube.com/watch?v=y8NtMZ7VGmU) that spots an object, identifies it with computer vision, and walks toward it. Version one (April 2026) used YOLO11n on a wheeled robot; version two (June 2026) was rebuilt with realistic legs through the [Evodyne](https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/) Genesis course. Before that, he led a 15-student [FIRST Tech Challenge](https://www.firstinspires.org/programs/ftc/) team.

**Games** — [Bugged Out](https://emptyconsole.itch.io/bugged-out), a platformer made in three days where glitches are the core mechanic, 17th of 474 entries. [Malice and Mercy](https://emptyconsole.github.io/Malice-and-Mercy/), a p5.js platformer about ethical decision-making that earned Honorable Mention in the p5Play game jam, with a physics engine, tilemap system, and level editor written from scratch. [Space Looper](https://emptyconsole.itch.io/space-looper), built in four days for the GMTK 2025 jam against 9,574 other submissions. [Dimensional Rifter](https://shyguygamedev.github.io/Dimensional-Rifter/), his first game.

**Teaching** — Volunteering as a class mentor in [StreetCode Academy's](https://streetcode.org/) weekly Unboxing AI class, where his students range from 13 to 70 years old. Earlier, he spoke at [Cumberland Elementary's](https://cumberland.sesd.org/) after-school robotics program about his robot and how to approach new problems.

**MUN, Debate, and Design** — Conferences including [BMUN](https://www.bmun.org/), [NMUNC](https://sites.google.com/nuevaschool.org/nuevamunconference/conference), [SFMUN](https://www.sfmun.org/), and [NHSMUN](https://imuna.org/nhsmun/nyc/) in New York, parliamentary debate tournaments where he went from a 2–2 novice record to winning his division 5–0, and designing a sustainable city with five teammates for [Future City](https://futurecity.org/).

## Contact

The fastest way to reach ShyGuy is Discord or email.

- **Discord:** `shyguygamedev`
- **Email:** [shyguygamedev@gmail.com](mailto:shyguygamedev@gmail.com)
- **Substack:** [shyguygamedev.substack.com](https://shyguygamedev.substack.com)
- **GitHub:** [@ShyGuyGameDev](https://github.com/ShyGuyGameDev)
- **Website:** [shy-guy-game-dev-website.vercel.app](https://shy-guy-game-dev-website.vercel.app)

To get **News Digest**, his automated news email that goes out Monday, Wednesday, and Friday at 6:45 AM, just ping him on Discord and he'll add you to the list. Your address is only ever stored encrypted in Supabase and is never displayed anywhere.

You can also reach the rest of Empty Console on Discord: HF_ang at `hfanggamedev` and Emey at `qorachniuphorbia`.

## Running this site locally

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui components.

```bash
npm install
npm run dev     # start the dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
```

There is also a `npm run lint` script, but ESLint isn't installed in this project yet, so it fails until you add it.

### Where things live

| Path | What's in it |
| --- | --- |
| `src/app/(portfolio)/` | The live site: home, `/work`, `/work/[slug]` case studies, and `/about`, plus its layout and `v2.css` theme |
| `src/app/(portfolio)/data.ts` | All copy for the live site: projects, case studies, posts, and contact details |
| `src/app/(portfolio)/_components/` | The live site's cards, rows, top bar, footer, and contact links |
| `src/app/layout.tsx` | Root layout and site-wide metadata |
| `src/app/old-view/` | The previous version of the site, served at `/old-view` |
| `src/components/` | Sections and cards used by `/old-view`, plus shadcn/ui primitives in `ui/` |
| `src/hooks/`, `src/lib/` | Shared hooks, plus sorting, searching, and tag helpers in `lib/utils.ts` |
| `public/` | Images and videos, named after what they're used for |

Site content is not in a CMS. Everything on the live site comes from `src/app/(portfolio)/data.ts`, so the homepage cards, the Work page, and the case studies always stay in sync.

- **Add a project:** add an entry to `projects`. It shows up on the Work page under its `category`.
- **Give it a case study:** add a `caseStudy` (problem, what he built, result, what he learned, and links), set `featured: true`, and add its slug to `featuredOrder`. It then appears on the homepage and gets a page at `/work/<slug>`. An optional `extraVideo` appears under the main image.
- **Add a post:** add an entry to `posts`.

The `/old-view` pages keep their own data arrays inside `src/components/` (for example `projects-section.tsx` and `achievements-section.tsx`). Its home page topic switcher reads whatever images sit in `public/HomeTopics/<Topic>/` at request time and shows the first four alphabetically.
