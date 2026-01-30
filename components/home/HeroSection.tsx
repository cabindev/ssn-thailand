import React from 'react';
import Image from 'next/image';
import Search from '@/components/Search';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 pb-32 pt-12 md:pt-16">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5" />

      <div className="container-custom relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo & Title Row */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/powerUp.svg"
              alt="Power Up Logo"
              width={56}
              height={56}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              เครือข่ายพลังสังคม
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-green-50 mb-8 text-lg">
            ฐานข้อมูลกิจกรรมสร้างสรรค์ ประเพณี กลุ่มชาติพันธุ์ และนโยบายสาธารณะ
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <Search />
          </div>
        </div>
      </div>
    </section>
  );
}
