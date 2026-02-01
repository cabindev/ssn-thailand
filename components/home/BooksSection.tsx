'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Eye } from 'lucide-react';
import { Empty, Spin } from 'antd';

interface Book {
  id: string;
  title: string;
  imageUrl: string;
  pdfUrl: string;
  views: number;
  rating: number;
  tag?: {
    id: string;
    title: string;
  };
  createdAt: string;
}

interface BooksResponse {
  data: Book[];
}

const OPENREAD_BASE_URL = 'https://openread.ssnthailand.com';
const OPENREAD_API_URL = `${OPENREAD_BASE_URL}/api/books/recent?limit=8`;

function BookCard({ book }: { book: Book }) {
  const [imageError, setImageError] = useState(false);

  const imageUrl = book.imageUrl
    ? (book.imageUrl.startsWith('http') ? book.imageUrl : `${OPENREAD_BASE_URL}${book.imageUrl}`)
    : '';

  const bookUrl = `${OPENREAD_BASE_URL}/books/${book.id}`;

  return (
    <a
      href={bookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] bg-gray-100">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
              <BookOpen className="w-12 h-12 text-green-300" />
            </div>
          )}
          {book.tag && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">
              {book.tag.title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-green-600 transition-colors min-h-[2.5rem]">
            {book.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{book.views.toLocaleString()}</span>
            </div>
            {book.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{book.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function BooksSection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(OPENREAD_API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const result: BooksResponse = await response.json();
        setBooks(result.data || []);
      } catch (err) {
        console.error('Failed to fetch books:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (error) {
    return null; // Hide section if API fails
  }

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-1">
              <BookOpen className="w-6 h-6 text-green-600" />
              หนังสือล่าสุด
            </h2>
            <p className="text-gray-600 text-sm">จาก OpenRead - ห้องสมุดออนไลน์</p>
          </div>
          <a
            href={OPENREAD_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
          >
            ดูทั้งหมด
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <Empty description="ไม่มีหนังสือ" className="py-12" />
        )}
      </div>
    </section>
  );
}
