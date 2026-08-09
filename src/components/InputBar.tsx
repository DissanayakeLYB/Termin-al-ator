import type { ReactNode, Ref } from "react";
import { AnswerInput } from "./AnswerInput";

interface InputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  /** Ref to the inner input, for focusing on page load. */
  inputRef?: Ref<HTMLInputElement>;
  placeholder?: string;
  readOnly?: boolean;
  hint?: ReactNode;
  actions?: ReactNode;
}

export function InputBar({
  value,
  onChange,
  onSubmit,
  inputRef,
  placeholder,
  readOnly = false,
  hint,
  actions,
}: InputBarProps) {
  return (
    <div className="border-t border-term-edge bg-term-panel2 px-4 py-3 sm:px-8">
      <div className="flex items-center gap-3">
        <AnswerInput
          ref={inputRef}
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder={placeholder}
          readOnly={readOnly}
          className="flex-1"
        />
        {actions}
      </div>
      {hint && <p className="mt-2 text-[0.6875rem] text-term-dim">{hint}</p>}
    </div>
  );
}
