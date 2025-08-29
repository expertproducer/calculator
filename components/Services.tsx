"use client"

import { Settings, Shield, Zap, FileText, BarChart3, CheckCircle, ArrowRight } from 'lucide-react'

interface ServicesProps {
  content: {
    title: string
    subtitle: string
    leadText: string
    sections: Array<{
      title: string
      content?: string[] | string
      items?: string[]
      steps?: string[]
      subsections?: Array<{
        title: string
        items: string[]
      }>
    }>
    packages: Array<{
      name: string
      description: string
    }>
    note: string
  }
}

// Функция для обработки markdown-подобного форматирования
const formatText = (text: string) => {
  // Заменяем **текст** на <strong>текст</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Заменяем `код` на <code>код</code>
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
}

export default function Services({ content }: ServicesProps) {

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Hero секция */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light mb-8">
            {content.subtitle}
          </p>
        </div>

        {/* Лид-абзац в рамке */}
        <div className="mb-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
              {content.leadText}
            </p>
          </div>
        </div>

        {/* Основные секции */}
        <div className="space-y-16">
          {content.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                {section.title}
              </h2>

                             {/* Контент секции */}
               {section.content && (
                 <div className="space-y-4 mb-6">
                   {Array.isArray(section.content) ? (
                     section.content.map((paragraph, pIndex) => (
                       <p 
                         key={pIndex} 
                         className="text-gray-700 dark:text-gray-300 leading-relaxed"
                         dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
                       />
                     ))
                   ) : (
                     <p 
                       className="text-gray-700 dark:text-gray-300 leading-relaxed"
                       dangerouslySetInnerHTML={{ __html: formatText(section.content) }}
                     />
                   )}
                 </div>
               )}

              {/* Подсекции */}
              {section.subsections && (
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  {section.subsections.map((subsection, subIndex) => {
                    const icons = [Settings, Shield, FileText]
                    const IconComponent = icons[subIndex % icons.length]
                    
                    return (
                      <div key={subIndex} className="bg-white/60 dark:bg-gray-900/60 border border-gray-200/40 dark:border-gray-700/40 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl">
                            <IconComponent className="text-blue-600 dark:text-blue-400" size={20} />
                          </div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {subsection.title}
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li 
                              key={itemIndex} 
                              className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: formatText(item) }}
                            />
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Шаги процесса */}
              {section.steps && (
                <div className="space-y-4">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-4 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {stepIndex + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Список элементов */}
              {section.items && (
                <div className="grid md:grid-cols-2 gap-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-gray-200/30 dark:border-gray-700/30">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <span 
                        className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatText(item) }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Service Packages */}
        <div className="mt-16 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Service Packages & Timeline Estimates
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {content.packages.map((pkg, pkgIndex) => {
              const colors = [
                'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20',
                'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20',
                'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20'
              ]
              
              return (
                <div key={pkgIndex} className={`p-6 rounded-2xl border ${colors[pkgIndex % colors.length]}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              )
            })}
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm italic">
            {content.note}
          </p>
        </div>



        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to fix your banner?
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span>Get free diagnostics</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
