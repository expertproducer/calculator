'use client'

import { useState } from 'react'
import { CheckCircle, Circle, Target, TrendingUp } from 'lucide-react'

interface CompactChecklistItem {
  id: string
  title: string
  priority: 'high' | 'medium' | 'low'
}

interface CompactChecklistContent {
  title: string
  subtitle: string
  progress: string
  completed: string
  getHelp: string
}

interface CompactGDPRChecklistProps {
  content: CompactChecklistContent
  locale: string
}

export default function CompactGDPRChecklist({ content, locale }: CompactGDPRChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const checklistItems: CompactChecklistItem[] = [
    { id: 'privacy-policy', title: 'Privacy Policy Updated', priority: 'high' },
    { id: 'legal-basis', title: 'Legal Basis Identified', priority: 'high' },
    { id: 'consent-mechanism', title: 'Valid Consent Mechanism', priority: 'high' },
    { id: 'cookie-banner', title: 'Compliant Cookie Banner', priority: 'high' },
    { id: 'script-blocking', title: 'Script Blocking Before Consent', priority: 'high' },
    { id: 'consent-logging', title: 'Consent Proof Logging', priority: 'high' },
    { id: 'data-encryption', title: 'Data Encryption', priority: 'medium' },
    { id: 'breach-procedures', title: 'Data Breach Procedures', priority: 'high' },
    { id: 'vendor-agreements', title: 'Vendor Data Agreements', priority: 'medium' },
    { id: 'subject-rights', title: 'Data Subject Rights Process', priority: 'high' },
    { id: 'staff-training', title: 'Staff GDPR Training', priority: 'medium' },
    { id: 'regular-audits', title: 'Regular Compliance Audits', priority: 'low' }
  ]

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedItems(newChecked)
  }

  const getCompletionPercentage = () => {
    return Math.round((checkedItems.size / checklistItems.length) * 100)
  }

  const getScoreColor = () => {
    const percentage = getCompletionPercentage()
    if (percentage >= 90) return 'text-green-600 bg-green-50'
    if (percentage >= 70) return 'text-blue-600 bg-blue-50'
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
    }
  }

  const getRecommendation = () => {
    const percentage = getCompletionPercentage()
    if (percentage >= 90) return "Excellent! Your GDPR compliance is comprehensive."
    if (percentage >= 70) return "Good progress! Address remaining items for full compliance."
    if (percentage >= 50) return "Your compliance needs improvement. Focus on high-priority items."
    return "Critical gaps detected. Immediate action required."
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
          <Target className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{content.title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{content.subtitle}</p>
      </div>

      {/* Progress Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{content.progress}</span>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor()}`}>
            {getCompletionPercentage()}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>

        <div className="text-xs text-gray-600 text-center">
          {content.completed}: {checkedItems.size}/{checklistItems.length}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
              checkedItems.has(item.id)
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-center gap-3">
              <div className="mt-0.5">
                {checkedItems.has(item.id) ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    checkedItems.has(item.id) ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      {checkedItems.size > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className={`p-3 rounded-lg ${getScoreColor()} mb-4`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Assessment</span>
            </div>
            <p className="text-xs">{getRecommendation()}</p>
          </div>

          <a
            href={`/${locale}/contact`}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            {content.getHelp}
          </a>
        </div>
      )}
    </div>
  )
}
