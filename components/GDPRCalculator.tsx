'use client'

import { useState, useEffect } from 'react'
import { Calculator, CheckCircle, Euro, ArrowRight } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  price: number
  category: 'audit' | 'consulting' | 'implementation' | 'ongoing'
}

interface CalculatorContent {
  title: string
  subtitle: string
  services: {
    audit: {
      title: string
      items: Service[]
    }
    consulting: {
      title: string
      items: Service[]
    }
    implementation: {
      title: string
      items: Service[]
    }
    ongoing: {
      title: string
      items: Service[]
    }
  }
  results: {
    title: string
    total: string
    selected: string
    recommendation: string
    contact: string
  }
  calculate: string
}

interface ServiceCalculatorProps {
  content: CalculatorContent
}

export default function ServiceCalculator({ content }: ServiceCalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [total, setTotal] = useState(0)

  const allServices: Service[] = [
    // Audit Services
    { id: 'gdpr-audit', name: 'GDPR/Cookie Site Audit', description: 'Check cookie/tracker loading before consent, CMP presence, Cookie/Privacy Policy analysis, script scanning. Result — PDF report with violations.', price: 100, category: 'audit' },
    { id: 'monthly-monitoring', name: 'Monthly Monitoring', description: 'Automatic site scan + report once a month. Subscription.', price: 50, category: 'ongoing' },
    
    // Consulting Services  
    { id: 'fix-recommendations', name: 'Fix Recommendations', description: 'Document with step list: what to change in policy, which CMPs are suitable, which scripts to block.', price: 100, category: 'consulting' },
    { id: 'cmp-selection', name: 'CMP Selection for Client', description: 'Comparison of Cookiebot / Usercentrics / Iubenda / Termly, license cost calculation.', price: 50, category: 'consulting' },
    { id: 'staff-training', name: 'Staff Training', description: 'Workshop 1-2 hours (Zoom): how to work with consent logs, CMP and GTM.', price: 200, category: 'consulting' },
    { id: 'legal-consultation', name: 'Basic Legal Consultation', description: 'Analysis and translation of GDPR language to understandable, Cookie/Privacy Policy check, text recommendations.', price: 150, category: 'consulting' },
    
    // Implementation Services
    { id: 'cmp-installation', name: 'CMP Installation (via GTM)', description: 'Connect Cookiebot/Iubenda/Usercentrics, configure banner. Without website code intervention.', price: 200, category: 'implementation' },
    { id: 'consent-mode', name: 'Consent Mode Setup (Google)', description: 'Configure Consent Mode via GTM, correct Google Analytics/Ads operation considering consents.', price: 200, category: 'implementation' },
    { id: 'policy-creation', name: 'Cookie/Privacy Policy Creation', description: 'Text based on templates + adaptation to client business.', price: 100, category: 'implementation' }
  ]

  const toggleService = (serviceId: string) => {
    const newSelected = new Set(selectedServices)
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId)
    } else {
      newSelected.add(serviceId)
    }
    setSelectedServices(newSelected)
  }

  useEffect(() => {
    const newTotal = allServices
      .filter(service => selectedServices.has(service.id))
      .reduce((sum, service) => sum + service.price, 0)
    setTotal(newTotal)
  }, [selectedServices])

  const formatPrice = (price: number) => {
    return `€${price}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audit': return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'consulting': return 'bg-green-50 border-green-200 text-green-800'
      case 'implementation': return 'bg-purple-50 border-purple-200 text-purple-800'
      case 'ongoing': return 'bg-orange-50 border-orange-200 text-orange-800'
      default: return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'audit': return content.services.audit.title
      case 'consulting': return content.services.consulting.title
      case 'implementation': return content.services.implementation.title
      case 'ongoing': return content.services.ongoing.title
      default: return category
    }
  }

  const renderServicesByCategory = (category: 'audit' | 'consulting' | 'implementation' | 'ongoing') => {
    const categoryServices = allServices.filter(service => service.category === category)
    
    return (
      <div key={category} className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${category === 'audit' ? 'bg-blue-500' : category === 'consulting' ? 'bg-green-500' : category === 'implementation' ? 'bg-purple-500' : 'bg-orange-500'}`}></div>
          {getCategoryTitle(category)}
        </h4>
        <div className="space-y-3">
          {categoryServices.map((service) => (
            <div
              key={service.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedServices.has(service.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => toggleService(service.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">
                    {selectedServices.has(service.id) ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-900">{service.name}</h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(service.category)}`}>
                        {getCategoryTitle(service.category)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-gray-900">{formatPrice(service.price)}</div>
                  {service.category === 'ongoing' && (
                    <div className="text-xs text-gray-500">per month</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <Calculator className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{content.title}</h3>
        <p className="text-gray-600">{content.subtitle}</p>
      </div>

      <div className="space-y-8">
        {/* Services Selection */}
        {renderServicesByCategory('audit')}
        {renderServicesByCategory('consulting')}
        {renderServicesByCategory('implementation')}
        {renderServicesByCategory('ongoing')}

        {/* Results */}
        {selectedServices.size > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{content.results.title}</h4>
              <div className="flex items-center gap-2">
                <Euro className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{total}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              {content.results.selected}: {selectedServices.size} {selectedServices.size === 1 ? 'service' : 'services'}
            </div>

            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">{content.results.recommendation}</div>
              <div className="text-gray-600 text-sm">
                {selectedServices.size >= 3 
                  ? "Great choice! This comprehensive package will ensure full GDPR compliance."
                  : selectedServices.size >= 2 
                  ? "Good selection! Consider adding an audit service for complete coverage."
                  : "Consider adding more services for comprehensive GDPR compliance."
                }
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
              {content.results.contact}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
