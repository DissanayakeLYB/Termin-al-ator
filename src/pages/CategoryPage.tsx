import { useEffect, useRef, useState } from "react";
import type { Category } from "../data/questions";
import { availableQuestionSets, comingSoonSets } from "../data/questions";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface CategoryPageProps {
  onSelect: (category: Category) => void;
}

/** Full-page terminal menu: pick what to practice. */
export function CategoryPage({ onSelect }: CategoryPageProps) {
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
    if (!raw) return;
    const lower = raw.toLowerCase();

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

          <div className="mt-6">
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
              <p className="text-[10px] uppercase tracking-widest text-term-dim">
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
          `available: ${availableQuestionSets.map((s) => s.label).join(" · ")}`
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
