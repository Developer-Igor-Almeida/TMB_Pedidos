// src/services/http.ts
const BASE =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  "https://localhost:44334/api";

function url(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(url(path), {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export async function postJSON<T, B = unknown>(path: string, body: B): Promise<T> {
  const res = await fetch(url(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
