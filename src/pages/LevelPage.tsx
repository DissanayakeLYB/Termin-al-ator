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
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

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
export function LevelPage({ category, onSelect, onBack, onSprint, onBlitz, onSettings }: LevelPageProps) {
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
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag={`${categoryLabels[category]} — pick a level`}>
            What kind of practice do you want right now? Levels are about{" "}
            <span className="text-term-amber">how you practice</span>, not how
            hard the questions are. Type a number or name, or click a row.
            Start with <span className="text-term-green">pareto</span> if
            you're new.
          </BootBanner>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="text-xs">
              ⌂ tools
            </Button>
            <span className="text-[0.6875rem] text-term-dim">
              change tool with <span className="text-term-amber">menu</span> or{" "}
              <span className="text-term-amber">back</span>
            </span>
          </div>

          {/* Timed practice — per-tool session timer or per-question blitz. */}
          <div className="mt-8">
            <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
              timed practice
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onSprint}
                className="group rounded-md border border-term-amber/40 bg-term-amber/5 p-4 text-left transition-colors hover:border-term-amber/70 hover:bg-term-amber/10"
              >
                <span className="flex items-baseline gap-2">
                  <span className="text-sm" aria-hidden="true">⏱</span>
                  <span className="font-bold text-term-amber transition-colors group-hover:text-term-bright">
                    sprint — session timer
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-term-fg/70">
                  one countdown for the whole run: answer as many as you can
                  before it hits zero. mixed levels, weighted to your misses.
                </span>
              </button>
              <button
                type="button"
                onClick={onBlitz}
                className="group rounded-md border border-term-amber/40 bg-term-amber/5 p-4 text-left transition-colors hover:border-term-amber/70 hover:bg-term-amber/10"
              >
                <span className="flex items-baseline gap-2">
                  <span className="text-sm" aria-hidden="true">⚡</span>
                  <span className="font-bold text-term-amber transition-colors group-hover:text-term-bright">
                    blitz — per-question timer
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-term-fg/70">
                  each question gets its own countdown — time out and it counts
                  as a miss. ends when the pool runs out, no repeats.
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8">
            {levelInfos.map((info, i) => {
              const count = countForLevel(set, info.id);
              const disabled = count === 0;
              return (
                <button
                  key={info.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(info.id)}
                  className={`group flex w-full items-start gap-3 border-l-2 py-4 pl-4 text-left transition-colors sm:gap-4 ${
                    disabled ? "cursor-not-allowed opacity-40" : `hover:bg-term-panel/40 ${info.border}`
                  }`}
                >
                  <span className="w-6 shrink-0 pt-0.5 text-sm text-term-dim tabular-nums">
                    {i + 1}.
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`font-bold ${info.accent} transition-colors group-hover:text-term-bright`}
                      >
                        {info.name}
                      </span>
                      <span className="text-xs text-term-dim">{info.tagline}</span>
                      {info.recommended && (
                        <span className="rounded border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[0.625rem] uppercase tracking-wider text-term-green">
                          start here
                        </span>
                      )}
                      <span className="ml-auto shrink-0 text-xs text-term-dim tabular-nums">
                        {info.id === "chaos"
                          ? `${count} · every level mixed`
                          : `${count} questions`}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-term-fg/70">
                      {info.description}
                    </span>
                  </span>
                </button>
              );
            })}
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
          <>
            <Button variant="ghost" onClick={onBack}>
              ⌂ tools
            </Button>
            {onSettings && (
              <Button
                variant="ghost"
                onClick={onSettings}
                aria-label="settings"
                title="settings: font size + theme"
              >
                ⚙
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => handleSelect(levelInfos[0].id)}
            >
              start →
            </Button>
          </>
        }
      />
    </div>
  );
}
