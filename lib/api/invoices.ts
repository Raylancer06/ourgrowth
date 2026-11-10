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
