'use client';

import React from 'react';
import { Database } from 'lucide-react';

interface ImagePlaceholderProps {
  className?: string;
}

export default function ImagePlaceholder({ className = '' }: ImagePlaceholderProps) {
  return (
    <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 ${className}`}>
      <Database className="w-12 h-12 text-primary-400 mb-2" />
      <p className="text-sm text-primary-600 font-medium text-center px-4">
        ฐานข้อมูลเครือข่ายพลังสังคม
      </p>
    </div>
  );
}
