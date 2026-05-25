# 🎓 Hossain Azmal — AI Homework Helper
**30+ AI Models · Cloudflare Pages · Zero Server Cost**

A full-stack AI homework assistant powered by **Cloudflare Pages + Workers**.  
Supports OpenAI, Groq, Gemini, Perplexity, Together, Fireworks, OpenRouter, and **20 HuggingFace models** (serverless — no downloads).

---

## 🚀 One-Time Deploy (GitHub → Cloudflare Pages)

### Step 1 — Connect to Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create**
2. Choose **Pages** → **Connect to Git** → Authorize GitHub
3. Select **this repository**
4. Set the build settings exactly as below:

| Setting | Value |
|---|---|
| **Framework preset** | None |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `src/frontend/dist` |
| **Root directory** | *(leave blank)* |
| **Node.js version** | `20` |

5. Click **Save and Deploy** — first deploy will build the project.

---

### Step 2 — Add API Keys (Cloudflare Secrets)

After first deploy, go to your Pages project → **Settings → Environment Variables → Production**  
Add each key as an **encrypted secret**. You only need the providers you want to use.

#### Tier 1 — Commercial LLMs
| Variable | Where to get it |
|---|---|
| `OPENAI_API_KEY` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `GROQ_API_KEY` | [console.groq.com/keys](https://console.groq.com/keys) |
| `GEMINI_API_KEY` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| `PERPLEXITY_API_KEY` | [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) |
| `TOGETHER_API_KEY` | [api.together.xyz/settings/api-keys](https://api.together.xyz/settings/api-keys) |
| `FIREWORKS_API_KEY` | [fireworks.ai/account/api-keys](https://fireworks.ai/account/api-keys) |
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) |

#### Tier 2 — HuggingFace (1 key → 20 models)
| Variable | Where to get it |
|---|---|
| `HF_API_KEY` | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |

> One HuggingFace token unlocks: Llama 3.1 70B/8B, Mistral 7B/Nemo/Mixtral, Qwen 72B/7B/Coder, Gemma 9B/2B, Phi-3.5, DeepSeek R1/Coder, CodeLlama, Zephyr, Falcon, Yi, TinyLlama

#### Tier 3 — Additional
| Variable | Provider |
|---|---|
| `BYTEZ_AI_KEY` | Bytez AI |
| `OXLO_AI_KEY` | Oxlo AI |
| `LONGCAT_API_KEY` | Longcat AI |

#### Utility APIs (for future features)
| Variable | |
|---|---|
| `GOOGLE_API_KEY` | Google APIs |
| `OPENWEATHER_API_KEY` | Weather |
| `GOOGLE_SEARCH_API_KEY` | Google Search |
| `SEARCH_ENGINE_ID` | Google CSE ID |
| `LIVEKIT_URL` | LiveKit voice |
| `LIVEKIT_API_KEY` | LiveKit auth |
| `LIVEKIT_API_SECRET` | LiveKit auth |

6. After adding secrets → click **Redeploy** (or push any commit). Done ✅

---

## 🛠️ Local Development

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 2. Install
npm install

# 3. Add your API keys
cp .dev.vars.example .dev.vars
# Edit .dev.vars — paste your keys

# 4. Terminal 1 — Frontend
npm run dev        # http://localhost:5173

# 5. Terminal 2 — Workers API
npm run preview    # http://localhost:8787
```

---

## 📁 Project Structure

```
homework-helper-cf/
├── functions/api/
│   ├── chat.ts          ← POST /api/chat — routes to 30+ AI providers
│   └── providers.ts     ← GET /api/providers — returns active providers
├── src/frontend/        ← Vite + React + Tailwind + shadcn/ui
├── wrangler.toml        ← Cloudflare config
├── .dev.vars.example    ← Template for local secrets
└── .gitignore
```

---

## ⚠️ Security

- **Never commit `.dev.vars`** — it's in `.gitignore`
- All production keys are stored as **encrypted Cloudflare secrets**, never in code
- The browser never sees any API key — all calls go through the Worker backend
