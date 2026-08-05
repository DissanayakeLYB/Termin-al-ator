import type { ReactNode } from "react";

interface BootBannerProps {
  /** Small tag after the logo, e.g. "vim trainer" or "practice menu". */
  tag?: string;
  /** Optional one-liner rendered under the logo. */
  children?: ReactNode;
}

/** The termin(al)ator boot banner, shared across terminal screens. */
export function BootBanner({ tag, children }: BootBannerProps) {
  return (
    <div className="border-b border-term-edge/60 pb-4">
      <p className="text-lg font-bold tracking-tight sm:text-xl">
        <span className="text-term-green">termin</span>
        <span className="text-term-amber">(al)</span>
        <span className="text-term-bright">ator</span>
        {tag && <span className="text-term-dim"> · {tag}</span>}
      </p>
      {children && (
        <p className="mt-1.5 text-xs leading-relaxed text-term-dim sm:text-sm">
          {children}
        </p>
      )}
    </div>
  );
}
