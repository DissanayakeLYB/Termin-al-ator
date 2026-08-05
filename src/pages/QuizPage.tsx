import { useEffect, useRef, useState } from "react";
import { categoryLabels } from "../data/questions";
import type { Attempt, QuizApi } from "../hooks/useQuiz";
import { isExitCommand, isMenuCommand } from "../utils/commands";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { Feedback } from "../components/Feedback";
import { InputBar } from "../components/InputBar";
import { StatusBar } from "../components/StatusBar";

function HistoryLine({ attempt, index }: { attempt: Attempt; index: number }) {
  const { question, submitted, correct } = attempt;
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-widest text-term-dim">
        task {index + 1} · {categoryLabels[question.category]}
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

export function QuizPage({ quiz, onMenu }: { quiz: QuizApi; onMenu: () => void }) {
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

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef(false);

  // Fresh input + focus for each new task, and release the submit lock
  // whenever there is no pending result.
  useEffect(() => {
    setValue("");
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
    if (!input.trim()) return;
    const accepted = submit(input);
    if (accepted !== null) {
      setValue(input.trim());
      lockedRef.current = true;
    }
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
          <BootBanner tag={`${categoryLabels[current.category]} trainer`}>
            {totalQuestions} questions · randomized · no fixed rounds — keep going
            until you're done. Type <span className="text-term-amber">:quit</span>{" "}
            to end the session, or <span className="text-term-amber">:menu</span>{" "}
            to switch practice.
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
              <span className="tabular-nums">
                {distinctSeen}/{totalQuestions} seen
              </span>
            </p>
            <h2 className="mt-1.5 text-base leading-relaxed text-term-fg sm:text-lg">
              {current.prompt}
            </h2>

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

      <StatusBar quiz={quiz} />

      <InputBar
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={result ? "press enter for the next question" : "type the command…"}
        readOnly={result !== null}
        hint={
          <span className="sm:hidden">
            enter: submit / next · <span className="text-term-amber">:quit</span> end ·{" "}
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
