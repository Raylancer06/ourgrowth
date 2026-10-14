import { API_BASE } from './client';

export async function createOrder(token: string, orderData: {
  items: {
    product_id?: number;
    sku?: string;
    pack_size?: string;
    quantity: number;
  }[];
  payment_method?: string;
  delivery_slot?: string;
  shipping_address?: any;
  billing_address?: any;
  customer_notes?: string;
  coupon_code?: string;
}) {
  const res = await fetch(`${API_BASE}/customer/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

export async function getCustomerOrders(token: string) {
  const res = await fetch(`${API_BASE}/customer/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

export async function getOrderDetails(token: string, orderIdOrNumber: string) {
  const res = await fetch(`${API_BASE}/customer/orders/${orderIdOrNumber}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}
