import { API_BASE } from './client';

export async function getOrderInvoice(token: string, orderIdOrNumber: string | number) {
  const encodedRef = encodeURIComponent(String(orderIdOrNumber));
  try {
    const res = await fetch(`${API_BASE}/customer/orders/${encodedRef}/invoice`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const data = await res.json();
    if (data?.success) return data;
  } catch {}

  try {
    const invRes = await fetch(`${API_BASE}/customer/invoices/${encodedRef}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    const invData = await invRes.json();
    if (invData?.success) return invData;
  } catch {}

  return { success: false, message: 'Invoice not found.' };
}

export async function getCustomerInvoices(token: string) {
  const res = await fetch(`${API_BASE}/customer/invoices`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function getCustomerPayments(token: string) {
  const res = await fetch(`${API_BASE}/customer/payments`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function getCustomerLedger(token: string) {
  const res = await fetch(`${API_BASE}/customer/ledger`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}
