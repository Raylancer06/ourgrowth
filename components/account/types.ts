export interface ShippingAddressItem {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface AccountOrderItem {
  id?: number;
  product_id?: number;
  product_name?: string;
  sku?: string;
  pack_size?: string;
  quantity: number;
  unit_price?: number;
  tax_amount?: number;
  total_amount?: number;
  hsn_code?: string;
}

export interface AccountOrder {
  id: number;
  order_number: string;
  status: string;
  order_date?: string;
  created_at?: string;
  delivery_slot?: string;
  total_amount?: number;
  total?: number;
  subtotal?: number;
  tax_amount?: number;
  delivery_fee?: number;
  discount_amount?: number;
  invoice_number?: string;
  items?: AccountOrderItem[] | string;
  billing_address?: any;
  shipping_address?: any;
}

export interface AccountInvoice {
  id: number;
  invoice_number: string;
  order_number?: string;
  invoice_date?: string;
  due_date?: string;
  status: string;
  subtotal: number;
  tax_amount: number;
  delivery_fee?: number;
  discount_amount?: number;
  total_amount: number;
  paid_amount?: number;
  balance_amount?: number;
  amount_in_words?: string;
  seller?: {
    company_name?: string;
    address?: string;
    city?: string;
    state?: string;
    state_code?: string;
    zipcode?: string;
    country?: string;
    phone?: string;
    email?: string;
    gstin?: string;
    pan?: string;
    fssai_license?: string;
    bank_name?: string;
    bank_account_number?: string;
    bank_ifsc?: string;
    bank_branch?: string;
    beneficiary?: string;
    upi_id?: string;
    payment_instructions?: string;
    storage_instructions?: string;
    authorized_signatory_name?: string;
    logo_url?: string;
    signature_url?: string;
    upi_qr_url?: string;
  };
  buyer?: {
    company_name?: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    gstin?: string;
    billing_address?: any;
    shipping_address?: any;
  };
  items?: any[];
  tax_summary?: {
    tax_name: string;
    rate: number;
    taxable_value: number;
    amount: number;
  }[];
}

export interface AccountContract {
  id: number | string;
  contract_number: string;
  subject?: string;
  status?: string;
  type?: string;
  value?: number;
  formatted_value?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  seller?: {
    company_name?: string;
    address?: string;
    gstin?: string;
    phone?: string;
    signature_url?: string;
    authorized_signatory?: string;
  };
  buyer?: {
    name?: string;
    address?: any;
    gstin?: string;
    phone?: string;
  };
}
