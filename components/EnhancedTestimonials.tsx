'use client'
import { Star, Quote, CheckCircle, TrendingUp, Users, Award, Clock, Building2 } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import { useState } from 'react'
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
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Testimonial Content */}
              <div className="p-12 lg:p-16">
                <div className="flex items-center gap-2 mb-8">
                  {[...Array(content.items[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-8">
                  <Quote className="w-12 h-12 text-blue-500 opacity-20 absolute -top-2 -left-2" />
                  <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium italic relative z-10">
                    "{content.items[activeTestimonial].testimonial}"
                  </blockquote>
                </div>

                {/* Result Badge */}
                {content.items[activeTestimonial].result && (
                  <div className="flex items-center gap-3 mb-8 p-4 bg-green-50 rounded-2xl border border-green-200">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-lg font-bold text-green-800">
                      {content.items[activeTestimonial].result}
                    </span>
                  </div>
                )}

                {/* Metrics */}
                {content.items[activeTestimonial].metrics && (
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                      <div className="text-sm font-bold text-red-800 mb-1">Before</div>
                      <div className="text-xs text-red-600">{content.items[activeTestimonial].metrics.before}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-sm font-bold text-green-800 mb-1">After</div>
                      <div className="text-xs text-green-600">{content.items[activeTestimonial].metrics.after}</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-sm font-bold text-blue-800 mb-1">Result</div>
                      <div className="text-xs text-blue-600">{content.items[activeTestimonial].metrics.improvement}</div>
                    </div>
                  </div>
                )}

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                    {content.items[activeTestimonial].avatar ? (
                      <OptimizedImage 
                        src={content.items[activeTestimonial].avatar!}
                        alt={content.items[activeTestimonial].name}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                        {content.items[activeTestimonial].name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xl">
                      {content.items[activeTestimonial].name}
                    </div>
                    <div className="text-lg text-gray-600 font-medium">
                      {content.items[activeTestimonial].role}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="text-lg text-blue-600 font-bold">
                        {content.items[activeTestimonial].company}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Company Logo & Visual */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 lg:p-16 flex flex-col justify-center items-center text-white">
                {content.items[activeTestimonial].companyLogo ? (
                  <div className="mb-8">
                    <OptimizedImage 
                      src={content.items[activeTestimonial].companyLogo!}
                      alt={`${content.items[activeTestimonial].company} logo`}
                      className="max-w-48 max-h-20 object-contain filter brightness-0 invert"
                      width={200}
                      height={80}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8">
                    <Building2 className="w-16 h-16 text-white" />
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    {content.items[activeTestimonial].company}
                  </div>
                  <div className="text-lg opacity-90">
                    {content.items[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {content.items.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                activeTestimonial === index 
                  ? 'border-blue-500 shadow-lg scale-110' 
                  : 'border-gray-300 hover:border-blue-300 opacity-70 hover:opacity-100'
              }`}
            >
              {testimonial.avatar ? (
                <OptimizedImage 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  width={64}
                  height={64}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                activeTestimonial === index ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Mini Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Mini Avatar & Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {testimonial.avatar ? (
                    <OptimizedImage 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-blue-600 font-semibold">{testimonial.company}</div>
                </div>
              </div>
              
              {/* Short testimonial */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                "{testimonial.testimonial.substring(0, 100)}..."
              </p>
              
              {/* Result */}
              {testimonial.result && (
                <div className="mt-4 p-2 bg-green-50 rounded-lg">
                  <div className="text-xs font-bold text-green-800">
                    {testimonial.result}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
