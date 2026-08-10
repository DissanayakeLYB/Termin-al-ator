import { useEffect, useRef, useState } from "react";
import { isBackCommand, isSettingsCommand } from "../utils/commands";
import { DEFAULT_SPRINT_SECONDS, parseDuration, SPRINT_PRESET_MINUTES } from "../utils/timed";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface TimedSetupPageProps {
  /** Current daily-practice streak (0 when none yet). */
  streak: number;
  onStart: (seconds: number) => void;
  onBack: () => void;
  onSettings?: () => void;
}

/**
 * Setup for the timed daily-practice sprint: pick a duration (one-tap
 * presets, or type your own) and start. Framed as a daily routine, not a
 * test — a short focused session across every tool and level.
 */
export function TimedSetupPage({ streak, onStart, onBack, onSettings }: TimedSetupPageProps) {
  const [duration, setDuration] = useState(DEFAULT_SPRINT_SECONDS);
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const startWith = (seconds: number) => {
    setNotice(null);
    setValue("");
    onStart(seconds);
  };

  const handleSubmit = () => {
    const raw = value.trim();
    if (!raw) {
      startWith(duration);
      return;
    }
    if (isSettingsCommand(raw)) {
      setValue("");
      onSettings?.();
      return;
    }
    if (isBackCommand(raw)) {
      onBack();
      return;
    }
    const seconds = parseDuration(raw);
    if (seconds !== null) {
      startWith(seconds);
      return;
    }
    setNotice(`can't read "${raw}" as a duration — try 12, 90s, or 2:30`);
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag="daily practice · timed sprint">
            A short, focused session: mixed questions from{" "}
            <span className="text-term-green">every tool</span> and{" "}
            <span className="text-term-green">every level</span>, weighted
            toward the commands you've missed — so the reps land where they
            matter. No score pressure, just steady practice. Pick a length or
            type your own.
          </BootBanner>

          {streak > 0 && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-term-amber/30 bg-term-amber/5 px-3 py-1.5 text-xs text-term-amber">
              🔥 {streak}-day streak — keep it going
            </p>
          )}

          {/* Duration presets */}
          <div className="mt-6">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              sprint length
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {SPRINT_PRESET_MINUTES.map((minutes) => {
                const seconds = minutes * 60;
                const active = duration === seconds;
                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => setDuration(seconds)}
                    aria-pressed={active}
                    className={`rounded-md border px-4 py-2 text-sm tabular-nums transition-colors ${
                      active
                        ? "border-term-green bg-term-green/10 font-bold text-term-green"
                        : "border-term-edge2 text-term-dim hover:border-term-green/50 hover:text-term-fg"
                    }`}
                  >
                    {minutes} min
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-term-dim">
              type your own too —{" "}
              <span className="text-term-amber">12</span> (minutes),{" "}
              <span className="text-term-amber">90s</span>, or{" "}
              <span className="text-term-amber">2:30</span>
            </p>
          </div>

          {/* What you get */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["⏱", "time-boxed", "a countdown that keeps the session honest — pause anytime with :pause"],
              ["🎯", "needs-practice first", "questions you've missed surface before new ones"],
              ["🏁", "summary after", "a quick recap of the sprint — no grades, just a streak"],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="rounded-md border border-term-edge bg-term-panel/50 p-3"
              >
                <p className="text-sm font-bold text-term-fg">
                  <span className="mr-1.5">{icon}</span>
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-term-dim">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={`duration (default 10 min) — or just press enter`}
        hint={
          notice ??
          `presets: ${SPRINT_PRESET_MINUTES.join(" · ")} min — type your own (12, 90s, 2:30) · back: menu`
        }
        actions={
          <>
            <Button variant="ghost" onClick={onBack}>
              ⌂ menu
            </Button>
            {onSettings && (
              <Button
                variant="ghost"
                onClick={onSettings}
                aria-label="settings"
                title="settings: font size + theme"
              >
                ⚙
              </Button>
            )}
            <Button variant="primary" onClick={() => startWith(duration)}>
              start →
            </Button>
          </>
        }
      />
    </div>
  );
}
