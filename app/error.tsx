'use client';

import { useEffect } from 'react';
import { Button, Result } from 'antd';
import { Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Result
        status="error"
        title="เกิดข้อผิดพลาด"
        subTitle="ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง"
        extra={[
          <Button
            key="retry"
            type="primary"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => reset()}
          >
            ลองใหม่
          </Button>,
          <Link href="/" key="home">
            <Button icon={<Home className="w-4 h-4" />}>กลับหน้าหลัก</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
