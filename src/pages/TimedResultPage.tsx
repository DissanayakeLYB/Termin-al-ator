import { useEffect, useRef, useState } from "react";
import type { QuizApi } from "../hooks/useQuiz";
import type { PracticeHistory } from "../hooks/usePracticeHistory";
import type { TimedFinishReason } from "./TimedQuizPage";
import type { TimedLevel } from "./TimedSetupPage";
import { categoryLabels, type Category } from "../data/questions";
import { levelInfo } from "../data/levels";
import { isMenuCommand, isSettingsCommand } from "../utils/commands";
import { formatClock } from "../utils/timed";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

export type TimedRunKind = "daily" | "sprint" | "blitz";

/** The latest attempt for each question answered wrong this session. */
function latestMissed(attempts: QuizApi["attempts"]) {
  const byId = new Map<string, QuizApi["attempts"][number]>();
  for (const attempt of attempts) {
    if (!attempt.correct) byId.set(attempt.question.id, attempt);
  }
  return [...byId.values()];
}

function runVerdict(accuracy: number, answered: number): string {
  if (answered === 0) return "a blink and it's over — run another session and get some reps in.";
  if (accuracy === 100) return "flawless — every single one. 🔥";
  if (accuracy >= 80) return "sharp — the reps are landing.";
  if (accuracy >= 60) return "solid grind. show up again tomorrow and it compounds.";
  return "rough session — that's exactly what practice is for.";
}

interface TimedResultPageProps {
  quiz: QuizApi;
  practice: PracticeHistory;
  kind: TimedRunKind;
  /** The tool practiced, if the run was per-tool. */
  tool?: Category | null;
  /** Level filter chosen at setup; null/'all' when levels were mixed. */
  level?: TimedLevel;
  /** How the session ended; null if unknown (shouldn't happen). */
  finish: { kind: TimedFinishReason; elapsed: number } | null;
  /** Session-mode length (drives the "of 10:00" phrasing). */
  sessionSeconds?: number;
  /** Blitz-mode pace per question. */
  perQuestionSeconds?: number;
  /** Pool size (blitz "answered N of M"). */
  poolSize?: number;
  onRestart: () => void;
  onMenu: () => void;
  onSettings?: () => void;
}

/** Concise summary after a timed session — a practice wrap-up, not a report card. */
export function TimedResultPage({
  quiz,
  practice,
  kind,
  tool = null,
  level = "all",
  finish,
  sessionSeconds,
  perQuestionSeconds,
  poolSize,
  onRestart,
  onMenu,
  onSettings,
}: TimedResultPageProps) {
  const { attempts, score, answered, accuracy, hintsUsed } = quiz;
  const missed = latestMissed(attempts);
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBlitz = kind === "blitz";
  const label = tool ? categoryLabels[tool] : null;
  const levelName = level === "all" ? null : levelInfo(level).name;
  const timedOut = finish?.kind === "timeup";
  const elapsed = finish?.elapsed ?? 0;
  const duration = sessionSeconds ?? 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const handleSubmit = () => {
    const cmd = value.trim();
    if (!cmd) {
      // Just pressing enter runs it again (the primary action).
      onRestart();
      return;
    }
    if (isMenuCommand(cmd)) {
      onMenu();
      return;
    }
    if (isSettingsCommand(cmd)) {
      setNotice(null);
      setValue("");
      onSettings?.();
      return;
    }
    setNotice(`unknown command: ${cmd} — type menu, again, or settings`);
    setValue("");
  };

  const headline = isBlitz
    ? finish?.kind === "done"
      ? `blitz complete — all ${answered} questions done at ${perQuestionSeconds ?? 0}s each. 🔥`
      : `blitz ended — you answered ${answered} of ${poolSize ?? "?"} questions at ${perQuestionSeconds ?? 0}s each.`
    : timedOut
      ? `time's up — a full ${formatClock(duration)} in the bank. Nice work.`
      : finish?.kind === "done"
        ? `pool finished — every question done in ${formatClock(elapsed)} of ${formatClock(duration)}. Great pace.`
        : `session ended — you practiced ${formatClock(elapsed)} of ${formatClock(duration)}. Every rep counts.`;

  const subject = label ? (levelName ? `${label} ${levelName}` : label) : null;
  const header =
    kind === "daily"
      ? "— ⏱ daily practice —"
      : isBlitz
        ? `— ⚡ ${subject ?? "blitz"} blitz —`
        : `— ⏱ ${subject ?? "timed"} sprint —`;

  const restartLabel = isBlitz ? "another blitz" : "another sprint";

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.3em] text-term-amber">
            {header}
          </p>

          <p className="mt-4 text-base leading-relaxed text-term-bright sm:text-lg">
            {headline}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm">
            <p className="tabular-nums">
              answered <b className="text-term-fg">{answered}</b>
            </p>
            <p className="tabular-nums">
              correct <b className="text-term-green">{score}</b>
            </p>
            <p className="tabular-nums">
              accuracy <b className="text-term-fg">{accuracy}%</b>
            </p>
            <p className="tabular-nums">
              hints{" "}
              <b className={hintsUsed > 0 ? "text-term-amber" : "text-term-dim"}>
                {hintsUsed === 0 ? "none" : hintsUsed}
              </b>
            </p>
            {practice.streak > 0 && (
              <p className="tabular-nums text-term-amber">
                🔥 {practice.streak}-day streak
              </p>
            )}
          </div>

          <p className="mt-4 text-term-bright">{runVerdict(accuracy, answered)}</p>

          {missed.length > 0 ? (
            <div className="mt-7">
              <h3 className="text-xs uppercase tracking-widest text-term-amber">
                revisit — {missed.length} to look at again
              </h3>
              <ul className="terminal-scroll mt-3 max-h-64 space-y-3 overflow-y-auto pr-2">
                {missed.map(({ question, submitted, hintsUsed: used }) => (
                  <li
                    key={question.id}
                    className="border-b border-term-edge/60 pb-3 last:border-0"
                  >
                    <p className="text-sm leading-relaxed text-term-fg/90">
                      {question.prompt}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed">
                      <span className="text-term-dim">
                        you: <s className="text-term-red/70">{submitted}</s>
                      </span>{" "}
                      <span className="text-term-dim">→ answer: </span>
                      <span className="font-semibold text-term-green">
                        {question.answer}
                      </span>
                      {used > 0 && (
                        <span className="text-term-dim">
                          {" "}· used {used} hint{used === 1 ? "" : "s"}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            answered > 0 && (
              <p className="mt-7 text-sm text-term-dim">
                nothing to revisit — every answer this session was correct. 🔥
              </p>
            )
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="primary" onClick={onRestart}>
              ↻ {restartLabel}
            </Button>
            <Button variant="ghost" onClick={onMenu}>
              ⌂ menu
            </Button>
          </div>
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={isBlitz ? 'press enter for another blitz' : 'press enter for another sprint'}
        hint={notice ?? `enter: ${isBlitz ? "another blitz" : "another sprint"} · again · r · menu: pick a tool`}
        actions={
          <>
            <Button variant="ghost" onClick={onMenu}>
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
            <Button variant="primary" onClick={onRestart}>
              ↻ again
            </Button>
          </>
        }
      />
    </div>
  );
}
