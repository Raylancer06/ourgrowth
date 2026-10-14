import { API_BASE } from './client';

export async function getCustomerContracts(token: string) {
  const res = await fetch(`${API_BASE}/customer/contracts`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function getContractDetails(token: string, id: string | number) {
  const res = await fetch(`${API_BASE}/customer/contracts/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}
