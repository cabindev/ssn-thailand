import { WPPost, WPPostsResponse, WPListParams, WPAuthor, WPCategory } from '@/types/wordpress';

const WP_API_BASE = process.env.WP_API_BASE || 'https://content.ssnthailand.com/wp-json/wp/v2';
const WP_USERNAME = process.env.WP_USERNAME || '';
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || '';

function getAuthHeader(): Record<string, string> {
  if (!WP_USERNAME || !WP_APP_PASSWORD) return {};
  const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
  return { Authorization: `Basic ${credentials}` };
}

async function wpFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${WP_API_BASE}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAuthHeader(),
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API Error: ${response.status} ${response.statusText} — ${url}`);
  }

  return response.json();
}

function buildWPQuery(params: WPListParams): string {
  const p = new URLSearchParams();
  if (params.page) p.set('page', String(params.page));
  if (params.per_page) p.set('per_page', String(params.per_page));
  if (params.search) p.set('search', params.search);
  if (params.categories?.length) p.set('categories', params.categories.join(','));
  if (params.tags?.length) p.set('tags', params.tags.join(','));
  if (params.orderby) p.set('orderby', params.orderby);
  if (params.order) p.set('order', params.order);
  if (params._embed !== false) p.set('_embed', '1');
  const qs = p.toString();
  return qs ? `?${qs}` : '';
}

// Posts

export async function getWPPosts(params: WPListParams = {}): Promise<WPPostsResponse> {
  const query = buildWPQuery(params);
  const response = await fetch(`${WP_API_BASE}/posts${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...getAuthHeader(),
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`WordPress API Error: ${response.status}`);
  }

  const posts: WPPost[] = await response.json();
  const total = Number(response.headers.get('X-WP-Total') || 0);
  const totalPages = Number(response.headers.get('X-WP-TotalPages') || 1);

  return { posts, total, totalPages };
}

export async function getWPPostById(id: number): Promise<WPPost> {
  return wpFetch<WPPost>(`/posts/${id}?_embed=1`);
}

export async function getWPPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  return posts[0] ?? null;
}

// Post views (Post Views Counter plugin)
export async function getWPPostViews(postId: number): Promise<number> {
  try {
    const data = await wpFetch<{ views: number }>(
      `/post-views-counter/get-post-views/${postId}`.replace('/wp/v2', '')
    );
    return data.views ?? 0;
  } catch {
    return 0;
  }
}

// Author
export async function getWPAuthor(authorId: number): Promise<WPAuthor> {
  return wpFetch<WPAuthor>(`/users/${authorId}`);
}

// Categories
export async function getWPCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>('/categories?per_page=100');
}

// Helper: extract author from embedded data
export function getEmbeddedAuthor(post: WPPost): WPAuthor | null {
  return post._embedded?.author?.[0] ?? null;
}

// Helper: extract featured image URL — falls back to source_url if requested size is not available
export function getFeaturedImageUrl(post: WPPost, size?: string): string | null {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  if (size && media.media_details?.sizes?.[size]) {
    return media.media_details.sizes[size].source_url;
  }
  // Always fall back to full source_url so the image is never missing
  return media.source_url ?? null;
}

// Helper: strip HTML tags from excerpt
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper: format date to Thai locale
export function formatThaiDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
