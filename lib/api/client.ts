/**
 * Base HTTP Client Configuration & Resolution
 */

export function getApiBase(): string {
  if (typeof window !== 'undefined') {
    return '/api/erp/v1';
  }
  return process.env.NEXT_PUBLIC_ERP_API_URL || 'http://127.0.0.1:8000/api/v1';
}

export const API_BASE = typeof window !== 'undefined'
  ? '/api/erp/v1'
  : (process.env.NEXT_PUBLIC_ERP_API_URL || 'http://127.0.0.1:8000/api/v1');

export async function requestJson<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = getApiBase();
  const url = path.startsWith('http') ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  return res.json();
}
