/**
 * Dean StoryFilm AI — design tokens.
 *
 * Single source of truth for brand color/type, since arbitrary Tailwind
 * color classes aren't reliable across every build setup — components read
 * these directly rather than re-declaring hex values inline.
 */
export const tokens = {
  color: {
    bg: "#0b0b0f",
    panel: "#141419",
    panelAlt: "#191922",
    border: "#232330",
    borderLight: "#2c2c3a",
    text: "#f2f1f7",
    textDim: "#8b8a9a",
    textFaint: "#5c5b6b",
    purple: "#8b5cf6",
    purpleDim: "rgba(139,92,246,0.14)",
    neon: "#4cc9f0",
    emerald: "#34d399",
    crimson: "#f43f5e",
    emberGoldStart: "#f5c542",
    emberEnd: "#e0562f",
  },
  font: {
    display: "'Chakra Petch', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
} as const;

export type RenderStatus = "queued" | "rendering" | "completed" | "failed" | "paused";

export const STATUS_META: Record<RenderStatus, { label: string; color: string }> = {
  queued: { label: "Queued", color: tokens.color.textDim },
  rendering: { label: "Rendering", color: tokens.color.emberEnd },
  paused: { label: "Paused", color: tokens.color.neon },
  completed: { label: "Completed", color: tokens.color.emerald },
  failed: { label: "Failed", color: tokens.color.crimson },
};
