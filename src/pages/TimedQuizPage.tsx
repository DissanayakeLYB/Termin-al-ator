import { useEffect, useRef, useState } from "react";
import { categoryLabels } from "../data/questions";
import { levelInfo } from "../data/levels";
import type { QuizApi } from "../hooks/useQuiz";
import { TIME_UP_SUBMITTED } from "../hooks/useQuiz";
import type { PracticeHistory } from "../hooks/usePracticeHistory";
import {
  isExitCommand,
  isHintCommand,
  isMenuCommand,
  isPauseCommand,
  isReviewCommand,
  isSettingsCommand,
} from "../utils/commands";
import { getHints } from "../utils/hints";
import { formatClock } from "../utils/timed";
import { answerCaseMatters } from "../utils/validate";
import { EXIT_REVIEW_KEY, isHintKey } from "../utils/shortcuts";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { Feedback } from "../components/Feedback";
import { InputBar } from "../components/InputBar";
import { ReviewLine } from "../components/ReviewLine";

export type TimedFinishReason = "timeup" | "quit" | "done";

interface TimedQuizPageProps {
  quiz: QuizApi;
  practice: PracticeHistory;
  /** Session mode: total sprint length. */
  sessionSeconds?: number;
  /** Blitz mode: seconds allowed per question. */
  perQuestionSeconds?: number;
  /** Total pool size (shown in the blitz progress counter). */
  poolSize?: number;
  /** True while the settings overlay is open — the clock auto-pauses. */
  settingsOpen?: boolean;
  /** Called exactly once when the sprint ends (time up, :quit, or pool done). */
  onFinish: (reason: TimedFinishReason, elapsedSeconds: number) => void;
  onMenu: () => void;
  onSettings?: () => void;
}

/**
 * Timed practice. Two clock shapes:
 * - session mode: one countdown for the whole run (pause freezes it);
 * - blitz mode: each question gets its own countdown; expiry records a miss.
 * In both, the session ends (auto-summary) when the question pool runs out.
 */
export function TimedQuizPage({
  quiz,
  practice,
  sessionSeconds,
  perQuestionSeconds,
  poolSize,
  settingsOpen = false,
  onFinish,
  onMenu,
  onSettings,
}: TimedQuizPageProps) {
  const { current, taskNumber, attempts, result, isLastQuestion, submit, timeUp, next } = quiz;
  const isBlitz = perQuestionSeconds !== undefined;
  const clockSeconds = isBlitz ? (perQuestionSeconds ?? 0) : (sessionSeconds ?? 0);

  const [remaining, setRemaining] = useState(clockSeconds);
  const [paused, setPaused] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);

  // Clock bookkeeping (refs so the interval never goes stale).
  const remainingRef = useRef(clockSeconds);
  const lastTickRef = useRef(Date.now());
  const pausedRef = useRef(false);
  const endedRef = useRef(false);
  const hintCountRef = useRef(0);
  /** Guards against the blitz clock firing a second time-up for one question. */
  const timedOutRef = useRef(false);
  /** Whether the current question already has a result (stops the blitz clock). */
  const resultRef = useRef(result);
  resultRef.current = result;
  // Restores the pre-settings pause state when the overlay closes.
  const wasPausedRef = useRef<boolean | null>(null);

  // Keep latest callbacks readable from the interval without re-registering it.
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;
  const quitRef = useRef(quiz.quit);
  quitRef.current = quiz.quit;
  const timeUpRef = useRef(timeUp);
  timeUpRef.current = timeUp;

  const lvl = levelInfo(current.level);
  const hints = getHints(current);
  const hintsExhausted = hintCount >= hints.length;
  const lowTime = isBlitz ? remaining <= 10 : remaining <= 60;
  const criticalTime = isBlitz ? remaining <= 5 : remaining <= 30;

  // Fresh input + focus for each new task, release the submit lock, and (blitz)
  // reset the per-question clock.
  useEffect(() => {
    setValue("");
    setHintCount(0);
    setReviewing(false);
    lockedRef.current = false;
    hintCountRef.current = 0;
    timedOutRef.current = false;
    inputRef.current?.focus();
    if (isBlitz) {
      remainingRef.current = perQuestionSeconds ?? 0;
      lastTickRef.current = Date.now();
      setRemaining(perQuestionSeconds ?? 0);
    }
  }, [current.id, isBlitz, perQuestionSeconds]);

  useEffect(() => {
    if (!result) lockedRef.current = false;
  }, [result]);

  // The countdown — delta-based so throttled tabs never drift it.
  useEffect(() => {
    lastTickRef.current = Date.now();
    const id = window.setInterval(() => {
      if (pausedRef.current || endedRef.current) return;
      if (isBlitz && (resultRef.current || timedOutRef.current)) return;
      const now = Date.now();
      const delta = (now - lastTickRef.current) / 1000;
      if (delta < 0.05) return;
      lastTickRef.current = now;
      const nextRemaining = Math.max(0, remainingRef.current - delta);
      remainingRef.current = nextRemaining;
      setRemaining(nextRemaining);
      if (nextRemaining <= 0) {
        if (isBlitz) {
          // Per-question clock expired: record it as a miss, show the answer.
          timedOutRef.current = true;
          remainingRef.current = 0;
          setRemaining(0);
          timeUpRef.current(hintCountRef.current);
        } else {
          // Session clock expired: wrap the whole sprint up.
          endedRef.current = true;
          pausedRef.current = true;
          setPaused(true);
          onFinishRef.current("timeup", clockSeconds);
          quitRef.current();
        }
      }
    }, 250);
    return () => window.clearInterval(id);
    // The interval intentionally depends only on the clock limit: every
    // mutable value it reads lives in refs (remaining/paused/ended/result +
    // the latest timeUp/quit/onFinish callbacks), so it never goes stale.
  }, [clockSeconds, isBlitz]);

  // Auto-pause while the settings overlay is open; restore on close.
  useEffect(() => {
    if (settingsOpen) {
      wasPausedRef.current = pausedRef.current;
      if (!pausedRef.current) {
        pausedRef.current = true;
        setPaused(true);
      }
    } else if (wasPausedRef.current !== null) {
      setPaused(wasPausedRef.current);
      pausedRef.current = wasPausedRef.current;
      lastTickRef.current = Date.now();
      wasPausedRef.current = null;
    }
  }, [settingsOpen]);

  // Hiding the tab pauses the clock too — a timer that runs while you're
  // away isn't honest.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && !pausedRef.current) {
        pausedRef.current = true;
        setPaused(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Keep the terminal scrolled sensibly.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = reviewing || !result ? 0 : el.scrollHeight;
  }, [attempts.length, current.id, result, reviewing]);

  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    if (!next) lastTickRef.current = Date.now();
    setPaused(next);
  };

  const endSession = (reason: TimedFinishReason) => {
    if (endedRef.current) return;
    endedRef.current = true;
    const elapsed =
      clockSeconds - Math.max(0, Math.round(remainingRef.current));
    onFinishRef.current(reason, elapsed);
    quitRef.current();
  };

  const revealHint = () => {
    if (result || hintsExhausted) return;
    const nextCount = hintCount + 1;
    hintCountRef.current = nextCount;
    setHintCount(nextCount);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    const input = value;
    if (isExitCommand(input)) {
      endSession("quit");
      return;
    }
    if (isMenuCommand(input)) {
      onMenu();
      return;
    }
    if (isSettingsCommand(input)) {
      setValue("");
      onSettings?.();
      return;
    }
    if (reviewing) {
      setReviewing(false);
      setValue("");
      return;
    }
    if (isHintCommand(input)) {
      revealHint();
      setValue("");
      return;
    }
    if (isReviewCommand(input)) {
      setReviewing(true);
      setValue("");
      return;
    }
    if (isPauseCommand(input)) {
      setValue("");
      togglePause();
      return;
    }
    if (paused) {
      // The paused placeholder invites Enter to resume — an empty input
      // does that. Typed text still submits normally (graded while the
      // clock stays frozen).
      if (!input.trim()) {
        setValue("");
        togglePause();
        return;
      }
    }
    if (result) {
      // Last question in the pool: wrap up with the summary instead of
      // showing repeats (the pool never reshuffles in timed modes).
      if (isLastQuestion) {
        endSession("done");
      } else {
        next();
      }
      return;
    }
    if (lockedRef.current) return;
    if (timedOutRef.current) return;
    if (!input.trim()) return;
    const accepted = submit(input, hintCount);
    if (accepted !== null) {
      setValue(input.trim());
      lockedRef.current = true;
      practice.record(current.id, accepted);
    }
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => {
        if (window.getSelection()?.toString()) return;
        inputRef.current?.focus();
      }}
      onKeyDown={(e) => {
        // Keyboard-first: Tab reveals the next hint, Escape leaves review.
        if (isHintKey(e) && !result && !reviewing) {
          e.preventDefault();
          revealHint();
        } else if (e.key === EXIT_REVIEW_KEY && reviewing) {
          e.preventDefault();
          setValue("");
          setReviewing(false);
        }
      }}
    >
      <div
        ref={scrollRef}
        className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="w-full">
          <BootBanner tag={isBlitz ? "blitz · per-question timer" : "timed practice · session timer"}>
            {isBlitz ? (
              <>
                Each question has its own countdown — when it hits zero it
                counts as a miss and the next appears. The session ends when
                the pool runs out, no repeats.{" "}
                <span className="text-term-amber">:hint</span> for a clue,{" "}
                <span className="text-term-amber">:pause</span> to freeze,
                <span className="text-term-amber"> :quit</span> to end.
              </>
            ) : (
              <>
                Answer as many as you can before the clock runs out, weighted
                toward what you've missed. Type{" "}
                <span className="text-term-amber">:hint</span> for a clue,{" "}
                <span className="text-term-amber">:back</span> to review,{" "}
                <span className="text-term-amber">:pause</span> to freeze the
                clock, <span className="text-term-amber">:quit</span> to end.
              </>
            )}
          </BootBanner>

          {/* Countdown row — clock, progress bar, questions completed */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-term-edge bg-term-panel/60 px-4 py-3">
            <span
              className={`text-2xl font-bold tabular-nums leading-none ${
                paused
                  ? "text-term-dim"
                  : criticalTime
                    ? "animate-pulse text-term-red"
                    : lowTime
                      ? "text-term-amber"
                      : "text-term-green"
              }`}
              role="timer"
              aria-label={`${paused ? "paused at" : isBlitz ? "seconds left on this question" : "time remaining"} ${formatClock(remaining)}`}
            >
              {paused ? "⏸" : isBlitz ? "⚡" : "⏱"} {formatClock(remaining)}
            </span>
            <div
              className="h-1.5 w-full max-w-56 overflow-hidden rounded-full border border-term-edge bg-term-bg sm:w-56"
              aria-hidden="true"
            >
              <div
                className="h-full bg-term-green transition-[width] duration-300 ease-linear"
                style={{ width: `${(remaining / clockSeconds) * 100}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-term-dim">
              {isBlitz && poolSize ? (
                <>
                  answered <b className="text-term-fg">{taskNumber - 1}</b>
                  <span className="text-term-dim">/{poolSize}</span>
                </>
              ) : (
                <>
                  answered <b className="text-term-fg">{taskNumber - 1}</b>
                </>
              )}
            </span>
            <span className="ml-auto flex items-center gap-2">
              {onSettings && (
                <Button
                  variant="ghost"
                  className="px-3 py-1 text-xs"
                  onClick={onSettings}
                  aria-label="settings"
                  title="settings: font size + theme (clock auto-pauses)"
                >
                  ⚙
                </Button>
              )}
              {paused ? (
                <Button
                  variant="ghost"
                  className="px-3 py-1 text-xs"
                  onClick={togglePause}
                  aria-label="resume the clock"
                >
                  ▶ resume
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="px-3 py-1 text-xs"
                  onClick={togglePause}
                  aria-label="pause the clock"
                >
                  ⏸ pause
                </Button>
              )}
            </span>
          </div>

          {paused && !result && (
            <p className="mt-3 rounded-md border border-term-amber/30 bg-term-amber/5 px-3 py-2 text-xs text-term-amber sm:text-sm">
              ⏸ paused — the clock is frozen. type{" "}
              <span className="font-semibold">:resume</span> (or{" "}
              <span className="font-semibold">:continue</span>) or press the
              resume button when you're ready.
            </p>
          )}

          {reviewing ? (
            /* Review panel — every past answer with explanation + hints. */
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.625rem] uppercase tracking-widest text-term-amber">
                  review — past answers
                </p>
                <Button
                  variant="ghost"
                  className="px-3 py-1 text-xs"
                  onClick={() => {
                    setValue("");
                    setReviewing(false);
                  }}
                >
                  → current task
                </Button>
              </div>
              <div className="mt-4 space-y-6 border-t border-term-edge/60 pt-4">
                {attempts.map((attempt, i) => (
                  <ReviewLine
                    key={`${attempt.question.id}-${i}`}
                    attempt={attempt}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Current task — one question per screen. */
            <div className="mt-6 border-l-2 border-term-green pl-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
                  task {taskNumber} · {categoryLabels[current.category]} ·{" "}
                  <span className={lvl.accent}>{lvl.name}</span>
                  {practice.missCount(current.id) > 0 && (
                    <span className="text-term-amber"> · 🔁 needs practice</span>
                  )}
                  {answerCaseMatters(current) && (
                    <span className="text-term-amber"> · case matters</span>
                  )}
                </p>
                {attempts.length > 0 && (
                  <Button
                    variant="ghost"
                    className="shrink-0 px-3 py-1 text-xs"
                    onClick={() => {
                      setValue("");
                      setReviewing(true);
                    }}
                    aria-label="review past answers"
                  >
                    ‹ back · past answers
                  </Button>
                )}
              </div>
              <h2 className="mt-1.5 text-base leading-relaxed text-term-fg sm:text-lg">
                {current.prompt}
              </h2>

              {!result && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    className="px-3 py-1 text-xs"
                    onClick={revealHint}
                    disabled={hintsExhausted}
                    aria-label="reveal a hint"
                  >
                    {hintCount === 0
                      ? "hint?"
                      : hintsExhausted
                        ? "hints used"
                        : `hint ${hintCount}/${hints.length}`}
                  </Button>
                  {hintCount > 0 && (
                    <p
                      className="border-l-2 border-term-amber/50 pl-3 text-xs leading-relaxed text-term-amber/90 sm:text-sm"
                      role="status"
                    >
                      hint {hintCount}/{hints.length}: {hints[hintCount - 1]}
                    </p>
                  )}
                </div>
              )}

              {result && (
                <div className="mt-4 space-y-3">
                  {result.submitted === TIME_UP_SUBMITTED ? (
                    /* Per-question clock expired — the answer is revealed. */
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-md border-l-4 border-term-amber bg-term-amber/10 p-4"
                    >
                      <p className="font-bold text-term-amber">⏱ Time's up</p>
                      <p className="mt-2 text-sm leading-relaxed text-term-fg/85">
                        The answer was{" "}
                        <code className="mx-1 inline-block rounded border border-term-green/40 bg-term-bg px-1.5 py-0.5 align-middle font-mono text-xs text-term-green">
                          {current.answer}
                        </code>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-term-fg/65">
                        {current.explanation}
                      </p>
                    </div>
                  ) : (
                    <Feedback result={result} question={current} />
                  )}

                  {/* Reveal the hints only when they were requested AND it was
                      still wrong — right answers don't need them. */}
                  {result.hintsUsed > 0 && !result.correct && hints.length > 0 && (
                    <div className="rounded-md border border-term-amber/30 bg-term-amber/5 p-3">
                      <p className="text-[0.625rem] uppercase tracking-widest text-term-amber">
                        hints for this question
                      </p>
                      <ul className="mt-1.5 space-y-1">
                        {hints.map((hint, i) => (
                          <li
                            key={i}
                            className="text-xs leading-relaxed text-term-amber/90 sm:text-sm"
                          >
                            {i + 1}. {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Command help bar — the same helpers the classic sessions show. */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-term-edge bg-term-bg px-4 py-2 text-xs text-term-dim sm:px-8">
        <span
          className={`font-semibold uppercase tracking-wider ${
            isBlitz ? "text-term-amber" : "text-term-green"
          }`}
        >
          {isBlitz ? "⚡ blitz" : "⏱ sprint"}
        </span>
        {paused ? (
          <span className="text-term-amber">⏸ paused</span>
        ) : (
          <span className="tabular-nums">
            {formatClock(remaining)} left
          </span>
        )}
        <span className="ml-auto hidden md:inline">
          enter: submit / next · <span className="text-term-amber">tab: hint</span> ·{" "}
          <span className="text-term-amber">back</span>{" "}
          {reviewing ? "current task" : "review"} ·{" "}
          <span className="text-term-amber">:pause</span>{" "}
          {paused ? "resume" : "freeze"} ·{" "}
          <span className="text-term-amber">:quit</span> end ·{" "}
          <span className="text-term-amber">:menu</span> switch
        </span>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={
          paused
            ? "paused — press enter or type :resume to continue"
            : reviewing
              ? "press enter to return to the task"
              : result
                ? "press enter for the next question"
                : "type the command…"
        }
        readOnly={result !== null && !reviewing && !paused}
        hint={
          <span className="sm:hidden">
            enter: submit / next · <span className="text-term-amber">tab: hint</span> ·{" "}
            <span className="text-term-amber">back</span>{" "}
            {reviewing ? "current task" : "review"} ·{" "}
            <span className="text-term-amber">:pause</span>{" "}
            {paused ? "resume" : "freeze"} ·{" "}
            <span className="text-term-amber">:quit</span> end
          </span>
        }
        actions={
          reviewing ? (
            <Button
              variant="ghost"
              onClick={() => {
                setValue("");
                setReviewing(false);
              }}
            >
              → current task
            </Button>
          ) : result ? (
            <Button variant="ghost" onClick={next}>
              next →
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
