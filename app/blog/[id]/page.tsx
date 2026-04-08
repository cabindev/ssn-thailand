import {
  getWPPostById,
  getFeaturedImageUrl,
  getEmbeddedAuthor,
  formatThaiDate,
} from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await getWPPostById(Number(params.id));
    const yoast = post.yoast_head_json;
    return {
      title: yoast?.title || post.title.rendered,
      description: yoast?.description,
      openGraph: {
        title: yoast?.og_title || post.title.rendered,
        description: yoast?.og_description,
        images: yoast?.og_image?.[0]?.url ? [yoast.og_image[0].url] : undefined,
      },
    };
  } catch {
    return { title: 'Article | SSN Thailand' };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const id = Number(params.id);
  if (!id || isNaN(id)) notFound();

  let post;
  try {
    post = await getWPPostById(id);
  } catch {
    notFound();
  }

  const author = getEmbeddedAuthor(post);
  const imageUrl = getFeaturedImageUrl(post, 'large') ?? getFeaturedImageUrl(post);
  const readTime = post.acf?.read_time;
  const categories = post._embedded?.['wp:term']?.[0] ?? [];

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-3xl py-10">

        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-green-600 hover:text-green-800 hover:underline mb-8 inline-block"
        >
          Back to articles
        </Link>

        {/* Category tags */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Author + Meta */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-100 mb-8 text-sm text-gray-500">
          {author && (
            <div className="flex items-center gap-3">
              {author.avatar_urls?.['96'] && (
                <Image
                  src={author.avatar_urls['96']}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-200"
                  unoptimized
                />
              )}
              <div>
                <p className="font-medium text-gray-800 text-sm">{author.name}</p>
                {author.description && (
                  <p className="text-xs text-gray-400 line-clamp-1">{author.description}</p>
                )}
              </div>
            </div>
          )}
          <div className="ml-auto flex flex-wrap items-center gap-3 text-xs text-gray-400">
            <span>{formatThaiDate(post.date)}</span>
            {post.modified !== post.date && (
              <span>Updated {formatThaiDate(post.modified)}</span>
            )}
            {readTime && <span>{readTime} min read</span>}
          </div>
        </div>

        {/* Featured Image */}
        {imageUrl && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-gray-100">
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              unoptimized
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-blockquote:border-l-4 prose-blockquote:border-green-400
            prose-blockquote:text-gray-600 prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:w-full prose-img:shadow-sm prose-img:my-6
            [&_figure]:my-6
            [&_figure_img]:rounded-xl [&_figure_img]:w-full [&_figure_img]:shadow-sm
            [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-400 [&_figcaption]:mt-2
            [&_.wp-block-image]:my-6
            [&_.wp-block-image_img]:rounded-xl [&_.wp-block-image_img]:w-full
          "
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Footer nav */}
        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link
            href="/blog"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm inline-block"
          >
            All articles
          </Link>
        </div>

      </div>
    </main>
  );
}
