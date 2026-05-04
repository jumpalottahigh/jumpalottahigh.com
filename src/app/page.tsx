import { client } from '@/sanity/client'
import {
  categoriesQuery,
  recentPostsQuery,
  socialLinksQuery,
  aboutQuery
} from '@/sanity/queries'
import type { Category, Post, SocialLink, About } from '@/sanity/types'
import HeroSection from '@/components/HeroSection'
import CategoryGrid from '@/components/CategoryGrid'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [categories, recentPosts, socialLinks, about] = await Promise.all([
    client.fetch<Category[]>(categoriesQuery).catch(() => []),
    client.fetch<Post[]>(recentPostsQuery, { limit: 6 }).catch(() => []),
    client.fetch<SocialLink[]>(socialLinksQuery).catch(() => []),
    client.fetch<About | null>(aboutQuery).catch(() => null)
  ])

  return (
    <>
      <HeroSection
        name={about?.name}
        tagline={about?.tagline}
        socialLinks={socialLinks}
      />

      <CategoryGrid categories={categories} />

      {/* Recent posts */}
      <section className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-sm font-semibold tracking-widest uppercase text-[var(--muted)]'>
            Recent
          </h2>
          <Link
            href='/blog'
            className='text-sm text-[var(--muted)] hover:text-white transition-colors'
          >
            View all →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-[var(--muted)]'>
              No posts yet. Add content in Sanity Studio.
            </p>
            <Link
              href='/studio'
              className='mt-4 inline-block px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors'
            >
              Open Studio →
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
