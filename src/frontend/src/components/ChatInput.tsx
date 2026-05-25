import { Send } from "lucide-react";
import { useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  isLoading,
  disabled,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  };

  return (
    <div
      className="relative flex items-end gap-3 rounded-2xl p-3"
      style={{
        background: "oklch(0.12 0.03 260 / 0.75)",
        border: "1px solid oklch(0.65 0.22 210 / 0.35)",
        backdropFilter: "blur(16px)",
        boxShadow:
          "0 0 24px oklch(0.65 0.22 210 / 0.15), inset 0 1px 0 oklch(0.65 0.22 210 / 0.10)",
        animation: "glow-pulse 4s ease-in-out infinite",
      }}
    >
      <textarea
        ref={textareaRef}
        data-ocid="chat.input"
        rows={1}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask about your holiday homework…"
        disabled={isLoading || disabled}
        className="min-h-0 flex-1 resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
        style={{
          color: value ? undefined : undefined,
          animation: value ? "color-cycle-user 8s linear infinite" : "none",
        }}
      />
      <button
        type="button"
        data-ocid="chat.submit_button"
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading || disabled}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Send message"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.22 210), oklch(0.65 0.25 320))",
          boxShadow: "0 0 16px oklch(0.65 0.22 210 / 0.5)",
        }}
      >
        <Send className="h-4 w-4 text-black" />
      </button>
    </div>
  );
}
