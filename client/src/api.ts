const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

async function request(method: string, path: string, data?: unknown) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!res.ok) {
    throw new Error('API error');
  }
  return res.json();
}

export const api = {
  get: <T>(path: string) => request('GET', path) as Promise<T>,
  post: <T>(path: string, data: unknown) => request('POST', path, data) as Promise<T>,
  patch: <T>(path: string, data: unknown) => request('PATCH', path, data) as Promise<T>,
  delete: <T>(path: string) => request('DELETE', path) as Promise<T>,
};
