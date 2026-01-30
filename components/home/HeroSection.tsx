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
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/powerUp.svg"
              alt="Power Up Logo"
              width={80}
              height={80}
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            เครือข่ายพลังสังคม
          </h1>

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
