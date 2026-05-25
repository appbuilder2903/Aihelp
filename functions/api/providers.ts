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
  HF_API_KEY?: string;

  // ── Additional AI providers ─────────────────────────────────────────────────
  BYTEZ_AI_KEY?: string;
  OXLO_AI_KEY?: string;
  LONGCAT_API_KEY?: string;

  // ── Utility APIs ─────────────────────────────────────────────────────────────
  GOOGLE_API_KEY?: string;
  OPENWEATHER_API_KEY?: string;
  WEATHER_API_KEY?: string;
  GOOGLE_SEARCH_API_KEY?: string;
  SEARCH_ENGINE_ID?: string;

  // ── LiveKit ───────────────────────────────────────────────────────────────────
  LIVEKIT_URL?: string;
  LIVEKIT_API_KEY?: string;
  LIVEKIT_API_SECRET?: string;
}

const ALL_PROVIDERS = [
  // ── Tier 1: Commercial LLMs ─────────────────────────────────────────────────
  { id: "openai",       name: "OpenAI GPT-4o",            model: "gpt-4o",                                    envKey: "OPENAI_API_KEY" },
  { id: "groq",         name: "Groq Llama 3.3 70B",       model: "llama-3.3-70b-versatile",                   envKey: "GROQ_API_KEY" },
  { id: "gemini",       name: "Gemini 1.5 Flash",          model: "gemini-1.5-flash",                          envKey: "GEMINI_API_KEY" },
  { id: "gemini-pro",   name: "Gemini 1.5 Pro",            model: "gemini-1.5-pro",                            envKey: "GEMINI_API_KEY" },
  { id: "perplexity",   name: "Perplexity (Online)",       model: "llama-3.1-sonar-large-128k-online",         envKey: "PERPLEXITY_API_KEY" },
  { id: "together",     name: "Together Llama 3 70B",      model: "meta-llama/Llama-3-70b-chat-hf",            envKey: "TOGETHER_API_KEY" },
  { id: "fireworks",    name: "Fireworks Llama 70B",       model: "accounts/fireworks/models/llama-v3p1-70b-instruct", envKey: "FIREWORKS_API_KEY" },
  { id: "openrouter",   name: "OpenRouter (100+ models)",  model: "openai/gpt-4o",                             envKey: "OPENROUTER_API_KEY" },

  // ── Tier 2: HuggingFace Serverless Inference (no download needed) ────────────
  { id: "hf-llama3-70b",   name: "HF · Llama 3.1 70B",        model: "meta-llama/Llama-3.1-70B-Instruct",            envKey: "HF_API_KEY" },
  { id: "hf-llama3-8b",    name: "HF · Llama 3.1 8B",         model: "meta-llama/Llama-3.1-8B-Instruct",             envKey: "HF_API_KEY" },
  { id: "hf-llama32-3b",   name: "HF · Llama 3.2 3B",         model: "meta-llama/Llama-3.2-3B-Instruct",             envKey: "HF_API_KEY" },
  { id: "hf-mistral-7b",   name: "HF · Mistral 7B",           model: "mistralai/Mistral-7B-Instruct-v0.3",           envKey: "HF_API_KEY" },
  { id: "hf-mistral-nemo", name: "HF · Mistral Nemo",         model: "mistralai/Mistral-Nemo-Instruct-2407",         envKey: "HF_API_KEY" },
  { id: "hf-mixtral-8x7b", name: "HF · Mixtral 8x7B",         model: "mistralai/Mixtral-8x7B-Instruct-v0.1",        envKey: "HF_API_KEY" },
  { id: "hf-qwen72b",      name: "HF · Qwen 2.5 72B",         model: "Qwen/Qwen2.5-72B-Instruct",                    envKey: "HF_API_KEY" },
  { id: "hf-qwen7b",       name: "HF · Qwen 2.5 7B",          model: "Qwen/Qwen2.5-7B-Instruct",                     envKey: "HF_API_KEY" },
  { id: "hf-qwen-coder",   name: "HF · Qwen Coder 32B",       model: "Qwen/Qwen2.5-Coder-32B-Instruct",              envKey: "HF_API_KEY" },
  { id: "hf-gemma2-9b",    name: "HF · Gemma 2 9B",           model: "google/gemma-2-9b-it",                         envKey: "HF_API_KEY" },
  { id: "hf-gemma2-2b",    name: "HF · Gemma 2 2B",           model: "google/gemma-2-2b-it",                         envKey: "HF_API_KEY" },
  { id: "hf-phi35-mini",   name: "HF · Phi-3.5 Mini",         model: "microsoft/Phi-3.5-mini-instruct",              envKey: "HF_API_KEY" },
  { id: "hf-phi3-medium",  name: "HF · Phi-3 Medium",         model: "microsoft/Phi-3-medium-4k-instruct",           envKey: "HF_API_KEY" },
  { id: "hf-deepseek-r1",  name: "HF · DeepSeek R1 8B",       model: "deepseek-ai/DeepSeek-R1-Distill-Llama-8B",     envKey: "HF_API_KEY" },
  { id: "hf-deepseek-coder","name": "HF · DeepSeek Coder 33B", model: "deepseek-ai/deepseek-coder-33b-instruct",      envKey: "HF_API_KEY" },
  { id: "hf-codellama",    name: "HF · CodeLlama 13B",        model: "codellama/CodeLlama-13b-Instruct-hf",          envKey: "HF_API_KEY" },
  { id: "hf-zephyr",       name: "HF · Zephyr 7B",            model: "HuggingFaceH4/zephyr-7b-beta",                 envKey: "HF_API_KEY" },
  { id: "hf-falcon",       name: "HF · Falcon 7B",            model: "tiiuae/falcon-7b-instruct",                    envKey: "HF_API_KEY" },
  { id: "hf-yi-9b",        name: "HF · Yi-1.5 9B",            model: "01-ai/Yi-1.5-9B-Chat",                         envKey: "HF_API_KEY" },
  { id: "hf-tinyllama",    name: "HF · TinyLlama 1.1B",       model: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",          envKey: "HF_API_KEY" },

  // ── Tier 3: Additional providers ─────────────────────────────────────────────
  { id: "bytez",    name: "Bytez AI",   model: "meta-llama/Llama-3.1-8B-Instruct", envKey: "BYTEZ_AI_KEY" },
  { id: "oxlo",     name: "Oxlo AI",    model: "oxlo-default",                      envKey: "OXLO_AI_KEY" },
  { id: "longcat",  name: "Longcat AI", model: "longcat-default",                   envKey: "LONGCAT_API_KEY" },
] as const;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  try {
    const providers = ALL_PROVIDERS.filter(
      (p) => !!env[p.envKey as keyof Env],
    ).map(({ id, name, model }) => ({ id, name, model }));

    const result =
      providers.length > 0
        ? providers
        : ALL_PROVIDERS.map(({ id, name, model }) => ({ id, name, model }));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
};
