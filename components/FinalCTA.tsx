import { ArrowRight, Clock, Star, Zap } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content?.title || 'Ready to get compliant?'}
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content?.subtitle || 'Transform your cookie banners from legal liability into user-friendly compliance. No dark patterns, just clean implementation.') }} />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
            >
              <span>{content?.cta?.primary || 'Fix my banner'}</span>
              <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#services"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
            >
              <span>{content?.cta?.secondary || 'Free quick check'}</span>
              <Zap className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-800 rounded-full shadow-2xl drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <Clock className="w-5 h-5 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            <span className="text-lg font-bold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content?.responseTime || 'We reply within 24h'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
