'use client';

import React, { useState, useMemo } from 'react';
import { Modal } from 'antd';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { getAllImageUrls } from '@/lib/utils';
import ImagePlaceholder from './ImagePlaceholder';

interface ImageGalleryProps {
  images?: { id?: string; url: string }[] | string[] | string;
  title?: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert images to array of URLs
  const imageUrls = useMemo(() => getAllImageUrls(images), [images]);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden">
        <ImagePlaceholder className="w-full h-full" />
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={imageUrls[currentIndex]}
            alt={title || `Image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={handlePreview}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
            }}
          />

          {/* Zoom Icon */}
          <button
            onClick={handlePreview}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {imageUrls.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
              {currentIndex + 1} / {imageUrls.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {imageUrls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-primary-600 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={imageUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder.svg';
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        onCancel={() => setPreviewOpen(false)}
        footer={null}
        width="90vw"
        style={{ maxWidth: '1200px', top: 20 }}
        closeIcon={
          <div className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
            <X className="w-5 h-5" />
          </div>
        }
        bodyStyle={{ padding: 0 }}
      >
        <div className="relative">
          <img
            src={imageUrls[currentIndex]}
            alt={title || `Image ${currentIndex + 1}`}
            className="w-full max-h-[80vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/placeholder.svg';
            }}
          />

          {imageUrls.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
