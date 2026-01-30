import {
  Dashboard,
  CreativeActivity,
  Tradition,
  EthnicGroup,
  PublicPolicy,
  Category,
  ApiResponse,
  ListFilters,
} from '@/types';

// Use proxy for client-side requests to avoid CORS issues
function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use proxy
    return '/api/proxy';
  }
  // Server-side: direct API call
  return process.env.NEXT_PUBLIC_API_URL || 'https://database.ssnthailand.com/api/public';
}

/**
 * Generic fetch wrapper
 * Returns T (assumes caller handles the ApiResponse envelop or T includes it)
 * For cleaner usage, we might want this to return Promise<ApiResponse<T>>
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${getApiUrl()}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function buildQueryString(filters: ListFilters): string {
  const params = new URLSearchParams();

  if (filters.search) params.append('search', filters.search);
  if (filters.region) params.append('region', filters.region);
  if (filters.province) params.append('province', filters.province);
  if (filters.category) params.append('categoryId', filters.category); // Changed to categoryId as per doc? or keep category if unsure. Doc says categoryId for lists.
  if (filters.level) params.append('level', filters.level);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.per_page) params.append('limit', filters.per_page.toString()); // Map per_page to limit
  if (filters.year) params.append('year', filters.year);

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

// Dashboard
export async function getDashboard(): Promise<Dashboard> {
  try {
    const [dashboardRes, creativeRes, traditionRes, ethnicRes, policyRes] = await Promise.all([
      fetchApi<ApiResponse<any>>('/dashboard'),
      getCreativeActivities({ limit: 5 }),
      getTraditions({ limit: 5 }),
      getEthnicGroups({ limit: 5 }),
      getPublicPolicies({ limit: 5 }),
    ]);

    const data = dashboardRes.data || {};
    const overview = data.overview || {};
    const charts = data.charts || {};

    // Map Stats
    const stats = {
      creative_activities_count: overview.creativeActivityCount || 0,
      traditions_count: overview.traditionCount || 0,
      ethnic_groups_count: overview.ethnicGroupCount || 0,
      public_policies_count: overview.publicPolicyCount || 0,
      total_count: overview.totalCount || 0
    };

    // Helper to map chart data
    const mapChart = (arr: any[]) =>
      Array.isArray(arr)
        ? arr.map(item => ({
          type: item.category || item.level || 'Unknown',
          value: item.count || 0,
          category: item.category,
          level: item.level,
          count: item.count
        }))
        : [];

    // Map Charts
    // Frontend expects "by_region" keys
    const mappedCharts = {
      creative_activities_by_region: mapChart(charts.creativeActivity),
      traditions_by_region: mapChart(charts.tradition),
      ethnic_groups_by_region: mapChart(charts.ethnicGroup),
      public_policies_by_level: mapChart(charts.publicPolicy),
    };

    return {
      stats,
      charts: mappedCharts,
      recent: {
        creative_activities: creativeRes.data || [],
        traditions: traditionRes.data || [],
        ethnic_groups: ethnicRes.data || [],
        public_policies: policyRes.data || [],
      },
    };
  } catch (error) {
    console.error('Error constructing dashboard:', error);
    // Return empty structure on failure
    return {
      stats: { creative_activities_count: 0, traditions_count: 0, ethnic_groups_count: 0, public_policies_count: 0, total_count: 0 },
      charts: { creative_activities_by_region: [], traditions_by_region: [], ethnic_groups_by_region: [], public_policies_by_level: [] },
      recent: { creative_activities: [], traditions: [], ethnic_groups: [], public_policies: [] },
    };
  }
}

// Creative Activities
export async function getCreativeActivities(
  filters: ListFilters = {}
): Promise<ApiResponse<CreativeActivity[]>> {
  const query = buildQueryString(filters);
  // Returns { success: true, data: [...], pagination: {...} }
  return fetchApi<ApiResponse<CreativeActivity[]>>(`/creative-activities${query}`);
}

export async function getCreativeActivityById(id: number | string): Promise<CreativeActivity> {
  const response = await fetchApi<{ data: CreativeActivity }>(`/creative-activities/${id}`);
  return response.data;
}

// Traditions
export async function getTraditions(
  filters: ListFilters = {}
): Promise<ApiResponse<Tradition[]>> {
  const query = buildQueryString(filters);
  return fetchApi<ApiResponse<Tradition[]>>(`/traditions${query}`);
}

export async function getTraditionById(id: number | string): Promise<Tradition> {
  const response = await fetchApi<{ data: Tradition }>(`/traditions/${id}`);
  return response.data;
}

// Ethnic Groups
export async function getEthnicGroups(
  filters: ListFilters = {}
): Promise<ApiResponse<EthnicGroup[]>> {
  const query = buildQueryString(filters);
  return fetchApi<ApiResponse<EthnicGroup[]>>(`/ethnic-groups${query}`);
}

export async function getEthnicGroupById(id: number | string): Promise<EthnicGroup> {
  const response = await fetchApi<{ data: EthnicGroup }>(`/ethnic-groups/${id}`);
  return response.data;
}

// Public Policies
export async function getPublicPolicies(
  filters: ListFilters = {}
): Promise<ApiResponse<PublicPolicy[]>> {
  const query = buildQueryString(filters);
  return fetchApi<ApiResponse<PublicPolicy[]>>(`/public-policies${query}`);
}

export async function getPublicPolicyById(id: number | string): Promise<PublicPolicy> {
  const response = await fetchApi<{ data: PublicPolicy }>(`/public-policies/${id}`);
  return response.data;
}

// Categories
export async function getCategories(type?: string): Promise<Category[]> {
  const query = type ? `?type=${type}` : '';
  const response = await fetchApi<{ data: any }>(`/categories${query}`);
  // Categories endpoint returns { data: { creative: [], ... } }
  // Flatten or return as is? The type definition says Category[] but response is grouped.
  // For now let's assume usage expects array and match what we can, or just return the raw data matching usage.
  // The documentation says GET /categories returns { data: { creative: [...], ... } }
  // But previous code expected Category[]. Let's adapt if possible or just valid response.

  // If the previous code expected a flat list, we might need to change it. 
  // But strictly per docs:
  if (response.data && !Array.isArray(response.data)) {
    // It's the grouped object.
    const combined: Category[] = [];
    if (response.data.creative) combined.push(...response.data.creative);
    if (response.data.tradition) combined.push(...response.data.tradition);
    if (response.data.ethnic) combined.push(...response.data.ethnic);
    return combined;
  }
  return response.data as Category[];
}

// Regions list (10 ภูมิภาคตามโครงสร้างข้อมูลพื้นที่)
export const REGIONS = [
  { value: 'กรุงเทพมหานคร', label: 'กรุงเทพมหานคร' },
  { value: 'กลาง', label: 'ภาคกลาง' },
  { value: 'ตะวันตก', label: 'ภาคตะวันตก' },
  { value: 'ตะวันออก', label: 'ภาคตะวันออก' },
  { value: 'อีสานบน', label: 'ภาคอีสานบน' },
  { value: 'อีสานล่าง', label: 'ภาคอีสานล่าง' },
  { value: 'เหนือบน', label: 'ภาคเหนือบน' },
  { value: 'เหนือล่าง', label: 'ภาคเหนือล่าง' },
  { value: 'ใต้บน', label: 'ภาคใต้บน' },
  { value: 'ใต้ล่าง', label: 'ภาคใต้ล่าง' },
];

// Policy levels
export const POLICY_LEVELS = [
  { value: 'NATIONAL', label: 'ระดับชาติ' },
  { value: 'PROVINCIAL', label: 'ระดับจังหวัด' },
  { value: 'DISTRICT', label: 'ระดับอำเภอ' },
  { value: 'SUB_DISTRICT', label: 'ระดับตำบล' },
  { value: 'COMMUNITY', label: 'ระดับชุมชน' },
];
