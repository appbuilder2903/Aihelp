import type { Message } from "@/types";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export default function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      data-ocid={`chat.item.${index + 1}`}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          background: isUser
            ? "linear-gradient(135deg, oklch(0.65 0.22 210), oklch(0.55 0.20 260))"
            : "linear-gradient(135deg, oklch(0.45 0.25 320), oklch(0.50 0.22 280))",
          boxShadow: isUser
            ? "0 0 12px oklch(0.65 0.22 210 / 0.5)"
            : "0 0 12px oklch(0.55 0.25 320 / 0.5)",
        }}
      >
        {isUser ? (
          <User className="h-4 w-4 text-black" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3"
        style={{
          background: isUser
            ? "linear-gradient(135deg, oklch(0.20 0.08 210 / 0.85), oklch(0.18 0.06 260 / 0.85))"
            : "linear-gradient(135deg, oklch(0.15 0.06 320 / 0.85), oklch(0.14 0.05 280 / 0.85))",
          border: isUser
            ? "1px solid oklch(0.65 0.22 210 / 0.40)"
            : "1px solid oklch(0.55 0.25 320 / 0.40)",
          backdropFilter: "blur(12px)",
          boxShadow: isUser
            ? "0 0 18px oklch(0.65 0.22 210 / 0.20), inset 0 1px 0 oklch(0.65 0.22 210 / 0.15)"
            : "0 0 18px oklch(0.55 0.25 320 / 0.20), inset 0 1px 0 oklch(0.55 0.25 320 / 0.15)",
        }}
      >
        {!isUser && (
          <p
            className="mb-1 text-xs font-semibold"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.70 0.25 320), oklch(0.70 0.22 280))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI Assistant
          </p>
        )}
        <p
          className="break-words text-sm leading-relaxed"
          style={{
            animation: isUser
              ? "color-cycle-user 8s linear infinite"
              : "color-cycle-ai 6s linear infinite",
          }}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
}
