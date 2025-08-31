import { Star, Quote, CheckCircle } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface TestimonialsProps {
  content?: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      company: string
      role: string
      testimonial: string
      rating: number
      result?: string
      avatar?: string
    }>
  }
}

export default function Testimonials({ content }: TestimonialsProps) {
  // Если контент не передан, не отображаем компонент
  if (!content) {
    return null
  }

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title || 'What Our Clients Say'}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle || 'Real results from real businesses') }} />
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <Quote className="w-5 h-5 text-white drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-blue-500 fill-current drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-8 italic text-lg font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                "<span dangerouslySetInnerHTML={{ __html: formatSimpleText(testimonial.testimonial) }} />"
              </blockquote>
              
              {/* Result if available */}
              {testimonial.result && (
                <div className="flex items-center gap-3 mb-8 p-4 bg-green-50 rounded-2xl border border-green-200 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  <span className="text-lg font-bold text-green-800 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {testimonial.result}
                  </span>
                </div>
              )}
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-2xl">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    testimonial.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{testimonial.name}</div>
                  <div className="text-lg text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{testimonial.role}</div>
                  <div className="text-lg text-blue-600 font-bold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="text-4xl font-bold text-gray-900 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">500+</div>
              <div className="text-lg text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Happy Clients</div>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="text-4xl font-bold text-gray-900 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">4.9/5</div>
              <div className="text-lg text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Average Rating</div>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="text-4xl font-bold text-gray-900 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">99%</div>
              <div className="text-lg text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Success Rate</div>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="text-4xl font-bold text-gray-900 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">24/7</div>
              <div className="text-lg text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
