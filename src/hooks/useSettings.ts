import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { THEMES, themeById, type ThemeDef } from "../data/themes";

export interface Settings {
  /** Current theme id (a ThemeDef id). */
  theme: string;
  /** Resolved theme metadata. */
  themeInfo: ThemeDef;
  /** Root font size in px. */
  fontSize: number;
  setTheme: (id: string) => void;
  setFontSize: (px: number) => void;
  reset: () => void;
}

const STORAGE_KEY = "terminator.settings.v1";

/** Default font size — must match the `html { font-size }` in index.css. */
export const DEFAULT_FONT_SIZE = 17;
export const FONT_SIZE_MIN = 13;
export const FONT_SIZE_MAX = 26;

/** One-tap presets offered on the settings screen. */
export const FONT_PRESETS = [
  { size: 14, label: "small" },
  { size: DEFAULT_FONT_SIZE, label: "normal" },
  { size: 20, label: "large" },
  { size: 23, label: "xl" },
];

interface Persisted {
  theme: string;
  fontSize: number;
}

function load(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Persisted>;
      const fontSize = Number(parsed.fontSize);
      return {
        theme: themeById(typeof parsed.theme === "string" ? parsed.theme : "").id,
        fontSize:
          Number.isFinite(fontSize) &&
          fontSize >= FONT_SIZE_MIN &&
          fontSize <= FONT_SIZE_MAX
            ? fontSize
            : DEFAULT_FONT_SIZE,
      };
    }
  } catch {
    // Corrupt or unavailable storage — fall through to defaults.
  }
  return { theme: THEMES[0].id, fontSize: DEFAULT_FONT_SIZE };
}

/**
 * Terminal look & feel: theme + font size, persisted in localStorage.
 *
 * Applies the theme via a `data-theme` attribute on <html> (which flips every
 * `--color-term-*` variable) and the font size via an inline root font-size —
 * the same single knob the rest of the app's rem-based type scales from.
 */
export function useSettings(): Settings {
  const [settings, setSettings] = useState<Persisted>(load);

  // useLayoutEffect: apply before paint so a saved theme never flashes.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.theme, settings.fontSize]);

  // Persist after every change (kept out of the updater to stay pure).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable (private mode etc.) — session-only is fine.
    }
  }, [settings]);

  const update = useCallback((patch: Partial<Persisted>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  return {
    theme: settings.theme,
    themeInfo: themeById(settings.theme),
    fontSize: settings.fontSize,
    setTheme: (id) => update({ theme: themeById(id).id }),
    setFontSize: (px) =>
      update({
        fontSize: Math.min(FONT_SIZE_MAX, Math.max(FONT_SIZE_MIN, Math.round(px))),
      }),
    reset: () => update({ theme: THEMES[0].id, fontSize: DEFAULT_FONT_SIZE }),
  };
}
