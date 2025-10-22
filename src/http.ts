const BASE = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:5100";

function url(path: string) {
  return `${BASE}${path}`;
}

export async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(url(path));
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
