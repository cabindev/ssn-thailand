// WordPress REST API Types

export interface WPAuthor {
  id: number;
  name: string;
  slug: string;
  description: string;
  avatar_urls: Record<string, string>; // e.g. { "24": "...", "48": "...", "96": "..." }
  link: string;
}

export interface WPFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPYoastHeadJson {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: Array<{ url: string; width?: number; height?: number }>;
}

export interface WPAcfFields {
  read_time?: number; // Reading time in minutes
  [key: string]: unknown;
}

export interface WPPost {
  id: number;
  slug: string;
  status: string;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  acf: WPAcfFields;
  yoast_head_json?: WPYoastHeadJson;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPFeaturedMedia[];
    'wp:term'?: WPCategory[][];
  };
  // From Post Views Counter plugin
  post_views_count?: number;
}

export interface WPPostsResponse {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

export interface WPListParams {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number[];
  tags?: number[];
  orderby?: 'date' | 'modified' | 'title' | 'relevance';
  order?: 'asc' | 'desc';
  _embed?: boolean;
}
