/**
 * site.ts
 *
 * Link helpers and picture lookups for the `/test` redesign. All copy still comes from the live
 * portfolio's data.ts; this file only points that content at `/test` and pairs each project with
 * its own still and footage.
 */

import type { Project } from "../(portfolio)/data"

export const BASE = "/test"

export function projectHref(project: Project) {
  return project.caseStudy ? `${BASE}/work/${project.slug}` : project.href
}

export function isInternal(href: string) {
  return href.startsWith("/")
}

export type Still = { src: string; alt: string; fit?: "cover" | "contain" }

/** Stills for projects the data file leaves without one, so every name in the index has a picture. */
const extraStills: Record<string, Still> = {
  "space-looper": { src: "/space-looper.png", alt: "Space Looper, a ship circling meteors" },
  "malice-and-mercy": { src: "/malice-and-mercy.png", alt: "Malice and Mercy title screen" },
  "dimensional-rifter": { src: "/dimensional-rifter.png", alt: "A level from Dimensional Rifter" },
  "hackathon-digest": { src: "/hackathon-digest.png", alt: "Hackathon Digest email preview" },
  "ftc-robotics": { src: "/ftc-competition.jpg", alt: "The FTC team at competition" },
}

export function stillFor(project: Project): Still | undefined {
  if (project.image) return { src: project.image.src, alt: project.image.alt, fit: project.image.fit }
  return extraStills[project.slug]
}

/** Gameplay and demo footage, keyed by project slug. Each clip is about 22 MB, so pages load them lazily. */
export const clips: Record<string, { src: string; poster: string; label: string }> = {
  "bugged-out": { src: "/Clips/BuggedOut.mp4", poster: "/bugged-out.png", label: "Bugged Out gameplay" },
  "open-stage": { src: "/Clips/OpenStage.mp4", poster: "/open-stage.png", label: "Open Stage app walkthrough" },
  "robotic-dog": {
    src: "/robotic-dog-v1.mp4",
    poster: "/computer-vision-robot.png",
    label: "The first robot finding its target",
  },
  "space-looper": { src: "/Clips/SpaceLooper.mp4", poster: "/space-looper.png", label: "Space Looper gameplay" },
  "malice-and-mercy": {
    src: "/Clips/MaliceAndMercy.mp4",
    poster: "/malice-and-mercy.png",
    label: "Malice and Mercy gameplay",
  },
}

/** More of each project's own pictures, shown as a strip on its case study. */
export const gallery: Record<string, Still[]> = {
  "bugged-out": [
    { src: "/HomeTopics/Games/bugged-out-gameplay.png", alt: "A Bugged Out level" },
    { src: "/achievement-patch-notes-jam.png", alt: "Patch Notes Game Jam logo", fit: "contain" },
  ],
  "open-stage": [
    { src: "/HomeTopics/Apps/open-stage-dashboard.png", alt: "Open Stage dashboard" },
    { src: "/HomeTopics/Design/open-stage-figma-flows.png", alt: "Open Stage flows in Figma" },
  ],
  "robotic-dog": [
    { src: "/HomeTopics/Robotics/computer-vision-robot-front.png", alt: "The first version, on wheels" },
  ],
}

export const heroReel = ["bugged-out", "open-stage", "robotic-dog", "space-looper"]

export { contact, featuredProjects, posts, projects } from "../(portfolio)/data"
