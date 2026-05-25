import { Sparkles } from "lucide-react";

interface HeaderProps {
  onClear?: () => void;
}

export default function Header({ onClear }: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 210), oklch(0.65 0.25 320))",
            boxShadow:
              "0 0 20px oklch(0.65 0.22 210 / 0.6), 0 0 40px oklch(0.65 0.22 210 / 0.3)",
          }}
        >
          <Sparkles className="h-5 w-5 text-black" />
        </div>
        <h1
          className="flex-1 font-display text-lg font-bold leading-tight sm:text-xl"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.22 210), oklch(0.80 0.25 320), oklch(0.80 0.18 140), oklch(0.75 0.22 210))",
            backgroundSize: "300% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "rainbow-shift 6s linear infinite",
          }}
        >
          Hossain Azmal holiday homework helper ai
        </h1>
        {onClear && (
          <button
            type="button"
            data-ocid="chat.clear_button"
            onClick={onClear}
            aria-label="Clear chat history"
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            style={{
              background: "oklch(0.12 0.03 260 / 0.7)",
              border: "1px solid oklch(0.65 0.22 210 / 0.5)",
              color: "oklch(0.85 0.20 210)",
              boxShadow: "0 0 12px oklch(0.65 0.22 210 / 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            Clear Chat
          </button>
        )}
      </div>
    </header>
  );
}
