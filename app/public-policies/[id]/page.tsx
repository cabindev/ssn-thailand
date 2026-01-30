import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, Tag, Breadcrumb, Button } from 'antd';
import { MapPin, Calendar, ArrowLeft, Building2, FileText, Download } from 'lucide-react';
import { getPublicPolicyById } from '@/lib/api';
import { translateRegion, translateLevel, formatDate, getLevelColor, buildLocationString } from '@/lib/utils';
import ImageGallery from '@/components/ui/ImageGallery';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const item = await getPublicPolicyById(params.id);
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

export default async function PublicPolicyDetailPage({ params }: Props) {
  let item;

  try {
    item = await getPublicPolicyById(params.id);
  } catch (error) {
    notFound();
  }

  if (!item) {
    notFound();
  }

  const location = buildLocationString(item.province, item.amphoe, item.district);
  const dateString = item.createdAt || item.created_at;
  const documentUrl = item.policyFileUrl || item.document_url;
  const implementationDate = item.signingDate || item.implementation_date;

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
                  <Link href="/public-policies" className="text-primary-100 hover:text-white">
                    นโยบายสาธารณะ
                  </Link>
                ),
              },
              {
                title: <span className="text-white">{item.name}</span>,
              },
            ]}
          />

          <Link
            href="/public-policies"
            className="inline-flex items-center gap-2 text-primary-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปหน้ารายการ</span>
          </Link>

          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-2xl md:text-4xl font-bold text-white">{item.name}</h1>
            <Tag color={getLevelColor(item.level)} className="text-sm">
              {translateLevel(item.level)}
            </Tag>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={item.images} title={item.name} />

            {/* Description/Summary */}
            <Card title="รายละเอียดนโยบาย" className="shadow-sm">
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

            {/* Content Array */}
            {item.content && item.content.length > 0 && (
              <Card title="เนื้อหานโยบาย" className="shadow-sm">
                <ul className="list-disc list-inside space-y-2">
                  {item.content.map((contentItem, index) => (
                    <li key={index} className="text-gray-700">{contentItem}</li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Results */}
            {item.results && (
              <Card title="ผลลัพธ์" className="shadow-sm border-l-4 border-l-green-500">
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{item.results}</p>
                </div>
              </Card>
            )}

            {/* Document Download */}
            {documentUrl && (
              <Card className="shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">เอกสารนโยบาย</p>
                      <p className="text-sm text-gray-500">ดาวน์โหลดเอกสารฉบับเต็ม</p>
                    </div>
                  </div>
                  <a href={documentUrl} target="_blank" rel="noopener noreferrer">
                    <Button type="primary" icon={<Download className="w-4 h-4" />}>
                      ดาวน์โหลด
                    </Button>
                  </a>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card title="ข้อมูลทั่วไป" className="shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">ระดับนโยบาย</p>
                    <Tag color={getLevelColor(item.level)} className="mt-1">
                      {translateLevel(item.level)}
                    </Tag>
                  </div>
                </div>

                {item.organization && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">หน่วยงาน</p>
                      <p className="font-medium text-gray-900">{item.organization}</p>
                    </div>
                  </div>
                )}

                {item.healthRegion && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">เขตสุขภาพ</p>
                      <p className="font-medium text-gray-900">{item.healthRegion}</p>
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">พื้นที่</p>
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

                {implementationDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">วันที่ลงนาม/บังคับใช้</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(implementationDate)}
                      </p>
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
                <p className="text-gray-500 mb-4">ดูนโยบายสาธารณะอื่นๆ</p>
                <Link
                  href="/public-policies"
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
