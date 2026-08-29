export async function http<T>(path: string, init?: RequestInit): Promise<T> {
    // si évolution, ajouter /api dans une variable d'environnement
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
