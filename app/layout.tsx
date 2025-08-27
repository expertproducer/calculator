import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieConsent from '../components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
  description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly. Professional GDPR compliance solutions for businesses.',
  keywords: 'GDPR, CMP, cookie banner, consent management, privacy compliance, cookie compliance',
  authors: [{ name: 'C&C CookieComply' }],
  openGraph: {
    title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
    description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
    type: 'website',
    url: 'https://gdpr.cashandclash.com',
    siteName: 'C&C CookieComply',
    images: [
      {
        url: 'https://gdpr.cashandclash.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'C&C CookieComply - GDPR Compliance Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
    description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
    images: ['https://gdpr.cashandclash.com/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
