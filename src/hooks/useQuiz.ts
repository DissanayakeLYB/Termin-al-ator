import { useCallback, useEffect, useState } from "react";
import type { QuizQuestion } from "../data/questions";
import { isCorrect, normalizeAnswer } from "../utils/validate";

export interface QuestionResult {
  /** The normalized answer the user submitted. */
  submitted: string;
  correct: boolean;
}

export interface Attempt extends QuestionResult {
  question: QuizQuestion;
}

export interface UseQuizOptions {
  questions: QuizQuestion[];
  /** Shuffle question order. Defaults to true. */
  shuffle?: boolean;
}

export interface QuizApi {
  current: QuizQuestion;
  /** 1-based number of the current task in this session. */
  taskNumber: number;
  answered: number;
  score: number;
  /** Percentage 0–100. */
  accuracy: number;
  /** Number of distinct questions answered at least once. */
  distinctSeen: number;
  totalQuestions: number;
  /** True once every question in the dataset has been answered. */
  allSeen: boolean;
  /** Result of the current question's answer, null until submitted. */
  result: QuestionResult | null;
  /** Every answer of the session, in order. */
  attempts: Attempt[];
  /** True once the user ends the session (results screen). */
  ended: boolean;
  /** Submit an answer; returns whether it was correct, or null if ignored. */
  submit: (input: string) => boolean | null;
  next: () => void;
  quit: () => void;
  restart: () => void;
}

function shuffleQuestions<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/** Builds a fresh shuffled deck, avoiding an immediate repeat of the last question. */
function buildDeck(questions: QuizQuestion[], avoidId?: string): QuizQuestion[] {
  const deck = shuffleQuestions(questions);
  if (avoidId && deck.length > 1 && deck[0].id === avoidId) {
    [deck[0], deck[1]] = [deck[1], deck[0]];
  }
  return deck;
}

export function useQuiz({ questions, shuffle = true }: UseQuizOptions): QuizApi {
  const [deck, setDeck] = useState<QuizQuestion[]>(() =>
    shuffle ? buildDeck(questions) : [...questions]
  );
  const [deckIndex, setDeckIndex] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [ended, setEnded] = useState(false);

  // Rebuild the session if the question source changes (e.g. new category).
  useEffect(() => {
    setDeck(shuffle ? buildDeck(questions) : [...questions]);
    setDeckIndex(0);
    setAttempts([]);
    setResult(null);
    setEnded(false);
  }, [questions, shuffle]);

  const current = deck[deckIndex];

  const submit = useCallback(
    (input: string): boolean | null => {
      const normalized = normalizeAnswer(input);
      if (!normalized || ended || result) return null;

      const question = deck[deckIndex];
      const correct = isCorrect(normalized, question);
      setResult({ submitted: normalized, correct });
      setAttempts((prev) => [...prev, { submitted: normalized, correct, question }]);
      return correct;
    },
    [deck, deckIndex, ended, result]
  );

  const next = useCallback(() => {
    if (ended) return;
    setResult(null);
    if (deckIndex + 1 < deck.length) {
      setDeckIndex(deckIndex + 1);
    } else {
      // Deck exhausted: reshuffle and keep going — the session is infinite.
      setDeck(buildDeck(questions, current.id));
      setDeckIndex(0);
    }
  }, [current.id, deck.length, deckIndex, ended, questions]);

  const quit = useCallback(() => setEnded(true), []);

  const restart = useCallback(() => {
    setDeck(shuffle ? buildDeck(questions) : [...questions]);
    setDeckIndex(0);
    setAttempts([]);
    setResult(null);
    setEnded(false);
  }, [questions, shuffle]);

  const answered = attempts.length;
  const score = attempts.reduce((n, a) => n + (a.correct ? 1 : 0), 0);
  const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const distinctSeen = new Set(attempts.map((a) => a.question.id)).size;
  const allSeen = questions.length > 0 && distinctSeen >= questions.length;

  return {
    current,
    taskNumber: answered + 1,
    answered,
    score,
    accuracy,
    distinctSeen,
    totalQuestions: questions.length,
    allSeen,
    result,
    attempts,
    ended,
    submit,
    next,
    quit,
    restart,
  };
}
