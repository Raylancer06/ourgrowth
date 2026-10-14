import { getApiBase } from './client';
import { CouponValidateResult } from './types';

export async function validateCoupon(code: string, subtotal: number): Promise<CouponValidateResult> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/coupons/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ code, subtotal }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: 'Could not connect to discount service. Please try again.' };
  }
}

export async function getActiveCoupons(): Promise<any[]> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/coupons/active`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.coupons || [];
  } catch {
    return [];
  }
}
