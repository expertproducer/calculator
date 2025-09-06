"use client"

import { ShieldCheck } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import VideoBackground from './VideoBackground'
import Container from './Container'

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
  locale?: string
}

export default function Hero({ content, locale = 'en' }: HeroProps) {
  return (
    <>
      <section 
        className="relative min-h-screen overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Full Screen Background */}
        <VideoBackground />
        
        {/* Main Content Container */}
        <Container>
        <div className="relative z-10 pt-32 pb-16">
          
          {/* Hero Content - Centered */}
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            
            {/* Main Headline - Enhanced Process Page Style */}
            <h1 className="text-fluid-hero font-black text-white leading-tight tracking-tight mb-16 mt-20 drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_40%)]">
              {content.headline}
              <span className="text-blue-300 block text-fluid-hero-blue drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_35%)]">{content.headlineBlue}</span>
              <span className="text-gray-200 block text-fluid-hero-gray font-black mt-6 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
                {content.headlineGray}
              </span>
            </h1>
            
            {/* Subtitle - Enhanced Value Prop */}
            <p className="text-fluid-subtitle text-gray-200 leading-relaxed max-w-5xl mb-20 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)] font-black">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
            </p>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-8 mb-20">
              <a
                href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                <span className="relative z-10">{content.cta.primary}</span>
              </a>
              
              <a
                href={locale === 'en' ? '/services' : `/${locale}/services`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                {content.cta.secondary}
              </a>
            </div>
            

          </div>
        </div>
        </Container>
        
        {/* Убираем лишние декоративные элементы для чистоты */}
      </section>

      {/* Problems Section - Process Page Style */}
      {content.problem && (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <Container>
            
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_35%)]">
                {content.problem.title}
              </h2>
              
              <p className="text-3xl text-gray-600 max-w-5xl mx-auto font-black drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
                {content.problemsDesc}
              </p>
            </div>
            
            {/* Simple Problems List */}
            <div className="max-w-5xl mx-auto">
              <ul className="space-y-8">
                {content.problem.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-6 text-2xl font-bold bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                    <span className="text-red-600 font-black text-3xl drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">×</span>
                    <span className="text-gray-700 drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-20">
              <div className="inline-flex items-center gap-6 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
                <ShieldCheck className="w-8 h-8 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]" />
                <span className="drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">{content.solutionText}</span>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}