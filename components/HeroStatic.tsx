import { Shield, CheckCircle, ArrowRight } from 'lucide-react'

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
  }
}

export default function HeroStatic({ content }: HeroProps) {
  return (
    <section 
      className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="text-blue-600 dark:text-blue-400" size={32} />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                GDPR Compliance
              </span>
            </div>

            <h1 
              id="hero-title"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              {content.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
              >
                {content.cta.primary}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
              </a>
              
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {content.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
