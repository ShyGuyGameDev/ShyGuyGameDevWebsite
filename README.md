# ShyGuy

This is the source code for [ShyGuy's personal website](https://shy-guy-game-dev-website.vercel.app) — a portfolio of the games, apps, and robots he builds, the tournaments and conferences he competes in, and the students he teaches.

## Who is ShyGuy?

ShyGuy is a high-school student developer. He started out making video games, taught himself how they work from the ground up, and has since branched into building real apps, robotics and computer vision, competitive debate, Model United Nations, and teaching younger students.

The handle is a reference to the Mario character, and it stuck: it's the name on his games, his writing, and his Discord.

A few things worth knowing about him:

- He cofounded **Empty Console**, a startup team, with HF_ang and Emey. They began by making games together and now compete in hackathons and ship real products.
- Within Empty Console, ShyGuy leads marketing, communications, and product positioning, and contributes to development.
- His interests cluster into seven areas, which is how this site is organized: **Games, Apps, Robotics, MUN, Debate, Teaching, and Design.**
- He writes about what he learns at [shyguygamedev.substack.com](https://shyguygamedev.substack.com).

### Awards

| Competition | Result |
| --- | --- |
| Patch Notes Game Jam 2025 | 17th out of 474 entries |
| Congressional App Challenge 2025 | 3rd place in California District 15 |
| Berkeley Model United Nations 2025 | Outstanding Award |
| Georgiana Hays Invitational 2026 | 1st place in novice parliamentary debate |

### Selected work

**Games** — [Malice and Mercy](https://emptyconsole.github.io/Malice-and-Mercy/), a p5.js platformer about ethical decision-making that earned Honorable Mention in the p5Play game jam, with a physics engine, tilemap system, and level editor written from scratch. [Space Looper](https://emptyconsole.itch.io/space-looper), built in four days for the GMTK 2025 jam against 9,574 other submissions. [Bugged Out](https://emptyconsole.itch.io/bugged-out), a platformer that turns glitches into mechanics, 17th of 474 entries. [Dimensional Rifter](https://shyguygamedev.github.io/Dimensional-Rifter/), his first game.

**Apps** — [Open Stage](https://open-stage.vercel.app/signin), a Congressional App Challenge project built with local Bay Area bands to help musicians earn more through real-time tipping. [Hackathon Digest](https://github.com/ShyGuyGameDev/hackathon-digest), a fully automated weekly email that finds high-school-friendly hackathons. [News Digest](https://github.com/ShyGuyGameDev/NewsDigest), an automated politics/tech/science briefing that now goes out to his school's debate team as well.

**Robotics** — Leading a 15-student [FIRST Tech Challenge](https://www.firstinspires.org/programs/ftc/) team, then building a [computer vision robot](https://www.youtube.com/watch?v=y8NtMZ7VGmU) using YOLO11n that identifies an object and walks toward it, and rebuilding it with real limbs through the [Evodyne](https://evodynerobotics.com/courses/evodog-learn-and-build-a-programmable-robotic-dog/) course.

**MUN and Debate** — Conferences including [BMUN](https://www.bmun.org/), [NMUNC](https://sites.google.com/nuevaschool.org/nuevamunconference/conference), [SFMUN](https://www.sfmun.org/), and [NHSMUN](https://imuna.org/nhsmun/nyc/) in New York, plus parliamentary debate tournaments where he went from a 2–2 novice record to winning his division 5–0.

**Teaching and Design** — Speaking at [Cumberland Elementary's](https://cumberland.sesd.org/) after-school robotics program about his robot and how to approach new problems, and designing a sustainable city with five teammates for [Future City](https://futurecity.org/).

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
| `src/app/` | Routes: home, `/projects`, `/posts`, `/team`, plus the shared layout and site metadata |
| `src/components/` | The page sections and cards, including the project, post, and team-member cards |
| `src/components/ui/` | shadcn/ui primitives (buttons, dialogs, and so on) |
| `src/hooks/`, `src/lib/` | Shared hooks, plus sorting, searching, and tag helpers in `lib/utils.ts` |
| `public/` | Images, named after what they're used for |

Site content is not in a CMS — each section component holds its own data array near the top of the file. To add a project, add an entry to `completedProjects` in `src/components/projects-section.tsx`; posts live in `posts-section.tsx` and awards in `achievements-section.tsx`.

The home page topic switcher is the one exception: it reads whatever images sit in `public/HomeTopics/<Topic>/` at request time and shows the first four alphabetically, so you change those collages by adding or removing files rather than by editing code.
