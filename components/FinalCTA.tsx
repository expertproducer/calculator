import { ArrowRight, Clock, Star, Zap } from 'lucide-react'

interface FinalCTAProps {
  content?: {
    cta: {
      primary: string
      secondary: string
    }
    title?: string
    subtitle?: string
    badge?: string
    responseTime?: string
  }
}

export default function FinalCTA({ content }: FinalCTAProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            {content?.badge || '🚀 Ready to Get Started?'}
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            {content?.title || 'Ready to get compliant?'}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {content?.subtitle || 'Transform your cookie banners from legal liability into user-friendly compliance. No dark patterns, just clean implementation.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 shadow-lg hover:shadow-xl text-lg"
            >
              <span>{content?.cta?.primary || 'Fix my banner'}</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-white border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 shadow-lg hover:shadow-xl text-lg"
            >
              <span>{content?.cta?.secondary || 'Free quick check'}</span>
              <Zap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{content?.responseTime || 'We reply within 24h'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
