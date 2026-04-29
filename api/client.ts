const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
async function getCsrfToken(): Promise<string> {
  // Read the csrf_token cookie set by the backend
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export async function apiRequest(
  path: string,
  options: RequestInit = {},
): Promise<any> {
  const method = (options.method || 'GET').toUpperCase();
  const mutating = ['POST', 'PUT', 'PATCH', 'DELETE'];

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-Version': '1',
    ...(options.headers as Record<string, string>),
  };

  if (mutating.includes(method)) {
    headers['X-CSRF-Token'] = await getCsrfToken();
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include', // send HTTP-only cookies
  });

  if (res.status === 401) {
    // Try refresh
    const refreshed = await tryRefresh();
    if (refreshed) {
      return apiRequest(path, options);
    }
    window.location.href = '/login';
    return null;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const apiGet = (path: string, params?: Record<string, string>) => {
  const url = params
    ? `${path}?${new URLSearchParams(params).toString()}`
    : path;
  return apiRequest(url, { method: 'GET' });
};

export const apiPost = (path: string, body: any) =>
  apiRequest(path, { method: 'POST', body: JSON.stringify(body) });

export const apiDelete = (path: string) =>
  apiRequest(path, { method: 'DELETE' });