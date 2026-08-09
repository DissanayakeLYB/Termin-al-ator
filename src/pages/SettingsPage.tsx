import { useCallback, useEffect, useRef, useState } from "react";
import type { Settings } from "../hooks/useSettings";
import { FONT_PRESETS, FONT_SIZE_MAX, FONT_SIZE_MIN } from "../hooks/useSettings";
import { THEMES } from "../data/themes";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface SettingsPageProps {
  settings: Settings;
  onClose: () => void;
}

/**
 * Full-screen terminal settings: font size + theme, applied live and saved in
 * the browser. Feels like tweaking your own terminal — A−/A+ for size, swatch
 * cards for the palette. Closes with esc, `back`, or any submit.
 */
export function SettingsPage({ settings, onClose }: SettingsPageProps) {
  const { theme, themeInfo, fontSize, setTheme, setFontSize, reset } = settings;
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Remember what was focused underneath so closing hands focus back — the
  // quiz input is keyboard-first and should keep working after a settings trip.
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Restore focus to the underlying screen, then close the overlay.
  const close = useCallback(() => {
    prevFocusRef.current?.focus();
    onClose();
  }, [onClose]);

  // Keep the latest close callable from the one-time-registered esc listener
  // without re-running the effect (which would steal focus back to this input
  // after every App re-render, e.g. on each theme click).
  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    // Capture only on first mount — the element focused before the overlay.
    if (prevFocusRef.current === null) {
      prevFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const step = (delta: number) => setFontSize(fontSize + delta);

  return (
    <div className="crt-grid fixed inset-0 z-50 flex flex-col bg-term-bg text-term-fg">
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag="settings — make it yours">
            Font size and theme apply instantly and save automatically. Choose
            like you're configuring a real terminal — type{" "}
            <span className="text-term-amber">back</span> or press{" "}
            <span className="text-term-amber">esc</span> to return.
          </BootBanner>

          {/* Font size */}
          <section className="mt-6">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              font size
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => step(-1)}
                disabled={fontSize <= FONT_SIZE_MIN}
                aria-label="decrease font size"
              >
                A−
              </Button>
              <span className="w-14 text-center text-sm font-bold tabular-nums text-term-green">
                {fontSize}px
              </span>
              <Button
                variant="ghost"
                onClick={() => step(1)}
                disabled={fontSize >= FONT_SIZE_MAX}
                aria-label="increase font size"
              >
                A+
              </Button>
              <span className="mx-1 h-5 w-px bg-term-edge2" aria-hidden="true" />
              {FONT_PRESETS.map((preset) => (
                <button
                  key={preset.size}
                  type="button"
                  onClick={() => setFontSize(preset.size)}
                  aria-pressed={fontSize === preset.size}
                  className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                    fontSize === preset.size
                      ? "border-term-green bg-term-green/10 text-term-green"
                      : "border-term-edge2 text-term-dim hover:border-term-green/50 hover:text-term-fg"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </section>

          {/* Theme picker */}
          <section className="mt-8">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              theme — currently {themeInfo.name}
            </p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {THEMES.map((t) => {
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id)}
                    aria-pressed={active}
                    className={`rounded-md border p-3 text-left transition-colors ${
                      active
                        ? "border-term-green bg-term-panel2"
                        : "border-term-edge2 hover:border-term-green/50 hover:bg-term-panel/60"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-bold ${
                          active ? "text-term-green" : "text-term-fg"
                        }`}
                      >
                        {t.name}
                      </span>
                      {active && (
                        <span className="text-term-green" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </span>
                    <span
                      className="mt-2 flex items-center gap-1.5"
                      aria-hidden="true"
                    >
                      {[t.preview.bg, t.preview.accent, t.preview.amber, t.preview.fg, t.preview.dim].map(
                        (color, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-sm border border-black/40"
                            style={{ background: color }}
                          />
                        )
                      )}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-term-dim">
                      {t.tagline}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Live preview */}
          <section className="mt-8">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              live preview
            </p>
            <div className="mt-2 rounded-md border border-term-edge2 bg-term-bg p-4">
              <p className="text-sm">
                <span className="text-term-green">❯</span>{" "}
                <span className="text-term-green">echo</span>{" "}
                <span className="text-term-amber">"hello, terminal"</span>
              </p>
              <p className="mt-1 text-sm text-term-bright">hello, terminal</p>
              <p className="mt-1 text-xs text-term-dim">
                — {themeInfo.name} · {fontSize}px
              </p>
            </div>
          </section>

          <div className="mt-8">
            <Button variant="ghost" onClick={reset}>
              ↺ reset to defaults
            </Button>
          </div>
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={() => {
          setValue("");
          close();
        }}
        placeholder="type back, or just press enter to close"
        hint="back · esc · close — your changes are saved as you go"
        actions={
          <Button variant="primary" onClick={close}>
            close
          </Button>
        }
      />
    </div>
  );
}
