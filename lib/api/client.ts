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

const memoryCache = new Map<string, { data: any; expiry: number; pending?: Promise<any> }>();

export async function cachedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 60
): Promise<T> {
  const cached = memoryCache.get(key);
  const now = Date.now();
  if (cached && cached.expiry > now && cached.data !== null && cached.data !== undefined) {
    return cached.data;
  }
  if (cached?.pending) {
    return cached.pending;
  }

  const pending = fetcher()
    .then((data) => {
      if (data !== null && data !== undefined) {
        memoryCache.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 });
      } else {
        memoryCache.delete(key);
      }
      return data;
    })
    .catch((err) => {
      memoryCache.delete(key);
      throw err;
    });

  memoryCache.set(key, { data: null, expiry: 0, pending });
  return pending;
}

export function clearApiCache(prefix?: string) {
  if (!prefix) {
    memoryCache.clear();
    return;
  }
  memoryCache.forEach((_, k) => {
    if (k.startsWith(prefix)) {
      memoryCache.delete(k);
    }
  });
}
