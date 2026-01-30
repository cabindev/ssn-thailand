'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tabs, Button, Empty } from 'antd';
import { MapPin, Palette, Flag, Users, FileText } from 'lucide-react';
import {
  CreativeActivity,
  Tradition,
  EthnicGroup,
  PublicPolicy,
} from '@/types';
import { truncateText, translateLevel, translateRegion, getImageUrl, buildLocationString } from '@/lib/utils';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

interface RecentItemsProps {
  creativeActivities: CreativeActivity[];
  traditions: Tradition[];
  ethnicGroups: EthnicGroup[];
  publicPolicies: PublicPolicy[];
}

function RecentItemCard({
  item,
  type,
}: {
  item: CreativeActivity | Tradition | EthnicGroup | PublicPolicy;
  type: string;
}) {
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

  const imageUrl = getImageUrl(item.images, '');
  const hasValidImage = imageUrl && !imageError;
  const location = buildLocationString(
    item.province,
    'amphoe' in item ? item.amphoe : undefined,
    'district' in item ? item.district : undefined
  );
  const description = item.description || ('summary' in item ? item.summary : '');

  return (
    <Link href={getLink()} className="block group">
      <div className="h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative h-44 bg-gray-100">
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
          {type === 'public-policy' && 'level' in item && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 text-gray-700 text-xs rounded-full">
              {translateLevel(item.level)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {item.name}
          </h3>
          {description && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {truncateText(description, 60)}
            </p>
          )}
          {location && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function RecentItems({
  creativeActivities,
  traditions,
  ethnicGroups,
  publicPolicies,
}: RecentItemsProps) {
  const items = [
    {
      key: 'creative-activities',
      label: 'กิจกรรมสร้างสรรค์',
      data: creativeActivities,
      type: 'creative-activity',
      link: '/creative-activities',
      icon: Palette,
    },
    {
      key: 'traditions',
      label: 'ประเพณี',
      data: traditions,
      type: 'tradition',
      link: '/traditions',
      icon: Flag,
    },
    {
      key: 'ethnic-groups',
      label: 'กลุ่มชาติพันธุ์',
      data: ethnicGroups,
      type: 'ethnic-group',
      link: '/ethnic-groups',
      icon: Users,
    },
    {
      key: 'public-policies',
      label: 'นโยบายสาธารณะ',
      data: publicPolicies,
      type: 'public-policy',
      link: '/public-policies',
      icon: FileText,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">รายการล่าสุด</h2>
          <p className="text-gray-600">ข้อมูลที่เพิ่มเข้ามาใหม่ล่าสุดในระบบ</p>
        </div>

        <Tabs
          defaultActiveKey="creative-activities"
          centered
          items={items.map((item) => {
            const Icon = item.icon;
            return {
              key: item.key,
              label: (
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              ),
              children: (
                <div className="pt-6">
                  {item.data && item.data.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {item.data.slice(0, 4).map((dataItem) => (
                          <RecentItemCard
                            key={dataItem.id}
                            item={dataItem}
                            type={item.type}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <Link href={item.link}>
                          <Button type="link" className="!text-primary-600">
                            ดูทั้งหมด
                          </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Empty description="ไม่มีข้อมูล" className="py-12" />
                  )}
                </div>
              ),
            };
          })}
        />
      </div>
    </section>
  );
}
