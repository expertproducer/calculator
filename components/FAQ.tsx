'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Search, Shield, Calculator, Info, ChevronRight, CheckCircle, AlertCircle, Clock, Users, Zap, Settings, FileText, Star, ArrowRight } from 'lucide-react'

interface FAQProps {
  content: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
  }
}

export default function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Функция для определения категории вопроса по ключевым словам
  const getQuestionCategory = (question: string) => {
    const lowerQuestion = question.toLowerCase()
    
    // Compliance - GDPR, compliance, rules, regulations
    if (lowerQuestion.includes('gdpr') || lowerQuestion.includes('compliance') || lowerQuestion.includes('rules') || lowerQuestion.includes('regulations') || lowerQuestion.includes('cover')) {
      return { 
        icon: Shield, 
        color: 'green', 
        bg: 'bg-green-100/80 dark:bg-green-900/30', 
        textColor: 'text-green-600 dark:text-green-400',
        label: 'Compliance'
      }
    } 
    // Technical - implementation, setup, integration, deployment, data loss
    else if (lowerQuestion.includes('implementation') || lowerQuestion.includes('setup') || lowerQuestion.includes('integration') || lowerQuestion.includes('deployment') || lowerQuestion.includes('data loss') || lowerQuestion.includes('handle')) {
      return { 
        icon: Calculator, 
        color: 'blue', 
        bg: 'bg-blue-100/80 dark:bg-blue-900/30', 
        textColor: 'text-blue-600 dark:text-blue-400',
        label: 'Technical'
      }
    } 
    // Timeline - time, duration, how long, timeline
    else if (lowerQuestion.includes('time') || lowerQuestion.includes('duration') || lowerQuestion.includes('how long') || lowerQuestion.includes('timeline') || lowerQuestion.includes('take')) {
      return { 
        icon: Clock, 
        color: 'orange', 
        bg: 'bg-orange-100/80 dark:bg-orange-900/30', 
        textColor: 'text-orange-600 dark:text-orange-400',
        label: 'Timeline'
      }
    } 
    // Customization - customize, appearance, design, look, banner
    else if (lowerQuestion.includes('customize') || lowerQuestion.includes('appearance') || lowerQuestion.includes('design') || lowerQuestion.includes('look') || lowerQuestion.includes('banner')) {
      return { 
        icon: Settings, 
        color: 'purple', 
        bg: 'bg-purple-100/80 dark:bg-purple-900/30', 
        textColor: 'text-purple-600 dark:text-purple-400',
        label: 'Customization'
      }
    } 
    // Integration - analytics, google, tracking, gtm, consent mode, advanced, basic
    else if (lowerQuestion.includes('analytics') || lowerQuestion.includes('google') || lowerQuestion.includes('tracking') || lowerQuestion.includes('gtm') || lowerQuestion.includes('consent mode') || lowerQuestion.includes('difference between') || lowerQuestion.includes('advanced') || lowerQuestion.includes('basic') || lowerQuestion.includes('mode') || lowerQuestion.includes('consent')) {
      return { 
        icon: Zap, 
        color: 'yellow', 
        bg: 'bg-yellow-100/80 dark:bg-yellow-900/30', 
        textColor: 'text-yellow-600 dark:text-yellow-400',
        label: 'Integration'
      }
    } 
    // Legal - policy, legal, advice
    else if (lowerQuestion.includes('policy') || lowerQuestion.includes('legal') || lowerQuestion.includes('advice')) {
      return { 
        icon: FileText, 
        color: 'indigo', 
        bg: 'bg-indigo-100/80 dark:bg-indigo-900/30', 
        textColor: 'text-indigo-600 dark:text-indigo-400',
        label: 'Legal'
      }
    } 
    // General - остальные вопросы
    else {
      return { 
        icon: Info, 
        color: 'gray', 
        bg: 'bg-gray-100/80 dark:bg-gray-700/30', 
        textColor: 'text-gray-600 dark:text-gray-400',
        label: 'General'
      }
    }
  }

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full mb-6">
            <Star className="text-blue-600 dark:text-blue-400 w-4 h-4" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">FAQ Section</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Get answers to the most common questions about GDPR compliance and CMP implementation
          </p>
        </div>

        {/* Информационный блок */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl mb-4">
                <Search className="text-blue-600 dark:text-blue-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Why These Questions Matter
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Understanding the right questions helps you make informed decisions about your GDPR compliance strategy
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-xl">
                  <Shield className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Compliance
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Understanding GDPR requirements and avoiding penalties
                </p>
              </div>
              
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl">
                  <Calculator className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Implementation
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Technical setup and integration best practices
                </p>
              </div>
              
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl">
                  <Info className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Knowledge
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Making informed decisions about your CMP strategy
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                <strong>💡 Can't find your answer?</strong> Our team is ready to help with any specific questions about your GDPR compliance needs.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ аккордеон */}
        <div className="max-w-4xl mx-auto space-y-6">
          {content.items.map((item, index) => {
            const category = getQuestionCategory(item.question)
            const IconComponent = category.icon
            
            return (
              <div 
                key={index}
                className="group"
              >
                {/* Основная карточка вопроса */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-green-50/30 dark:hover:from-blue-900/20 dark:hover:to-green-900/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 ${category.bg} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                        <IconComponent className={`${category.textColor} flex-shrink-0`} size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4 leading-tight mb-3">
                          {item.question}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${category.bg} ${category.textColor} border border-current/20 shadow-sm`}>
                            {category.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Click to {openIndex === index ? 'hide' : 'expand'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl shadow-sm">
                          <ChevronUp className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-100/80 dark:bg-gray-700/30 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-200 dark:group-hover:from-blue-900/40 dark:group-hover:to-blue-800/40 transition-all duration-300 shadow-sm">
                          <ChevronDown className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" size={20} />
                        </div>
                      )}
                    </div>
                  </button>
                </div>
                
                {/* Раскрытый ответ */}
                {openIndex === index && (
                  <div className="mt-4 bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-lg shadow-sm">
                        <AlertCircle className="text-blue-600 dark:text-blue-400" size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                          Detailed Answer
                        </h4>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                            {item.answer}
                          </p>
                        </div>
                        <div className="mt-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-gray-200/30 dark:border-gray-700/30 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-yellow-100/80 dark:bg-yellow-900/30 rounded-lg">
                              <Star className="text-yellow-600 dark:text-yellow-400 w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Pro Tip:</strong> This information is based on current GDPR regulations and best practices. For specific implementation details, consider consulting with our compliance experts.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA секция */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
            <div className="inline-flex p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl mb-4">
              <HelpCircle className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our GDPR compliance experts are here to help you with any specific questions about your implementation.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>Contact Our Experts</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
