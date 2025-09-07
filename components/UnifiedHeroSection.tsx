"use client"

import { ShieldCheck, Flame, Shield, AlertTriangle, Users, TrendingUp, CheckCircle, ArrowUp, ShoppingCart, Newspaper, Cloud, Clock } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import Container from './Container'
import VideoBackground from './VideoBackground'
import HeroBanner from './HeroBanner'

interface UnifiedHeroSectionProps {
  content: {
    hero: {
      title: string
      subtitle: string
      headline?: string
      headlineBlue?: string
      headlineGray?: string
      cta: {
        primary: string
        secondary: string
      }
      problem?: {
        title: string
        points: string[]
      }
      problemsDesc?: string
      solutionText?: string
    }
    heroBanner?: {
      title: string
      description: string
      button: string
      image?: { src: string; alt: string }
    }
    urgency?: {
      title: string
      subtitle: string
      offer?: string
      deadline?: string
      discount?: string
      originalPrice?: string
      finalPrice?: string
    }
    whyImportant?: {
      title: string
      subtitle: string
      points: string[]
      description: string
      expertiseTitle?: string
    }
    benefits?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
      }>
    }
    platforms?: {
      title: string
      subtitle: string
      items: (string | { name: string; description: string })[]
      note?: string
    }
    cases?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        result: string
      }>
      cta?: string
    }
    deliverables?: {
      title: string
      subtitle?: string
      items: (string | { title: string; description?: string })[]
    }
    riskPanel?: {
      title: string
      subtitle: string
      items: Array<{ title: string; description: string }>
    }
  }
  locale?: string
}

export default function UnifiedHeroSection({ content, locale = 'en' }: UnifiedHeroSectionProps) {
  const typeIcons = [ShoppingCart, Newspaper, Cloud]
  const benefitIcons = [Shield, AlertTriangle, Users, TrendingUp]
  const platformIcons = [CheckCircle, CheckCircle, CheckCircle, CheckCircle, CheckCircle, CheckCircle]

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Background */}
      <div className="relative h-screen overflow-hidden">
        <VideoBackground />
        
        {/* Main Content Container */}
        <Container>
        <div className="relative z-10 pt-32 pb-16">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            
            {/* Main Headline */}
            <h1 className="text-fluid-hero font-black text-white leading-tight tracking-tight mb-16 mt-20 drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_40%)]">
              {content.hero.headline}
              <span className="text-blue-300 block text-fluid-hero-blue drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_35%)]">{content.hero.headlineBlue}</span>
              <span className="text-gray-200 block text-fluid-hero-gray font-black mt-6 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
                {content.hero.headlineGray}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-fluid-subtitle text-gray-200 leading-relaxed max-w-5xl mb-20 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)] font-black">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.hero.subtitle) }} />
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 mb-20">
              <a
                href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                <span className="relative z-10">{content.hero.cta.primary}</span>
              </a>
              
              <a
                href={locale === 'en' ? '/services' : `/${locale}/services`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                {content.hero.cta.secondary}
              </a>
            </div>
          </div>
        </div>
        </Container>
      </div>

      {/* Banner directly after hero video */}
      {content.heroBanner && <HeroBanner content={content.heroBanner} />}

      {/* Unified Content Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Container>
          
                     {/* Problems Section */}
           {content.hero.problem && (
             <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8 hover:shadow-3xl transition-all duration-300">
               <div className="text-center mb-8">
                 <h2 className="text-4xl font-black text-gray-900 mb-4">{content.hero.problem.title}</h2>
                 <p className="text-xl text-gray-600">{content.hero.problemsDesc}</p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-4">
                 {content.hero.problem.points.map((point, index) => (
                   <div key={index} className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                     <span className="text-red-600 font-black text-2xl">×</span>
                     <span className="text-gray-700 font-semibold">{point}</span>
                   </div>
                 ))}
               </div>
               
               <div className="text-center mt-6">
                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold">
                   <ShieldCheck className="w-5 h-5" />
                   <span>{content.hero.solutionText || 'We solve all these problems'}</span>
                 </div>
               </div>
             </div>
           )}

            {/* Six Sections Grid - 3x2 Layout */}
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              
              {/* Why Important */}
              {content.whyImportant && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.whyImportant.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{content.whyImportant.subtitle}</p>
                  </div>
                  
                                    <div className="space-y-3">
                    {content.whyImportant.points.slice(0, 5).map((point, index) => {
                      const colors = [
                        'bg-blue-500',
                        'bg-green-500',
                        'bg-purple-500',
                        'bg-orange-500',
                        'bg-red-500'
                      ]
                      const color = colors[index % colors.length]
                      
                      const subtitles = content.whyImportant.points
                      
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{point}</div>
                            <div className="text-xs text-gray-600">{subtitles[index]}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {content.benefits && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.benefits.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{content.benefits.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {content.benefits.items.slice(0, 5).map((item, index) => {
                      const colors = [
                        'bg-blue-500',
                        'bg-green-500',
                        'bg-purple-500',
                        'bg-orange-500',
                        'bg-red-500'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-600">{item.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Platforms */}
              {content.platforms && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.platforms.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{content.platforms.subtitle}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {content.platforms.items.slice(0, 5).map((platform, index) => {
                      const platformName = typeof platform === 'string' ? platform : platform.name
                      const platformDescription = typeof platform === 'object' && 'description' in platform ? platform.description : undefined
                      const colors = [
                        'bg-blue-500',
                        'bg-green-500',
                        'bg-purple-500',
                        'bg-orange-500',
                        'bg-red-500'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{platformName}</div>
                            {platformDescription && (
                              <div className="text-xs text-gray-600">{platformDescription}</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {content.cases && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.cases.title}</h3>
                    {content.cases.subtitle && (
                      <p className="text-base text-gray-600 leading-relaxed">{content.cases.subtitle}</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {content.cases.items.slice(0, 5).map((caseItem, index) => {
                      const colors = [
                        'bg-purple-500',
                        'bg-blue-500',
                        'bg-orange-500',
                        'bg-green-500',
                        'bg-red-500'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{caseItem.title}</div>
                            {caseItem.result && (
                              <div className="text-xs text-gray-600">{caseItem.result}</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* What You Get */}
              {content.deliverables && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.deliverables.title}</h3>
                    {content.deliverables.subtitle && (
                      <p className="text-base text-gray-600 leading-relaxed">{content.deliverables.subtitle}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    {content.deliverables.items.slice(0, 5).map((item, index) => {
                      const itemTitle = typeof item === 'string' ? item : item.title
                      const itemDesc = typeof item === 'object' && 'description' in item ? item.description : undefined
                      const colors = ['bg-blue-500','bg-green-500','bg-purple-500','bg-orange-500','bg-red-500']
                      const color = colors[index % colors.length]
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{itemTitle}</div>
                            {itemDesc && (
                              <div className="text-xs text-gray-600">{itemDesc}</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Risk Panel */}
              {content.riskPanel && (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{content.riskPanel.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">{content.riskPanel.subtitle}</p>
                  </div>
                  <div className="space-y-3">
                    {content.riskPanel.items.slice(0, 5).map((item, idx) => {
                      const colors = ['bg-red-500','bg-red-600','bg-red-700','bg-red-800','bg-red-900']
                      const color = colors[idx % colors.length]
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 ${color} rounded-full flex-shrink-0`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-600">{item.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
            </div>
        </Container>
      </div>
    </div>
  )
}
