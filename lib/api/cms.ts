import { API_BASE } from './client';
import { ApiFaq, ApiTestimonial, ApiBanner, ApiBusinessInfo, EnquiryPayload } from './types';

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

export async function sendEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; message: string; enquiry_id?: number }> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (err: any) {
    console.error('Enquiry submission failed:', err);
    return { success: false, message: 'Could not connect to server. Please call us directly.' };
  }
}
