import { useEffect, useRef, useState } from "react";
import type { Category, Level } from "../data/questions";
import { categoryLabels, questionSets } from "../data/questions";
import { countForLevel, levelInfos } from "../data/levels";
import { isBackCommand } from "../utils/commands";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface LevelPageProps {
  category: Category;
  onSelect: (level: Level) => void;
  onBack: () => void;
}

/**
 * Level picker: after choosing a tool, the user chooses *what kind of
 * practice* they want. Each level has a distinct purpose — never a
 * difficulty rating.
 */
export function LevelPage({ category, onSelect, onBack }: LevelPageProps) {
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
    if (!raw) return;
    const lower = raw.toLowerCase();

    if (isBackCommand(raw)) {
      onBack();
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
      `unknown choice: ${raw} — type a number or a level name, or "menu" to change tool`
    );
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="max-w-3xl">
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
            <span className="text-[11px] text-term-dim">
              change tool with <span className="text-term-amber">menu</span> or{" "}
              <span className="text-term-amber">back</span>
            </span>
          </div>

          <div className="mt-4">
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
                        <span className="rounded border border-term-green/40 bg-term-green/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-term-green">
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
          `levels: ${levelInfos.map((l) => l.name).join(" · ")} · ${categoryLabels[category]} has ${set.questions.length} questions total`
        }
        actions={
          <>
            <Button variant="ghost" onClick={onBack}>
              ⌂ tools
            </Button>
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
