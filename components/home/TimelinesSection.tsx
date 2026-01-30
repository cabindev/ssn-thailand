'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, FileText } from 'lucide-react';
import { CreativeActivity, PublicPolicy } from '@/types';
import { translateLevel } from '@/lib/utils';

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

// Format datetime to Thai
function formatDateTime(dateString?: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function TimelinesSection({ activities, policies }: TimelinesSectionProps) {
  const activityList = activities?.slice(0, 5) || [];
  const policyList = policies?.slice(0, 5) || [];

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Activities Timeline */}
          <div>
            <h2 className="flex items-center mb-8 text-sm text-gray-500">
              <Clock className="mr-2 w-5 h-5 text-green-600" />
              Activity / กิจกรรมล่าสุด
            </h2>

            {activityList.length > 0 ? (
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {activityList.map((activity, index) => (
                  <li key={activity.id}>
                    {index !== 0 && <hr />}
                    <div className="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-green-600">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}>
                      <Link href={`/creative-activities/${activity.id}`} className="block hover:opacity-70 transition-opacity">
                        <time className="font-mono italic">
                          {formatDateTime(activity.createdAt || activity.created_at)}
                        </time>
                        <div className="text-lg font-black">
                          {activity.name}
                        </div>
                        {activity.description && (
                          <p className="text-gray-600 line-clamp-3">
                            {activity.description}
                          </p>
                        )}
                      </Link>
                    </div>
                    {index !== activityList.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">ยังไม่มีกิจกรรม</p>
              </div>
            )}
          </div>

          {/* Policies Timeline */}
          <div>
            <h2 className="flex items-center mb-8 text-sm text-gray-500">
              <FileText className="mr-2 w-5 h-5 text-green-600" />
              Public-Policy / นโยบายสาธารณะล่าสุด
            </h2>

            {policyList.length > 0 ? (
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {policyList.map((policy, index) => (
                  <li key={policy.id}>
                    {index !== 0 && <hr />}
                    <div className="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-green-600">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end md:mb-10'}>
                      <Link href={`/public-policies/${policy.id}`} className="block hover:opacity-70 transition-opacity">
                        <time className="font-mono italic">
                          {formatDate(policy.signingDate || policy.createdAt || policy.created_at)}
                        </time>
                        <div className="text-lg font-black">
                          {policy.name}
                        </div>
                        {policy.level && (
                          <p className="text-gray-600">
                            {translateLevel(policy.level)} {policy.province && `• ${policy.province}`}
                          </p>
                        )}
                      </Link>
                    </div>
                    {index !== policyList.length - 1 && <hr />}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">ยังไม่มีนโยบาย</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
