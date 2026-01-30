'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, FileText } from 'lucide-react';
import { CreativeActivity, PublicPolicy } from '@/types';
import { translateLevel, translateRegion } from '@/lib/utils';

interface TimelinesSectionProps {
  activities: CreativeActivity[];
  policies: PublicPolicy[];
}

// Format date to Thai
function formatDate(dateString?: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function TimelinesSection({ activities, policies }: TimelinesSectionProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activities Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
                  <p className="text-xs text-gray-500">Recent Activities</p>
                </div>
              </div>
              <Link
                href="/creative-activities"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ดูทั้งหมด
              </Link>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {activities && activities.length > 0 ? (
                <div className="space-y-1">
                  {activities.slice(0, 5).map((activity, index) => (
                    <Link
                      key={activity.id}
                      href={`/creative-activities/${activity.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-50" />
                          {index < activities.slice(0, 5).length - 1 && (
                            <div className="w-0.5 h-full bg-gray-100 my-1" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <p className="text-xs text-gray-400 mb-1">
                            {formatDate(activity.createdAt || activity.created_at)}
                          </p>
                          <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                            {activity.name}
                          </h4>
                          {activity.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {activity.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            {activity.province && (
                              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                {activity.province}
                              </span>
                            )}
                            {(activity.type || activity.region) && (
                              <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full">
                                {translateRegion(activity.type || activity.region)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Clock className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">ยังไม่มีกิจกรรม</p>
                </div>
              )}
            </div>
          </div>

          {/* Policies Timeline */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">นโยบายสาธารณะล่าสุด</h3>
                  <p className="text-xs text-gray-500">Recent Public Policies</p>
                </div>
              </div>
              <Link
                href="/public-policies"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                ดูทั้งหมด
              </Link>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {policies && policies.length > 0 ? (
                <div className="space-y-1">
                  {policies.slice(0, 5).map((policy, index) => (
                    <Link
                      key={policy.id}
                      href={`/public-policies/${policy.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50" />
                          {index < policies.slice(0, 5).length - 1 && (
                            <div className="w-0.5 h-full bg-gray-100 my-1" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <p className="text-xs text-gray-400 mb-1">
                            {formatDate(policy.signingDate || policy.createdAt || policy.created_at)}
                          </p>
                          <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                            {policy.name}
                          </h4>
                          {policy.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {policy.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            {policy.level && (
                              <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                {translateLevel(policy.level)}
                              </span>
                            )}
                            {policy.province && (
                              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3" />
                                {policy.province}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">ยังไม่มีนโยบาย</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
