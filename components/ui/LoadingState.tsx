import React from 'react';
import { Skeleton, Card } from 'antd';

interface LoadingStateProps {
  type?: 'list' | 'detail' | 'cards';
  count?: number;
}

export default function LoadingState({ type = 'cards', count = 8 }: LoadingStateProps) {
  if (type === 'detail') {
    return (
      <div className="container-custom py-8">
        <Skeleton active paragraph={{ rows: 0 }} className="mb-4" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton.Image className="!w-full !h-96 rounded-xl" active />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton.Image key={i} className="!w-20 !h-20 rounded-lg" active />
              ))}
            </div>
          </div>
          <div>
            <Card>
              <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <Card>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex gap-4">
              <Skeleton.Image className="!w-48 !h-32 rounded-lg" active />
              <div className="flex-1">
                <Skeleton active paragraph={{ rows: 2 }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Cards (default)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton.Image className="!w-full !h-48 mb-4" active />
          <Skeleton active paragraph={{ rows: 2 }} />
        </Card>
      ))}
    </div>
  );
}
