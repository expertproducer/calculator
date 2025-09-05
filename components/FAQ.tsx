'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Search, Shield, Calculator, Info, ChevronRight, CheckCircle, AlertCircle, Clock, Users, Zap, Settings, FileText, Star, ArrowRight, Target } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface FAQProps {
  content: {
    title: string
    items: Array<{
      question: string
      answer: string
    }>
    whyQuestionsTitle?: string
    whyQuestionsDescription?: string
    complianceTitle?: string
    complianceDescription?: string
    implementationTitle?: string
    implementationDescription?: string
    knowledgeTitle?: string
    knowledgeDescription?: string
    cantFindAnswer?: string
    teamReadyToHelp?: string
  }
}

export default function FAQ({ content }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Function to determine question category by keywords
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
    // General - other questions
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
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="mx-auto w-full max-w-[1280px] px-5">
        
        {/* Header - Enhanced with better visual hierarchy */}
        <div className="text-center mb-20">
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title || 'Frequently Asked Questions'}
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 max-w-4xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            Get answers to the most common questions about GDPR compliance and CMP implementation
          </p>
        </div>

        {/* Information block - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.whyQuestionsTitle || 'Why These Questions Matter'}
            </h2>
            
            <p className="text-xl font-medium text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.whyQuestionsDescription || 'Understanding the right questions helps you make informed decisions about your GDPR compliance strategy'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 shadow-2xl">
                <Shield className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.complianceTitle || 'Compliance'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.complianceDescription || 'Understanding GDPR requirements and avoiding penalties'}
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="text-green-500 w-6 h-6" />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
                <Calculator className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.implementationTitle || 'Implementation'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.implementationDescription || 'Technical setup and integration best practices'}
              </p>
              <div className="mt-6 flex justify-center">
                <Settings className="text-blue-500 w-6 h-6" />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                <Info className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.knowledgeTitle || 'Knowledge'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.knowledgeDescription || 'Making informed decisions about your CMP strategy'}
              </p>
              <div className="mt-6 flex justify-center">
                <Star className="text-purple-500 w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 shadow-2xl">
              <Search className="text-blue-600 w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-blue-800 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              <strong>💡 {content.cantFindAnswer || "Can't find your answer?"}</strong> {content.teamReadyToHelp || 'Our team is ready to help with any specific questions about your GDPR compliance needs.'}
            </p>
          </div>
        </div>

        {/* FAQ accordion - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              Common Questions
            </h2>
            <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              Find answers to the most frequently asked questions about GDPR compliance
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
          {content.items.map((item, index) => {
            const category = getQuestionCategory(item.question)
            const IconComponent = category.icon
            
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-6">
                    {/* Question icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${category.color === 'green' ? 'from-green-500 to-green-600' : category.color === 'blue' ? 'from-blue-500 to-blue-600' : category.color === 'orange' ? 'from-orange-500 to-orange-600' : category.color === 'purple' ? 'from-purple-500 to-purple-600' : category.color === 'yellow' ? 'from-yellow-500 to-yellow-600' : category.color === 'indigo' ? 'from-indigo-500 to-indigo-600' : 'from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="text-white w-7 h-7" />
                      </div>
                    </div>
                    
                    {/* Question content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                        {item.question}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${category.color === 'green' ? 'bg-green-100 text-green-700' : category.color === 'blue' ? 'bg-blue-100 text-blue-700' : category.color === 'orange' ? 'bg-orange-100 text-orange-700' : category.color === 'purple' ? 'bg-purple-100 text-purple-700' : category.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : category.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'} border border-current/20 shadow-sm`}>
                          {category.label}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                          Click to {openIndex === index ? 'hide' : 'expand'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Toggle icon */}
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl">
                          <ChevronUp className="text-white w-6 h-6" />
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-100 rounded-xl shadow-2xl hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300">
                          <ChevronDown className="text-gray-500 w-6 h-6 hover:text-white transition-colors duration-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Expanded answer */}
                {openIndex === index && (
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-start gap-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl">
                        <AlertCircle className="text-white w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                          Detailed Answer
                        </h4>
                        <div className="text-lg font-medium text-gray-700 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)] mb-6">
                          {item.answer}
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-2xl">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-2xl">
                              <Star className="text-white w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-base font-medium text-gray-700 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
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
        </div>

        {/* Enhanced CTA section with social proof */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              Still Have Questions?
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              Our GDPR compliance experts are here to help you with any specific questions about your implementation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">500+</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Businesses Helped</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">24/7</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Expert Support</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg transform hover:scale-105">
            <HelpCircle className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            <span className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">Contact Our Experts</span>
            <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
