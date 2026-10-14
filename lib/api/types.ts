/**
 * Core API Data Transfer Objects & Interfaces
 */

export interface ApiProduct {
  id: number;
  sku: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  long_description?: string;
  category_id?: number | null;
  category_name?: string;
  price: number;
  wholesale_price?: number | null;
  pack_size?: string | null;
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
    avatar?: string;
    business_type?: string;
    alt_phone?: string;
    notes?: string;
  };
}

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

export interface EnquiryPayload {
  type?: 'contact' | 'bulk_order' | 'quote';
  name: string;
  business_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  product_requested?: string;
  quantity_requested?: string;
  delivery_cadence?: string;
  message?: string;
}

export interface CouponValidateResult {
  success: boolean;
  message: string;
  coupon?: {
    id: number;
    code: string;
    name: string;
    type: 'percentage' | 'flat';
    discount_value: number;
    discount_amount: number;
    max_discount_amount?: number;
    original_subtotal: number;
    discounted_subtotal: number;
  };
}
