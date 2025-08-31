import { Clock, AlertTriangle, Flame } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface UrgencyBannerProps {
  content?: {
    title: string
    subtitle: string
    offer?: string
    deadline?: string
    discount?: string
    originalPrice?: string
    finalPrice?: string
  }
}

export default function UrgencyBanner({ content }: UrgencyBannerProps) {
  // Если контент не передан, не отображаем компонент
  if (!content) {
    return null
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Urgency Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shadow-2xl drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              <Flame className="w-10 h-10 text-white drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            </div>
          </div>
          
          {/* Main Message */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title || 'Limited Time Offer'}
          </h2>
          
          <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle || 'Don\'t wait until you get fined. Get GDPR compliant today!') }} />
          </p>
          
          {/* Offer Details */}
          {content.offer && (
            <div className="bg-white/10 rounded-2xl p-8 mb-8 max-w-3xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.offer}</div>
              {content.discount && (
                <div className="text-xl">
                  <span className="line-through opacity-75 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.originalPrice}</span>
                  <span className="ml-3 text-3xl font-bold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.finalPrice}</span>
                  <span className="ml-3 bg-white text-red-600 px-4 py-2 rounded-xl text-lg font-bold shadow-2xl drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.discount} OFF
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Deadline */}
          {content.deadline && (
            <div className="flex items-center justify-center gap-3 text-xl font-bold mb-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              <Clock className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              <span>Offer expires: {content.deadline}</span>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="mt-12">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-12 py-6 bg-white text-red-600 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-2xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
            >
              <AlertTriangle className="w-7 h-7 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              <span>Claim Your Discount Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
