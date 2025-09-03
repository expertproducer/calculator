'use client'

import { useState, useEffect } from 'react'
import { Calculator, CheckCircle, Euro, ArrowRight } from 'lucide-react'

interface Service {
  id: string
  name: string
  price: number
  category: 'audit' | 'consulting' | 'implementation' | 'ongoing'
}

interface CompactCalculatorContent {
  title: string
  subtitle: string
  total: string
  contact: string
}

interface CompactServiceCalculatorProps {
  content: CompactCalculatorContent
}

export default function CompactServiceCalculator({ content }: CompactServiceCalculatorProps) {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [total, setTotal] = useState(0)

  const allServices: Service[] = [
    { id: 'gdpr-audit', name: 'GDPR/Cookie Audit', price: 100, category: 'audit' },
    { id: 'monthly-monitoring', name: 'Monthly Monitoring', price: 50, category: 'ongoing' },
    { id: 'fix-recommendations', name: 'Fix Recommendations', price: 100, category: 'consulting' },
    { id: 'cmp-selection', name: 'CMP Selection', price: 50, category: 'consulting' },
    { id: 'staff-training', name: 'Staff Training', price: 200, category: 'consulting' },
    { id: 'legal-consultation', name: 'Legal Consultation', price: 150, category: 'consulting' },
    { id: 'cmp-installation', name: 'CMP Installation', price: 200, category: 'implementation' },
    { id: 'consent-mode', name: 'Consent Mode Setup', price: 200, category: 'implementation' },
    { id: 'policy-creation', name: 'Policy Creation', price: 100, category: 'implementation' }
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audit': return 'bg-blue-500'
      case 'consulting': return 'bg-green-500'
      case 'implementation': return 'bg-purple-500'
      case 'ongoing': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h3>
        <p className="text-sm text-gray-600">{content.subtitle}</p>
      </div>

      <div className="space-y-2 mb-6">
        {allServices.map((service) => (
          <div
            key={service.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              selectedServices.has(service.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {selectedServices.has(service.id) ? (
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  )}
                  <div className={`w-2 h-2 rounded-full ${getCategoryColor(service.category)}`}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{service.name}</span>
              </div>
              <div className="text-sm font-bold text-gray-900">€{service.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      {selectedServices.size > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-900">{content.total}</span>
            <div className="flex items-center gap-2">
              <Euro className="w-5 h-5 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">{total}</span>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
            {content.contact}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
