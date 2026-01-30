import Link from 'next/link';
import { Button, Result } from 'antd';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Result
        status="404"
        title="404"
        subTitle="ขออภัย ไม่พบหน้าที่คุณต้องการ"
        extra={[
          <Link href="/" key="home">
            <Button type="primary" icon={<Home className="w-4 h-4" />}>
              กลับหน้าหลัก
            </Button>
          </Link>,
          <Link href="/creative-activities" key="search">
            <Button icon={<Search className="w-4 h-4" />}>ค้นหากิจกรรม</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
