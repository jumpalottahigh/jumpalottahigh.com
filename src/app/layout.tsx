import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/next'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    default: 'jumpalottahigh',
    template: '%s | jumpalottahigh'
  },
  description:
    'Personal portfolio and hobby hub — software, fitness, FPV drones, travel, gaming, and more.',
  metadataBase: new URL('https://jumpalottahigh.com'),
  openGraph: {
    siteName: 'jumpalottahigh',
    type: 'website'
  }
}

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]'>
        <Nav />
        <main className='flex-1'>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
