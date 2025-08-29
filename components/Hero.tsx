"use client"

import { Shield, CheckCircle, Zap, Clock, AlertTriangle, Unlock, FileX, Frown, ShieldCheck } from 'lucide-react'

interface HeroProps {
  content: {
    title: string
    subtitle: string
    description?: string
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
                  className="relative h-screen pt-16 pb-24 overflow-hidden"
                  aria-labelledby="hero-title"
                >
                  {/* Черный фон */}
                  <div className="absolute inset-0 bg-black"></div>
                  
                  {/* Красивая анимированная волна сверху */}
                  <div className="absolute top-0 left-0 w-full h-48 overflow-hidden transform rotate-180">
                    <svg className="w-full h-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3"/>
                          <stop offset="25%" stopColor="#7c3aed" stopOpacity="0.4"/>
                          <stop offset="50%" stopColor="#059669" stopOpacity="0.3"/>
                          <stop offset="75%" stopColor="#dc2626" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Первая волна */}
                      <path d="M0,180 C200,120 400,140 600,100 C800,60 1000,80 1200,60 L1200,180 L0,180 Z" 
                            fill="url(#waveGradientTop)" 
                            className="animate-wave-float"/>
                      
                      {/* Вторая волна */}
                      <path d="M0,180 C300,130 500,150 700,110 C900,70 1100,90 1200,70 L1200,180 L0,180 Z" 
                            fill="url(#waveGradientTop)" 
                            opacity="0.6"
                            className="animate-wave-float animation-delay-1000"/>
                      
                      {/* Третья волна */}
                      <path d="M0,180 C100,140 400,160 600,120 C800,80 1000,100 1200,80 L1200,180 L0,180 Z" 
                            fill="url(#waveGradientTop)" 
                            opacity="0.4"
                            className="animate-wave-float animation-delay-2000"/>
                    </svg>
                  </div>
                  
                  {/* Красивая анимированная волна */}
                  <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3"/>
                          <stop offset="25%" stopColor="#7c3aed" stopOpacity="0.4"/>
                          <stop offset="50%" stopColor="#059669" stopOpacity="0.3"/>
                          <stop offset="75%" stopColor="#dc2626" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Первая волна */}
                      <path d="M0,180 C200,120 400,140 600,100 C800,60 1000,80 1200,60 L1200,180 L0,180 Z" 
                            fill="url(#waveGradient)" 
                            className="animate-wave-float"/>
                      
                      {/* Вторая волна */}
                      <path d="M0,180 C300,130 500,150 700,110 C900,70 1100,90 1200,70 L1200,180 L0,180 Z" 
                            fill="url(#waveGradient)" 
                            opacity="0.6"
                            className="animate-wave-float animation-delay-1000"/>
                      
                      {/* Третья волна */}
                      <path d="M0,180 C100,140 400,160 600,120 C800,80 1000,100 1200,80 L1200,180 L0,180 Z" 
                            fill="url(#waveGradient)" 
                            opacity="0.4"
                            className="animate-wave-float animation-delay-2000"/>
                    </svg>
                  </div>
      {/* Cookie & GDPR Themed Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
        {/* Cookie-themed animated elements */}
        <div className="absolute inset-0">
          
          
                      {/* 3D GDPR shield with checkmark - перемещен в верхний правый угол */}
            <div className="absolute top-16 right-8 w-24 h-24 animate-shield-appear animate-shield-float animate-shield-glow drop-shadow-2xl transform transition-all duration-1000 hover:scale-110 hover:rotate-12">
              <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-2xl">
                {/* Основной щит с градиентом в теме сайта */}
                <defs>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.9"/>
                    <stop offset="50%" stopColor="#059669" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.9"/>
                  </linearGradient>
                  <linearGradient id="shieldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4"/>
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4"/>
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.4"/>
                  </filter>
                </defs>
                
                {/* Тень щита */}
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                      fill="#000000" opacity="0.3" transform="translate(1, 1)" filter="url(#shadow)"/>
                
                {/* Основной щит */}
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                      fill="url(#shieldGradient)" stroke="#ffffff" strokeWidth="0.5" opacity="0.9"/>
                
                {/* Блики для 3D эффекта */}
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" 
                      fill="url(#shieldHighlight)" opacity="0.6"/>
                
                {/* Галочка с объемом */}
                <path d="M8 13l3 3 5-5" 
                      stroke="#ffffff" strokeWidth="2" fill="none" 
                      strokeLinecap="round" strokeLinejoin="round"
                      filter="url(#shadow)"/>
                
                {/* Дополнительная тень для галочки */}
                <path d="M8 13l3 3 5-5" 
                      stroke="#000000" strokeWidth="2" fill="none" 
                      strokeLinecap="round" strokeLinejoin="round"
                      opacity="0.3" transform="translate(0.5, 0.5)"/>
              </svg>
            </div>


          


          
          {/* Дополнительные замки */}

          

          

          

          

          

          


        </div>
      </div>

      {/* Overlay для лучшей читаемости текста - на весь блок */}
      <div className="absolute inset-0 bg-black/10" style={{ zIndex: 5 }} />

      {/* Content поверх Spline сцены */}
      <div className="container mx-auto px-6 relative flex items-center h-screen" style={{ zIndex: 10 }}>
        <div className="max-w-5xl mx-auto w-full">
          {/* Content */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-title-pulse">
              <div className="flex flex-col items-center">
                <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                  CMP Setup
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                  C&C Cookie Comply
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-2xl animate-pulse">
              {content.subtitle}
            </p>



            {content.description && (
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-lg">
                {content.description}
              </p>
            )}

            {/* Features list */}
            {content.features && (
              <div className="mb-8 space-y-3">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="text-green-400 flex-shrink-0 drop-shadow-lg" size={20} />
                    <span className="text-white/90 drop-shadow-lg">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons - Updated style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 shadow-lg hover:shadow-xl animate-button-appear animate-button-float animate-button-glow-green border-2 border-white/80"
                aria-label={`${content.cta.primary} - go to contact form`}
                style={{ animationDelay: '0.5s' }}
              >
                <span className="text-lg text-white font-bold drop-shadow-lg">{content.cta.primary}</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a
                href="/services"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 shadow-lg hover:shadow-xl animate-button-appear animate-button-float animate-button-glow-blue border-2 border-white/80"
                aria-label={`${content.cta.secondary} - go to services`}
                style={{ animationDelay: '0.8s' }}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-lg text-white font-bold drop-shadow-lg">{content.cta.secondary}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* Clean Problems Section - отдельная секция после Hero */}
    {content.problem && (
      <section className="relative bg-black py-20">
        {/* Overlay для лучшей читаемости */}
        <div className="absolute inset-0 bg-black/10" style={{ zIndex: 5 }} />
        
        <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
          <div className="text-center mb-16">
                          <div className="inline-flex items-center justify-center px-4 py-2 bg-red-500/20 rounded-full mb-6 border border-red-400/30">
                <span className="text-sm font-medium text-red-400">Частые проблемы</span>
              </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-2xl">
              {content.problem.title}
            </h2>
            <p className="text-lg text-cyan-100 max-w-2xl mx-auto drop-shadow-lg">
              Мы исправляем эти проблемы быстро и качественно
            </p>
          </div>
          
          {/* Simple Problems Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {content.problem.points.map((point, index) => {
                const icons = [AlertTriangle, Unlock, FileX, Frown]
                const IconComponent = icons[index % icons.length]
                const colors = [
                  'from-red-400 to-red-600',
                  'from-orange-400 to-orange-600', 
                  'from-pink-400 to-pink-600',
                  'from-purple-400 to-purple-600'
                ]
                
                return (
                  <div key={index} className="group flex items-start gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${colors[index]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 font-medium leading-relaxed drop-shadow-lg">
                        {point}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white/20">
                <ShieldCheck className="text-white w-5 h-5" />
                <span className="text-white font-semibold drop-shadow-lg">Мы решим все эти проблемы</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}
    </>
  )
}
