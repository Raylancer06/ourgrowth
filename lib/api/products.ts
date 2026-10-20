import { getApiBase, cachedRequest } from './client';
import { ApiProduct } from './types';

export async function getProducts(): Promise<ApiProduct[]> {
  return cachedRequest('products_list', async () => {
    try {
      const base = getApiBase();
      const res = await fetch(`${base}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      return data.products || [];
    } catch (err) {
      console.warn('ERP API offline, using fallback catalog:', err);
      return [];
    }
  }, 120);
}

export async function getProduct(idOrSlug: string): Promise<ApiProduct | null> {
  return cachedRequest(`product_${idOrSlug}`, async () => {
    try {
      const base = getApiBase();
      const res = await fetch(`${base}/products/${idOrSlug}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.product || null;
    } catch (err) {
      console.warn('ERP API offline for single product:', err);
      return null;
    }
  }, 120);
}
