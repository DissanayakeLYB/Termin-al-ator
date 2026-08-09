import { useEffect, useRef, useState } from "react";
import type { QuizApi } from "../hooks/useQuiz";
import { categoryLabels, type Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import { isMenuCommand, isRestartCommand } from "../utils/commands";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

function getVerdict(accuracy: number): string {
  if (accuracy === 100) return "Flawless — a true terminal wizard. 🧙";
  if (accuracy >= 85) return "Excellent — a few keystrokes shy of mastery.";
  if (accuracy >= 70) return "Solid work. Polish the rough edges.";
  if (accuracy >= 50) return "Getting there. Repetition is your friend.";
  return "Every keystroke counts. Run it again — you'll climb fast.";
}

/** The latest attempt for each question that was ever answered wrong. */
function latestMissed(attempts: QuizApi["attempts"]) {
  const byId = new Map<string, QuizApi["attempts"][number]>();
  for (const attempt of attempts) {
    if (!attempt.correct) byId.set(attempt.question.id, attempt);
  }
  return [...byId.values()];
}

function StatRow({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <p className="text-sm leading-relaxed">
      <span className="inline-block w-24 uppercase tracking-widest text-term-dim">
        {label}
      </span>
      <span className={`font-semibold tabular-nums ${tone ?? "text-term-fg"}`}>{value}</span>
    </p>
  );
}

export function ResultPage({
  quiz,
  level,
  onMenu,
}: {
  quiz: QuizApi;
  level: Level;
  onMenu: () => void;
}) {
  const { attempts, score, answered, accuracy, distinctSeen, totalQuestions, hintsUsed, restart } = quiz;
  const missed = latestMissed(attempts);
  const label = categoryLabels[quiz.current.category];
  const lvl = levelInfo(level);

  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const handleSubmit = () => {
    const cmd = value.trim();
    if (cmd) {
      if (isRestartCommand(cmd)) {
        setNotice(null);
        restart();
        return;
      }
      if (isMenuCommand(cmd)) {
        onMenu();
        return;
      }
      setNotice(`unknown command: ${cmd} — type restart, r, or menu`);
    }
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="w-full">
          <p className="text-sm uppercase tracking-[0.3em] text-term-amber">
            — {label} · <span className={lvl.accent}>{lvl.name}</span> session
            complete —
          </p>

          <div className="mt-6 space-y-2">
            <StatRow label="score" value={`${score}`} tone="text-term-green" />
            <StatRow label="answered" value={`${answered}`} />
            <StatRow label="accuracy" value={`${accuracy}%`} />
            <StatRow
              label="covered"
              value={`${distinctSeen}/${totalQuestions} questions`}
            />
            <StatRow label="level" value={lvl.name} tone={lvl.accent} />
            <StatRow
              label="hints"
              value={hintsUsed === 0 ? "none" : `${hintsUsed} used`}
              tone={hintsUsed > 0 ? "text-term-amber" : undefined}
            />
          </div>

          <p className="mt-5 text-term-bright">{getVerdict(accuracy)}</p>

          {missed.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-widest text-term-amber">
                review — {missed.length} to revisit
              </h3>
              <ul className="terminal-scroll mt-4 max-h-72 space-y-4 overflow-y-auto pr-2">
                {missed.map(({ question, submitted, hintsUsed }) => (
                  <li
                    key={question.id}
                    className="border-b border-term-edge/60 pb-3 last:border-0"
                  >
                    <p className="text-sm leading-relaxed text-term-fg/90">
                      {question.prompt}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed">
                      <span className="text-term-dim">
                        you: <s className="text-term-red/70">{submitted}</s>
                      </span>{" "}
                      <span className="text-term-dim">→ answer: </span>
                      <span className="font-semibold text-term-green">
                        {question.answer}
                      </span>
                      {hintsUsed > 0 && (
                        <span className="text-term-dim">
                          {" "}· used {hintsUsed} hint{hintsUsed === 1 ? "" : "s"}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {missed.length === 0 && (
            <p className="mt-8 text-sm text-term-dim">
              nothing to review — every question was answered correctly.
            </p>
          )}
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder='type "restart" or "menu"'
        hint={notice ?? "restart · r · again · menu: another practice"}
        actions={
          <>
            <Button variant="ghost" onClick={onMenu}>
              ⌂ menu
            </Button>
            <Button variant="primary" onClick={restart}>
              ↻ restart
            </Button>
          </>
        }
      />
    </div>
  );
}
