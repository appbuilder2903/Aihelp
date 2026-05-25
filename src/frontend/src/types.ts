export interface Provider {
  id: string;
  name: string;
  model: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  selectedProvider: string;
}
