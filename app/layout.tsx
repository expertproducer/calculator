import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CookieConsent from '../components/CookieConsent'
import Accessibility from '../components/Accessibility'
import { CriticalFonts } from '../components/FontOptimizer'
import { initializePerformanceOptimization } from '../lib/performance'

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
        
        {/* Critical fonts optimization */}
        <CriticalFonts />
        
        {/* Performance optimization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance optimization
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Initialize performance optimization after page load
                  if (window.initializePerformanceOptimization) {
                    window.initializePerformanceOptimization();
                  }
                });
              }
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Перейти к основному контенту"
        >
          Перейти к контенту
        </a>

        {/* Main content */}
        <main id="main-content">
          {children}
        </main>

        {/* Cookie consent */}
        <CookieConsent />
        
        {/* Accessibility components */}
        <Accessibility />
        
        {/* Performance optimization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization functions
              window.initializePerformanceOptimization = function() {
                // Monitor Core Web Vitals
                if ('PerformanceObserver' in window) {
                  // First Contentful Paint
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.name === 'first-contentful-paint') {
                        console.log('FCP:', entry.startTime + 'ms');
                      }
                    }
                  }).observe({ entryTypes: ['paint'] });

                  // Largest Contentful Paint
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime + 'ms');
                      }
                    }
                  }).observe({ entryTypes: ['largest-contentful-paint'] });

                  // First Input Delay
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'first-input') {
                        const delay = entry.processingStart - entry.startTime;
                        console.log('FID:', delay + 'ms');
                      }
                    }
                  }).observe({ entryTypes: ['first-input'] });

                  // Cumulative Layout Shift
                  let cls = 0;
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
                        cls += entry.value;
                        console.log('CLS:', cls);
                      }
                    }
                  }).observe({ entryTypes: ['layout-shift' });
                }

                // Optimize images with lazy loading
                if ('IntersectionObserver' in window) {
                  const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                          img.src = img.dataset.src;
                          img.classList.remove('lazy');
                          imageObserver.unobserve(img);
                        }
                      }
                    });
                  });

                  document.querySelectorAll('img[data-src]').forEach((img) => {
                    imageObserver.observe(img);
                  });
                }

                // Monitor errors
                window.addEventListener('error', (event) => {
                  console.error('JavaScript Error:', {
                    message: event.message,
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno
                  });
                });

                // Monitor unhandled promise rejections
                window.addEventListener('unhandledrejection', (event) => {
                  console.error('Unhandled Promise Rejection:', event.reason);
                });
              };
            `
          }}
        />
      </body>
    </html>
  )
}
