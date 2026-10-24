import { API_BASE, cachedRequest, getCachedData, setCachedData } from './client';
import { ApiFaq, ApiTestimonial, ApiBanner, ApiBusinessInfo, ApiMenuItem, EnquiryPayload } from './types';

/**
 * Prime storefront CMS content bundle in a single HTTP request.
 * Populates individual in-memory and sessionStorage caches for instant 0ms retrieval.
 */
export async function primeStorefrontCms(): Promise<any> {
  const allKey = 'cms_all_content';
  const existing = getCachedData<any>(allKey);
  if (existing) {
    return existing;
  }

  return cachedRequest(allKey, async () => {
    try {
      const res = await fetch(`${API_BASE}/content/all`);
      if (!res.ok) throw new Error('Failed to fetch bundled content');
      const json = await res.json();
      const all = json.data;
      if (!all) return null;

      if (Array.isArray(all.announcements)) {
        setCachedData('cms_announcements', all.announcements, 180);
      }
      if (Array.isArray(all.banners)) {
        setCachedData('cms_banners', all.banners, 180);
      }
      if (Array.isArray(all.business_info)) {
        setCachedData('cms_business_info', all.business_info, 180);
      }
      if (Array.isArray(all.faqs)) {
        setCachedData('cms_faqs', all.faqs, 180);
      }
      if (Array.isArray(all.testimonials)) {
        setCachedData('cms_testimonials', all.testimonials, 180);
      }
      if (Array.isArray(all.blogs)) {
        setCachedData('cms_blogs', all.blogs, 180);
      }
      if (Array.isArray(all.menus)) {
        setCachedData('cms_menus_all', all.menus, 180);
        setCachedData('cms_menus_header', all.menus.filter((m: any) => m.location === 'header'), 180);
        setCachedData('cms_menus_footer_nav', all.menus.filter((m: any) => m.location === 'footer_nav'), 180);
        setCachedData('cms_menus_footer_store', all.menus.filter((m: any) => m.location === 'footer_store'), 180);
      }
      return all;
    } catch (err) {
      console.warn('CMS API bundle offline, individual fallbacks will be used:', err);
      return null;
    }
  }, 180);
}

export async function getFaqs(): Promise<ApiFaq[]> {
  const cached = getCachedData<ApiFaq[]>('cms_faqs');
  if (cached) return cached;

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
  }, 180);
}

export async function getTestimonials(): Promise<ApiTestimonial[]> {
  const cached = getCachedData<ApiTestimonial[]>('cms_testimonials');
  if (cached) return cached;

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
  }, 180);
}

export async function submitTestimonial(payload: {
  name: string;
  company?: string;
  restaurant?: string;
  role?: string;
  rating: number;
  comment: string;
  city?: string;
  category?: string;
}): Promise<{ status: string; message: string; data?: any }> {
  try {
    const res = await fetch(`${API_BASE}/content/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (err: any) {
    return { status: 'error', message: err.message || 'Failed to submit review' };
  }
}

export async function getBanners(): Promise<ApiBanner[]> {
  const cached = getCachedData<ApiBanner[]>('cms_banners');
  if (cached) return cached;

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
  }, 180);
}

export async function getMenuItems(location?: string): Promise<ApiMenuItem[]> {
  const cacheKey = `cms_menus_${location || 'all'}`;
  const cached = getCachedData<ApiMenuItem[]>(cacheKey);
  if (cached) return cached;

  return cachedRequest(cacheKey, async () => {
    try {
      const url = location ? `${API_BASE}/content/menus?location=${encodeURIComponent(location)}` : `${API_BASE}/content/menus`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch navigation menus');
      const json = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn('CMS API offline for navigation menus, fallback will be used:', err);
      return [];
    }
  }, 180);
}

export async function getBusinessInfo(): Promise<ApiBusinessInfo[]> {
  const cached = getCachedData<ApiBusinessInfo[]>('cms_business_info');
  if (cached) return cached;

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
  }, 180);
}

export async function getDispatchHubs(): Promise<any[]> {
  const cached = getCachedData<any[]>('cms_dispatch_hubs');
  if (cached) return cached;

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
  }, 180);
}

export async function getAnnouncements(): Promise<import('./types').ApiAnnouncement[]> {
  const cached = getCachedData<import('./types').ApiAnnouncement[]>('cms_announcements');
  if (cached) return cached;

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
  }, 180);
}

export async function getStaticPages(): Promise<import('./types').ApiStaticPage[]> {
  const cached = getCachedData<import('./types').ApiStaticPage[]>('cms_static_pages');
  if (cached) return cached;

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
  }, 180);
}

export async function getStaticPage(slug: string): Promise<import('./types').ApiStaticPage | null> {
  const cached = getCachedData<import('./types').ApiStaticPage>(`cms_page_${slug}`);
  if (cached) return cached;

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
  }, 180);
}

export async function getAllContent(): Promise<any> {
  return primeStorefrontCms();
}

export async function getBlogs(): Promise<import('./types').ApiBlog[]> {
  const cached = getCachedData<import('./types').ApiBlog[]>('cms_blogs');
  if (cached) return cached;

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
  }, 180);
}

export async function getBlogBySlug(slug: string): Promise<import('./types').ApiBlog | null> {
  const cached = getCachedData<import('./types').ApiBlog>(`cms_blog_${slug}`);
  if (cached) return cached;

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
  }, 180);
}

export async function getBlogCategories(): Promise<{ id: string; slug: string; name: string; label: string }[]> {
  const cached = getCachedData<{ id: string; slug: string; name: string; label: string }[]>('cms_blog_categories');
  if (cached) return cached;

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
  }, 180);
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
