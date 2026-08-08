import { useMemo, useState } from "react";
import { useQuiz } from "./hooks/useQuiz";
import type { Category, Level } from "./data/questions";
import { questionSets } from "./data/questions";
import { questionsForLevel } from "./data/levels";
import { CategoryPage } from "./pages/CategoryPage";
import { LevelPage } from "./pages/LevelPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";

/** A full practice session for one category + level (fresh state per combo). */
function PracticeSession({
  category,
  level,
  onMenu,
}: {
  category: Category;
  level: Level;
  onMenu: () => void;
}) {
  // Stable pool per category/level — memoize so the quiz hook doesn't reset.
  const questions = useMemo(
    () => questionsForLevel(questionSets[category], level),
    [category, level]
  );
  const quiz = useQuiz({ questions });

  return quiz.ended ? (
    <ResultPage quiz={quiz} level={level} onMenu={onMenu} />
  ) : (
    <QuizPage quiz={quiz} level={level} onMenu={onMenu} />
  );
}

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);
  const [level, setLevel] = useState<Level | null>(null);

  return (
    <div className="crt-grid flex h-dvh flex-col overflow-hidden bg-term-bg text-term-fg">
      {category === null ? (
        <CategoryPage
          onSelect={(c) => {
            setCategory(c);
            setLevel(null);
          }}
        />
      ) : level === null ? (
        <LevelPage
          category={category}
          onSelect={setLevel}
          onBack={() => setCategory(null)}
        />
      ) : (
        <PracticeSession
          key={`${category}-${level}`}
          category={category}
          level={level}
          onMenu={() => setLevel(null)}
        />
      )}
    </div>
  );
}
