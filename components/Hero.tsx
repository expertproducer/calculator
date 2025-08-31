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
        {/* Background Pattern - subtle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50"></div>
        
        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
          
          {/* Hero Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {content.badge || '✓ GDPR Compliance Made Simple'}
              </div>
              
              {/* Main Headline - StoryBrand Style */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                {content.headline || 'Every Business Needs'} 
                <span className="text-blue-600 block">{content.headlineBlue || 'Cookie Compliance'}</span>
                <span className="text-gray-600 block text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                  {content.headlineGray || 'That Actually Works!'}
                </span>
              </h1>
              
              {/* Subtitle - Clear Value Prop */}
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {content.subtitle}
              </p>
              
              {/* CTA Buttons - StoryBrand Style */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/contact"
                  className="btn btn-orange text-lg px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {content.cta.primary}
                </a>
                
                <a
                  href="/services"
                  className="btn btn-outline text-lg px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                >
                  {content.cta.secondary}
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6">
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">1M+</div>
                  <div>Websites Protected</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">24/7</div>
                  <div>Expert Support</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">99%</div>
                  <div>Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Video */}
            <div className="relative">
              {/* Video Container with StoryBrand styling */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                <div className="relative rounded-xl overflow-hidden bg-gray-900">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-video object-cover"
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
                      className="w-full aspect-video object-cover"
                    />
                  </video>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section - Clean StoryBrand Style */}
      {content.problem && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-6">
                ⚠️ Common Problems
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                {content.problem.title}
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We fix these problems quickly and professionally
              </p>
            </div>
            
            {/* Problems Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {content.problem.points.map((point, index) => {
                const icons = [AlertTriangle, Unlock, FileX, Frown]
                const IconComponent = icons[index % icons.length]
                const colors = [
                  'bg-red-500',
                  'bg-orange-500', 
                  'bg-pink-500',
                  'bg-purple-500'
                ]
                
                return (
                  <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`flex-shrink-0 w-12 h-12 ${colors[index]} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-semibold leading-relaxed">
                        {point}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
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