import { useEffect, useRef, useState } from "react";
import type { Category } from "../data/questions";
import { categoryLabels } from "../data/questions";
import { isBackCommand, isSettingsCommand } from "../utils/commands";
import {
  BLITZ_PRESET_SECONDS,
  DEFAULT_BLITZ_SECONDS,
  DEFAULT_SPRINT_SECONDS,
  parseDuration,
  parseSeconds,
  SPRINT_PRESET_MINUTES,
} from "../utils/timed";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

type TimedSetupMode = "session" | "blitz";

interface TimedSetupPageProps {
  mode: TimedSetupMode;
  /** The tool being practiced; null = all tools (daily sprint). */
  tool?: Category | null;
  /** Current daily-practice streak (0 when none yet). */
  streak: number;
  onStart: (seconds: number) => void;
  onBack: () => void;
  onSettings?: () => void;
}

/**
 * Setup for a timed practice session: pick a length (one-tap presets, or type
 * your own) and start. Session mode times the whole run; blitz mode times each
 * question. Framed as practice, not a test.
 */
export function TimedSetupPage({
  mode,
  tool = null,
  streak,
  onStart,
  onBack,
  onSettings,
}: TimedSetupPageProps) {
  const isBlitz = mode === "blitz";
  const [duration, setDuration] = useState(
    isBlitz ? DEFAULT_BLITZ_SECONDS : DEFAULT_SPRINT_SECONDS
  );
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toolName = tool ? categoryLabels[tool] : null;

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
    const seconds = isBlitz ? parseSeconds(raw) : parseDuration(raw);
    if (seconds !== null) {
      startWith(seconds);
      return;
    }
    setNotice(
      isBlitz
        ? `can't read "${raw}" as a pace — try 15 or 20s`
        : `can't read "${raw}" as a duration — try 12, 90s, or 2:30`
    );
    setValue("");
  };

  const bannerTag = toolName
    ? isBlitz
      ? `${toolName} blitz · per-question timer`
      : `${toolName} sprint · timed session`
    : "daily practice · timed sprint";

  const bannerCopy = toolName
    ? isBlitz
      ? `Quick-fire ${toolName}: every question gets its own countdown. When it hits zero, it counts as a miss and the next one appears — and the session ends when the question pool runs out, no repeats.`
      : `A timed ${toolName} session: questions from every level of the tool, weighted toward the commands you've missed. Pick a length or type your own.`
    : `A short, focused session: mixed questions from every tool and every level, weighted toward the commands you've missed — so the reps land where they matter. No score pressure, just steady practice. Pick a length or type your own.`;

  const presets = isBlitz ? BLITZ_PRESET_SECONDS : SPRINT_PRESET_MINUTES.map((m) => m * 60);
  const presetLabel = (seconds: number) =>
    isBlitz ? `${seconds}s` : `${seconds / 60} min`;

  const pitchCards = isBlitz
    ? [
        ["⚡", "per-question pace", "each task has its own countdown — no coasting, no long gaps"],
        ["🎯", "needs-practice first", "questions you've missed surface before new ones"],
        ["🏁", "ends when done", "no repeats — once the pool is covered, you get the summary"],
      ]
    : [
        ["⏱", "time-boxed", "a countdown that keeps the session honest — pause anytime with :pause"],
        ["🎯", "needs-practice first", "questions you've missed surface before new ones"],
        ["🏁", "summary after", "a quick recap of the session — no grades, just a streak"],
      ];

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag={bannerTag}>{bannerCopy}</BootBanner>

          {streak > 0 && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-term-amber/30 bg-term-amber/5 px-3 py-1.5 text-xs text-term-amber">
              🔥 {streak}-day streak — keep it going
            </p>
          )}

          {/* Length / pace picker */}
          <div className="mt-6">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              {isBlitz ? "pace — seconds per question" : "session length"}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {presets.map((seconds) => {
                const active = duration === seconds;
                return (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setDuration(seconds)}
                    aria-pressed={active}
                    className={`rounded-md border px-4 py-2 text-sm tabular-nums transition-colors ${
                      active
                        ? "border-term-green bg-term-green/10 font-bold text-term-green"
                        : "border-term-edge2 text-term-dim hover:border-term-green/50 hover:text-term-fg"
                    }`}
                  >
                    {presetLabel(seconds)}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-term-dim">
              {isBlitz ? (
                <>
                  type your own pace too —{" "}
                  <span className="text-term-amber">15</span> or{" "}
                  <span className="text-term-amber">20s</span>
                </>
              ) : (
                <>
                  type your own too —{" "}
                  <span className="text-term-amber">12</span> (minutes),{" "}
                  <span className="text-term-amber">90s</span>, or{" "}
                  <span className="text-term-amber">2:30</span>
                </>
              )}
            </p>
          </div>

          {/* What you get */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {pitchCards.map(([icon, title, desc]) => (
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
        placeholder={
          isBlitz
            ? "pace in seconds (default 15) — or just press enter"
            : `duration (default 10 min) — or just press enter`
        }
        hint={
          notice ??
          (isBlitz
            ? `presets: ${BLITZ_PRESET_SECONDS.join(" · ")}s per question — type your own (15, 20s) · back: menu`
            : `presets: ${SPRINT_PRESET_MINUTES.join(" · ")} min — type your own (12, 90s, 2:30) · back: menu`)
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
