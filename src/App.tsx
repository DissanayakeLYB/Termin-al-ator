import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "./hooks/useQuiz";
import { useSettings } from "./hooks/useSettings";
import { usePracticeHistory, buildPracticeDeck } from "./hooks/usePracticeHistory";
import type { Category, Level } from "./data/questions";
import { questionSets } from "./data/questions";
import { questionsForLevel } from "./data/levels";
import { CategoryPage } from "./pages/CategoryPage";
import { LevelPage } from "./pages/LevelPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TimedSetupPage } from "./pages/TimedSetupPage";
import { TimedQuizPage, type TimedFinishReason } from "./pages/TimedQuizPage";
import { TimedResultPage } from "./pages/TimedResultPage";

/** A full practice session for one category + level (fresh state per combo). */
function PracticeSession({
  category,
  level,
  onMenu,
  onSettings,
}: {
  category: Category;
  level: Level;
  onMenu: () => void;
  onSettings: () => void;
}) {
  // Stable pool per category/level — memoize so the quiz hook doesn't reset.
  const questions = useMemo(
    () => questionsForLevel(questionSets[category], level),
    [category, level]
  );
  const quiz = useQuiz({ questions });

  return quiz.ended ? (
    <ResultPage quiz={quiz} level={level} onMenu={onMenu} onSettings={onSettings} />
  ) : (
    <QuizPage quiz={quiz} level={level} onMenu={onMenu} onSettings={onSettings} />
  );
}

/**
 * A timed daily-practice sprint: a weighted deck (misses first) streams
 * questions until the clock runs out or the user quits.
 */
function TimedSession({
  practice,
  seconds,
  settingsOpen,
  onMenu,
  onSettings,
}: {
  practice: ReturnType<typeof usePracticeHistory>;
  seconds: number;
  settingsOpen: boolean;
  onMenu: () => void;
  onSettings: () => void;
}) {
  // Every question from every tool & level, for the whole-dataset sprint.
  const allQuestions = useMemo(
    () => Object.values(questionSets).flatMap((set) => set.questions),
    []
  );

  // Build the weighted deck once per sprint (misses captured at start).
  const [deck, setDeck] = useState(() =>
    buildPracticeDeck(allQuestions, practice.misses)
  );
  const [finish, setFinish] = useState<{
    kind: TimedFinishReason;
    elapsed: number;
  } | null>(null);

  const quiz = useQuiz({ questions: deck, shuffle: false });

  // Record the daily streak once when the sprint ends. markDone is stable
  // and idempotent, so this can't double-count a day.
  useEffect(() => {
    if (quiz.ended) practice.markDone();
  }, [quiz.ended, practice.markDone]);

  if (quiz.ended) {
    return (
      <TimedResultPage
        quiz={quiz}
        practice={practice}
        durationSeconds={seconds}
        finish={finish}
        onRestart={() => {
          // Re-prioritize with the latest miss counts; useQuiz resets on the
          // new deck identity.
          setDeck(buildPracticeDeck(allQuestions, practice.misses));
          setFinish(null);
        }}
        onMenu={onMenu}
        onSettings={onSettings}
      />
    );
  }

  return (
    <TimedQuizPage
      quiz={quiz}
      practice={practice}
      durationSeconds={seconds}
      settingsOpen={settingsOpen}
      onFinish={(kind, elapsed) => setFinish({ kind, elapsed })}
      onMenu={onMenu}
      onSettings={onSettings}
    />
  );
}

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  /** Sprint length in seconds; null when not in a timed session. */
  const [timedSeconds, setTimedSeconds] = useState<number | null>(null);
  const [showTimedSetup, setShowTimedSetup] = useState(false);
  const settings = useSettings();
  const practice = usePracticeHistory();

  const openSettings = () => setShowSettings(true);

  return (
    <div className="crt-grid flex h-dvh flex-col overflow-hidden bg-term-bg text-term-fg">
      {showTimedSetup ? (
        <TimedSetupPage
          streak={practice.streak}
          onStart={(seconds) => {
            setTimedSeconds(seconds);
            setShowTimedSetup(false);
          }}
          onBack={() => setShowTimedSetup(false)}
          onSettings={openSettings}
        />
      ) : timedSeconds !== null ? (
        <TimedSession
          practice={practice}
          seconds={timedSeconds}
          settingsOpen={showSettings}
          onMenu={() => setTimedSeconds(null)}
          onSettings={openSettings}
        />
      ) : category === null ? (
        <CategoryPage
          onSelect={(c) => {
            setCategory(c);
            setLevel(null);
          }}
          onTimed={() => setShowTimedSetup(true)}
          streak={practice.streak}
          onSettings={openSettings}
        />
      ) : level === null ? (
        <LevelPage
          category={category}
          onSelect={setLevel}
          onBack={() => setCategory(null)}
          onSettings={openSettings}
        />
      ) : (
        <PracticeSession
          key={`${category}-${level}`}
          category={category}
          level={level}
          onMenu={() => setLevel(null)}
          onSettings={openSettings}
        />
      )}
      {showSettings && (
        <SettingsPage settings={settings} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
