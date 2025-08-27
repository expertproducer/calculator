'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  content: {
    title: string
    subtitle?: string
    items: FAQItem[]
  }
}

export default function FAQ({ content }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleItem(index)
    }
  }

  // FAQPage Schema.org JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.items.map((item, index) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section 
      id="faq" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="faq-title"
    >
      {/* FAQPage Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            id="faq-title"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {content.items.map((item: FAQItem, index: number) => {
            const isOpen = openItems.has(index)
            
            return (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  aria-describedby={`faq-question-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <HelpCircle 
                        className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" 
                        size={24} 
                        aria-hidden="true"
                      />
                      <div className="flex-1">
                        <h3 
                          id={`faq-question-${index}`}
                          className="text-xl font-semibold text-gray-900 dark:text-white text-left leading-relaxed"
                        >
                          {item.question}
                        </h3>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp 
                          className="text-gray-500 dark:text-gray-400 transition-transform duration-200" 
                          size={24} 
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDown 
                          className="text-gray-500 dark:text-gray-400 transition-transform duration-200" 
                          size={24} 
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`px-6 pb-6 transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="pl-10">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mb-6">
              Свяжитесь с нами, и мы с радостью поможем вам с любыми вопросами 
              по GDPR-совместимости и настройке CMP.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Перейти к форме контакта"
            >
              Задать вопрос
              <ChevronDown size={20} className="animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
