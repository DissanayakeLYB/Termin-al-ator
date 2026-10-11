import type { ReactNode } from "react";
import { useNav } from "./nav";

interface PageHeaderProps {
  /** Page title, e.g. "Practice" or "Vim · pareto". */
  title: ReactNode;
  /** One short line of context under the title. Keep it to a few words. */
  subtitle?: ReactNode;
  /** Back / up-one-level action, rendered as a compact ghost button. */
  onBack?: () => void;
  /** Label for the back button (defaults to "back"). */
  backLabel?: string;
  /** Opens the settings overlay. */
  onSettings?: () => void;
  /** Extra right-aligned controls (buttons, badges). */
  actions?: ReactNode;
}

/**
 * The single, slim header every screen shares: title, one line of context, and
 * the handful of controls that belong to the page. It replaces the old boot
 * banner (logo + paragraph of instructions) so screens start with their
 * content instead of a wall of text.
 */
export function PageHeader({
  title,
  subtitle,
  onBack,
  backLabel = "‹ back",
  onSettings,
  actions,
}: PageHeaderProps) {
  const nav = useNav();

  return (
    <header className="shrink-0 border-b border-term-edge/70 bg-term-bg/60 px-4 py-3.5 sm:px-8">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
        {nav && (
          <button
            type="button"
            onClick={nav.openNav}
            aria-label="open navigation"
            title="navigation"
            className="-ml-1 shrink-0 cursor-pointer rounded-md border border-term-edge2 px-2.5 py-1 text-sm leading-none text-term-dim transition-colors hover:border-term-green/60 hover:text-term-green lg:hidden"
          >
            ☰
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="shrink-0 cursor-pointer rounded-md border border-term-edge2 px-2.5 py-1 text-xs text-term-dim transition-colors hover:border-term-green/60 hover:text-term-green"
          >
            {backLabel}
          </button>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-sm font-bold leading-tight text-term-fg sm:text-base">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-xs leading-relaxed text-term-dim">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {actions}
          {onSettings && (
            <button
              type="button"
              onClick={onSettings}
              aria-label="settings"
              title="settings: font size + theme"
              className="cursor-pointer rounded-md border border-term-edge2 px-2.5 py-1 text-sm leading-none text-term-dim transition-colors hover:border-term-green/60 hover:text-term-green"
            >
              ⚙
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
