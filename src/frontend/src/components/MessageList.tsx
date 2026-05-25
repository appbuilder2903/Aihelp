import MessageBubble from "@/components/MessageBubble";
import type { Message } from "@/types";
import { Loader2, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const msgCount = messages.length;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll ref side-effect
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgCount, isLoading]);

  if (!messages.length && !isLoading) {
    return (
      <div
        data-ocid="chat.empty_state"
        className="flex flex-1 flex-col items-center justify-center gap-4 py-20 text-center"
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.22 210 / 0.15), oklch(0.65 0.25 320 / 0.15))",
            border: "1px solid oklch(0.65 0.22 210 / 0.30)",
            boxShadow: "0 0 30px oklch(0.65 0.22 210 / 0.15)",
          }}
        >
          <MessageSquare
            className="h-8 w-8"
            style={{ color: "oklch(0.65 0.22 210)" }}
          />
        </div>
        <div>
          <p
            className="font-display text-lg font-semibold"
            style={{ color: "oklch(0.75 0.15 210)" }}
          >
            Ask about your holiday homework!
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Select an AI model above, then type your question below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4">
      {messages.map((msg, i) => (
        <MessageBubble key={msg.id} message={msg} index={i} />
      ))}

      {isLoading && (
        <div data-ocid="chat.loading_state" className="flex gap-3">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.45 0.25 320), oklch(0.50 0.22 280))",
              boxShadow: "0 0 12px oklch(0.55 0.25 320 / 0.5)",
            }}
          >
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          </div>
          <div
            className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
            style={{
              background: "oklch(0.15 0.06 320 / 0.85)",
              border: "1px solid oklch(0.55 0.25 320 / 0.40)",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full"
                style={{
                  background: "oklch(0.65 0.25 320)",
                  animation: `bounce-dot 1.2s ease-in-out infinite ${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
