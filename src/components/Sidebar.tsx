import type { Category } from "../data/questions";
import { availableQuestionSets, comingSoonSets } from "../data/questions";

/** The three top-level sections the rail can highlight. */
export type NavSection = "practice" | "timed" | "tutorials";

interface SidebarProps {
  /** Which top-level section the current screen belongs to. */
  section: NavSection;
  /** Tool being practiced or read about, if any (highlights its row). */
  activeTool: Category | null;
  /** Daily-practice streak; hidden when 0. */
  streak: number;
  onHome: () => void;
  onTimed: () => void;
  onTutorials: () => void;
  onTool: (category: Category) => void;
  onSettings: () => void;
  /** Called after any navigation, so the mobile drawer can close itself. */
  onNavigate?: () => void;
}

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="px-3 pb-1.5 pt-4 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-term-dim/70">
      {children}
    </p>
  );
}

function Row({
  label,
  glyph,
  count,
  soon = false,
  active = false,
  onClick,
}: {
  label: string;
  glyph?: string;
  count?: string;
  soon?: boolean;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      disabled={soon}
      className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        soon
          ? "cursor-default text-term-dim/50"
          : active
            ? "bg-term-panel2 font-semibold text-term-bright"
            : "text-term-fg/75 hover:bg-term-panel/70 hover:text-term-fg"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-4 w-0.5 shrink-0 rounded-full ${
          active ? "bg-term-green" : "bg-transparent"
        }`}
      />
      {glyph && (
        <span className="w-4 shrink-0 text-center text-xs opacity-70" aria-hidden="true">
          {glyph}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count && (
        <span className="shrink-0 text-[0.6875rem] tabular-nums text-term-dim">{count}</span>
      )}
      {soon && <span className="shrink-0 text-[0.6875rem] text-term-dim/60">soon</span>}
    </button>
  );
}

/**
 * The persistent navigation rail: section links on top, every tool below, and
 * the settings entry (plus the practice streak) pinned to the bottom. It gives
 * the app a stable frame so individual screens don't have to re-explain where
 * you can go.
 */
export function Sidebar({
  section,
  activeTool,
  streak,
  onHome,
  onTimed,
  onTutorials,
  onTool,
  onSettings,
  onNavigate,
}: SidebarProps) {
  const go = (fn: () => void) => () => {
    fn();
    onNavigate?.();
  };

  // The home row is only "current" when we're not inside a specific tool.
  const homeActive = section === "practice" && activeTool === null;

  return (
    <nav
      aria-label="Main navigation"
      className="terminal-scroll flex h-full w-full flex-col overflow-y-auto border-r border-term-edge bg-term-panel/45 px-2.5 py-4"
    >
      <button
        type="button"
        onClick={go(onHome)}
        className="cursor-pointer rounded-lg px-3 pb-3 pt-1 text-left text-sm font-bold tracking-tight"
      >
        termin<span className="text-term-amber">(al)</span>ator
      </button>

      <GroupLabel>practice</GroupLabel>
      <Row
        label="Practice"
        glyph="⌂"
        active={homeActive}
        onClick={go(onHome)}
      />
      <Row
        label="Timed practice"
        glyph="⏱"
        active={section === "timed"}
        onClick={go(onTimed)}
      />
      <Row
        label="Tutorials"
        glyph="▤"
        active={section === "tutorials"}
        onClick={go(onTutorials)}
      />

      <GroupLabel>tools</GroupLabel>
      {availableQuestionSets.map((set) => (
        <Row
          key={set.category}
          label={set.label}
          count={`${set.questions.length}`}
          active={activeTool === set.category && section === "practice"}
          onClick={go(() => onTool(set.category))}
        />
      ))}
      {comingSoonSets.map((set) => (
        <Row key={set.category} label={set.label} soon onClick={() => {}} />
      ))}

      <div className="mt-auto border-t border-term-edge/70 pt-3">
        <Row label="Settings" glyph="⚙" onClick={go(onSettings)} />
        {streak > 0 && (
          <p className="px-3 pt-1.5 text-[0.6875rem] text-term-amber">
            🔥 {streak}-day streak
          </p>
        )}
      </div>
    </nav>
  );
}
