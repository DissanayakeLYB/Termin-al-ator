import { useEffect, useRef, useState } from "react";
import type { GuideExercise, GuideSection } from "../data/sshGuides";
import { normalizeAnswer } from "../utils/validate";
import { BootBanner } from "../components/BootBanner";
import { Button } from "../components/Button";
import { InputBar } from "../components/InputBar";
import type { ToolGuide } from "../data/guideRegistry";

interface GuidePageProps {
  tool: ToolGuide;
  onBack: () => void;
  onPractice?: () => void;
}

/**
 * Interactive guide page for a tool: browse sections, read explanations,
 * and try exercises inline.
 */
export function GuidePage({ tool, onBack, onPractice }: GuidePageProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sections = tool.sections;
  const section = sections.find((s) => s.id === activeSection) ?? null;

  if (!section) {
    return (
      <SectionList
        toolLabel={tool.label}
        sections={sections}
        onSelect={setActiveSection}
        onBack={onBack}
      />
    );
  }

  return (
    <SectionDetail
      toolLabel={tool.label}
      section={section}
      onBack={() => setActiveSection(null)}
      onPractice={onPractice}
    />
  );
}

/* ── Section list ───────────────────────────────────────────────────────── */

function SectionList({
  toolLabel,
  sections,
  onSelect,
  onBack,
}: {
  toolLabel: string;
  sections: GuideSection[];
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const [value, setValue] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const raw = value.trim();
    if (!raw) {
      onSelect(sections[0].id);
      return;
    }

    if (/^\d+$/.test(raw)) {
      const idx = Number.parseInt(raw, 10) - 1;
      if (sections[idx]) {
        onSelect(sections[idx].id);
        return;
      }
      setNotice(`no section #${raw} — pick 1–${sections.length}`);
      setValue("");
      return;
    }

    const hit = sections.find(
      (s) =>
        s.id === raw.toLowerCase() || s.title.toLowerCase() === raw.toLowerCase()
    );
    if (hit) {
      onSelect(hit.id);
      return;
    }

    setNotice(`unknown section: ${raw} — type a number or name`);
    setValue("");
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag={`${toolLabel.toLowerCase()} guide`}>
            step-by-step walkthroughs that teach {toolLabel} concepts with
            explanations and interactive exercises. pick a section to start.
          </BootBanner>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="text-xs">
              ← tutorials
            </Button>
          </div>

          <div className="mt-8">
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(s.id)}
                className="group flex w-full items-start gap-3 border-l-2 border-term-blue/40 py-4 pl-4 text-left transition-colors hover:border-term-blue hover:bg-term-panel/40 sm:gap-4"
              >
                <span className="w-6 shrink-0 pt-0.5 text-sm text-term-dim tabular-nums">
                  {i + 1}.
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-bold text-term-blue transition-colors group-hover:text-term-bright">
                      {s.title}
                    </span>
                    <span className="text-xs text-term-dim">{s.tagline}</span>
                    <span className="ml-auto shrink-0 text-xs text-term-dim tabular-nums">
                      {s.subsections.length} parts
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-term-fg/70">
                    {s.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <InputBar
        inputRef={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
        placeholder={`choose: 1–${sections.length} or a name`}
        hint={
          notice ??
          `sections: ${sections.map((s) => s.title.toLowerCase()).join(" · ")} — enter: start`
        }
        actions={
          <Button variant="primary" onClick={() => onSelect(sections[0].id)}>
            start →
          </Button>
        }
      />
    </div>
  );
}

/* ── Section detail ─────────────────────────────────────────────────────── */

function SectionDetail({
  toolLabel,
  section,
  onBack,
  onPractice,
}: {
  toolLabel: string;
  section: GuideSection;
  onBack: () => void;
  onPractice?: () => void;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="w-full">
          <BootBanner tag={`${toolLabel.toLowerCase()} guide · ${section.title.toLowerCase()}`}>
            {section.description}
          </BootBanner>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="text-xs">
              ← sections
            </Button>
            {onPractice && (
              <Button variant="ghost" onClick={onPractice} className="text-xs">
                practice quiz →
              </Button>
            )}
          </div>

          <div className="mt-8 space-y-10">
            {section.subsections.map((sub, i) => (
              <Subsection key={i} subsection={sub} index={i} />
            ))}
          </div>

          <div className="mt-12 border-t border-term-edge/60 pt-6">
            <p className="text-xs text-term-dim">
              finished? switch to the{" "}
              <span className="text-term-green">{toolLabel.toLowerCase()} quiz</span> to test your
              knowledge, or pick another guide section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Subsection ─────────────────────────────────────────────────────────── */

function Subsection({
  subsection,
  index,
}: {
  subsection: { title: string; text: string[]; codeBlocks?: { label?: string; code: string }[]; exercises?: GuideExercise[] };
  index: number;
}) {
  return (
    <section>
      <h2 className="flex items-baseline gap-2 text-base font-bold text-term-bright">
        <span className="text-term-dim tabular-nums">{index + 1}.</span>
        {subsection.title}
      </h2>

      <div className="mt-3 space-y-3">
        {subsection.text.map((p, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-term-fg/80"
          >
            {renderInlineCode(p)}
          </p>
        ))}
      </div>

      {subsection.codeBlocks && (
        <div className="mt-3 space-y-2">
          {subsection.codeBlocks.map((block, i) => (
            <div key={i}>
              {block.label && (
                <p className="mb-1 text-[0.6875rem] text-term-dim">
                  {block.label}
                </p>
              )}
              <pre className="overflow-x-auto rounded-md border border-term-edge bg-term-panel px-4 py-3 text-xs leading-relaxed text-term-green">
                {block.code}
              </pre>
            </div>
          ))}
        </div>
      )}

      {subsection.exercises && subsection.exercises.length > 0 && (
        <div className="mt-4 space-y-3">
          <p className="text-[0.625rem] uppercase tracking-widest text-term-dim">
            try it
          </p>
          {subsection.exercises.map((ex, i) => (
            <Exercise key={i} exercise={ex} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Exercise (inline mini-quiz) ────────────────────────────────────────── */

function Exercise({ exercise }: { exercise: GuideExercise }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{
    correct: boolean;
    submitted: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const normalized = normalizeAnswer(value);
    if (!normalized) return;

    const candidates = [exercise.answer, ...(exercise.aliases ?? [])];
    const correct = candidates.some((c) => c === normalized);
    setResult({ correct, submitted: normalized });
  };

  const handleNext = () => {
    setValue("");
    setResult(null);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`rounded-md border-l-4 p-3 ${
        result
          ? result.correct
            ? "border-term-green bg-term-green/5"
            : "border-term-red bg-term-red/5"
          : "border-term-blue/40 bg-term-panel"
      }`}
    >
      <p className="text-sm text-term-fg/80">{exercise.prompt}</p>

      {result ? (
        <div className="mt-2">
          <p
            className={`text-xs font-bold ${
              result.correct ? "text-term-bright" : "text-term-red"
            }`}
          >
            {result.correct ? "✓ Correct!" : "✗ Not quite"}
          </p>
          {!result.correct && (
            <p className="mt-1 text-xs text-term-fg/65">
              You typed{" "}
              <code className="rounded border border-term-edge2 bg-term-bg px-1 py-0.5 text-term-dim">
                {result.submitted}
              </code>{" "}
              — the answer is{" "}
              <code className="rounded border border-term-green/40 bg-term-bg px-1 py-0.5 text-term-green">
                {exercise.answer}
              </code>
            </p>
          )}
          <p className="mt-1 text-xs text-term-fg/60">
            {exercise.explanation}
          </p>
          <Button variant="ghost" onClick={handleNext} className="mt-2 text-xs">
            next →
          </Button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder="type the command..."
            className="flex-1 rounded border border-term-edge2 bg-term-bg px-3 py-1.5 text-xs text-term-fg placeholder-term-dim/50 focus:border-term-blue focus:outline-none"
          />
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="px-3 py-1.5 text-xs"
          >
            check
          </Button>
        </div>
      )}
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

/** Render backtick-wrapped text as inline code. */
function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded border border-term-edge2 bg-term-bg px-1 py-0.5 text-term-green"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
