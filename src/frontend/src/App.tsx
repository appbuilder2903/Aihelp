import AnimatedBackground from "@/components/AnimatedBackground";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import ModelSelector from "@/components/ModelSelector";
import { useChat, useProviders } from "@/hooks/useChat";
import { useEffect } from "react";

export default function App() {
  const { data: providers = [], isLoading: providersLoading } = useProviders();
  const {
    messages,
    isLoading,
    selectedProvider,
    setSelectedProvider,
    sendMessage,
    clearMessages,
  } = useChat();

  // Auto-select first provider once loaded
  useEffect(() => {
    if (providers.length > 0 && !selectedProvider) {
      setSelectedProvider(providers[0].id);
    }
  }, [providers, selectedProvider, setSelectedProvider]);

  return (
    <div
      className="relative flex h-screen flex-col overflow-hidden font-body"
      data-ocid="chat.page"
    >
      <AnimatedBackground />

      {/* Header */}
      <Header onClear={clearMessages} />

      {/* Model selector bar */}
      <div
        className="relative z-10 border-b border-white/10 px-4 py-3"
        style={{
          background: "oklch(0.10 0.02 260 / 0.60)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <ModelSelector
            providers={providers}
            selected={selectedProvider}
            onSelect={setSelectedProvider}
            isLoading={providersLoading}
          />
        </div>
      </div>

      {/* Messages area */}
      <main className="relative z-10 flex flex-1 flex-col overflow-hidden">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden px-4">
          <MessageList messages={messages} isLoading={isLoading} />
        </div>
      </main>

      {/* Input */}
      <div
        className="relative z-10 border-t border-white/10 px-4 py-4"
        style={{
          background: "oklch(0.08 0.02 260 / 0.70)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mx-auto max-w-5xl">
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            disabled={!selectedProvider}
          />
          {!selectedProvider && !providersLoading && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Select an AI model to start chatting
            </p>
          )}
          <p className="mt-3 text-center text-xs opacity-60 animate-[rainbow-shift_4s_ease-in-out_infinite]">
            Made by Hossain Azmal
          </p>
        </div>
      </div>
    </div>
  );
}
