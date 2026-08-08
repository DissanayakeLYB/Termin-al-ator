import { useEffect, useRef, useState } from "react";
import { categoryLabels, type Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import type { Attempt, QuizApi } from "../hooks/useQuiz";
import { isExitCommand, isHintCommand, isMenuCommand } from "../utils/commands";
import { getHints } from "../utils/hints";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { Feedback } from "../components/Feedback";
import { InputBar } from "../components/InputBar";
import { StatusBar } from "../components/StatusBar";

function HistoryLine({ attempt, index }: { attempt: Attempt; index: number }) {
  const { question, submitted, correct } = attempt;
  const lvl = levelInfo(question.level);
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-widest text-term-dim">
        task {index + 1} · {categoryLabels[question.category]} ·{" "}
        <span className={lvl.accent}>{lvl.name}</span>
      </p>
      <p className="text-sm leading-relaxed text-term-fg/90 sm:text-base">
        {question.prompt}
      </p>
      <p className="text-sm text-term-green/80">❯ {submitted}</p>
      <p
        className={`text-xs leading-relaxed sm:text-sm ${
          correct ? "text-term-bright/80" : "text-term-red/80"
        }`}
      >
        {correct
          ? "✓ correct — "
          : `✗ wrong — answer: ${question.answer} — `}
        {question.explanation}
      </p>
    </div>
  );
}

export function QuizPage({
  quiz,
  level,
  onMenu,
}: {
  quiz: QuizApi;
  level: Level;
  onMenu: () => void;
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
    lockedRef.current = false;
    inputRef.current?.focus();
  }, [current.id]);

  useEffect(() => {
    if (!result) lockedRef.current = false;
  }, [result]);

  // Keep the terminal scrolled to the latest output.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [attempts.length, current.id, result]);

  const handleSubmit = () => {
    if (result) {
      next();
      return;
    }
    if (lockedRef.current) return;
    const input = value;
    if (isExitCommand(input)) {
      quiz.quit();
      return;
    }
    if (isMenuCommand(input)) {
      onMenu();
      return;
    }
    if (isHintCommand(input)) {
      revealHint();
      setValue("");
      return;
    }
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
    >
      <div
        ref={scrollRef}
        className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="max-w-3xl">
          {/* Boot banner */}
          <BootBanner
            tag={`${categoryLabels[current.category]} · ${lvl.name} trainer`}
          >
            <span className={lvl.accent}>{totalQuestions} questions</span> ·{" "}
            {lvl.sessionHint} — keep going until you're done. Type{" "}
            <span className="text-term-amber">:quit</span> to end the session, or{" "}
            <span className="text-term-amber">:menu</span> to switch practice.
          </BootBanner>

          {/* History of answered tasks */}
          {attempts.length > 0 && (
            <div className="mt-6 space-y-6 border-b border-term-edge/60 pb-6">
              {attempts.map((attempt, i) => (
                <HistoryLine key={`${attempt.question.id}-${i}`} attempt={attempt} index={i} />
              ))}
            </div>
          )}

          {/* Current task */}
          <div className="mt-6 border-l-2 border-term-green pl-4">
            <p className="text-[10px] uppercase tracking-widest text-term-dim">
              task {taskNumber} · {categoryLabels[current.category]} ·{" "}
              <span className={lvl.accent}>{lvl.name}</span> ·{" "}
              <span className="tabular-nums">
                {distinctSeen}/{totalQuestions} seen
              </span>
            </p>
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
        </div>
      </div>

      <StatusBar quiz={quiz} level={level} />

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={result ? "press enter for the next question" : "type the command…"}
        readOnly={result !== null}
        hint={
          <span className="sm:hidden">
            enter: submit / next · <span className="text-term-amber">:hint</span> clue ·{" "}
            <span className="text-term-amber">:quit</span> end ·{" "}
            <span className="text-term-amber">:menu</span> switch
          </span>
        }
        actions={
          result ? (
            <Button variant="ghost" onClick={next}>
              next →
            </Button>
          ) : undefined
        }
      />
    </div>
  );
}
