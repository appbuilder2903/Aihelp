import type { Provider } from "@/types";

// In production (Cloudflare Pages), API routes are co-hosted at the same origin.
// In local dev, Vite proxies /api/* to the wrangler dev server (port 8787).
const API_BASE = "";

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${path}`;
  let res: Response;

  try {
    res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch (networkErr) {
    throw new Error(
      `Network error – could not reach the API. Is the server running?\n${networkErr}`,
    );
  }

  if (!res.ok) {
    let errMessage = `Request failed with status ${res.status}`;
    try {
      const errBody = (await res.json()) as { error?: string };
      if (errBody.error) errMessage = errBody.error;
    } catch {
      // ignore JSON parse error, use the status message
    }
    throw new Error(errMessage);
  }

  return res.json() as Promise<T>;
}

/**
 * Fetch the list of AI providers available on the server.
 * Returns only providers whose API key is configured.
 */
export async function getProviders(): Promise<Provider[]> {
  return apiRequest<Provider[]>("/api/providers");
}

/**
 * Send a chat message to the selected provider and return the AI's reply.
 */
export async function sendChatMessage(
  message: string,
  provider: string,
): Promise<string> {
  const data = await apiRequest<{ response: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message, provider }),
  });
  return data.response;
}
