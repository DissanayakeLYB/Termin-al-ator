import { useEffect, useRef, useState } from "react";
import type { Category, Level } from "../data/questions";
import { categoryLabels, questionSets } from "../data/questions";
import { countForLevel, levelInfo, levelInfos } from "../data/levels";
import { isBackCommand, isSettingsCommand } from "../utils/commands";
import {
  BLITZ_PRESET_SECONDS,
  DEFAULT_BLITZ_SECONDS,
  DEFAULT_SPRINT_SECONDS,
  parseDuration,
  parseSeconds,
  SPRINT_PRESET_MINUTES,
} from "../utils/timed";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { PageHeader } from "../components/PageHeader";

type TimedSetupMode = "session" | "blitz";

/**
 * A practice level, or "all" to mix every level of the tool (the timed
 * equivalent of the chaos session — hints stay available).
 */
export type TimedLevel = Level | "all";

interface TimedSetupPageProps {
  mode: TimedSetupMode;
  /** The tool being practiced; null = all tools (daily sprint). */
  tool?: Category | null;
  /** Current daily-practice streak (0 when none yet). */
  streak: number;
  onStart: (seconds: number, level: TimedLevel) => void;
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
  const [level, setLevel] = useState<TimedLevel>("all");
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toolName = tool ? categoryLabels[tool] : null;
  const levelName = level === "all" ? null : levelInfo(level).name;
  const subject = toolName ? (levelName ? `${toolName} ${levelName}` : toolName) : null;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const startWith = (seconds: number) => {
    setNotice(null);
    setValue("");
    onStart(seconds, level);
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

  const title = subject
    ? isBlitz
      ? `${subject} blitz`
      : `${subject} sprint`
    : "Daily practice";

  const subtitle = isBlitz
    ? "Each question gets its own countdown — no coasting, no long gaps."
    : "Mixed questions weighted toward the commands you've missed.";

  const presets = isBlitz ? BLITZ_PRESET_SECONDS : SPRINT_PRESET_MINUTES.map((m) => m * 60);
  const presetLabel = (seconds: number) =>
    isBlitz ? `${seconds}s` : `${seconds / 60} min`;

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <PageHeader
        title={title}
        subtitle={subtitle}
        onBack={onBack}
        backLabel="⌂ menu"
        onSettings={onSettings}
        actions={
          streak > 0 ? (
            <span className="rounded-full border border-term-amber/30 bg-term-amber/5 px-2.5 py-1 text-[0.6875rem] text-term-amber">
              🔥 {streak}
            </span>
          ) : null
        }
      />

      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Length / pace picker */}
          <section>
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-dim/70">
              {isBlitz ? "pace — seconds per question" : "session length"}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {presets.map((seconds) => {
                const active = duration === seconds;
                return (
                  <button
                    key={seconds}
                    type="button"
                    onClick={() => setDuration(seconds)}
                    aria-pressed={active}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-sm tabular-nums transition-colors ${
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
            <p className="mt-2.5 text-xs leading-relaxed text-term-dim">
              {isBlitz ? (
                <>
                  type your own pace too —{" "}
                  <span className="text-term-amber">15</span> or{" "}
                  <span className="text-term-amber">20s</span>
                </>
              ) : (
                <>
                  type your own too — <span className="text-term-amber">12</span>{" "}
                  (minutes), <span className="text-term-amber">90s</span>, or{" "}
                  <span className="text-term-amber">2:30</span>
                </>
              )}
            </p>
          </section>

          {/* Level filter — per-tool runs can target a single level. */}
          {tool && (
            <section className="mt-8">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-dim/70">
                level
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLevel("all")}
                  aria-pressed={level === "all"}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                    level === "all"
                      ? "border-term-green bg-term-green/10 font-bold text-term-green"
                      : "border-term-edge2 text-term-dim hover:border-term-green/50 hover:text-term-fg"
                  }`}
                >
                  all levels{" "}
                  <span className="tabular-nums opacity-70">
                    ({questionSets[tool].questions.length})
                  </span>
                </button>
                {levelInfos
                  .filter((l) => l.id !== "chaos")
                  .map((info) => {
                    const count = countForLevel(questionSets[tool], info.id);
                    const active = level === info.id;
                    return (
                      <button
                        key={info.id}
                        type="button"
                        onClick={() => setLevel(info.id)}
                        aria-pressed={active}
                        className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? `${info.border} ${info.accent} bg-term-panel2 font-bold`
                            : "border-term-edge2 text-term-dim hover:border-term-green/50 hover:text-term-fg"
                        }`}
                      >
                        {info.name}{" "}
                        <span className="tabular-nums opacity-70">{count}</span>
                      </button>
                    );
                  })}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-term-dim">
                {level === "all"
                  ? "every level of this tool, shuffled together"
                  : `only ${levelName} questions — ${levelInfo(level).tagline}`}
              </p>
            </section>
          )}

          <p className="mt-8 text-xs leading-relaxed text-term-dim/70">
            {isBlitz
              ? "needs-practice first · ends when the pool runs out · summary after"
              : "time-boxed · needs-practice first · summary after — no grades"}
          </p>
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
          <Button variant="primary" onClick={() => startWith(duration)}>
            start →
          </Button>
        }
      />
    </div>
  );
}
