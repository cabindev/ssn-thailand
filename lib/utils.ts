import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PolicyLevel } from '@/types';

// Combine class names with Tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Translate policy level to Thai (supports both uppercase and lowercase)
export function translateLevel(level: PolicyLevel | string): string {
  const translations: Record<string, string> = {
    // Uppercase (from API)
    NATIONAL: 'ระดับชาติ',
    HEALTH_REGION: 'ระดับเขตสุขภาพ',
    PROVINCIAL: 'ระดับจังหวัด',
    DISTRICT: 'ระดับอำเภอ',
    SUB_DISTRICT: 'ระดับตำบล',
    VILLAGE: 'ระดับหมู่บ้าน',
    // Lowercase (legacy)
    national: 'ระดับชาติ',
    provincial: 'ระดับจังหวัด',
    district: 'ระดับอำเภอ',
    subdistrict: 'ระดับตำบล',
    community: 'ระดับชุมชน',
  };
  return translations[level] || level;
}

// Translate region to Thai
export function translateRegion(region?: string): string {
  if (!region) return '';

  const translations: Record<string, string> = {
    north: 'ภาคเหนือ',
    northeast: 'ภาคตะวันออกเฉียงเหนือ',
    central: 'ภาคกลาง',
    east: 'ภาคตะวันออก',
    west: 'ภาคตะวันตก',
    south: 'ภาคใต้',
    // Thai region names from API
    'อีสานบน': 'อีสานบน',
    'อีสานล่าง': 'อีสานล่าง',
    'เหนือบน': 'เหนือบน',
    'เหนือล่าง': 'เหนือล่าง',
    'กลาง': 'ภาคกลาง',
    'ใต้บน': 'ใต้บน',
    'ใต้ล่าง': 'ใต้ล่าง',
  };
  return translations[region] || region;
}

// Format date to Thai locale
export function formatDate(dateString?: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format date to short format
export function formatDateShort(dateString?: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Truncate text
export function truncateText(text?: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text || '';
  return text.slice(0, maxLength) + '...';
}

// Base URL for images from API
const IMAGE_BASE_URL = 'https://database.ssnthailand.com';

// Convert relative URL to absolute URL
function toAbsoluteUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${IMAGE_BASE_URL}${url}`;
  return `${IMAGE_BASE_URL}/${url}`;
}

// Extract image URL from various formats
// API returns: [{id, url}] or string[] or string
export function getImageUrl(
  images?: { id?: string; url: string }[] | string[] | string,
  fallback: string = '/images/placeholder.svg'
): string {
  if (!images) return fallback;

  // If it's a string, return it directly
  if (typeof images === 'string') {
    return images ? toAbsoluteUrl(images) : fallback;
  }

  // If it's an array
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    // Check if it's an object with url property
    if (typeof first === 'object' && first !== null && 'url' in first) {
      return first.url ? toAbsoluteUrl(first.url) : fallback;
    }
    // If it's a string
    if (typeof first === 'string') {
      return toAbsoluteUrl(first);
    }
  }

  return fallback;
}

// Extract all image URLs from various formats
export function getAllImageUrls(
  images?: { id?: string; url: string }[] | string[] | string
): string[] {
  if (!images) return [];

  // If it's a string, return it as array
  if (typeof images === 'string') {
    return images ? [toAbsoluteUrl(images)] : [];
  }

  // If it's an array
  if (Array.isArray(images)) {
    return images
      .map((img) => {
        if (typeof img === 'object' && img !== null && 'url' in img) {
          return img.url ? toAbsoluteUrl(img.url) : null;
        }
        if (typeof img === 'string') {
          return toAbsoluteUrl(img);
        }
        return null;
      })
      .filter((url): url is string => url !== null && url !== '');
  }

  return [];
}

// Format number with comma separators
export function formatNumber(num?: number): string {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('th-TH');
}

// Get level color for tags (supports both uppercase and lowercase)
export function getLevelColor(level?: PolicyLevel | string): string {
  if (!level) return 'default';

  const colors: Record<string, string> = {
    // Uppercase
    NATIONAL: 'red',
    HEALTH_REGION: 'volcano',
    PROVINCIAL: 'orange',
    DISTRICT: 'blue',
    SUB_DISTRICT: 'green',
    VILLAGE: 'purple',
    // Lowercase
    national: 'red',
    provincial: 'orange',
    district: 'blue',
    subdistrict: 'green',
    community: 'purple',
  };
  return colors[level] || 'default';
}

// Get category name from category object or string
export function getCategoryName(
  category?: { id?: string | number; name: string } | string
): string {
  if (!category) return '';
  if (typeof category === 'string') return category;
  return category.name || '';
}

// Build location string from province, amphoe, district
export function buildLocationString(
  province?: string,
  amphoe?: string,
  district?: string
): string {
  const parts = [district, amphoe, province].filter(Boolean);
  return parts.join(', ');
}
