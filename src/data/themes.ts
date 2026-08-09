/**
 * Terminal themes.
 *
 * Each theme overrides the `--color-term-*` CSS variables (see index.css) via
 * a `[data-theme="..."]` block on <html>, so every Tailwind utility that uses
 * term-* colors flips instantly. `accentRgb` powers the neon glows, grid and
 * selection tint that can't use the color utilities directly.
 */
export interface ThemeDef {
  /** data-theme attribute value, also persisted in localStorage. */
  id: string;
  name: string;
  /** One-line pitch for the theme picker. */
  tagline: string;
  /** "r g b" triplet of the accent color, for rgb(var(...)/alpha) glows. */
  accentRgb: string;
  /** Swatch colors for the picker card preview. */
  preview: {
    bg: string;
    fg: string;
    accent: string;
    dim: string;
    amber: string;
  };
}

export const THEMES: ThemeDef[] = [
  {
    id: "matrix",
    name: "matrix green",
    tagline: "the classic phosphor green on near-black",
    accentRgb: "74 222 128",
    preview: {
      bg: "#070b09",
      fg: "#d3e9dc",
      accent: "#4ade80",
      dim: "#7d9889",
      amber: "#fbbf24",
    },
  },
  {
    id: "amber",
    name: "amber crt",
    tagline: "vintage amber monitor glow",
    accentRgb: "255 176 0",
    preview: {
      bg: "#0d0a03",
      fg: "#ffe4b3",
      accent: "#ffb000",
      dim: "#a1895e",
      amber: "#ffc94d",
    },
  },
  {
    id: "ocean",
    name: "ocean cyan",
    tagline: "cool cyan on deep sea-blue",
    accentRgb: "34 211 238",
    preview: {
      bg: "#04090d",
      fg: "#d0ecf8",
      accent: "#22d3ee",
      dim: "#6f93a6",
      amber: "#fbbf24",
    },
  },
  {
    id: "mono",
    name: "paper white",
    tagline: "minimal white on black",
    accentRgb: "232 232 232",
    preview: {
      bg: "#060606",
      fg: "#e8e8e8",
      accent: "#e8e8e8",
      dim: "#8f8f8f",
      amber: "#ffbd2e",
    },
  },
];

/** Resolve a persisted theme id; falls back to the first theme for junk. */
export function themeById(id: string): ThemeDef {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
