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
  images?: string[];
  additional_images?: string[];
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
  customer_name?: string;
  company: string;
  role?: string;
  quote: string;
  comment?: string;
  rating: number;
  category?: string;
  city?: string;
  verified_volume?: string;
  avatar?: string;
  product_id?: string;
  product_slug?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiBanner {
  id: number;
  slug: string;
  headline: string;
  subtitle?: string;
  badge?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  image_url?: string;
  accent_image_url?: string;
  placement?: string;
}

export interface ApiMenuItem {
  id: number;
  slug: string;
  title: string;
  label: string;
  url: string;
  link: string;
  location: string;
  badge?: string;
  target?: string;
  sort_order: number;
  active?: boolean;
}

export interface ApiBusinessInfo {
  id: number;
  slug: string;
  key: string;
  value: string;
  label: string;
  address?: string;
  support_phone?: string;
  support_email?: string;
  whatsapp_number?: string;
  operating_hours?: string;
  fssai_number?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_youtube?: string;
  footer_tagline?: string;
  footer_about?: string;
  footer_copyright?: string;
  footer_cold_chain_text?: string;
  footer_hubs_text?: string;
}

export interface ApiAnnouncement {
  id: number;
  slug: string;
  headline: string;
  message: string;
  cta_text?: string;
  cta_link?: string;
  target_page?: string;
  dismissible?: boolean;
  active?: boolean;
  is_published?: boolean;
}

export interface ApiStaticPage {
  id: number;
  slug: string;
  title: string;
  headline: string;
  subtitle?: string;
  badge?: string;
  content?: string;
  sections?: Array<{ title: string; content: string; icon?: string }>;
  meta_title?: string;
  meta_description?: string;
}

export interface ApiBlog {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  image?: string;
  featured_image?: string;
  author: string;
  readTime?: string;
  badge?: string;
  date?: string;
  stats?: { label: string; manual: string; ourgrowth: string; savings: string };
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
