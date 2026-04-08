import {
  getWPPosts,
  getFeaturedImageUrl,
  getEmbeddedAuthor,
  stripHtml,
  formatThaiDate,
} from '@/lib/wordpress';
import { WPPost } from '@/types/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'บทความ | สสน.ไทยแลนด์',
  description: 'บทความและข่าวสารจากระบบสุขภาพสังคมแห่งชาติ',
};

interface PageProps {
  searchParams: { page?: string; search?: string };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page || 1);
  const search = searchParams.search || undefined;

  let postsData = { posts: [] as WPPost[], total: 0, totalPages: 1 };

  try {
    postsData = await getWPPosts({ page: currentPage, per_page: 12, search, _embed: true });
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
  }

  const { posts, total, totalPages } = postsData;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Articles</h1>
          <p className="text-gray-500">{total} articles found</p>
        </div>

        {/* Search */}
        <form method="GET" className="mb-8 flex justify-center">
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No articles found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`/blog?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  page === currentPage
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const author = getEmbeddedAuthor(post);
  const imageUrl = getFeaturedImageUrl(post, 'medium_large') ?? getFeaturedImageUrl(post);
  const excerpt = stripHtml(post.excerpt.rendered);
  const readTime = post.acf?.read_time;

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Featured Image */}
      {imageUrl ? (
        <div className="relative aspect-video w-full bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <span className="text-sm text-green-400 font-medium">No Image</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </h2>

        {excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{excerpt}</p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {author?.avatar_urls?.['48'] && (
              <Image
                src={author.avatar_urls['48']}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
                unoptimized
              />
            )}
            <span>{author?.name || 'Unknown author'}</span>
          </div>
          <div className="flex items-center gap-3">
            {readTime && <span>{readTime} min read</span>}
            <span>{formatThaiDate(post.date)}</span>
          </div>
        </div>

        {/* Read more */}
        <Link
          href={`/blog/${post.id}`}
          className="mt-4 block text-center py-2 px-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
