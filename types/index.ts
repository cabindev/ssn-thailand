// Base types
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
  error?: string;
}

// Dashboard types
export interface DashboardStats {
  creative_activities_count: number;
  traditions_count: number;
  ethnic_groups_count: number;
  public_policies_count: number;
  total_count: number;
}

export interface ChartData {
  type: string; // Mapped from category/level for frontend consistency
  value: number; // Mapped from count for frontend consistency
  // Original fields from API for reference
  category?: string;
  level?: string;
  count?: number;
}

export interface DashboardCharts {
  creative_activities_by_region: ChartData[];
  traditions_by_region: ChartData[];
  ethnic_groups_by_region: ChartData[];
  public_policies_by_level: ChartData[];
}

export interface DashboardRecent {
  creative_activities: CreativeActivity[];
  traditions: Tradition[];
  ethnic_groups: EthnicGroup[];
  public_policies: PublicPolicy[];
}

export interface Dashboard {
  stats: DashboardStats;
  charts: DashboardCharts;
  recent: DashboardRecent;
}

// Creative Activity types
export interface CreativeActivity {
  id: string | number;
  name: string;
  description?: string;
  summary?: string;
  location?: string;
  province?: string;
  region?: string; // API calls this 'type' sometimes, need to handle mapping
  type?: string;
  district?: string;
  amphoe?: string;
  category?: { id: string | number; name: string } | string;
  subCategory?: { id: string | number; name: string };
  images?: { id: string; url: string }[] | string[];
  cover_image?: string;
  startYear?: number;
  createdAt?: string;
  updatedAt?: string;
  // Legacy support
  created_at?: string;
  updated_at?: string;
}

// Tradition types
export interface Tradition {
  id: string | number;
  name: string;
  description?: string;
  history?: string;
  alcoholFreeApproach?: string; // camelCase from API
  alcohol_free_approach?: string; // snake_case legacy
  location?: string;
  province?: string;
  district?: string;
  amphoe?: string;
  region?: string;
  type?: string;
  category?: { id: string | number; name: string } | string;
  images?: { id: string; url: string }[] | string[];
  cover_image?: string;
  hasPolicy?: boolean;
  has_policy?: boolean;
  hasAnnouncement?: boolean;
  startYear?: number;
  createdAt?: string;
  updatedAt?: string;
  // Legacy support
  created_at?: string;
  updated_at?: string;
}

// Ethnic Group types
export interface EthnicGroup {
  id: string | number;
  name: string;
  description?: string;
  history?: string;
  population?: number;
  location?: string;
  province?: string;
  district?: string;
  amphoe?: string;
  region?: string;
  type?: string;
  activityName?: string;
  activities?: string;
  images?: { id: string; url: string }[] | string[];
  cover_image?: string;
  startYear?: number;
  createdAt?: string;
  updatedAt?: string;
  category?: { id: string | number; name: string } | string;
  // Legacy support
  created_at?: string;
  updated_at?: string;
}

// Public Policy types
export type PolicyLevel = 'NATIONAL' | 'HEALTH_REGION' | 'PROVINCIAL' | 'DISTRICT' | 'SUB_DISTRICT' | 'VILLAGE' | 'national' | 'provincial' | 'district' | 'subdistrict' | 'community';

export interface PublicPolicy {
  id: string | number;
  name: string;
  description?: string;
  level: PolicyLevel;
  signingDate?: string;
  organization?: string;
  province?: string;
  district?: string;
  amphoe?: string;
  healthRegion?: string;
  region?: string;
  type?: string;
  implementation_date?: string;
  images?: { id: string; url: string }[] | string[];
  cover_image?: string;
  document_url?: string;
  policyFileUrl?: string; // From API docs
  createdAt?: string;
  updatedAt?: string;
  content?: string[];
  summary?: string;
  results?: string;
  // Legacy support
  created_at?: string;
  updated_at?: string;
}

// Category types
export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  type?: 'creative_activity' | 'tradition' | 'ethnic_group';
  subCategories?: { id: string | number; name: string }[];
  activityCount?: number;
  traditionCount?: number;
  ethnicGroupCount?: number;
}

// Filter types
export interface ListFilters {
  search?: string;
  region?: string;
  province?: string;
  category?: string; // ID if needed
  categoryId?: string;
  level?: string;
  page?: number;
  limit?: number; // Docs use limit
  per_page?: number; // Legacy
  year?: string;
}
