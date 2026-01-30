'use client';

import React, { useState, useEffect } from 'react';
import { Input, Select, Button, Pagination } from 'antd';
import { Search, Grid3X3, List, RotateCcw } from 'lucide-react';
import { getEthnicGroups, REGIONS } from '@/lib/api';
import { EthnicGroup, Pagination as PaginationType } from '@/types';
import ItemCard from '@/components/ui/ItemCard';
import EmptyState from '@/components/ui/EmptyState';
import LoadingState from '@/components/ui/LoadingState';

export default function EthnicGroupsPage() {
  const [items, setItems] = useState<EthnicGroup[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // Filters
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getEthnicGroups({
        search: search || undefined,
        region,
        page,
        limit: 12,
      });
      setItems(response.data || []);
      setPagination(response.pagination || null);
    } catch (error) {
      console.error('Failed to fetch ethnic groups:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [region, page]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleReset = () => {
    setSearch('');
    setRegion(undefined);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="gradient-primary py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            กลุ่มชาติพันธุ์
          </h1>
          <p className="text-primary-100">
            ข้อมูลกลุ่มชาติพันธุ์ต่างๆ ในประเทศไทยที่มีวิถีชีวิตและวัฒนธรรมอันเป็นเอกลักษณ์
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="ค้นหากลุ่มชาติพันธุ์..."
                prefix={<Search className="w-4 h-4 text-gray-400" />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onPressEnter={handleSearch}
                size="large"
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                placeholder="เลือกภูมิภาค"
                allowClear
                value={region}
                onChange={setRegion}
                options={REGIONS}
                className="w-full"
                size="large"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<Search className="w-4 h-4" />}
                onClick={handleSearch}
                size="large"
              >
                ค้นหา
              </Button>
              <Button
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={handleReset}
                size="large"
              >
                รีเซ็ต
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {pagination ? (
              <>
                แสดง {items.length} จาก {pagination.total} รายการ
              </>
            ) : (
              'กำลังโหลด...'
            )}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type={layout === 'grid' ? 'primary' : 'default'}
              icon={<Grid3X3 className="w-4 h-4" />}
              onClick={() => setLayout('grid')}
            />
            <Button
              type={layout === 'list' ? 'primary' : 'default'}
              icon={<List className="w-4 h-4" />}
              onClick={() => setLayout('list')}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingState type={layout === 'grid' ? 'cards' : 'list'} count={8} />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {layout === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} type="ethnic-group" layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} type="ethnic-group" layout="list" />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  pageSize={pagination.limit}
                  onChange={(newPage) => setPage(newPage)}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
