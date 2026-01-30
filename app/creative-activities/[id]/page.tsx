import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, Tag, Breadcrumb } from 'antd';
import { MapPin, Calendar, ArrowLeft, Folder } from 'lucide-react';
import { getCreativeActivityById } from '@/lib/api';
import { translateRegion, formatDate, getCategoryName, buildLocationString } from '@/lib/utils';
import ImageGallery from '@/components/ui/ImageGallery';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const item = await getCreativeActivityById(params.id);
    return {
      title: item.name,
      description: item.description || item.summary,
    };
  } catch {
    return {
      title: 'ไม่พบข้อมูล',
    };
  }
}

export default async function CreativeActivityDetailPage({ params }: Props) {
  let item;

  try {
    item = await getCreativeActivityById(params.id);
  } catch (error) {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const location = buildLocationString(item.province, item.amphoe, item.district);
  const categoryName = getCategoryName(item.category);
  const dateString = item.createdAt || item.created_at;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-primary py-8">
        <div className="container-custom">
          <Breadcrumb
            className="mb-4"
            items={[
              {
                title: (
                  <Link href="/" className="text-primary-100 hover:text-white">
                    หน้าหลัก
                  </Link>
                ),
              },
              {
                title: (
                  <Link href="/creative-activities" className="text-primary-100 hover:text-white">
                    กิจกรรมสร้างสรรค์
                  </Link>
                ),
              },
              {
                title: <span className="text-white">{item.name}</span>,
              },
            ]}
          />

          <Link
            href="/creative-activities"
            className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้ารายการ</span>
          </Link>

          <h1 className="text-2xl md:text-4xl font-bold text-white">{item.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={item.images} title={item.name} />

            {/* Description */}
            <Card title="รายละเอียด" className="shadow-sm">
              <div className="prose max-w-none">
                {item.description || item.summary ? (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {item.description || item.summary}
                  </p>
                ) : (
                  <p className="text-gray-400">ไม่มีรายละเอียด</p>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card title="ข้อมูลทั่วไป" className="shadow-sm">
              <div className="space-y-4">
                {location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">สถานที่</p>
                      <p className="font-medium text-gray-900">{location}</p>
                    </div>
                  </div>
                )}

                {(item.type || item.region) && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">ภูมิภาค</p>
                      <p className="font-medium text-gray-900">
                        {translateRegion(item.type || item.region)}
                      </p>
                    </div>
                  </div>
                )}

                {categoryName && (
                  <div className="flex items-start gap-3">
                    <Folder className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">หมวดหมู่</p>
                      <Tag color="blue">{categoryName}</Tag>
                    </div>
                  </div>
                )}

                {item.startYear && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">ปีที่เริ่ม</p>
                      <p className="font-medium text-gray-900">{item.startYear}</p>
                    </div>
                  </div>
                )}

                {dateString && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">วันที่เพิ่มข้อมูล</p>
                      <p className="font-medium text-gray-900">{formatDate(dateString)}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Related Actions */}
            <Card className="shadow-sm">
              <div className="text-center">
                <p className="text-gray-500 mb-4">ดูกิจกรรมสร้างสรรค์อื่นๆ</p>
                <Link
                  href="/creative-activities"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>ดูรายการทั้งหมด</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
