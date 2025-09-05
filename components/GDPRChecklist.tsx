'use client'

import { useState } from 'react'
import Container from './Container'
import { CheckCircle, Circle, AlertCircle, Target, TrendingUp } from 'lucide-react'

interface ChecklistItem {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

interface ChecklistContent {
  title: string
  subtitle: string
  progress: string
  completed: string
  categories: {
    legal: {
      title: string
      items: ChecklistItem[]
    }
    technical: {
      title: string
      items: ChecklistItem[]
    }
    organizational: {
      title: string
      items: ChecklistItem[]
    }
  }
  summary: {
    title: string
    score: string
    recommendations: {
      excellent: string
      good: string
      needsWork: string
      critical: string
    }
  }
  cta: {
    title: string
    description: string
    button: string
  }
}

interface GDPRChecklistProps {
  content: ChecklistContent
  locale: string
}

export default function GDPRChecklist({ content, locale }: GDPRChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const allItems = [
    ...content.categories.legal.items,
    ...content.categories.technical.items,
    ...content.categories.organizational.items
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
    return Math.round((checkedItems.size / allItems.length) * 100)
  }

  const getScoreLevel = () => {
    const percentage = getCompletionPercentage()
    if (percentage >= 90) return 'excellent'
    if (percentage >= 70) return 'good'
    if (percentage >= 50) return 'needsWork'
    return 'critical'
  }

  const getScoreColor = () => {
    const level = getScoreLevel()
    switch (level) {
      case 'excellent': return 'text-green-600 bg-green-50'
      case 'good': return 'text-blue-600 bg-blue-50'
      case 'needsWork': return 'text-yellow-600 bg-yellow-50'
      case 'critical': return 'text-red-600 bg-red-50'
    }
  }

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
    }
  }

  const renderCategory = (categoryKey: 'legal' | 'technical' | 'organizational') => {
    const category = content.categories[categoryKey]
    const categoryChecked = category.items.filter(item => checkedItems.has(item.id)).length
    const categoryPercentage = Math.round((categoryChecked / category.items.length) * 100)

    return (
      <div key={categoryKey} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">
              {categoryChecked}/{category.items.length}
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor()}`}>
              {categoryPercentage}%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {category.items.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                checkedItems.has(item.id)
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {checkedItems.has(item.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-medium ${
                      checkedItems.has(item.id) ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    checkedItems.has(item.id) ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto prose">{content.subtitle}</p>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{content.progress}</h3>
            <div className={`px-6 py-3 rounded-full text-lg font-bold ${getScoreColor()}`}>
              {getCompletionPercentage()}%
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionPercentage()}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{content.completed}: {checkedItems.size}/{allItems.length}</span>
            <span>{getCompletionPercentage()}% {content.summary.score}</span>
          </div>

          {/* Score Recommendation */}
          {checkedItems.size > 0 && (
            <div className={`mt-6 p-4 rounded-lg ${getScoreColor()}`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">{content.summary.title}</span>
              </div>
              <p>{content.summary.recommendations[getScoreLevel() as keyof typeof content.summary.recommendations]}</p>
            </div>
          )}
        </div>

        {/* Checklist Categories */}
        <div className="grid lg:grid-cols-1 gap-8 mb-8">
          {renderCategory('legal')}
          {renderCategory('technical')}
          {renderCategory('organizational')}
        </div>

        {/* CTA Section */}
        {getCompletionPercentage() < 100 && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">{content.cta.title}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{content.cta.description}</p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200"
            >
              {content.cta.button}
            </a>
          </div>
        )}
      </Container>
    </div>
  )
}
