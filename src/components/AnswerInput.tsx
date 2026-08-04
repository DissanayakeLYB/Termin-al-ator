import type { Ref } from "react";

interface AnswerInputProps {
  ref?: Ref<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AnswerInput({
  ref,
  value,
  onChange,
  onSubmit,
  placeholder = "type the command…",
  readOnly = false,
  disabled = false,
  className = "",
}: AnswerInputProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md border bg-term-bg px-4 py-3 transition-colors ${
        readOnly || disabled
          ? "border-term-edge opacity-70"
          : "border-term-edge2 focus-within:border-term-green focus-within:shadow-[0_0_0_1px_rgba(74,222,128,0.35)]"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="select-none text-lg font-bold text-term-green"
      >
        ❯
      </span>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
        }}
        readOnly={readOnly}
        disabled={disabled}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        placeholder={placeholder}
        aria-label="Command input"
        className={`w-full bg-transparent caret-term-green placeholder:text-term-dim/60 focus:outline-none ${
          readOnly ? "text-term-dim" : "text-term-fg"
        }`}
      />
    </div>
  );
}
