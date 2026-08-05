import { useState } from "react";
import { useQuiz } from "./hooks/useQuiz";
import type { Category } from "./data/questions";
import { questionSets } from "./data/questions";
import { CategoryPage } from "./pages/CategoryPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";

/** A full practice session for one category (fresh state per category). */
function PracticeSession({
  category,
  onMenu,
}: {
  category: Category;
  onMenu: () => void;
}) {
  const quiz = useQuiz({ questions: questionSets[category].questions });

  return quiz.ended ? (
    <ResultPage quiz={quiz} onMenu={onMenu} />
  ) : (
    <QuizPage quiz={quiz} onMenu={onMenu} />
  );
}

export default function App() {
  const [category, setCategory] = useState<Category | null>(null);

  return (
    <div className="crt-grid flex h-dvh flex-col overflow-hidden bg-term-bg text-term-fg">
      {category === null ? (
        <CategoryPage onSelect={setCategory} />
      ) : (
        <PracticeSession
          key={category}
          category={category}
          onMenu={() => setCategory(null)}
        />
      )}
    </div>
  );
}
