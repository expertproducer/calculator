"use client"

import { ShieldCheck, Flame, Shield, AlertTriangle, Users, TrendingUp, CheckCircle, ArrowUp, ShoppingCart, Newspaper, Cloud, Clock } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import VideoBackground from './VideoBackground'

interface UnifiedHeroSectionProps {
  content: {
    hero: {
      title: string
      subtitle: string
      headline?: string
      headlineBlue?: string
      headlineGray?: string
      cta: {
        primary: string
        secondary: string
      }
      problem?: {
        title: string
        points: string[]
      }
      problemsDesc?: string
      solutionText?: string
    }
    urgency?: {
      title: string
      subtitle: string
      offer?: string
      deadline?: string
      discount?: string
      originalPrice?: string
      finalPrice?: string
    }
    whyImportant?: {
      title: string
      subtitle: string
      points: string[]
      description: string
      expertiseTitle?: string
    }
    benefits?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
      }>
    }
    platforms?: {
      title: string
      subtitle: string
      items: (string | { name: string; description: string })[]
      note?: string
    }
    cases?: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        description: string
        result: string
      }>
      cta?: string
    }
  }
  locale?: string
}

export default function UnifiedHeroSection({ content, locale = 'en' }: UnifiedHeroSectionProps) {
  const typeIcons = [ShoppingCart, Newspaper, Cloud]
  const benefitIcons = [Shield, AlertTriangle, Users, TrendingUp]
  const platformIcons = [CheckCircle, CheckCircle, CheckCircle, CheckCircle, CheckCircle, CheckCircle]

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Background */}
      <div className="relative h-screen overflow-hidden">
        <VideoBackground />
        
        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-16 mt-20 drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_40%)]">
              {content.hero.headline || 'Every Business Needs'} 
              <span className="text-blue-300 block drop-shadow-2xl [text-shadow:_3px_3px_6px_rgb(0_0_0_/_35%)]">{content.hero.headlineBlue || 'Cookie Compliance'}</span>
              <span className="text-gray-200 block text-5xl md:text-6xl lg:text-7xl font-black mt-6 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
                {content.hero.headlineGray || 'That Actually Works!'}
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-3xl md:text-4xl text-gray-200 leading-relaxed max-w-5xl mb-20 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)] font-black">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.hero.subtitle) }} />
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 mb-20">
              <a
                href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                <span className="relative z-10">{content.hero.cta.primary}</span>
              </a>
              
              <a
                href={locale === 'en' ? '/services' : `/${locale}/services`}
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-black text-2xl transform hover:scale-105 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]"
              >
                {content.hero.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Content Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          
                     {/* Problems Section */}
           {content.hero.problem && (
             <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8 hover:shadow-3xl transition-all duration-300">
               <div className="text-center mb-8">
                 <h2 className="text-4xl font-black text-gray-900 mb-4">{content.hero.problem.title}</h2>
                 <p className="text-xl text-gray-600">{content.hero.problemsDesc || 'We fix these problems quickly and professionally'}</p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-4">
                 {content.hero.problem.points.map((point, index) => (
                   <div key={index} className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                     <span className="text-red-600 font-black text-2xl">×</span>
                     <span className="text-gray-700 font-semibold">{point}</span>
                   </div>
                 ))}
               </div>
               
               <div className="text-center mt-6">
                 <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold">
                   <ShieldCheck className="w-5 h-5" />
                   <span>{content.hero.solutionText || 'We solve all these problems'}</span>
                 </div>
               </div>
             </div>
           )}

           {/* Four Sections Grid - 2x2 Layout */}
           <div className="grid lg:grid-cols-2 gap-8 mb-8">
             
                           {/* Why Important */}
                             {content.whyImportant && (
                 <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                   <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{content.whyImportant.title}</h3>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{content.whyImportant.subtitle}</p>
                   </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {content.whyImportant.points.map((point, index) => {
                      const IconComponent = benefitIcons[index % benefitIcons.length]
                      const colors = [
                        'bg-gradient-to-br from-blue-500 to-blue-600',
                        'bg-gradient-to-br from-green-500 to-green-600', 
                        'bg-gradient-to-br from-purple-500 to-purple-600',
                        'bg-gradient-to-br from-orange-500 to-orange-600'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 ${color} rounded-lg shadow-md flex-shrink-0`}>
                              <IconComponent className="text-white w-5 h-5 drop-shadow-sm" />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 font-semibold text-sm leading-relaxed">{point}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <div className="text-center">
                      <div className="inline-flex p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-3 shadow-lg">
                        <Shield className="text-white w-5 h-5 drop-shadow-lg" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{content.whyImportant.expertiseTitle || 'Our Expertise Makes the Difference'}</h4>
                      <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto">{content.whyImportant.description}</p>
                    </div>
                  </div>
                </div>
              )}

                           {/* Benefits */}
                             {content.benefits && (
                 <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                   <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{content.benefits.title}</h3>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{content.benefits.subtitle}</p>
                   </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {content.benefits.items.map((item, index) => {
                      const colors = [
                        'bg-gradient-to-br from-blue-500 to-blue-600',
                        'bg-gradient-to-br from-green-500 to-green-600',
                        'bg-gradient-to-br from-purple-500 to-purple-600',
                        'bg-gradient-to-br from-orange-500 to-orange-600',
                        'bg-gradient-to-br from-red-500 to-red-600',
                        'bg-gradient-to-br from-indigo-500 to-indigo-600',
                        'bg-gradient-to-br from-pink-500 to-pink-600',
                        'bg-gradient-to-br from-teal-500 to-teal-600',
                        'bg-gradient-to-br from-yellow-500 to-yellow-600'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          <div className="text-center">
                            <div className={`inline-flex p-3 ${color} rounded-xl shadow-md mb-3`}>
                              <CheckCircle className="text-white w-5 h-5 drop-shadow-sm" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h4>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

                           {/* Platforms */}
                             {content.platforms && (
                 <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                   <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{content.platforms.title}</h3>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{content.platforms.subtitle}</p>
                   </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {content.platforms.items.map((platform, index) => {
                      const platformName = typeof platform === 'string' ? platform : platform.name
                      const colors = [
                        'bg-gradient-to-br from-blue-500 to-blue-600',
                        'bg-gradient-to-br from-green-500 to-green-600',
                        'bg-gradient-to-br from-purple-500 to-purple-600',
                        'bg-gradient-to-br from-orange-500 to-orange-600',
                        'bg-gradient-to-br from-red-500 to-red-600',
                        'bg-gradient-to-br from-indigo-500 to-indigo-600',
                        'bg-gradient-to-br from-pink-500 to-pink-600',
                        'bg-gradient-to-br from-teal-500 to-teal-600',
                        'bg-gradient-to-br from-yellow-500 to-yellow-600'
                      ]
                      const color = colors[index % colors.length]
                      
                      return (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          <div className="text-center">
                            <div className={`inline-flex p-3 ${color} rounded-xl shadow-md mb-3`}>
                              <CheckCircle className="text-white w-5 h-5 drop-shadow-sm" />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 leading-tight">{platformName}</h4>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {content.platforms.note && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-200">
                        <CheckCircle className="text-gray-600 w-4 h-4" />
                        <p className="text-sm text-gray-600 font-medium">{content.platforms.note}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

                           {/* Case Studies */}
                             {content.cases && (
                 <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
                   <div className="text-center mb-6">
                     <h3 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{content.cases.title}</h3>
                     <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">{content.cases.subtitle}</p>
                   </div>
                  
                                                        <div className="space-y-4 mb-6">
                     {content.cases.items.map((caseItem, index) => {
                       const TypeIcon = typeIcons[index % typeIcons.length]
                       const colors = [
                         'bg-gradient-to-br from-purple-500 to-purple-600',
                         'bg-gradient-to-br from-blue-500 to-blue-600',
                         'bg-gradient-to-br from-orange-500 to-orange-600'
                       ]
                       const color = colors[index % colors.length]
                       
                       return (
                         <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300">
                           <div className="flex items-start gap-3 mb-3">
                             <div className={`p-2 ${color} rounded-lg shadow-md flex-shrink-0`}>
                               <TypeIcon className="text-white w-5 h-5 drop-shadow-sm" />
                             </div>
                             <div className="flex-1">
                               <h4 className="text-lg font-bold text-gray-900 mb-1 leading-tight">{caseItem.title}</h4>
                               <p className="text-gray-600 text-sm leading-relaxed">{caseItem.description}</p>
                             </div>
                           </div>
                           
                           <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
                             <div className="flex items-center gap-2 mb-1">
                               <div className="p-1.5 bg-gradient-to-br from-gray-500 to-gray-600 rounded-md shadow-md">
                                 <ArrowUp className="text-white w-3 h-3 drop-shadow-sm" />
                               </div>
                               <span className="font-bold text-gray-800 text-sm">Result</span>
                             </div>
                             <p className="text-gray-700 text-sm leading-relaxed font-medium">{caseItem.result}</p>
                           </div>
                         </div>
                       )
                     })}
                   </div>
                </div>
              )}
             
           </div>

           {/* Compact Bottom Section - Two narrow blocks in one row */}
           <div className="grid lg:grid-cols-2 gap-8 mb-8">
             
             {/* What You Get - Narrow Block */}
             <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 hover:shadow-3xl transition-all duration-300">
               <div className="text-center mb-6">
                 <h3 className="text-2xl font-black text-gray-900 mb-3">What You Get</h3>
               </div>
               
               <div className="space-y-3">
                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                   <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                     <Shield className="text-white w-4 h-4" />
                   </div>
                   <span className="text-gray-700 font-semibold text-sm">Express audit</span>
                 </div>
                 
                 <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                   <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                     <CheckCircle className="text-white w-4 h-4" />
                   </div>
                   <span className="text-gray-700 font-semibold text-sm">CMP recommendation</span>
                 </div>
                 
                 <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                   <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                     <ArrowUp className="text-white w-4 h-4" />
                   </div>
                   <span className="text-gray-700 font-semibold text-sm">Implementation plan</span>
                 </div>
                 
                 <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                   <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                     <TrendingUp className="text-white w-4 h-4" />
                   </div>
                   <span className="text-gray-700 font-semibold text-sm">Next steps</span>
                 </div>
               </div>
             </div>

                           {/* Don't Risk Fines - Narrow Block */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-3">Don't risk fines</h3>
                  <p className="text-sm mb-4">We make cookie consent clean and compliant</p>
                 
                 <div className="bg-white/10 rounded-xl p-4 mb-4">
                   <div className="text-xl font-bold mb-2">Express Compliance Check</div>
                   <div className="text-sm">
                     <span className="line-through opacity-75">$499</span>
                     <span className="ml-2 text-xl font-bold">$399</span>
                     <span className="ml-2 bg-white text-red-600 px-2 py-1 rounded-lg text-xs font-bold">
                       20% OFF
                     </span>
                   </div>
                 </div>
                 
                 <div className="flex items-center justify-center gap-2 text-xs font-bold mb-4">
                   <Clock className="w-3 h-3" />
                   <span>Offer expires: This week</span>
                 </div>
                 
                 <a
                   href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                   className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 text-sm"
                 >
                   <AlertTriangle className="w-4 h-4" />
                   <span>Claim Your Discount Now</span>
                 </a>
               </div>
             </div>
             
           </div>
        </div>
      </div>
    </div>
  )
}
