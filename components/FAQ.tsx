'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

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

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Answers to the most common questions about GDPR compliance
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {content.items.map((item, index) => (
            <div 
              key={index}
              className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="text-gray-500 dark:text-gray-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500 dark:text-gray-400" size={20} />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <div className="pt-6 pl-10">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
