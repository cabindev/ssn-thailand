import React from 'react';
import Link from 'next/link';
import { Empty, Button } from 'antd';
import { Search, Home } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
  showSearchHint?: boolean;
}

export default function EmptyState({
  title = 'ไม่พบข้อมูล',
  description = 'ไม่พบข้อมูลที่ตรงกับเงื่อนไขการค้นหา',
  showHomeButton = true,
  showSearchHint = true,
}: EmptyStateProps) {
  return (
    <div className="py-16">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 mb-4">{description}</p>
            {showSearchHint && (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
                <Search className="w-4 h-4" />
                <span>ลองเปลี่ยนคำค้นหาหรือตัวกรอง</span>
              </div>
            )}
            {showHomeButton && (
              <Link href="/">
                <Button type="primary" icon={<Home className="w-4 h-4" />}>
                  กลับหน้าหลัก
                </Button>
              </Link>
            )}
          </div>
        }
      />
    </div>
  );
}
