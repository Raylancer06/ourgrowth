import { API_BASE } from './client';
import { CustomerAuthResponse } from './types';

export async function sendOtp(phone: string): Promise<{ success: boolean; message: string; demo_hint?: string }> {
  const res = await fetch(`${API_BASE}/customer/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return res.json();
}

export async function verifyOtp(
  phone: string,
  otp: string,
  restaurantName?: string,
  contactName?: string
): Promise<CustomerAuthResponse> {
  const res = await fetch(`${API_BASE}/customer/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ phone, otp, restaurant_name: restaurantName, contact_name: contactName }),
  });
  return res.json();
}

export async function loginCustomer(credentials: {
  email: string;
  password: string;
}): Promise<CustomerAuthResponse> {
  const res = await fetch(`${API_BASE}/customer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function registerCustomer(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  company_name?: string;
  restaurant_name?: string;
  contact_name?: string;
  address?: string;
  city?: string;
  pincode?: string;
  state?: string;
  gstin?: string;
  tax_number?: string;
}): Promise<CustomerAuthResponse> {
  const res = await fetch(`${API_BASE}/customer/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      ...data,
      name: data.name || data.contact_name || '',
    }),
  });
  return res.json();
}

export async function changeCustomerPassword(
  token: string,
  data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }
): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/customer/change-password`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function resetCustomerPasswordWithOtp(data: {
  phone: string;
  otp: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/customer/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
