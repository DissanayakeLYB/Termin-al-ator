import { useEffect, useRef, useState } from "react";
import { categoryLabels, type Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import type { QuizApi } from "../hooks/useQuiz";
import {
  isExitCommand,
  isHintCommand,
  isMenuCommand,
  isReviewCommand,
  isSettingsCommand,
} from "../utils/commands";
import { getHints } from "../utils/hints";
import { answerCaseMatters } from "../utils/validate";
import { EXIT_REVIEW_KEY, isHintKey } from "../utils/shortcuts";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { Feedback } from "../components/Feedback";
import { InputBar } from "../components/InputBar";
import { ReviewLine } from "../components/ReviewLine";
import { StatusBar } from "../components/StatusBar";

export function QuizPage({
  quiz,
  level,
  onMenu,
  onSettings,
}: {
  quiz: QuizApi;
  level: Level;
  onMenu: () => void;
  onSettings?: () => void;
}) {
  const {
    current,
    taskNumber,
    attempts,
    distinctSeen,
    totalQuestions,
    allSeen,
    result,
    submit,
    next,
  } = quiz;
  const lvl = levelInfo(level);

  const [value, setValue] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);

  const hints = getHints(current);
  const hintsExhausted = hintCount >= hints.length;

  // Fresh input + focus for each new task, and release the submit lock
  // whenever there is no pending result.
  useEffect(() => {
    setValue("");
    setHintCount(0);
    setReviewing(false);
    lockedRef.current = false;
    inputRef.current?.focus();
  }, [current.id]);

  useEffect(() => {
    if (!result) lockedRef.current = false;
  }, [result]);

  // Keep the terminal scrolled sensibly: top of the screen for a fresh task,
  // bottom when feedback lands, top again in the review panel.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = reviewing || !result ? 0 : el.scrollHeight;
  }, [attempts.length, current.id, result, reviewing]);

  const handleSubmit = () => {
    const input = value;
    if (isExitCommand(input)) {
      quiz.quit();
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
    if (result) {
      next();
      return;
    }
    if (lockedRef.current) return;
    if (!input.trim()) return;
    const accepted = submit(input, hintCount);
    if (accepted !== null) {
      setValue(input.trim());
      lockedRef.current = true;
    }
  };

  const revealHint = () => {
    if (result || hintsExhausted) return;
    setHintCount((c) => c + 1);
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => {
        // Don't steal focus when the user is selecting/copying terminal text.
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
          {/* Boot banner */}
          <BootBanner
            tag={`${categoryLabels[current.category]} · ${lvl.name} trainer`}
          >
            <span className={lvl.accent}>{totalQuestions} questions</span> ·{" "}
            {lvl.sessionHint} — keep going until you're done. Type{" "}
            <span className="text-term-amber">:quit</span> to end the session, or{" "}
            <span className="text-term-amber">:menu</span> to switch practice.
          </BootBanner>

          {reviewing ? (
            /* Review panel — every past answer with its explanation + hints. */
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
                  <span className={lvl.accent}>{lvl.name}</span> ·{" "}
                  <span className="tabular-nums">
                    {distinctSeen}/{totalQuestions} seen
                  </span>
                  {answerCaseMatters(current) && (
                    <>
                      {" "}· <span className="text-term-amber">case matters</span>
                    </>
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
                  <Feedback result={result} question={current} />

                  {/* After answering: reveal the hints only if the user asked
                      for them AND still got it wrong — right answers and
                      no-hint attempts don't need them. */}
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

                  {allSeen && (
                    <p className="text-xs text-term-amber">
                      ✓ you've practiced all {totalQuestions} questions — type{" "}
                      <span className="font-semibold">:quit</span> to finish the
                      session
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <StatusBar
        quiz={quiz}
        level={level}
        reviewing={reviewing}
        onSettings={onSettings}
      />

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={
          reviewing
            ? "press enter to return to the task"
            : result
              ? "press enter for the next question"
              : "type the command…"
        }
        readOnly={result !== null && !reviewing}
        hint={
          <span className="sm:hidden">
            enter: submit / next · <span className="text-term-amber">tab: hint</span> ·{" "}
            <span className="text-term-amber">back</span>{" "}
            {reviewing ? "current task" : "review"} ·{" "}
            <span className="text-term-amber">:quit</span> end ·{" "}
            <span className="text-term-amber">:menu</span> switch
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
