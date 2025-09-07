import { Home, Star, Briefcase, Check, Info, Calculator, Shield, ArrowRight } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface PricingProps {
  content: {
    title: string
    subtitle?: string
    badge?: string
    howItWorksTitle?: string
    howItWorksSubtitle?: string
    implementationTitle?: string
    implementationDesc?: string
    chooseCmpTitle?: string
    chooseCmpDesc?: string
    transparentTitle?: string
    transparentDesc?: string
    flexibleTitle?: string
    flexibleDesc?: string
    whyModelTitle?: string
    whyModelDesc?: string
    packagesTitle?: string
    packagesSubtitle?: string
    plans: Array<{
      name: string
      features: string[]
    }>
    note: string
    ui?: {
      getStarted?: string
    }
  }
}

export default function Pricing({ content }: PricingProps) {
  // Safety check
  if (!content) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="mx-auto w-full max-w-[1280px] px-5">
        
        {/* Header - Enhanced with better visual hierarchy */}
        <div className="text-center mb-20">
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title || 'Transparent Pricing'}
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 max-w-4xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            {content.subtitle || 'Simple, transparent pricing. We charge only for implementation, you choose your CMP service plan.'}
          </p>
        </div>

        {/* Simple pricing explanation - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.howItWorksTitle || 'How Our Pricing Works'}
            </h2>
            
            <p className="text-xl font-medium text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.howItWorksSubtitle || 'No hidden fees, no ongoing charges. Just transparent, one-time implementation costs.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
                <Calculator className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.implementationTitle || 'Implementation Fee Only'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.implementationDesc || 'We charge only for our technical work: CMP setup, GTM integration, and configuration. No ongoing fees.'}
              </p>
              <div className="mt-6 flex justify-center">
                <Check className="text-blue-500 w-6 h-6" />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-2xl">
                <Shield className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.chooseCmpTitle || 'Choose Your CMP'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.chooseCmpDesc || 'You select and pay directly to your preferred CMP provider (Cookiebot, Iubenda, etc.).'}
              </p>
              <div className="mt-6 flex justify-center">
                <Star className="text-green-500 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing plans - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.packagesTitle || 'Implementation Packages'}
            </h2>
            <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.packagesSubtitle || 'Choose the right level of service for your business'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {content.plans.map((plan: any, index: number) => {
              const icons = [Home, Star, Briefcase]
              const IconComponent = icons[index % icons.length]
              const colors = ['from-blue-500 to-blue-600', 'from-gray-600 to-gray-700', 'from-blue-600 to-blue-700']
              const popular = index === 1 // Pro plan is popular
              
              return (
                <div key={index} className={`bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105 ${popular ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}>
                  {popular && (
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-2xl">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-gradient-to-br rounded-2xl mb-6 shadow-2xl" style={{ background: `linear-gradient(135deg, ${colors[index % colors.length].split(' ')[1]}, ${colors[index % colors.length].split(' ')[3]})` }}>
                      <IconComponent className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature: string, fIndex: number) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-1 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-2xl">
                          <Check className="text-white w-4 h-4" />
                        </div>
                        <span className="text-lg font-medium text-gray-700 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                    {content.ui?.getStarted || 'Get Started'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Enhanced CTA section with social proof */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.ui?.customSolutionTitle || 'Need a Custom Solution?'}
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              {content.note}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Calculator className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.ui?.statsCustomLeft || 'Custom'}</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.ui?.statsCustomRight || 'Pricing'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.ui?.statsTransparentLeft || '100%'}</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.ui?.statsTransparentRight || 'Transparent'}</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg transform hover:scale-105">
            <Info className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            <span className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.ui?.getCustomQuote || 'Get Custom Quote'}</span>
            <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}