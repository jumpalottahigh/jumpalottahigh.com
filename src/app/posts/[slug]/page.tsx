import { client } from "@/sanity/client";
import { postBySlugQuery, postsByCategoryQuery, allPostSlugsQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import PostBody from "@/components/PostBody";
import VideoEmbed from "@/components/VideoEmbed";
import PostCard from "@/components/PostCard";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery).catch(() => []);
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug }).catch(() => null);

  if (!post) notFound();

  const accent = post.category?.accentColor || "#888888";

  const relatedPosts = post.category
    ? await client
        .fetch<Post[]>(postsByCategoryQuery, { category: post.category.slug.current })
        .then((posts) => posts.filter((p) => p._id !== post._id).slice(0, 3))
        .catch(() => [])
    : [];

  return (
    <article>
      {/* Hero image */}
      {post.mainImage && (
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1400).height(600).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          {post.category && (
            <>
              <Link
                href={`/${post.category.slug.current}`}
                className="hover:text-white transition-colors"
                style={{ color: accent }}
              >
                {post.category.icon} {post.category.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="truncate">{post.title}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          {post.category && (
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: `${accent}20`, color: accent }}
            >
              {post.category.icon} {post.category.title}
            </span>
          )}
          <span className="text-sm text-[var(--muted)]">{formatDate(post.publishedAt)}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-8">
          {post.title}
        </h1>

        {/* Video embed */}
        {post.videoEmbed && <VideoEmbed url={post.videoEmbed} title={post.title} />}

        {/* Body */}
        {post.body && post.body.length > 0 && <PostBody body={post.body} />}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--muted)] mb-8">
            More from {post.category?.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug }).catch(() => null);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  };
}
