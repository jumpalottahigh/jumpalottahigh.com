import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/sanity/types'
import { urlFor } from '@/sanity/image'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  className?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default function PostCard({ post, className }: PostCardProps) {
  const accent = post.category?.accentColor || '#888888'

  return (
    <Link
      href={`/posts/${post.slug.current}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]',
        'hover:border-white/15 hover:bg-[var(--surface-hover)] hover:-translate-y-0.5 transition-all duration-300',
        className
      )}
    >
      {/* Thumbnail */}
      <div className='relative aspect-video overflow-hidden bg-[var(--surface-hover)]'>
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(600).height(338).url()}
            alt={post.mainImage.alt || post.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div
            className='absolute inset-0 flex items-center justify-center text-4xl opacity-30'
            style={{ background: `${accent}15` }}
          >
            {post.category?.icon || '📄'}
          </div>
        )}
        {post.videoEmbed && (
          <div className='absolute top-3 right-3 bg-black/70 rounded-full p-1.5'>
            <span className='text-xs text-white'>▶</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 p-5'>
        {/* Category badge */}
        <div className='flex items-center gap-2 mb-3'>
          <span
            className='text-xs font-semibold px-2 py-0.5 rounded-full'
            style={{ background: `${accent}20`, color: accent }}
          >
            {post.category?.icon} {post.category?.title}
          </span>
          <span className='text-xs text-[var(--muted)]'>
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h3 className='font-bold text-white group-hover:text-white leading-snug line-clamp-2'>
          {post.title}
        </h3>

        {post.excerpt && (
          <p className='mt-2 text-sm text-[var(--muted)] line-clamp-2'>
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-1.5'>
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--muted)]'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
