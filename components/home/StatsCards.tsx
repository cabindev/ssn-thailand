import React from 'react';
import { DashboardStats } from '@/types';
import { formatNumber } from '@/lib/utils';
import { Palette, Flag, Users, FileText } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats;
}

const statsConfig = [
  {
    key: 'creative_activities_count',
    title: 'กิจกรรมสร้างสรรค์',
    icon: Palette,
  },
  {
    key: 'traditions_count',
    title: 'ประเพณี',
    icon: Flag,
  },
  {
    key: 'ethnic_groups_count',
    title: 'กลุ่มชาติพันธุ์',
    icon: Users,
  },
  {
    key: 'public_policies_count',
    title: 'นโยบายสาธารณะ',
    icon: FileText,
  },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="-mt-20 relative z-20 pb-8">
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statsConfig.map((config, index) => {
              const value = stats[config.key as keyof DashboardStats] || 0;
              const Icon = config.icon;
              const isLast = index === statsConfig.length - 1;

              return (
                <div
                  key={config.key}
                  className={`flex items-center gap-4 ${!isLast ? 'lg:border-r lg:border-gray-100' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {formatNumber(value)}
                    </p>
                    <p className="text-sm text-gray-500">{config.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
