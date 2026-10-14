import { getApiBase } from './client';
import { ApiProduct } from './types';

export async function getProducts(): Promise<ApiProduct[]> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.warn('ERP API offline, using fallback catalog:', err);
    return [];
  }
}

export async function getProduct(idOrSlug: string): Promise<ApiProduct | null> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/products/${idOrSlug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch (err) {
    console.warn('ERP API offline for single product:', err);
    return null;
  }
}
