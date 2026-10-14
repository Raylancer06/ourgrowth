import { API_BASE } from './client';

export async function getCustomerProfile(token: string) {
  const res = await fetch(`${API_BASE}/customer/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function updateCustomerProfile(token: string, profileData: any) {
  const res = await fetch(`${API_BASE}/customer/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  return res.json();
}
