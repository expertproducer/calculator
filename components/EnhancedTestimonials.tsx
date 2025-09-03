'use client'
import { Star, Quote, CheckCircle, TrendingUp, Users, Award, Clock, Building2 } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import { useState, useEffect } from 'react'
import OptimizedImage from './OptimizedImage'

interface TestimonialsProps {
  content?: {
    title: string
    subtitle: string
    metrics: {
      title: string
      items: Array<{
        number: string
        label: string
        description: string
      }>
    }
    items: Array<{
      name: string
      company: string
      role: string
      testimonial: string
      rating: number
      result?: string
      avatar?: string
      companyLogo?: string
      metrics?: {
        before: string
        after: string
        improvement: string
      }
    }>
  }
}

export default function EnhancedTestimonials({ content }: TestimonialsProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % content.items.length)
    }, 5000) // Переключаем каждые 5 секунд

    return () => clearInterval(interval)
  }, [content.items.length])

  // Если контент не передан, не отображаем компонент
  if (!content) {
    return null
  }

  const metricIcons = [Users, TrendingUp, Award, Clock]

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            {content.title}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        {/* Metrics Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {content.metrics.title}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {content.metrics.items.map((metric, index) => {
              const IconComponent = metricIcons[index] || TrendingUp
              return (
                <div 
                  key={index}
                  className="text-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:scale-105 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-2">
                    {metric.number}
                  </div>
                  <div className="text-lg font-bold text-gray-700 mb-2">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {metric.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

                          {/* Main Testimonial Display */}
         <div className="max-w-6xl mx-auto mb-16">
           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
             <div className="p-12 lg:p-16">
                               {/* Author Info with Avatar - Moved to Top */}
                <div className="flex items-center justify-center gap-8 mb-12">
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    {content.items[activeTestimonial].avatar ? (
                      <OptimizedImage 
                        src={content.items[activeTestimonial].avatar!}
                        alt={content.items[activeTestimonial].name}
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-4xl">
                        {content.items[activeTestimonial].name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                 <div className="text-center">
                   <div className="font-bold text-gray-900 text-2xl mb-2">
                     {content.items[activeTestimonial].name}
                   </div>
                   <div className="text-xl text-gray-600 font-medium mb-2">
                     {content.items[activeTestimonial].role}
                   </div>
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                     <Building2 className="w-4 h-4 text-blue-600" />
                     <span className="text-lg font-bold text-blue-900">
                       {content.items[activeTestimonial].company}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Testimonial Quote */}
               <div className="relative mb-10">
                 <Quote className="w-16 h-16 text-blue-200 absolute -top-4 -left-4" />
                 <blockquote className="text-2xl lg:text-3xl text-gray-800 leading-relaxed font-medium italic text-center relative z-10 px-8">
                   "{content.items[activeTestimonial].testimonial}"
                 </blockquote>
                 <Quote className="w-16 h-16 text-blue-200 absolute -bottom-4 -right-4 transform rotate-180" />
               </div>

               {/* Result Badge */}
               {content.items[activeTestimonial].result && (
                 <div className="flex justify-center mb-10">
                   <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                     <CheckCircle className="w-6 h-6 text-green-600" />
                     <span className="text-xl font-bold text-green-800">
                       {content.items[activeTestimonial].result}
                     </span>
                   </div>
                 </div>
               )}

               {/* Metrics Cards */}
               {content.items[activeTestimonial].metrics && (
                 <div className="grid grid-cols-3 gap-6">
                   <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200 shadow-lg">
                     <div className="text-sm font-bold text-red-800 mb-2">Before</div>
                     <div className="text-lg font-bold text-red-600">{content.items[activeTestimonial].metrics.before}</div>
                   </div>
                   <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 shadow-lg">
                     <div className="text-sm font-bold text-green-800 mb-2">After</div>
                     <div className="text-lg font-bold text-green-600">{content.items[activeTestimonial].metrics.after}</div>
                   </div>
                   <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg">
                     <div className="text-sm font-bold text-blue-800 mb-2">Result</div>
                     <div className="text-lg font-bold text-blue-600">{content.items[activeTestimonial].metrics.improvement}</div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         </div>

                             {/* Testimonial Navigation - Simple Slider */}
          <div className="flex justify-center gap-3 mb-16">
            {content.items.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeTestimonial === index 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

                 {/* All Testimonials Grid */}
         <div className="text-center">
           <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
             <Star className="w-5 h-5 text-yellow-500 fill-current" />
             <span className="text-lg font-bold text-blue-900">
               All testimonials are verified and authentic
             </span>
           </div>
         </div>
      </div>
    </section>
  )
}
