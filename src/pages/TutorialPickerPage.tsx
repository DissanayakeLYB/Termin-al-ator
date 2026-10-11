import { useEffect, useRef, useState } from "react";
import {
  guideRegistry,
  availableGuides,
  comingSoonGuides,
  type ToolGuide,
} from "../data/guideRegistry";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import { PageHeader } from "../components/PageHeader";

interface TutorialPickerPageProps {
  onSelect: (tool: ToolGuide) => void;
  onBack: () => void;
  onSettings?: () => void;
}

/** Menu screen: pick a tool to learn about. */
export function TutorialPickerPage({
  onSelect,
  onBack,
  onSettings,
}: TutorialPickerPageProps) {
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const raw = value.trim();
    if (!raw) {
      onSelect(availableGuides[0]);
      return;
    }
    const lower = raw.toLowerCase();

    // A number picks the nth available guide.
    if (/^\d+$/.test(lower)) {
      const guide = availableGuides[Number.parseInt(lower, 10) - 1];
      if (guide) {
        onSelect(guide);
        return;
      }
      setNotice(`no tutorial #${lower} — pick 1–${availableGuides.length}`);
      setValue("");
      return;
    }

    // A name matches against all tools (available or coming soon).
    const hit = guideRegistry.find(
      (g) => g.category === lower || g.label.toLowerCase() === lower
    );
    if (hit) {
      if (hit.available) {
        onSelect(hit);
        return;
      }
      setNotice(`${hit.label} tutorial is coming soon — pick one that's ready`);
      setValue("");
      return;
    }

    setNotice(`unknown tool: ${raw} — type a number or a name`);
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <PageHeader
        title="Tutorials"
        subtitle="Walkthroughs with explanations and interactive exercises."
        onBack={onBack}
        backLabel="⌂ tools"
        onSettings={onSettings}
      />

      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {availableGuides.map((guide, i) => (
              <button
                key={guide.category}
                type="button"
                onClick={() => onSelect(guide)}
                className="group flex cursor-pointer flex-col rounded-xl border border-term-edge bg-term-panel/40 p-4 text-left transition-colors hover:border-term-blue/50 hover:bg-term-panel/70"
              >
                <span className="flex items-baseline gap-2.5">
                  <span className="text-[0.6875rem] tabular-nums text-term-dim">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-term-fg transition-colors group-hover:text-term-bright">
                    {guide.label}
                  </span>
                  <span className="ml-auto text-[0.6875rem] tabular-nums text-term-dim">
                    {guide.sections.length} sections
                  </span>
                </span>
                <span className="mt-1.5 text-xs leading-relaxed text-term-dim">
                  {guide.description}
                </span>
              </button>
            ))}
          </div>

          {comingSoonGuides.length > 0 && (
            <p className="mt-7 text-xs leading-relaxed text-term-dim/70">
              coming soon: {comingSoonGuides.map((g) => g.label).join(" · ")}
            </p>
          )}
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={`choose: 1–${availableGuides.length} or a name (e.g. ssh)`}
        hint={
          notice ??
          `available: ${availableGuides.map((g) => g.label).join(" · ")} — enter: start`
        }
        actions={
          <Button variant="primary" onClick={() => onSelect(availableGuides[0])}>
            start →
          </Button>
        }
      />
    </div>
  );
}
