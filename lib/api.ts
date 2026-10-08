/**
 * OurGrowth ERP API Client
 * Connects Next.js Customer Storefront to ERPGo backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_ERP_API_URL || 'http://127.0.0.1:8000/api/v1';

export interface ApiProduct {
  id: number;
  sku: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  price_unit: string;
  tax_rate: number;
  is_in_stock: boolean;
  available_stock: number;
  pack_sizes: {
    size: string;
    weight_kg: number;
    price: number;
    savings?: string;
  }[];
  image: string;
}

export interface CustomerAuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  customer?: {
    id: number;
    user_id: number;
    name: string;
    company_name: string;
    phone: string;
    email: string;
    customer_code: string;
    billing_address: any;
    shipping_address: any;
    tax_number?: string;
  };
}

export async function getProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/products`, { next: { revalidate: 60 } });
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
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch (err) {
    console.warn('ERP API offline for single product:', err);
    return null;
  }
}

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

export async function registerCustomer(data: {
  restaurant_name: string;
  contact_name: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  gstin?: string;
}): Promise<CustomerAuthResponse> {
  const res = await fetch(`${API_BASE}/customer/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

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

export async function getOrderInvoice(token: string, orderIdOrNumber: string | number) {
  const res = await fetch(`${API_BASE}/customer/orders/${orderIdOrNumber}/invoice`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });
  return res.json();
}

// -----------------------------------------------------------------------------
// STOREFRONT CMS CONTENT APIS (PHASE 7)
// -----------------------------------------------------------------------------

export interface ApiFaq {
  id: number;
  slug: string;
  question: string;
  answer: string;
  category: string;
}

export interface ApiTestimonial {
  id: number;
  slug: string;
  client_name: string;
  company: string;
  quote: string;
  rating: number;
  city?: string;
}

export interface ApiBanner {
  id: number;
  slug: string;
  headline: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  image_url?: string;
}

export interface ApiBusinessInfo {
  id: number;
  slug: string;
  key: string;
  value: string;
  label: string;
}

export async function getFaqs(): Promise<ApiFaq[]> {
  try {
    const res = await fetch(`${API_BASE}/content/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('CMS API offline for FAQs, fallback will be used:', err);
    return [];
  }
}

export async function getTestimonials(): Promise<ApiTestimonial[]> {
  try {
    const res = await fetch(`${API_BASE}/content/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('CMS API offline for testimonials, fallback will be used:', err);
    return [];
  }
}

export async function getBanners(): Promise<ApiBanner[]> {
  try {
    const res = await fetch(`${API_BASE}/content/banners`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch banners');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('CMS API offline for banners, fallback will be used:', err);
    return [];
  }
}

export async function getBusinessInfo(): Promise<ApiBusinessInfo[]> {
  try {
    const res = await fetch(`${API_BASE}/content/business-info`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch business info');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('CMS API offline for business info, fallback will be used:', err);
    return [];
  }
}


