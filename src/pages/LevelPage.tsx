import { useEffect, useRef, useState } from "react";
import type { Category, Level } from "../data/questions";
import { categoryLabels, questionSets } from "../data/questions";
import { countForLevel, levelInfos } from "../data/levels";
import {
  isBackCommand,
  isBlitzCommand,
  isSettingsCommand,
  isTimedCommand,
} from "../utils/commands";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { PageHeader } from "../components/PageHeader";

interface LevelPageProps {
  category: Category;
  onSelect: (level: Level) => void;
  onBack: () => void;
  /** Starts a timed session-timer sprint for this tool. */
  onSprint: () => void;
  /** Starts a per-question-timer blitz for this tool. */
  onBlitz: () => void;
  onSettings?: () => void;
}

/**
 * Level picker: after choosing a tool, the user chooses *what kind of
 * practice* they want. Each level has a distinct purpose — never a
 * difficulty rating.
 */
export function LevelPage({
  category,
  onSelect,
  onBack,
  onSprint,
  onBlitz,
  onSettings,
}: LevelPageProps) {
  const set = questionSets[category];
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = (level: Level) => {
    setNotice(null);
    setValue("");
    onSelect(level);
  };

  const handleSubmit = () => {
    const raw = value.trim();
    if (!raw) {
      // Just pressing enter starts the primary action — pareto, the
      // recommended first level.
      handleSelect(levelInfos[0].id);
      return;
    }
    const lower = raw.toLowerCase();

    if (isSettingsCommand(raw)) {
      setValue("");
      onSettings?.();
      return;
    }

    if (isBackCommand(raw)) {
      onBack();
      return;
    }

    if (isTimedCommand(raw)) {
      onSprint();
      return;
    }

    if (isBlitzCommand(raw)) {
      onBlitz();
      return;
    }

    // A number picks the nth level.
    if (/^\d+$/.test(lower)) {
      const info = levelInfos[Number.parseInt(lower, 10) - 1];
      if (info) {
        handleSelect(info.id);
        return;
      }
      setNotice(`no level #${lower} — pick 1–${levelInfos.length}`);
      setValue("");
      return;
    }

    // A level name picks the matching level.
    const hit = levelInfos.find((l) => l.id === lower || l.name === lower);
    if (hit) {
      handleSelect(hit.id);
      return;
    }

    setNotice(
      `unknown choice: ${raw} — type a number or a level name, or "sprint"/"blitz" for timed practice`
    );
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <PageHeader
        title={categoryLabels[category]}
        subtitle="What kind of practice do you want right now?"
        onBack={onBack}
        backLabel="⌂ tools"
        onSettings={onSettings}
      />

      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {levelInfos.map((info, i) => {
              const count = countForLevel(set, info.id);
              const disabled = count === 0;
              return (
                <button
                  key={info.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(info.id)}
                  className={`flex flex-col rounded-xl border p-4 text-left transition-colors ${
                    disabled
                      ? "cursor-not-allowed border-term-edge/60 opacity-40"
                      : "cursor-pointer border-term-edge bg-term-panel/40 hover:border-term-edge2 hover:bg-term-panel/70"
                  }`}
                >
                  <span className="flex items-baseline gap-2.5">
                    <span className="text-[0.6875rem] tabular-nums text-term-dim">
                      {i + 1}
                    </span>
                    <span className={`font-semibold ${info.accent}`}>{info.name}</span>
                    {info.recommended && (
                      <span className="rounded border border-term-green/40 px-1.5 py-0.5 text-[0.625rem] text-term-green">
                        start here
                      </span>
                    )}
                    <span className="ml-auto text-[0.6875rem] tabular-nums text-term-dim">
                      {count}
                    </span>
                  </span>
                  <span className="mt-1 text-xs text-term-dim">{info.tagline}</span>
                  <span className="mt-2 text-xs leading-relaxed text-term-fg/60">
                    {info.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-dim/70">
              timed practice
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onSprint}
                className="cursor-pointer rounded-xl border border-term-edge bg-term-panel/40 p-4 text-left transition-colors hover:border-term-amber/50 hover:bg-term-panel/70"
              >
                <span className="font-semibold text-term-amber">⏱ sprint</span>
                <span className="mt-1 block text-xs leading-relaxed text-term-dim">
                  one countdown for the whole run — answer as many as you can
                  before it hits zero.
                </span>
              </button>
              <button
                type="button"
                onClick={onBlitz}
                className="cursor-pointer rounded-xl border border-term-edge bg-term-panel/40 p-4 text-left transition-colors hover:border-term-amber/50 hover:bg-term-panel/70"
              >
                <span className="font-semibold text-term-amber">⚡ blitz</span>
                <span className="mt-1 block text-xs leading-relaxed text-term-dim">
                  each question gets its own countdown — time out and it counts
                  as a miss.
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={`choose: 1–${levelInfos.length} or a name (e.g. workflow)`}
        hint={
          notice ??
          `levels: ${levelInfos.map((l) => l.name).join(" · ")} — enter: start · sprint/blitz: timed · ${categoryLabels[category]} has ${set.questions.length} questions`
        }
        actions={
          <Button variant="primary" onClick={() => handleSelect(levelInfos[0].id)}>
            start →
          </Button>
        }
      />
    </div>
  );
}
