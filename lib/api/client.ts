/**
 * Base HTTP Client Configuration & High-Performance Client Caching
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

export function getCachedData<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  const now = Date.now();
  if (cached && cached.expiry > now && cached.data !== null && cached.data !== undefined) {
    return cached.data as T;
  }
  if (typeof window !== 'undefined') {
    try {
      const raw = sessionStorage.getItem(`og_cache_${key}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.expiry > now && parsed.data !== undefined) {
          memoryCache.set(key, { data: parsed.data, expiry: parsed.expiry });
          return parsed.data as T;
        }
      }
    } catch {
      // sessionStorage unavailable
    }
  }
  return null;
}

export function setCachedData(key: string, data: any, ttlSeconds: number = 180) {
  if (data === null || data === undefined) return;
  const expiry = Date.now() + ttlSeconds * 1000;
  memoryCache.set(key, { data, expiry });
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`og_cache_${key}`, JSON.stringify({ data, expiry }));
    } catch {
      // sessionStorage quota or security restriction
    }
  }
}

export async function cachedRequest<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 120
): Promise<T> {
  const existing = getCachedData<T>(key);
  if (existing !== null) {
    return existing;
  }

  const inMem = memoryCache.get(key);
  if (inMem?.pending) {
    return inMem.pending;
  }

  const pending = fetcher()
    .then((data) => {
      if (data !== null && data !== undefined) {
        setCachedData(key, data, ttlSeconds);
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
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const k = sessionStorage.key(i);
          if (k && k.startsWith('og_cache_')) keysToRemove.push(k);
        }
        keysToRemove.forEach((k) => sessionStorage.removeItem(k));
      } catch {}
    }
    return;
  }
  memoryCache.forEach((_, k) => {
    if (k.startsWith(prefix)) {
      memoryCache.delete(k);
    }
  });
  if (typeof window !== 'undefined') {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const k = sessionStorage.key(i);
        if (k && k.startsWith(`og_cache_${prefix}`)) keysToRemove.push(k);
      }
      keysToRemove.forEach((k) => sessionStorage.removeItem(k));
    } catch {}
  }
}
