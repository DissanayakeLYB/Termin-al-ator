import { useEffect, useRef, useState } from "react";
import type { Category } from "../data/questions";
import { availableQuestionSets, comingSoonSets } from "../data/questions";
import { isGuideCommand, isSettingsCommand, isTimedCommand } from "../utils/commands";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { PageHeader } from "../components/PageHeader";

interface CategoryPageProps {
  onSelect: (category: Category) => void;
  /** Opens the timed daily-practice sprint setup. */
  onTimed: () => void;
  /** Opens the tutorials picker. */
  onTutorials?: () => void;
  /** Current daily sprint streak, shown next to the title. */
  streak?: number;
  onSettings?: () => void;
}

/** Practice menu: pick a tool to drill. */
export function CategoryPage({
  onSelect,
  onTimed,
  onTutorials,
  streak = 0,
  onSettings,
}: CategoryPageProps) {
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
      onTutorials?.();
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

    const soon = comingSoonSets.find(
      (set) => set.category === lower || set.label === lower
    );
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
      <PageHeader
        title="Practice"
        subtitle="Pick a tool, then choose the kind of practice."
        onSettings={onSettings}
        actions={
          // The rail already shows the streak on desktop; keep the badge for
          // small screens, where the rail lives behind the drawer.
          streak > 0 ? (
            <span className="rounded-full border border-term-amber/30 bg-term-amber/5 px-2.5 py-1 text-[0.6875rem] text-term-amber lg:hidden">
              🔥 {streak}
            </span>
          ) : null
        }
      />

      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {availableQuestionSets.map((set, i) => (
              <button
                key={set.category}
                type="button"
                onClick={() => handleSelect(set.category)}
                className="group flex cursor-pointer flex-col rounded-xl border border-term-edge bg-term-panel/40 p-4 text-left transition-colors hover:border-term-green/50 hover:bg-term-panel/70"
              >
                <span className="flex items-baseline gap-2.5">
                  <span className="text-[0.6875rem] tabular-nums text-term-dim">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-term-fg transition-colors group-hover:text-term-bright">
                    {set.label}
                  </span>
                  <span className="ml-auto text-[0.6875rem] tabular-nums text-term-dim">
                    {set.questions.length} questions
                  </span>
                </span>
                <span className="mt-1.5 text-xs leading-relaxed text-term-dim">
                  {set.description}
                </span>
              </button>
            ))}
          </div>

          {comingSoonSets.length > 0 && (
            <p className="mt-7 text-xs leading-relaxed text-term-dim/70">
              coming soon: {comingSoonSets.map((set) => set.label).join(" · ")}
            </p>
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
          <Button
            variant="primary"
            onClick={() => handleSelect(availableQuestionSets[0].category)}
          >
            start →
          </Button>
        }
      />
    </div>
  );
}
