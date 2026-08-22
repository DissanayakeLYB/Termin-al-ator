import { useEffect, useRef, useState } from "react";
import type { Category } from "../data/questions";
import { availableQuestionSets, comingSoonSets } from "../data/questions";
import { isGuideCommand, isSettingsCommand, isTimedCommand } from "../utils/commands";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface CategoryPageProps {
  onSelect: (category: Category) => void;
  /** Opens the timed daily-practice sprint setup. */
  onTimed: () => void;
  /** Opens the SSH guide page. */
  onGuide?: () => void;
  /** Current daily sprint streak, shown on the sprint card. */
  streak?: number;
  onSettings?: () => void;
}

/** Full-page terminal menu: pick what to practice. */
export function CategoryPage({ onSelect, onTimed, onGuide, streak = 0, onSettings }: CategoryPageProps) {
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = (category: Category) => {
    setNotice(null);
    setValue("");
    onSelect(category);
  };

  const handleSubmit = () => {
    const raw = value.trim();
    if (!raw) {
      // Just pressing enter starts the primary action — first tool up.
      handleSelect(availableQuestionSets[0].category);
      return;
    }
    const lower = raw.toLowerCase();

    if (isSettingsCommand(raw)) {
      setValue("");
      onSettings?.();
      return;
    }

    if (isTimedCommand(raw)) {
      setValue("");
      onTimed();
      return;
    }

    if (isGuideCommand(raw)) {
      setValue("");
      onGuide?.();
      return;
    }

    // A number picks the nth available category.
    if (/^\d+$/.test(lower)) {
      const set = availableQuestionSets[Number.parseInt(lower, 10) - 1];
      if (set) {
        handleSelect(set.category);
        return;
      }
      setNotice(`no practice #${lower} — pick 1–${availableQuestionSets.length}`);
      setValue("");
      return;
    }

    // A name (or label) picks the matching category.
    const hit = availableQuestionSets.find(
      (set) => set.category === lower || set.label === lower
    );
    if (hit) {
      handleSelect(hit.category);
      return;
    }

    const soon = comingSoonSets.find((set) => set.category === lower || set.label === lower);
    if (soon) {
      setNotice(`${soon.label} is coming soon — pick one that's ready`);
      setValue("");
      return;
    }

    setNotice(`unknown choice: ${raw} — type a number or a name`);
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag="practice menu">
            pick what to practice — type a number or name, or click a row. You can
            switch anytime from inside a session with{" "}
            <span className="text-term-amber">:menu</span>.
          </BootBanner>

          {/* SSH guide — learn concepts before practicing. */}
          {onGuide && (
            <button
              type="button"
              onClick={onGuide}
              className="group mt-6 flex w-full items-center gap-3 rounded-md border border-term-blue/40 bg-term-blue/5 p-4 text-left transition-colors hover:border-term-blue/70 hover:bg-term-blue/10 sm:gap-4"
            >
              <span className="shrink-0 text-xl" aria-hidden="true">
                📖
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-bold text-term-blue transition-colors group-hover:text-term-bright">
                    ssh guide
                  </span>
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-term-fg/70">
                  step-by-step walkthroughs — learn SSH concepts with
                  explanations and interactive exercises before quizzing.
                </span>
              </span>
              <span className="shrink-0 rounded-md border border-term-blue/40 px-3 py-1.5 text-xs font-semibold text-term-blue transition-colors group-hover:bg-term-blue/15">
                learn →
              </span>
            </button>
          )}

          {/* Timed daily-practice sprint — a routine, not a test. */}
          <button
            type="button"
            onClick={onTimed}
            className="group mt-6 flex w-full items-center gap-3 rounded-md border border-term-amber/40 bg-term-amber/5 p-4 text-left transition-colors hover:border-term-amber/70 hover:bg-term-amber/10 sm:gap-4"
          >
            <span className="shrink-0 text-xl" aria-hidden="true">
              ⏱
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-bold text-term-amber transition-colors group-hover:text-term-bright">
                  10 minute practice
                </span>
                {streak > 0 && (
                  <span className="text-xs text-term-amber">🔥 {streak}-day streak</span>
                )}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-term-fg/70">
                a timed daily sprint — mixed questions from every tool and
                level, weighted toward what you've missed. no score pressure,
                just reps. pick a length or go with 10.
              </span>
            </span>
            <span className="shrink-0 rounded-md border border-term-amber/40 px-3 py-1.5 text-xs font-semibold text-term-amber transition-colors group-hover:bg-term-amber/15">
              start →
            </span>
          </button>

          <p className="mt-8 text-[0.625rem] uppercase tracking-widest text-term-dim">
            pick a tool
          </p>

          <div className="mt-3">
            {availableQuestionSets.map((set, i) => (
              <button
                key={set.category}
                type="button"
                onClick={() => handleSelect(set.category)}
                className="group flex w-full items-baseline gap-3 border-l-2 border-transparent py-3 pl-4 text-left transition-colors hover:border-term-green hover:bg-term-panel/40 sm:gap-4"
              >
                <span className="w-6 shrink-0 text-sm text-term-dim tabular-nums">
                  {i + 1}.
                </span>
                <span className="font-semibold text-term-green transition-colors group-hover:text-term-bright">
                  {set.label}
                </span>
                <span className="shrink-0 text-xs text-term-dim tabular-nums">
                  {set.questions.length} questions
                </span>
                <span className="ml-auto hidden truncate text-xs text-term-dim md:inline">
                  {set.description}
                </span>
              </button>
            ))}
          </div>

          {comingSoonSets.length > 0 && (
            <div className="mt-6 border-t border-term-edge/60 pt-4">
              <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
                coming soon
              </p>
              <div className="mt-2">
                {comingSoonSets.map((set) => (
                  <p
                    key={set.category}
                    className="flex items-baseline gap-3 py-2 pl-4 text-term-dim/60 sm:gap-4"
                  >
                    <span className="w-6 shrink-0 text-sm tabular-nums">
                      {availableQuestionSets.length + comingSoonSets.indexOf(set) + 1}.
                    </span>
                    <span className="font-semibold">{set.label}</span>
                    <span className="ml-auto hidden truncate text-xs md:inline">
                      {set.description}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={`choose: 1–${availableQuestionSets.length} or a name (e.g. tmux)`}
        hint={
          notice ??
          `available: ${availableQuestionSets.map((s) => s.label).join(" · ")} — enter: start`
        }
        actions={
          <>
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
              onClick={() => handleSelect(availableQuestionSets[0].category)}
            >
              start →
            </Button>
          </>
        }
      />
    </div>
  );
}
