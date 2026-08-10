import type { QuizApi } from "../hooks/useQuiz";
import type { Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import { ProgressBar } from "./ProgressBar";

export function StatusBar({
  quiz,
  level,
  reviewing = false,
  onSettings,
}: {
  quiz: QuizApi;
  level?: Level;
  /** When true (review panel open), `back` returns to the current task. */
  reviewing?: boolean;
  /** Opens the terminal settings overlay (font size + theme). */
  onSettings?: () => void;
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
        enter: submit / next · <span className="text-term-amber">tab: hint</span> ·{" "}
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
      {onSettings && (
        <button
          type="button"
          onClick={onSettings}
          aria-label="settings"
          title="settings: font size + theme"
          className="ml-auto cursor-pointer rounded-md border border-term-edge2 px-2 py-0.5 leading-none text-term-dim transition-colors hover:border-term-green/60 hover:text-term-green md:ml-0"
        >
          ⚙
        </button>
      )}
    </div>
  );
}
