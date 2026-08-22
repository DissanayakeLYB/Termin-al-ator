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
import { TimedSetupPage, type TimedLevel } from "./pages/TimedSetupPage";
import { TimedQuizPage, type TimedFinishReason } from "./pages/TimedQuizPage";
import { TimedResultPage, type TimedRunKind } from "./pages/TimedResultPage";
import { GuidePage } from "./pages/GuidePage";
import { TutorialPickerPage } from "./pages/TutorialPickerPage";
import type { ToolGuide } from "./data/guideRegistry";

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

/** A timed practice run: daily sprint (all tools), per-tool sprint, or blitz. */
function TimedSession({
  practice,
  run,
  settingsOpen,
  onMenu,
  onSettings,
}: {
  practice: ReturnType<typeof usePracticeHistory>;
  run: TimedRun;
  settingsOpen: boolean;
  onMenu: () => void;
  onSettings: () => void;
}) {
  const { seconds, perQuestion, tool, level } = run;
  const isBlitz = perQuestion !== null;

  // Daily sprint draws from every tool; per-tool runs from one tool, and a
  // chosen level filters that tool's pool down to one practice kind.
  const allQuestions = useMemo(() => {
    const base =
      tool === null
        ? Object.values(questionSets).flatMap((set) => set.questions)
        : questionSets[tool].questions;
    return level === "all" ? base : base.filter((q) => q.level === level);
  }, [tool, level]);

  // Build the weighted deck once per run (misses captured at start).
  const [deck, setDeck] = useState(() =>
    buildPracticeDeck(allQuestions, practice.misses)
  );
  const [finish, setFinish] = useState<{
    kind: TimedFinishReason;
    elapsed: number;
  } | null>(null);

  // Timed runs end when the pool is exhausted — no reshuffling repeats.
  const quiz = useQuiz({ questions: deck, shuffle: false, infinite: false });

  // Record the daily streak once when the run ends.
  useEffect(() => {
    if (quiz.ended) practice.markDone();
  }, [quiz.ended, practice.markDone]);

  const kind: TimedRunKind =
    tool === null ? "daily" : isBlitz ? "blitz" : "sprint";

  const restart = () => {
    // Re-prioritize with the latest miss counts; useQuiz resets on the new
    // deck identity.
    setDeck(buildPracticeDeck(allQuestions, practice.misses));
    setFinish(null);
  };

  if (quiz.ended) {
    return (
      <TimedResultPage
        quiz={quiz}
        practice={practice}
        kind={kind}
        tool={tool}
        level={level}
        finish={finish}
        sessionSeconds={isBlitz ? undefined : seconds}
        perQuestionSeconds={isBlitz ? perQuestion : undefined}
        poolSize={deck.length}
        onRestart={restart}
        onMenu={onMenu}
        onSettings={onSettings}
      />
    );
  }

  return (
    <TimedQuizPage
      quiz={quiz}
      practice={practice}
      sessionSeconds={isBlitz ? undefined : seconds}
      perQuestionSeconds={isBlitz ? perQuestion : undefined}
      poolSize={deck.length}
      settingsOpen={settingsOpen}
      onFinish={(kind, elapsed) => setFinish({ kind, elapsed })}
      onMenu={onMenu}
      onSettings={onSettings}
    />
  );
}

export type TimedRun = {
  /** Session-mode length, or 0 for blitz. */
  seconds: number;
  /** Blitz pace per question; null for session mode. */
  perQuestion: number | null;
  /** Tool to practice; null = all tools (daily sprint). */
  tool: Category | null;
  /** Level filter; "all" mixes every level of the tool. */
  level: TimedLevel;
};

export type TimedSetupRequest = {
  mode: "session" | "blitz";
  tool: Category | null;
  level: TimedLevel;
};

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  /** Show the tutorials picker. */
  const [showTutorialPicker, setShowTutorialPicker] = useState(false);
  /** Show a specific tool's guide. */
  const [activeGuide, setActiveGuide] = useState<ToolGuide | null>(null);
  /** Pending timed setup (duration/pace picker). */
  const [timedSetup, setTimedSetup] = useState<TimedSetupRequest | null>(null);
  /** Running timed session. */
  const [timedRun, setTimedRun] = useState<TimedRun | null>(null);
  const settings = useSettings();
  const practice = usePracticeHistory();

  const openSettings = () => setShowSettings(true);

  return (
    <div className="crt-grid flex h-dvh flex-col overflow-hidden bg-term-bg text-term-fg">
      {activeGuide ? (
        <GuidePage
          tool={activeGuide}
          onBack={() => setActiveGuide(null)}
          onPractice={() => {
            setActiveGuide(null);
            setCategory(activeGuide.category);
          }}
        />
      ) : showTutorialPicker ? (
        <TutorialPickerPage
          onSelect={(guide) => {
            setShowTutorialPicker(false);
            setActiveGuide(guide);
          }}
          onBack={() => setShowTutorialPicker(false)}
        />
      ) : timedSetup ? (
        <TimedSetupPage
          mode={timedSetup.mode}
          tool={timedSetup.tool}
          streak={practice.streak}
          onStart={(seconds, level) => {
            setTimedRun({
              seconds: timedSetup.mode === "blitz" ? 0 : seconds,
              perQuestion: timedSetup.mode === "blitz" ? seconds : null,
              tool: timedSetup.tool,
              level,
            });
            setTimedSetup(null);
          }}
          onBack={() => setTimedSetup(null)}
          onSettings={openSettings}
        />
      ) : timedRun ? (
        <TimedSession
          practice={practice}
          run={timedRun}
          settingsOpen={showSettings}
          onMenu={() => setTimedRun(null)}
          onSettings={openSettings}
        />
      ) : category === null ? (
        <CategoryPage
          onSelect={(c) => {
            setCategory(c);
            setLevel(null);
          }}
          onTimed={() => setTimedSetup({ mode: "session", tool: null, level: "all" })}
          onTutorials={() => setShowTutorialPicker(true)}
          streak={practice.streak}
          onSettings={openSettings}
        />
      ) : level === null ? (
        <LevelPage
          category={category}
          onSelect={setLevel}
          onBack={() => setCategory(null)}
          onSprint={() => setTimedSetup({ mode: "session", tool: category, level: "all" })}
          onBlitz={() => setTimedSetup({ mode: "blitz", tool: category, level: "all" })}
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
