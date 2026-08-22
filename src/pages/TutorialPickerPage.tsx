import { useEffect, useRef, useState } from "react";
import {
  guideRegistry,
  availableGuides,
  comingSoonGuides,
  type ToolGuide,
} from "../data/guideRegistry";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";

interface TutorialPickerPageProps {
  onSelect: (tool: ToolGuide) => void;
  onBack: () => void;
  onSettings?: () => void;
}

/** Full-page terminal menu: pick a tool to learn about. */
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
      (g) =>
        g.category === lower || g.label.toLowerCase() === lower
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
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag="tutorials">
            learn each tool step-by-step — walkthroughs with explanations
            and interactive exercises. pick a tool to start.
          </BootBanner>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="text-xs">
              ⌂ tools
            </Button>
          </div>

          <p className="mt-8 text-[0.625rem] uppercase tracking-widest text-term-dim">
            pick a tool
          </p>

          <div className="mt-3">
            {availableGuides.map((guide, i) => (
              <button
                key={guide.category}
                type="button"
                onClick={() => onSelect(guide)}
                className="group flex w-full items-baseline gap-3 border-l-2 border-transparent py-3 pl-4 text-left transition-colors hover:border-term-blue hover:bg-term-panel/40 sm:gap-4"
              >
                <span className="w-6 shrink-0 text-sm text-term-dim tabular-nums">
                  {i + 1}.
                </span>
                <span className="shrink-0 text-lg" aria-hidden="true">
                  {guide.icon}
                </span>
                <span className="font-semibold text-term-blue transition-colors group-hover:text-term-bright">
                  {guide.label}
                </span>
                <span className="shrink-0 text-xs text-term-dim tabular-nums">
                  {guide.sections.length} sections
                </span>
                <span className="ml-auto hidden truncate text-xs text-term-dim md:inline">
                  {guide.description}
                </span>
              </button>
            ))}
          </div>

          {comingSoonGuides.length > 0 && (
            <div className="mt-6 border-t border-term-edge/60 pt-4">
              <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
                coming soon
              </p>
              <div className="mt-2">
                {comingSoonGuides.map((guide) => (
                  <p
                    key={guide.category}
                    className="flex items-baseline gap-3 py-2 pl-4 text-term-dim/60 sm:gap-4"
                  >
                    <span className="w-6 shrink-0 text-sm tabular-nums">
                      {availableGuides.length + comingSoonGuides.indexOf(guide) + 1}.
                    </span>
                    <span className="shrink-0 text-lg" aria-hidden="true">
                      {guide.icon}
                    </span>
                    <span className="font-semibold">{guide.label}</span>
                    <span className="ml-auto hidden truncate text-xs md:inline">
                      {guide.description}
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
        placeholder={`choose: 1–${availableGuides.length} or a name (e.g. ssh)`}
        hint={
          notice ??
          `available: ${availableGuides.map((g) => g.label).join(" · ")} — enter: start`
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
              onClick={() => onSelect(availableGuides[0])}
            >
              start →
            </Button>
          </>
        }
      />
    </div>
  );
}
