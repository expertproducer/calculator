import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Deliverables from '@/components/Deliverables'
import Benefits from '@/components/Benefits'
import Cases from '@/components/Cases'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
  description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly. Professional GDPR compliance solutions for businesses.',
  openGraph: {
    title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
    description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
    url: 'https://gdpr.cashandclash.com',
    siteName: 'C&C CookieComply',
    images: [
      {
        url: 'https://gdpr.cashandclash.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'C&C CookieComply - GDPR Compliance Solutions'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
    description: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
    images: ['https://gdpr.cashandclash.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://gdpr.cashandclash.com/en',
    languages: {
      'en': 'https://gdpr.cashandclash.com/en',
      'de': 'https://gdpr.cashandclash.com/de',
      'fr': 'https://gdpr.cashandclash.com/fr',
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <main>
        <section id="hero">
          <Hero />
        </section>
        
        <section id="problem">
          <Problem />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="process">
          <Process />
        </section>
        
        <section id="deliverables">
          <Deliverables />
        </section>
        
        <section id="benefits">
          <Benefits />
        </section>
        
        <section id="cases">
          <Cases />
        </section>
        
        <section id="pricing">
          <Pricing />
        </section>
        
        <section id="faq">
          <FAQ />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
