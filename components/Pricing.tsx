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
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '💰 Transparent Pricing'}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title || 'Pricing'}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle || 'Simple, transparent pricing. We charge only for implementation, you choose your CMP service plan.'}
          </p>
        </div>

        {/* Simple pricing explanation */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {content.howItWorksTitle || 'How Our Pricing Works'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            {content.howItWorksSubtitle || 'No hidden fees, no ongoing charges. Just transparent, one-time implementation costs.'}
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {content.implementationTitle || 'Implementation Fee Only'}
              </h3>
              <p className="text-gray-600">
                {content.implementationDesc || 'We charge only for our technical work: CMP setup, GTM integration, and configuration. No ongoing fees.'}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {content.chooseCmpTitle || 'Choose Your CMP'}
              </h3>
              <p className="text-gray-600">
                {content.chooseCmpDesc || 'You select and pay directly to your preferred CMP provider (Cookiebot, Iubenda, etc.).'}
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
              const colors = ['border-blue-200 bg-blue-50', 'border-gray-200 bg-gray-50', 'border-blue-200 bg-blue-50']
              const badgeColors = ['bg-blue-600', 'bg-gray-700', 'bg-blue-600']
              const popular = index === 1 // Pro plan is popular
              
              return (
                <div key={index} className={`p-6 ${popular ? 'border-2 border-blue-600' : 'border border-gray-200'} rounded-lg`}>
                  {popular && (
                    <div className="text-center mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature: string, fIndex: number) => (
                      <div key={fIndex} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Simple CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h3>
          
          <p className="text-gray-600 mb-6">
            {content.note}
          </p>
          
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Get Custom Quote
          </a>
        </div>
      </div>
    </section>
  )
}