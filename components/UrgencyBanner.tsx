import { Clock, AlertTriangle, Flame } from 'lucide-react'

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
    <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          {/* Urgency Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Flame className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Main Message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title || 'Limited Time Offer'}
          </h2>
          
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            {content.subtitle || 'Don\'t wait until you get fined. Get GDPR compliant today!'}
          </p>
          
          {/* Offer Details */}
          {content.offer && (
            <div className="bg-white/10 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <div className="text-2xl font-bold mb-2">{content.offer}</div>
              {content.discount && (
                <div className="text-lg">
                  <span className="line-through opacity-75">{content.originalPrice}</span>
                  <span className="ml-2 text-2xl font-bold">{content.finalPrice}</span>
                  <span className="ml-2 bg-yellow-400 text-red-600 px-2 py-1 rounded text-sm font-bold">
                    {content.discount} OFF
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Deadline */}
          {content.deadline && (
            <div className="flex items-center justify-center gap-2 text-lg">
              <Clock className="w-5 h-5" />
              <span>Offer expires: {content.deadline}</span>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="/contact"
              className="btn-storybrand-urgency"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Claim Your Discount Now</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
