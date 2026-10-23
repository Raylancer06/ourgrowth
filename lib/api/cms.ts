import { API_BASE, cachedRequest } from './client';
import { ApiFaq, ApiTestimonial, ApiBanner, ApiBusinessInfo, EnquiryPayload } from './types';

export async function getFaqs(): Promise<ApiFaq[]> {
  return cachedRequest('cms_faqs', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/faqs`);
      if (!res.ok) throw new Error('Failed to fetch FAQs');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for FAQs, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getTestimonials(): Promise<ApiTestimonial[]> {
  return cachedRequest('cms_testimonials', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/testimonials`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for testimonials, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getBanners(): Promise<ApiBanner[]> {
  return cachedRequest('cms_banners', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/banners`);
      if (!res.ok) throw new Error('Failed to fetch banners');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for banners, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getBusinessInfo(): Promise<ApiBusinessInfo[]> {
  return cachedRequest('cms_business_info', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/business-info`);
      if (!res.ok) throw new Error('Failed to fetch business info');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for business info, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getDispatchHubs(): Promise<any[]> {
  return cachedRequest('cms_dispatch_hubs', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/dispatch-hubs`);
      if (!res.ok) throw new Error('Failed to fetch dispatch hubs');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for dispatch hubs, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getAnnouncements(): Promise<import('./types').ApiAnnouncement[]> {
  return cachedRequest('cms_announcements', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/announcements`);
      if (!res.ok) throw new Error('Failed to fetch announcements');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for announcements, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getStaticPages(): Promise<import('./types').ApiStaticPage[]> {
  return cachedRequest('cms_static_pages', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/static-pages`);
      if (!res.ok) throw new Error('Failed to fetch static pages');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for static pages, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getStaticPage(slug: string): Promise<import('./types').ApiStaticPage | null> {
  return cachedRequest(`cms_page_${slug}`, async () => {
    try {
      const res = await fetch(`${API_BASE}/content/static-pages/${slug}`);
      if (!res.ok) throw new Error(`Failed to fetch static page ${slug}`);
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn(`CMS API offline for static page ${slug}, fallback will be used:`, err);
      return null;
    }
  }, 120);
}

export async function getAllContent(): Promise<any> {
  return cachedRequest('cms_all_content', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/all`);
      if (!res.ok) throw new Error('Failed to fetch all content');
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn('CMS API offline for all content, fallback will be used:', err);
      return null;
    }
  }, 120);
}

export async function getBlogs(): Promise<import('./types').ApiBlog[]> {
  return cachedRequest('cms_blogs', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/blogs`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for blogs, fallback will be used:', err);
      return [];
    }
  }, 120);
}

export async function getBlogBySlug(slug: string): Promise<import('./types').ApiBlog | null> {
  return cachedRequest(`cms_blog_${slug}`, async () => {
    try {
      const res = await fetch(`${API_BASE}/content/blogs/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch blog');
      const json = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn(`CMS API offline for blog ${slug}, fallback will be used:`, err);
      return null;
    }
  }, 120);
}

export async function getBlogCategories(): Promise<{ id: string; slug: string; name: string; label: string }[]> {
  return cachedRequest('cms_blog_categories', async () => {
    try {
      const res = await fetch(`${API_BASE}/content/blog-categories`);
      if (!res.ok) throw new Error('Failed to fetch blog categories');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for blog categories, fallback will be used:', err);
      return [];
    }
  }, 120);
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
