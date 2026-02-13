"use client"

import { useTheme } from "next-themes"

interface SceneColors {
  background: string
  fog: string
  star: string
  nebula: readonly string[]
  orb: readonly string[]
  staticOrbs: readonly { color: string; blur: string }[]
}

const darkColors: SceneColors = {
  background: "#030014",
  fog: "#030014",
  star: "#ffffff",
  nebula: ["#7c3aed", "#6366f1", "#ec4899"],
  orb: ["#7c3aed", "#6366f1", "#ec4899"],
  staticOrbs: [
    { color: "bg-purple-500/10", blur: "blur-[120px]" },
    { color: "bg-indigo-500/10", blur: "blur-[120px]" },
    { color: "bg-pink-500/10", blur: "blur-[120px]" },
  ],
}

const lightColors: SceneColors = {
  background: "#f5f0eb",
  fog: "#f5f0eb",
  star: "#6366f1",
  nebula: ["#a78bfa", "#818cf8", "#f472b6"],
  orb: ["#a78bfa", "#818cf8", "#f472b6"],
  staticOrbs: [
    { color: "bg-purple-300/15", blur: "blur-[120px]" },
    { color: "bg-indigo-300/15", blur: "blur-[120px]" },
    { color: "bg-pink-300/15", blur: "blur-[120px]" },
  ],
}

export type { SceneColors }

export function useSceneColors(): SceneColors {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === "dark" ? darkColors : lightColors
}
