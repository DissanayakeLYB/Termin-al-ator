import type { ReactNode } from "react";
import { AnswerInput } from "./AnswerInput";

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  readOnly?: boolean;
  hint?: ReactNode;
  actions?: ReactNode;
}

export function InputBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  readOnly = false,
  hint,
  actions,
}: InputBarProps) {
  return (
    <div className="border-t border-term-edge bg-term-panel2 px-4 py-3 sm:px-8">
      <div className="flex items-center gap-3">
        <AnswerInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder={placeholder}
          readOnly={readOnly}
          className="flex-1"
        />
        {actions}
      </div>
      {hint && <p className="mt-2 text-[11px] text-term-dim">{hint}</p>}
    </div>
  );
}
