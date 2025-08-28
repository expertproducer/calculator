import { Shield, CheckCircle, Zap } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

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
  }
}

export default function Hero({ content }: HeroProps) {
  return (
    <section 
      className="relative pt-32 pb-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background decoration - Apple style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-200/10 to-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Content */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Shield className="text-accent" size={24} />
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                GDPR Compliance
              </span>
            </div>

            <h1 
              id="hero-title"
              className="text-6xl md:text-7xl lg:text-8xl font-semibold text-gray-900 dark:text-white mb-8 leading-none tracking-tight"
            >
              {content.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              {content.subtitle}
            </p>

            {content.description && (
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                {content.description}
              </p>
            )}

            {/* Features list */}
            {content.features && (
              <div className="mb-8 space-y-3">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons - Apple style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-accent hover:bg-accent/90 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 shadow-apple hover:shadow-apple-lg"
                aria-label={`${content.cta.primary} - go to contact form`}
              >
                <span className="text-lg">{content.cta.primary}</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-10 py-4 border border-gray-300/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 hover:border-accent hover:text-accent bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl font-medium rounded-2xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 shadow-sm hover:shadow-apple"
                aria-label={`${content.cta.secondary} - перейти к услугам`}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-lg">{content.cta.secondary}</span>
              </a>
            </div>

            {/* Trust indicators - Apple style */}
            <div className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="text-gray-400 dark:text-gray-500" size={16} />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-gray-400 dark:text-gray-500" size={16} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-gray-400 dark:text-gray-500" size={16} />
                  <span>Fast Setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          {content.image && (
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage
                  src={content.image.src}
                  alt={content.image.alt}
                  width={content.image.width}
                  height={content.image.height}
                  priority={true}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Image overlay with stats */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="grid grid-cols-3 gap-4 text-white">
                    <div className="text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm opacity-90">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">99.9%</div>
                      <div className="text-sm opacity-90">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24h</div>
                      <div className="text-sm opacity-90">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Live Demo
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
