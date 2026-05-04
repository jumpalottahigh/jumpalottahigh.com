'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/software', label: 'Software' },
  { href: '/fitness', label: 'Fitness' },
  { href: '/fpv', label: 'FPV' },
  { href: '/travel', label: 'Travel' },
  { href: '/gaming', label: 'Gaming' },
  { href: '/blog', label: 'Blog' },
  { href: '/links', label: 'Links' },
  { href: '/about', label: 'About' }
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <Link
            href='/'
            className='text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity'
          >
            jumpalottahigh
          </Link>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-1'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='px-3 py-1.5 rounded-md text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)] transition-all'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className='md:hidden p-2 rounded-md text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)] transition-all'
            onClick={() => setOpen(!open)}
            aria-label='Toggle menu'
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className='px-4 pb-4 flex flex-col gap-1'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='px-3 py-2.5 rounded-md text-sm text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)] transition-all'
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
