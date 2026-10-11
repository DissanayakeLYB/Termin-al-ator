import { useEffect, useRef, useState } from "react";
import type { QuizApi } from "../hooks/useQuiz";
import { categoryLabels, type Level } from "../data/questions";
import { levelInfo } from "../data/levels";
import { isMenuCommand, isRestartCommand, isSettingsCommand } from "../utils/commands";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { PageHeader } from "../components/PageHeader";

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

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-term-edge bg-term-panel/40 px-3.5 py-3">
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-dim/70">
        {label}
      </p>
      <p className={`mt-1 text-base font-bold tabular-nums ${tone ?? "text-term-fg"}`}>
        {value}
      </p>
    </div>
  );
}

export function ResultPage({
  quiz,
  level,
  onMenu,
  onSettings,
}: {
  quiz: QuizApi;
  level: Level;
  onMenu: () => void;
  onSettings?: () => void;
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
    if (!cmd) {
      // Just pressing enter restarts the session (the primary action).
      restart();
      return;
    }
    if (isRestartCommand(cmd)) {
      setNotice(null);
      restart();
      return;
    }
    if (isMenuCommand(cmd)) {
      onMenu();
      return;
    }
    if (isSettingsCommand(cmd)) {
      setNotice(null);
      setValue("");
      onSettings?.();
      return;
    }
    setNotice(`unknown command: ${cmd} — type restart, r, menu, or settings`);
    setValue("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col" onClick={() => inputRef.current?.focus()}>
      <PageHeader
        title="Session complete"
        subtitle={
          <>
            {label} · <span className={lvl.accent}>{lvl.name}</span>
          </>
        }
        onBack={onMenu}
        backLabel="⌂ menu"
        onSettings={onSettings}
      />

      <div
        ref={scrollRef}
        className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-base leading-relaxed text-term-bright">
            {getVerdict(accuracy)}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Stat label="score" value={`${score}`} tone="text-term-green" />
            <Stat label="answered" value={`${answered}`} />
            <Stat label="accuracy" value={`${accuracy}%`} />
            <Stat label="covered" value={`${distinctSeen}/${totalQuestions}`} />
            <Stat label="level" value={lvl.name} tone={lvl.accent} />
            <Stat
              label="hints"
              value={hintsUsed === 0 ? "none" : `${hintsUsed} used`}
              tone={hintsUsed > 0 ? "text-term-amber" : undefined}
            />
          </div>

          {missed.length > 0 ? (
            <div className="mt-8">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-amber">
                review — {missed.length} to revisit
              </p>
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
          ) : (
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
        placeholder='press enter to restart, or type "menu"'
        hint={notice ?? "enter: restart · restart · r · again · menu: another practice"}
        actions={
          <Button variant="primary" onClick={restart}>
            ↻ restart
          </Button>
        }
      />
    </div>
  );
}
