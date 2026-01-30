'use client';

import React, { useState } from 'react';
import { DashboardCharts } from '@/types';
import { BarChart3, Palette, Flag, Users, FileText, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

interface ChartsSectionProps {
  charts: DashboardCharts;
}

// ชื่อระดับนโยบายภาษาไทย
const POLICY_LEVEL_NAMES: Record<string, string> = {
  'NATIONAL': 'ระดับประเทศ',
  'HEALTH_REGION': 'ระดับเขตสุขภาพ',
  'PROVINCIAL': 'ระดับจังหวัด',
  'DISTRICT': 'ระดับอำเภอ',
  'SUB_DISTRICT': 'ระดับตำบล',
  'VILLAGE': 'ระดับหมู่บ้าน',
};

const greenShades = [
  'bg-green-600',
  'bg-green-500',
  'bg-green-400',
  'bg-green-300',
  'bg-green-200',
  'bg-green-100',
];

interface StatCardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  data: Array<{ type: string; value: number }> | undefined;
  label: string;
  isPolicy?: boolean;
}

function StatCard({ title, subtitle, icon: Icon, data, label, isPolicy }: StatCardProps) {
  const [expanded, setExpanded] = useState(false);

  const total = data?.reduce((sum, item) => sum + (item.value || 0), 0) || 0;
  const maxValue = data?.reduce((max, item) => Math.max(max, item.value || 0), 0) || 1;

  // แสดงข้อมูลจาก API โดยตรง เรียงตามจำนวนมากไปน้อย
  const sortedData = (data || [])
    .map(d => ({
      type: d.type,
      displayName: isPolicy ? (POLICY_LEVEL_NAMES[d.type] || d.type) : d.type,
      value: d.value || 0
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const visibleCount = 4;
  const hasMore = sortedData.length > visibleCount;
  const displayData = expanded ? sortedData : sortedData.slice(0, visibleCount);
  const regionCount = data?.filter(d => (d.value || 0) > 0).length || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header Stats */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{total.toLocaleString()}</p>
              <p className="text-xs text-gray-500">รายการ</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{regionCount}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="px-6 py-4">
        {total > 0 ? (
          <div className="space-y-3">
            {displayData.map((item, index) => {
              const percentage = total > 0 ? ((item.value || 0) / total * 100).toFixed(0) : 0;
              const barWidth = ((item.value || 0) / maxValue * 100);
              const hasValue = item.value > 0;

              return (
                <div key={item.type} className={`group ${!hasValue ? 'opacity-40' : ''}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${hasValue ? greenShades[Math.min(index, greenShades.length - 1)] : 'bg-gray-300'}`} />
                      <span className="text-sm text-gray-700">{item.displayName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${hasValue ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.value.toLocaleString()}
                      </span>
                      {hasValue && (
                        <span className="text-xs text-gray-400 w-10 text-right">{percentage}%</span>
                      )}
                    </div>
                  </div>
                  {hasValue && (
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${greenShades[Math.min(index, greenShades.length - 1)]}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Toggle Button */}
            {hasMore && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-center gap-1 pt-2 text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    ซ่อน
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    ดูทั้งหมด ({sortedData.length})
                  </>
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400">
            <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">ไม่มีข้อมูล</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChartsSection({ charts }: ChartsSectionProps) {
  const chartData = [
    {
      title: 'กิจกรรมสร้างสรรค์',
      subtitle: '',
      data: charts.creative_activities_by_region,
      icon: Palette,
      label: 'กิจกรรมสร้างสรรค์',
      isPolicy: false
    },
    {
      title: 'ประเพณี',
      subtitle: '',
      data: charts.traditions_by_region,
      icon: Flag,
      label: 'งานบุญประเพณี',
      isPolicy: false
    },
    {
      title: 'กลุ่มชาติพันธุ์',
      subtitle: '',
      data: charts.ethnic_groups_by_region,
      icon: Users,
      label: 'กลุ่มชาติพันธุ์',
      isPolicy: false
    },
    {
      title: 'นโยบายสาธารณะ',
      subtitle: '',
      data: charts.public_policies_by_level,
      icon: FileText,
      label: 'ระดับ',
      isPolicy: true
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">สถิติข้อมูล</h2>
          <p className="text-gray-600">ภาพรวมข้อมูลแยกตามประเภท</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chartData.map((chart) => (
            <StatCard
              key={chart.title}
              title={chart.title}
              subtitle={chart.subtitle}
              icon={chart.icon}
              data={chart.data}
              label={chart.label}
              isPolicy={chart.isPolicy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
