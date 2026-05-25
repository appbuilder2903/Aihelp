# Hossain Azmal Holiday Homework Helper AI
### Cloudflare Pages + Workers Edition — v2 with 30+ AI Providers

---

## Architecture

```
Browser
  │
  ├── GET /api/providers   ─────► functions/api/providers.ts  (Cloudflare Workers)
  │                                  └─ reads env secrets, returns active providers
  │
  └── POST /api/chat       ─────► functions/api/chat.ts       (Cloudflare Workers)
                                     └─ routes to 30+ AI providers
                                        returns AI response as JSON
```

---

## 🌐 GitHub Pages Deployment (frontend-only)

GitHub Pages hosts the UI only. Deploy the API separately.

1. Deploy the API (Cloudflare Workers or any compatible host).
2. In GitHub, add a repository variable `VITE_API_BASE_URL` with your API origin.
3. Confirm `.github/workflows/gh-pages.yml` targets your default branch.
4. In **Settings → Pages**, set **Source** to **GitHub Actions**.

The workflow sets `BASE_PATH=/<repo>/` so Vite builds with the correct asset paths.

---

## Provider Tiers

### Tier 1 — Commercial LLMs (7 providers)
OpenAI, Groq, Gemini Flash, Gemini Pro, Perplexity, Together AI, Fireworks AI, OpenRouter

### Tier 2 — HuggingFace Serverless Inference (20 models, 1 key)
All run on HuggingFace's cloud. **No model downloads.** One `HF_API_KEY` unlocks all:

| UI Label | HuggingFace Model |
|---|---|
| HF · Llama 3.1 70B | meta-llama/Llama-3.1-70B-Instruct |
| HF · Llama 3.1 8B | meta-llama/Llama-3.1-8B-Instruct |
| HF · Llama 3.2 3B | meta-llama/Llama-3.2-3B-Instruct |
| HF · Mistral 7B | mistralai/Mistral-7B-Instruct-v0.3 |
| HF · Mistral Nemo | mistralai/Mistral-Nemo-Instruct-2407 |
| HF · Mixtral 8x7B | mistralai/Mixtral-8x7B-Instruct-v0.1 |
| HF · Qwen 2.5 72B | Qwen/Qwen2.5-72B-Instruct |
| HF · Qwen 2.5 7B | Qwen/Qwen2.5-7B-Instruct |
| HF · Qwen Coder 32B | Qwen/Qwen2.5-Coder-32B-Instruct |
| HF · Gemma 2 9B | google/gemma-2-9b-it |
| HF · Gemma 2 2B | google/gemma-2-2b-it |
| HF · Phi-3.5 Mini | microsoft/Phi-3.5-mini-instruct |
| HF · Phi-3 Medium | microsoft/Phi-3-medium-4k-instruct |
| HF · DeepSeek R1 8B | deepseek-ai/DeepSeek-R1-Distill-Llama-8B |
| HF · DeepSeek Coder 33B | deepseek-ai/deepseek-coder-33b-instruct |
| HF · CodeLlama 13B | codellama/CodeLlama-13b-Instruct-hf |
| HF · Zephyr 7B | HuggingFaceH4/zephyr-7b-beta |
| HF · Falcon 7B | tiiuae/falcon-7b-instruct |
| HF · Yi-1.5 9B | 01-ai/Yi-1.5-9B-Chat |
| HF · TinyLlama 1.1B | TinyLlama/TinyLlama-1.1B-Chat-v1.0 |

### Tier 3 — Additional providers
Bytez AI, Oxlo AI, Longcat AI

---

## ⚠️ Security — Key Rotation Required

The API keys shared over chat are **compromised**. Rotate them immediately:

| Provider | Rotation URL |
|---|---|
| OpenAI | https://platform.openai.com/api-keys |
| Groq | https://console.groq.com/keys |
| Google / Gemini | https://aistudio.google.com/app/apikey |
| Perplexity | https://www.perplexity.ai/settings/api |
| Together AI | https://api.together.xyz/settings/api-keys |
| Fireworks | https://fireworks.ai/account/api-keys |
| OpenRouter | https://openrouter.ai/keys |
| HuggingFace | https://huggingface.co/settings/tokens |
| Cloudflare | https://dash.cloudflare.com/profile/api-tokens |
| LiveKit | https://cloud.livekit.io |

---

## Local Development

```bash
# 1. Install
npm install

# 2. Copy env file and fill in your NEW (rotated) keys
cp .dev.vars.example .dev.vars
# Edit .dev.vars — add at least one key

# 3. Start Vite (Terminal 1)
npm run dev

# 4. Start Wrangler (Terminal 2)
npm run preview

# Open http://localhost:5173
```

---

## Cloudflare Pages Deployment

### CLI (recommended)

```bash
npx wrangler login
npx wrangler pages project create homework-helper-ai

# Tier 1 — Commercial
npx wrangler pages secret put OPENAI_API_KEY       --project-name=homework-helper-ai
npx wrangler pages secret put GROQ_API_KEY         --project-name=homework-helper-ai
npx wrangler pages secret put GEMINI_API_KEY       --project-name=homework-helper-ai
npx wrangler pages secret put PERPLEXITY_API_KEY   --project-name=homework-helper-ai
npx wrangler pages secret put TOGETHER_API_KEY     --project-name=homework-helper-ai
npx wrangler pages secret put FIREWORKS_API_KEY    --project-name=homework-helper-ai
npx wrangler pages secret put OPENROUTER_API_KEY   --project-name=homework-helper-ai

# Tier 2 — HuggingFace (1 key = 20 models)
npx wrangler pages secret put HF_API_KEY           --project-name=homework-helper-ai

# Tier 3 — Additional
npx wrangler pages secret put BYTEZ_AI_KEY         --project-name=homework-helper-ai
npx wrangler pages secret put OXLO_AI_KEY          --project-name=homework-helper-ai
npx wrangler pages secret put LONGCAT_API_KEY      --project-name=homework-helper-ai

# Utility APIs
npx wrangler pages secret put GOOGLE_API_KEY       --project-name=homework-helper-ai
npx wrangler pages secret put OPENWEATHER_API_KEY  --project-name=homework-helper-ai
npx wrangler pages secret put GOOGLE_SEARCH_API_KEY --project-name=homework-helper-ai
npx wrangler pages secret put SEARCH_ENGINE_ID     --project-name=homework-helper-ai

# LiveKit
npx wrangler pages secret put LIVEKIT_URL          --project-name=homework-helper-ai
npx wrangler pages secret put LIVEKIT_API_KEY      --project-name=homework-helper-ai
npx wrangler pages secret put LIVEKIT_API_SECRET   --project-name=homework-helper-ai

# Build + deploy
npm run deploy
```

---

## Environment Variables Reference

| Variable | Used For | Required |
|---|---|---|
| `OPENAI_API_KEY` | OpenAI GPT-4o | Optional |
| `GROQ_API_KEY` | Groq Llama 3.3 70B | Optional |
| `GEMINI_API_KEY` | Gemini 1.5 Flash + Pro | Optional |
| `PERPLEXITY_API_KEY` | Perplexity (web search) | Optional |
| `TOGETHER_API_KEY` | Together Llama 3 70B | Optional |
| `FIREWORKS_API_KEY` | Fireworks Llama 70B | Optional |
| `OPENROUTER_API_KEY` | OpenRouter 100+ models | Optional |
| `HF_API_KEY` | HuggingFace 20 models (serverless) | Optional |
| `BYTEZ_AI_KEY` | Bytez AI | Optional |
| `OXLO_AI_KEY` | Oxlo AI | Optional |
| `LONGCAT_API_KEY` | Longcat AI | Optional |
| `GOOGLE_API_KEY` | Google APIs (future use) | Optional |
| `OPENWEATHER_API_KEY` | Weather (future use) | Optional |
| `GOOGLE_SEARCH_API_KEY` | Google Search (future use) | Optional |
| `SEARCH_ENGINE_ID` | Google CSE ID (future use) | Optional |
| `LIVEKIT_URL` | LiveKit voice/video (future use) | Optional |
| `LIVEKIT_API_KEY` | LiveKit auth (future use) | Optional |
| `LIVEKIT_API_SECRET` | LiveKit auth (future use) | Optional |
