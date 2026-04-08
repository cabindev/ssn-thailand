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

export default async function BlogSection() {
  let posts: WPPost[] = [];

  try {
    const data = await getWPPosts({ per_page: 3, _embed: true });
    posts = data.posts;
  } catch (error) {
    console.error('BlogSection: failed to fetch posts', error);
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">New Content</h2>
            <p className="text-gray-500 text-sm mt-1">Read news and knowledge from our team</p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-green-600 hover:text-green-800 font-medium hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => {
            const author = getEmbeddedAuthor(post);
            const imageUrl =
              getFeaturedImageUrl(post, 'medium_large') ?? getFeaturedImageUrl(post);
            const excerpt = stripHtml(post.excerpt.rendered);
            const readTime = post.acf?.read_time;

            return (
              <article
                key={post.id}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image */}
                {imageUrl ? (
                  <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
                    <span className="text-sm text-green-400 font-medium">No Image</span>
                  </div>
                )}

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-green-700 transition-colors">
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </h3>

                  {excerpt && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">{excerpt}</p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                      {author?.avatar_urls?.['48'] && (
                        <Image
                          src={author.avatar_urls['48']}
                          alt={author.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                          unoptimized
                        />
                      )}
                      <span>{author?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {readTime && <span>{readTime} min read</span>}
                      <span>{formatThaiDate(post.date)}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-3 text-center py-2 text-sm text-green-600 font-medium hover:text-green-800 transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
