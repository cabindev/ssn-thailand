import React from 'react';
import Link from 'next/link';
import { Palette, Flag, Users, FileText } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'กิจกรรมสร้างสรรค์',
    description: 'รวบรวมกิจกรรมสร้างสรรค์',
    link: '/creative-activities',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Flag,
    title: 'ประเพณี',
    description: 'ประเพณีไทยที่สืบทอดมาและส่งเสริมความเข้มแข็งของชุมชน',
    link: '/traditions',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Users,
    title: 'กลุ่มชาติพันธุ์',
    description: 'ข้อมูลกลุ่มชาติพันธุ์ที่มีวิถีชีวิตและวัฒนธรรมอันเป็นเอกลักษณ์',
    link: '/ethnic-groups',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: FileText,
    title: 'นโยบายสาธารณะ',
    description: 'นโยบายและมาตรการที่สนับสนุนการพัฒนาสังคมอย่างยั่งยืน',
    link: '/public-policies',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">หมวดหมู่ข้อมูล</h2>
          <p className="text-gray-600">สำรวจข้อมูลตามหมวดหมู่ที่คุณสนใจ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.link} href={feature.link} className="group">
                <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all">
                  <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {feature.description}
                  </p>
                  <span className="text-sm text-primary-600 font-medium">
                    ดูรายละเอียด
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
