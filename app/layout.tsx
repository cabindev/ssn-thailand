import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import thTH from 'antd/locale/th_TH';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'SSN Thailand - เครือข่ายพลังสังคม',
    template: '%s | SSN Thailand',
  },
  description:
    'แหล่งรวบรวมข้อมูลกิจกรรมสร้างสรรค์ ประเพณี กลุ่มชาติพันธุ์ และนโยบายสาธารณะที่เกี่ยวข้องกับการสร้างสังคมปลอดภัยในประเทศไทย',
  keywords: ['SSN', 'Thailand', 'เครือข่ายพลังสังคม', 'ประเพณี', 'กิจกรรมสร้างสรรค์', 'นโยบายสาธารณะ'],
  icons: {
    icon: '/favicon.ico',
  },
};

const theme = {
  token: {
    colorPrimary: '#16a34a',
    borderRadius: 8,
    fontFamily: 'Inter, Noto Sans Thai, sans-serif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="ssn">
      <body className="min-h-screen flex flex-col bg-base-100">
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme} locale={thTH}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
