import type { PagesFunction } from "@cloudflare/workers-types";

export interface Env {
  // ── Core LLM providers ──────────────────────────────────────────────────────
  OPENAI_API_KEY?: string;
  GROQ_API_KEY?: string;
  GEMINI_API_KEY?: string;
  PERPLEXITY_API_KEY?: string;
  TOGETHER_API_KEY?: string;
  FIREWORKS_API_KEY?: string;
  OPENROUTER_API_KEY?: string;

  // ── HuggingFace Serverless Inference API ────────────────────────────────────
  HF_API_KEY?: string;       // Your HuggingFace token (hf_...)

  // ── Additional AI providers ─────────────────────────────────────────────────
  BYTEZ_AI_KEY?: string;
  OXLO_AI_KEY?: string;
  LONGCAT_API_KEY?: string;

  // ── Utility APIs (search, weather, voice — not chat providers) ──────────────
  GOOGLE_API_KEY?: string;
  OPENWEATHER_API_KEY?: string;
  WEATHER_API_KEY?: string;
  GOOGLE_SEARCH_API_KEY?: string;
  SEARCH_ENGINE_ID?: string;

  // ── LiveKit (voice/video) ────────────────────────────────────────────────────
  LIVEKIT_URL?: string;
  LIVEKIT_API_KEY?: string;
  LIVEKIT_API_SECRET?: string;
}

interface ChatRequest {
  message: string;
  provider: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: { content: string };
  }>;
  error?: { message: string };
}

interface GeminiResponse {
  candidates: Array<{
    content: { parts: Array<{ text: string }> };
  }>;
  error?: { message: string };
}

type ProviderType = "openai_compat" | "gemini";

interface ProviderConfig {
  model: string;
  envKey: keyof Env;
  url: string;
  type: ProviderType;
}

const PROVIDERS: Record<string, ProviderConfig> = {
  // ── Tier 1: Commercial LLMs ─────────────────────────────────────────────────
  openai: {
    model: "gpt-4o",
    envKey: "OPENAI_API_KEY",
    url: "https://api.openai.com/v1/chat/completions",
    type: "openai_compat",
  },
  groq: {
    model: "llama-3.3-70b-versatile",
    envKey: "GROQ_API_KEY",
    url: "https://api.groq.com/openai/v1/chat/completions",
    type: "openai_compat",
  },
  gemini: {
    model: "gemini-1.5-flash",
    envKey: "GEMINI_API_KEY",
    url: "https://generativelanguage.googleapis.com/v1beta/models/",
    type: "gemini",
  },
  "gemini-pro": {
    model: "gemini-1.5-pro",
    envKey: "GEMINI_API_KEY",
    url: "https://generativelanguage.googleapis.com/v1beta/models/",
    type: "gemini",
  },
  perplexity: {
    model: "llama-3.1-sonar-large-128k-online",
    envKey: "PERPLEXITY_API_KEY",
    url: "https://api.perplexity.ai/chat/completions",
    type: "openai_compat",
  },
  together: {
    model: "meta-llama/Llama-3-70b-chat-hf",
    envKey: "TOGETHER_API_KEY",
    url: "https://api.together.xyz/v1/chat/completions",
    type: "openai_compat",
  },
  fireworks: {
    model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    envKey: "FIREWORKS_API_KEY",
    url: "https://api.fireworks.ai/inference/v1/chat/completions",
    type: "openai_compat",
  },
  openrouter: {
    model: "openai/gpt-4o",
    envKey: "OPENROUTER_API_KEY",
    url: "https://openrouter.ai/api/v1/chat/completions",
    type: "openai_compat",
  },

  // ── Tier 2: HuggingFace Serverless Inference API (no download needed) ───────
  // All models run on HF's cloud infrastructure using your HF token.
  // See: https://huggingface.co/docs/api-inference
  "hf-llama3-70b": {
    model: "meta-llama/Llama-3.1-70B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-llama3-8b": {
    model: "meta-llama/Llama-3.1-8B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-llama32-3b": {
    model: "meta-llama/Llama-3.2-3B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-mistral-7b": {
    model: "mistralai/Mistral-7B-Instruct-v0.3",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-mistral-nemo": {
    model: "mistralai/Mistral-Nemo-Instruct-2407",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-mixtral-8x7b": {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-qwen72b": {
    model: "Qwen/Qwen2.5-72B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-qwen7b": {
    model: "Qwen/Qwen2.5-7B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-qwen-coder": {
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-gemma2-9b": {
    model: "google/gemma-2-9b-it",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-gemma2-2b": {
    model: "google/gemma-2-2b-it",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-phi35-mini": {
    model: "microsoft/Phi-3.5-mini-instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-phi3-medium": {
    model: "microsoft/Phi-3-medium-4k-instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-deepseek-r1": {
    model: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-deepseek-coder": {
    model: "deepseek-ai/deepseek-coder-33b-instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-codellama": {
    model: "codellama/CodeLlama-13b-Instruct-hf",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-zephyr": {
    model: "HuggingFaceH4/zephyr-7b-beta",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-falcon": {
    model: "tiiuae/falcon-7b-instruct",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-yi-9b": {
    model: "01-ai/Yi-1.5-9B-Chat",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },
  "hf-tinyllama": {
    model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    envKey: "HF_API_KEY",
    url: "https://api-inference.huggingface.co/v1/chat/completions",
    type: "openai_compat",
  },

  // ── Tier 3: Additional AI providers ─────────────────────────────────────────
  bytez: {
    // Bytez AI — OpenAI-compatible endpoint
    model: "meta-llama/Llama-3.1-8B-Instruct",
    envKey: "BYTEZ_AI_KEY",
    url: "https://api.bytez.com/v1/chat/completions",
    type: "openai_compat",
  },
  oxlo: {
    // Oxlo AI
    model: "oxlo-default",
    envKey: "OXLO_AI_KEY",
    url: "https://api.oxlo.ai/v1/chat/completions",
    type: "openai_compat",
  },
  longcat: {
    // Longcat API
    model: "longcat-default",
    envKey: "LONGCAT_API_KEY",
    url: "https://api.longcat.ai/v1/chat/completions",
    type: "openai_compat",
  },
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

async function callOpenAICompatible(
  url: string,
  model: string,
  message: string,
  apiKey: string,
  extraHeaders: Record<string, string> = {},
): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful homework assistant. Provide clear, educational, step-by-step explanations. Help students understand concepts, not just get answers.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ?? `API error ${response.status}`,
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from API");
  return content;
}

async function callGemini(
  model: string,
  message: string,
  apiKey: string,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are a helpful homework assistant. Provide clear, educational, step-by-step explanations.\n\nStudent question: ${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    }),
  });

  const data = (await response.json()) as GeminiResponse;

  if (!response.ok) {
    throw new Error(
      data.error?.message ?? `Gemini API error ${response.status}`,
    );
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const { message, provider } = body;

  if (!message?.trim()) {
    return jsonResponse({ error: "message is required" }, 400);
  }
  if (!provider?.trim()) {
    return jsonResponse({ error: "provider is required" }, 400);
  }

  const config = PROVIDERS[provider];
  if (!config) {
    return jsonResponse({ error: `Unknown provider: ${provider}` }, 400);
  }

  const apiKey = env[config.envKey];
  if (!apiKey) {
    return jsonResponse(
      {
        error: `API key not configured for provider "${provider}". Add ${config.envKey} to your Cloudflare environment secrets.`,
      },
      500,
    );
  }

  try {
    let responseText: string;

    if (config.type === "gemini") {
      responseText = await callGemini(config.model, message.trim(), apiKey);
    } else {
      const extraHeaders: Record<string, string> = {};
      if (provider === "openrouter") {
        extraHeaders["HTTP-Referer"] = "https://homework-helper.pages.dev";
        extraHeaders["X-Title"] = "Hossain Azmal Homework Helper AI";
      }
      responseText = await callOpenAICompatible(
        config.url,
        config.model,
        message.trim(),
        apiKey,
        extraHeaders,
      );
    }

    return jsonResponse({ response: responseText });
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error(`[chat] Provider "${provider}" error:`, errMessage);
    return jsonResponse({ error: errMessage }, 502);
  }
};
