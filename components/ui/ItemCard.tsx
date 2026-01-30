'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Tag } from 'antd';
import { MapPin, Calendar } from 'lucide-react';
import {
  CreativeActivity,
  Tradition,
  EthnicGroup,
  PublicPolicy,
} from '@/types';
import {
  truncateText,
  translateLevel,
  translateRegion,
  formatDateShort,
  getLevelColor,
  getImageUrl,
  buildLocationString,
} from '@/lib/utils';
import ImagePlaceholder from './ImagePlaceholder';

type ItemType = CreativeActivity | Tradition | EthnicGroup | PublicPolicy;

interface ItemCardProps {
  item: ItemType;
  type: 'creative-activity' | 'tradition' | 'ethnic-group' | 'public-policy';
  layout?: 'grid' | 'list';
}

// Helper to get level badge color
function getLevelBadgeColor(level?: string): string {
  if (!level) return '#a855f7';
  const upperLevel = level.toUpperCase();
  switch (upperLevel) {
    case 'NATIONAL':
      return '#ef4444';
    case 'HEALTH_REGION':
      return '#f97316';
    case 'PROVINCIAL':
      return '#f97316';
    case 'DISTRICT':
      return '#3b82f6';
    case 'SUB_DISTRICT':
      return '#22c55e';
    case 'VILLAGE':
      return '#a855f7';
    default:
      return '#a855f7';
  }
}

export default function ItemCard({ item, type, layout = 'grid' }: ItemCardProps) {
  const [imageError, setImageError] = useState(false);

  const getLink = () => {
    switch (type) {
      case 'creative-activity':
        return `/creative-activities/${item.id}`;
      case 'tradition':
        return `/traditions/${item.id}`;
      case 'ethnic-group':
        return `/ethnic-groups/${item.id}`;
      case 'public-policy':
        return `/public-policies/${item.id}`;
      default:
        return '#';
    }
  };

  // Get image URL - handle both formats
  const imageUrl = getImageUrl(item.images, '');
  const hasValidImage = imageUrl && !imageError;
  const isPolicy = type === 'public-policy' && 'level' in item;

  // Get location string
  const location = buildLocationString(item.province, 'amphoe' in item ? item.amphoe : undefined, 'district' in item ? item.district : undefined);

  // Get region/type for display
  const regionDisplay = item.type || item.region;

  // Get date - support both camelCase and snake_case
  const dateString = 'createdAt' in item ? item.createdAt : item.created_at;

  // Get description or summary
  const description = item.description || ('summary' in item ? item.summary : '');

  if (layout === 'list') {
    return (
      <Link href={getLink()}>
        <Card
          hoverable
          className="card-hover overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
              {hasValidImage ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <ImagePlaceholder className="w-full h-full min-h-[120px]" />
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
                  {item.name}
                </h3>
                {isPolicy && (
                  <Tag color={getLevelColor(item.level)} className="flex-shrink-0">
                    {translateLevel(item.level)}
                  </Tag>
                )}
              </div>
              {description && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {truncateText(description, 150)}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-gray-400">
                {(location || regionDisplay) && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>
                      {location || translateRegion(regionDisplay)}
                    </span>
                  </div>
                )}
                {dateString && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateShort(dateString)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={getLink()}>
      <Card
        hoverable
        className="h-full card-hover overflow-hidden"
        cover={
          <div className="relative h-48 bg-gray-100">
            {hasValidImage ? (
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <ImagePlaceholder className="w-full h-full" />
            )}
            {isPolicy && (
              <span
                className="absolute top-3 right-3 px-2 py-1 text-white text-xs rounded-full"
                style={{ backgroundColor: getLevelBadgeColor(item.level) }}
              >
                {translateLevel(item.level)}
              </span>
            )}
          </div>
        }
        bodyStyle={{ padding: '16px' }}
      >
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {truncateText(description, 80)}
          </p>
        )}
        {(location || regionDisplay) && (
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>
              {location || translateRegion(regionDisplay)}
            </span>
          </div>
        )}
      </Card>
    </Link>
  );
}
