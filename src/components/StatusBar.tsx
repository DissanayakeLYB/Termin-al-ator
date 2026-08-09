import type { QuizApi } from "../hooks/useQuiz";
import type { Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import { ProgressBar } from "./ProgressBar";

export function StatusBar({
  quiz,
  level,
  reviewing = false,
}: {
  quiz: QuizApi;
  level?: Level;
  /** When true (review panel open), `back` returns to the current task. */
  reviewing?: boolean;
}) {
  const { score, answered, accuracy, distinctSeen, totalQuestions, allSeen } = quiz;
  const lvl = level ? levelInfo(level) : null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-term-edge bg-term-bg px-4 py-2 text-xs text-term-dim sm:px-8">
      {lvl && (
        <span className={`font-semibold uppercase tracking-wider ${lvl.accent}`}>
          {lvl.name}
        </span>
      )}
      <span>
        score{" "}
        <span className="font-bold tabular-nums text-term-green">{score}</span>
      </span>
      <span className="tabular-nums">answered {answered}</span>
      <span className="tabular-nums">accuracy {accuracy}%</span>
      <span className="flex items-center gap-2 tabular-nums">
        seen{" "}
        <ProgressBar
          value={distinctSeen}
          max={totalQuestions}
          className="h-1.5 w-24"
        />
        {distinctSeen}/{totalQuestions}
        {allSeen && (
          <span className="font-semibold text-term-amber">
            ✓ all {totalQuestions} practiced
          </span>
        )}
      </span>
      <span className="ml-auto hidden md:inline">
        enter: submit / next · <span className="text-term-amber">:hint</span> clue ·{" "}
        {reviewing ? (
          <>
            <span className="text-term-amber">back</span> current task ·{" "}
          </>
        ) : (
          <>
            <span className="text-term-amber">back</span> review ·{" "}
          </>
        )}
        <span className="text-term-amber">:quit</span> end · <span className="text-term-amber">:menu</span> switch
      </span>
    </div>
  );
}
