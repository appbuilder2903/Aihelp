import { getProviders, sendChatMessage } from "@/api/client";
import type { Message, Provider } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

/**
 * Fetches the list of AI providers from the Cloudflare Workers API.
 * Results are cached for 5 minutes.
 */
export function useProviders() {
  return useQuery<Provider[], Error>({
    queryKey: ["providers"],
    queryFn: getProviders,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
  });
}

/**
 * Manages the chat state and exposes sendMessage / clearMessages actions.
 * All AI calls go through the Cloudflare Workers API — no ICP runtime needed.
 */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading || !selectedProvider) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await sendChatMessage(trimmed, selectedProvider);

        const aiMsg: Message = {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        const errorText =
          err instanceof Error
            ? err.message
            : "Sorry, something went wrong. Please try again.";

        const errMsg: Message = {
          id: `e-${Date.now()}`,
          role: "assistant",
          content: `⚠️ ${errorText}`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedProvider, isLoading],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    selectedProvider,
    setSelectedProvider,
    sendMessage,
    clearMessages,
  };
}
