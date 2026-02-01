'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Database, BookOpen } from 'lucide-react';

const menuItems = [
  { key: '/creative-activities', label: 'กิจกรรมสร้างสรรค์' },
  { key: '/traditions', label: 'ประเพณี' },
  { key: '/ethnic-groups', label: 'กลุ่มชาติพันธุ์' },
  { key: '/public-policies', label: 'นโยบายสาธารณะ' },
];

const externalLinks = [
  { key: 'database', label: 'Database', href: 'https://database.ssnthailand.com/', icon: Database },
  { key: 'openread', label: 'Openread', href: 'https://openread.ssnthailand.com/', icon: BookOpen },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSelectedKey = () => {
    const item = menuItems.find((item) => pathname.startsWith(item.key));
    return item ? [item.key] : [];
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logopower.png"
              alt="SSN Thailand Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">SSN Thailand</h1>
              <p className="text-xs text-gray-500">เครือข่ายพลังสังคม</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <Menu
              mode="horizontal"
              selectedKeys={getSelectedKey()}
              items={[
                ...menuItems.map((item) => ({
                  key: item.key,
                  label: (
                    <Link href={item.key} className="font-medium">
                      {item.label}
                    </Link>
                  ),
                })),
                ...externalLinks.map((item) => ({
                  key: item.key,
                  label: (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium flex items-center gap-1"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </a>
                  ),
                })),
              ]}
              className="border-none bg-transparent"
            />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden"
            size="large"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Image
              src="/logopower.png"
              alt="SSN Thailand Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold">SSN Thailand</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined />}
        width={280}
      >
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                pathname.startsWith(item.key)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-gray-200 my-2" />
          {externalLinks.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg font-medium transition-colors text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <item.icon className="w-5 h-5 text-green-600" />
              {item.label}
            </a>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}
