import { useQuiz } from "./hooks/useQuiz";
import { vimQuestions } from "./data/questions";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";

export default function App() {
  const quiz = useQuiz({ questions: vimQuestions });

  return (
    <div className="crt-grid flex h-dvh flex-col overflow-hidden bg-term-bg text-term-fg">
      {quiz.ended ? <ResultPage quiz={quiz} /> : <QuizPage quiz={quiz} />}
    </div>
  );
}
