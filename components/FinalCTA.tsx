import { ArrowRight, Clock, Star, Zap } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import Container from './Container'

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
  locale?: string
}

export default function FinalCTA({ content, locale = 'en' }: FinalCTAProps) {
  return (
    <section className="py-20">
      <Container>
      <div className="text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {content?.title || 'Ready to get compliant?'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content?.subtitle || 'Transform your cookie banners from legal liability into user-friendly compliance. No dark patterns, just clean implementation.') }} />
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <a
              href={locale === 'en' ? '/contact' : `/${locale}/contact`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
            >
              <span>{content?.cta?.primary || 'Fix my banner'}</span>
              <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href={locale === 'en' ? '/services' : `/${locale}/services`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
            >
              <span>{content?.cta?.secondary || 'Free quick check'}</span>
              <Zap className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </div>
          

        </div>
      </div>
      </Container>
    </section>
  )
}
