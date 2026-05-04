import Link from 'next/link'
import type { SocialLink } from '@/sanity/types'

const platformIcons: Record<string, string> = {
  YouTube: '▶',
  TikTok: '♪',
  GitHub: '◆',
  Twitch: '◉',
  Instagram: '◎',
  Twitter: '✕',
  LinkedIn: 'in',
  Discord: '◈'
}

interface HeroSectionProps {
  name?: string
  tagline?: string
  socialLinks?: SocialLink[]
}

export default function HeroSection({
  name,
  tagline,
  socialLinks
}: HeroSectionProps) {
  return (
    <section className='relative overflow-hidden'>
      {/* Background gradient mesh */}
      <div
        className='absolute inset-0 opacity-20 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(168,85,247,0.2) 0%, transparent 60%)'
        }}
      />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white'>
          {name || 'jumpalottahigh'}
        </h1>
        <p className='mt-4 text-lg sm:text-xl text-[var(--muted)] max-w-2xl'>
          {tagline ||
            'Software engineer · Weightlifter · FPV pilot · Traveller · Gamer'}
        </p>

        {/* Social links row */}
        {socialLinks && socialLinks.length > 0 && (
          <div className='mt-8 flex flex-wrap gap-3'>
            {socialLinks.map((link) => (
              <a
                key={link._id}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] hover:text-white hover:border-white/20 hover:bg-[var(--surface-hover)] transition-all'
              >
                <span>{link.icon || platformIcons[link.platform] || '→'}</span>
                <span>{link.username || link.platform}</span>
              </a>
            ))}
          </div>
        )}

        {/* Fallback links if no data */}
        {(!socialLinks || socialLinks.length === 0) && (
          <div className='mt-8 flex flex-wrap gap-3'>
            {[
              { label: 'YouTube', href: 'https://youtube.com/@jumpalottahigh' },
              { label: 'GitHub', href: 'https://github.com/jumpalottahigh' },
              { label: 'TikTok', href: 'https://tiktok.com/@jumpalottahigh' }
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--muted)] hover:text-white hover:border-white/20 hover:bg-[var(--surface-hover)] transition-all'
              >
                {s.label} →
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
