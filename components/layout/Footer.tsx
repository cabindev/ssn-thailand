import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logopower.png"
                alt="SSN Thailand Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h2 className="text-lg font-bold text-white">SSN Thailand</h2>
                <p className="text-xs text-gray-400">เครือข่ายพลังสังคม</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              แหล่งรวบรวมข้อมูลกิจกรรมสร้างสรรค์ ประเพณี กลุ่มชาติพันธุ์
              และนโยบายสาธารณะที่เกี่ยวข้องกับการสร้างสังคมปลอดภัยในประเทศไทย
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/creative-activities" className="text-sm hover:text-primary-400 transition-colors">
                  กิจกรรมสร้างสรรค์
                </Link>
              </li>
              <li>
                <Link href="/traditions" className="text-sm hover:text-primary-400 transition-colors">
                  ประเพณี
                </Link>
              </li>
              <li>
                <Link href="/ethnic-groups" className="text-sm hover:text-primary-400 transition-colors">
                  กลุ่มชาติพันธุ์
                </Link>
              </li>
              <li>
                <Link href="/public-policies" className="text-sm hover:text-primary-400 transition-colors">
                  นโยบายสาธารณะ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span className="text-sm">
                  สำนักงานกองทุนสนับสนุนการสร้างเสริมสุขภาพ (สสส.)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">
                  พบปัญหาการใช้งาน&nbsp;
                  <a href="tel:+66659935647" className="text-primary-400 hover:underline">065-993-5647</a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm">contact@ssnthailand.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SSN Thailand - เครือข่ายพลังสังคม. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
