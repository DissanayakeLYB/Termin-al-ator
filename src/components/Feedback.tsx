import type { ReactNode } from "react";
import type { QuizQuestion } from "../data/questions";
import type { QuestionResult } from "../hooks/useQuiz";

function Keycap({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <code
      className={`mx-1 inline-block rounded border px-1.5 py-0.5 align-middle font-mono text-xs ${
        muted
          ? "border-term-edge2 bg-term-bg text-term-dim"
          : "border-term-green/40 bg-term-bg text-term-green"
      }`}
    >
      {children}
    </code>
  );
}

interface FeedbackProps {
  result: QuestionResult;
  question: QuizQuestion;
}

export function Feedback({ result, question }: FeedbackProps) {
  const { submitted, correct } = result;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-lg border border-l-4 p-4 ${
        correct
          ? "border-term-edge border-l-term-green bg-term-green/10"
          : "border-term-edge border-l-term-red bg-term-red/10"
      }`}
    >
      <p className={`font-bold ${correct ? "text-term-bright" : "text-term-red"}`}>
        {correct ? "✓ Correct" : "✗ Not quite"}
      </p>

      {correct ? (
        <p className="mt-2 text-sm leading-relaxed text-term-fg/75">
          {question.explanation}
        </p>
      ) : (
        <div className="mt-3 space-y-2 text-sm leading-relaxed">
          <p className="text-term-fg/85">
            You typed <Keycap muted>{submitted}</Keycap>
            {" — the correct command is "}
            <Keycap>{question.answer}</Keycap>
          </p>
          <p className="text-term-fg/65">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
