import { categoryLabels } from "../data/questions";
import { levelInfo } from "../data/levels";
import type { Attempt } from "../hooks/useQuiz";
import { getHints } from "../utils/hints";

/**
 * One past answered question, shown in the review panel of a session: the
 * prompt, what the user typed, the correct answer, the explanation, and the
 * hints — but only when they were requested AND the answer was wrong (hints
 * are a learning aid for missed questions).
 */
export function ReviewLine({ attempt, index }: { attempt: Attempt; index: number }) {
  const { question, submitted, correct, hintsUsed } = attempt;
  const lvl = levelInfo(question.level);
  const hints = getHints(question);
  return (
    <div className="space-y-1">
      <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
        task {index + 1} · {categoryLabels[question.category]} ·{" "}
        <span className={lvl.accent}>{lvl.name}</span>
        {hintsUsed > 0 && (
          <span className="text-term-amber"> · used {hintsUsed} hint{hintsUsed === 1 ? "" : "s"}</span>
        )}
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
      {/* Hints only for hint-requested misses. */}
      {hintsUsed > 0 && !correct && hints.length > 0 && (
        <ul className="mt-1.5 space-y-1 border-l-2 border-term-amber/40 pl-3">
          {hints.map((hint, i) => (
            <li
              key={i}
              className="text-xs leading-relaxed text-term-amber/75 sm:text-sm"
            >
              hint {i + 1}: {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
