import { NextRequest, NextResponse } from 'next/server';

const WP_API_BASE = process.env.WP_API_BASE || 'https://content.ssnthailand.com/wp-json/wp/v2';
const WP_USERNAME = process.env.WP_USERNAME || '';
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || '';

function getAuthHeader(): string | null {
  if (!WP_USERNAME || !WP_APP_PASSWORD) return null;
  return `Basic ${Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64')}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const search = request.nextUrl.search;
  const targetUrl = `${WP_API_BASE}/${path}${search}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const auth = getAuthHeader();
  if (auth) headers['Authorization'] = auth;

  try {
    const response = await fetch(targetUrl, { headers, next: { revalidate: 60 } });

    const data = await response.json();

    const proxyResponse = NextResponse.json(data, { status: response.status });

    // Forward pagination headers
    const wpTotal = response.headers.get('X-WP-Total');
    const wpTotalPages = response.headers.get('X-WP-TotalPages');
    if (wpTotal) proxyResponse.headers.set('X-WP-Total', wpTotal);
    if (wpTotalPages) proxyResponse.headers.set('X-WP-TotalPages', wpTotalPages);

    return proxyResponse;
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch from WordPress API' },
      { status: 502 }
    );
  }
}
