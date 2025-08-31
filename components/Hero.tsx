"use client"

import { Shield, CheckCircle, Zap, Clock, AlertTriangle, Unlock, FileX, Frown, ShieldCheck } from 'lucide-react'

interface HeroProps {
  content: {
    title: string
    subtitle: string
    description?: string
    badge?: string
    headline?: string
    headlineBlue?: string
    headlineGray?: string
    solutionText?: string
    commonProblems?: string
    problemsDesc?: string
    stats?: {
      websites: string
      support: string
      success: string
    }
    cta: {
      primary: string
      secondary: string
    }
    features?: string[]
    image?: {
      src: string
      alt: string
      width: number
      height: number
    }
    problem?: {
      title: string
      points: string[]
    }
  }
}

export default function Hero({ content }: HeroProps) {
  return (
    <>
      <section 
        className="relative min-h-screen bg-white overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Full Screen Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/images/banners/demo/modern-banner-example.png"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 0.75;
            }}
          >
            <source src="/images/banners/demo/hero-background.mp4" type="video/mp4" />
            <source src="/images/banners/demo/hero-background.webm" type="video/webm" />
            <img 
              src="/images/banners/demo/modern-banner-example.png" 
              alt="Cookie compliance demo" 
              className="w-full h-full object-cover"
            />
          </video>
          
          {/* Video Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
          
          {/* Hero Content - Centered */}
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              {content.badge || '✓ GDPR Compliance Made Simple'}
            </div>
            
            {/* Main Headline - StoryBrand Style */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-8">
              {content.headline || 'Every Business Needs'} 
              <span className="text-blue-300 block">{content.headlineBlue || 'Cookie Compliance'}</span>
              <span className="text-gray-200 block text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                {content.headlineGray || 'That Actually Works!'}
              </span>
            </h1>
            
            {/* Subtitle - Clear Value Prop */}
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-12">
              {content.subtitle}
            </p>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="/contact"
                className="btn-storybrand-primary"
              >
                <span className="relative z-10">{content.cta.primary}</span>
              </a>
              
              <a
                href="/services"
                className="btn-storybrand-secondary"
              >
                {content.cta.secondary}
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6">
              <div className="text-sm text-gray-200">
                <div className="font-semibold text-white">1M+</div>
                <div>{content.stats?.websites || 'Websites Protected'}</div>
              </div>
              <div className="text-sm text-gray-200">
                <div className="font-semibold text-white">24/7</div>
                <div>{content.stats?.support || 'Expert Support'}</div>
              </div>
              <div className="text-sm text-gray-200">
                <div className="font-semibold text-white">99%</div>
                <div>{content.stats?.success || 'Success Rate'}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Убираем лишние декоративные элементы для чистоты */}
      </section>

      {/* Problems Section - Clean StoryBrand Style */}
      {content.problem && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                {content.commonProblems || '⚠️ Common Problems'}
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                {content.problem.title}
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.problemsDesc || 'We fix these problems quickly and professionally'}
              </p>
            </div>
            
            {/* Simple Problems List */}
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {content.problem.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-lg">
                    <span className="text-red-600 font-bold text-xl">×</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold">{content.solutionText || 'We solve all these problems'}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}