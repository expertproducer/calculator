import { Home, Star, Briefcase, Check, Info, Calculator, Shield, ArrowRight } from 'lucide-react'

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
  }
}

export default function Pricing({ content }: PricingProps) {
  // Safety check
  if (!content) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - StoryBrand style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '💰 Transparent Pricing'}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title || 'Pricing'}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle || 'Simple, transparent pricing. We charge only for implementation, you choose your CMP service plan.'}
          </p>
        </div>

        {/* Pricing explanation */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-6">
                <Calculator className="text-white w-8 h-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {content.howItWorksTitle || 'How Our Pricing Works'}
              </h2>
              
              <p className="text-lg text-gray-600">
                {content.howItWorksSubtitle || 'No hidden fees, no ongoing charges. Just transparent, one-time implementation costs.'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600 rounded-xl flex-shrink-0">
                    <Check className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.implementationTitle || 'Implementation Fee Only'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {content.implementationDesc || 'We charge only for our technical work: CMP setup, GTM integration, and configuration. No ongoing fees.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl flex-shrink-0">
                    <Shield className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.chooseCmpTitle || 'Choose Your CMP'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {content.chooseCmpDesc || 'You select and pay directly to your preferred CMP provider (Cookiebot, Iubenda, etc.).'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600 rounded-xl flex-shrink-0">
                    <Info className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.transparentTitle || 'Transparent Costs'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {content.transparentDesc || 'Everything included in one price. No surprises, no additional charges later.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-600 rounded-xl flex-shrink-0">
                    <Star className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.flexibleTitle || 'Flexible Options'}</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {content.flexibleDesc || 'Choose Basic, Pro, or Business implementation based on your needs.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-blue-800 text-center text-lg">
                <strong>{content.whyModelTitle || 'Why this model?'}</strong> {content.whyModelDesc || 'It gives you full control over your CMP costs while ensuring professional implementation quality. Pay us once for setup, then manage your CMP subscription directly.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Pricing plans - StoryBrand cards */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.packagesTitle || 'Implementation Packages'}
            </h2>
            <p className="text-xl text-gray-600">
              {content.packagesSubtitle || 'Choose the right level of service for your business'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.plans.map((plan: any, index: number) => {
              const icons = [Home, Star, Briefcase]
              const IconComponent = icons[index % icons.length]
              const colors = ['border-blue-200 bg-blue-50', 'border-green-200 bg-green-50', 'border-purple-200 bg-purple-50']
              const badgeColors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600']
              const popular = index === 1 // Pro plan is popular
              
              return (
                <div 
                  key={index} 
                  className={`relative p-8 rounded-2xl border-2 ${colors[index]} hover:shadow-lg transition-all duration-300 ${popular ? 'scale-105 shadow-lg' : ''}`}
                >
                  {popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 ${badgeColors[index]} rounded-2xl mb-4`}>
                      <IconComponent className="text-white w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature: string, fIndex: number) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <Check className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className={`w-full py-3 px-6 ${badgeColors[index]} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2`}>
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Additional information */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {content.note}
            </p>
            
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Get Custom Quote</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}