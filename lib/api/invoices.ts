import { API_BASE } from './client';

export async function getOrderInvoice(token: string, orderIdOrNumber: string | number) {
  const res = await fetch(`${API_BASE}/customer/orders/${orderIdOrNumber}/invoice`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}
