import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, Breadcrumb } from 'antd';
import { MapPin, Calendar, ArrowLeft, Users, History, Activity } from 'lucide-react';
import { getEthnicGroupById } from '@/lib/api';
import { translateRegion, formatDate, formatNumber, buildLocationString } from '@/lib/utils';
import ImageGallery from '@/components/ui/ImageGallery';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const item = await getEthnicGroupById(params.id);
    return {
      title: item.name,
      description: item.description,
    };
  } catch {
    return {
      title: 'ไม่พบข้อมูล',
    };
  }
}

export default async function EthnicGroupDetailPage({ params }: Props) {
  let item;

  try {
    item = await getEthnicGroupById(params.id);
  } catch (error) {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const location = buildLocationString(item.province, item.amphoe, item.district);
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
                  <Link href="/ethnic-groups" className="text-primary-100 hover:text-white">
                    กลุ่มชาติพันธุ์
                  </Link>
                ),
              },
              {
                title: <span className="text-white">{item.name}</span>,
              },
            ]}
          />

          <Link
            href="/ethnic-groups"
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
                {item.description ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                ) : (
                  <p className="text-gray-400">ไม่มีรายละเอียด</p>
                )}
              </div>
            </Card>

            {/* History */}
            {item.history && (
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-500" />
                    <span>ประวัติความเป็นมา</span>
                  </div>
                }
                className="shadow-sm"
              >
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{item.history}</p>
                </div>
              </Card>
            )}

            {/* Activity Name & Details */}
            {(item.activityName || item.activities) && (
              <Card
                title={
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <span>กิจกรรมและวิถีชีวิต</span>
                  </div>
                }
                className="shadow-sm border-l-4 border-l-green-500"
              >
                <div className="prose max-w-none">
                  {item.activityName && (
                    <p className="font-semibold text-gray-900 mb-2">{item.activityName}</p>
                  )}
                  {item.activities && (
                    <p className="text-gray-700 whitespace-pre-wrap">{item.activities}</p>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card title="ข้อมูลทั่วไป" className="shadow-sm">
              <div className="space-y-4">
                {item.population && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">ประชากร</p>
                      <p className="font-medium text-gray-900">{formatNumber(item.population)} คน</p>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">ที่อยู่อาศัย</p>
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
                <p className="text-gray-500 mb-4">ดูกลุ่มชาติพันธุ์อื่นๆ</p>
                <Link
                  href="/ethnic-groups"
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
