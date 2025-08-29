"use client"

import { Settings, Shield, Zap, FileText, BarChart3, CheckCircle, ArrowRight, Star, Calculator, Clock, Code, Search, Check, Info, Briefcase } from 'lucide-react'

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
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Hero секция */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full mb-6">
            <Star className="text-blue-600 dark:text-blue-400 w-4 h-4" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Services Section</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle}
          </p>
        </div>

        {/* Лид-абзац в рамке */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl mb-4">
                <Shield className="text-blue-600 dark:text-blue-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Service Approach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We provide comprehensive CMP implementation services with a focus on compliance and performance
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                <span dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
              </p>
            </div>
          </div>
        </div>

        {/* Основные секции */}
        <div className="max-w-6xl mx-auto space-y-16 mb-20">
          {content.sections.map((section, sectionIndex) => {
            const sectionIcons = [Search, Code, Settings, Shield, Zap, FileText]
            const SectionIcon = sectionIcons[sectionIndex % sectionIcons.length]
            const sectionColors = [
              'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40',
              'from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40',
              'from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40',
              'from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40'
            ]
            const sectionColor = sectionColors[sectionIndex % sectionColors.length]
            
            return (
              <div key={sectionIndex} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${sectionColor} rounded-xl`}>
                    <SectionIcon className="text-gray-700 dark:text-gray-300 w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                {/* Контент секции */}
                {section.content && (
                  <div className="space-y-4 mb-8">
                    {Array.isArray(section.content) ? (
                      section.content.map((paragraph, pIndex) => (
                        <p 
                          key={pIndex} 
                          className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                          dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
                        />
                      ))
                    ) : (
                      <p 
                        className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: formatText(section.content) }}
                      />
                    )}
                  </div>
                )}

                {/* Подсекции */}
                {section.subsections && (
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {section.subsections.map((subsection, subIndex) => {
                      const subIcons = [Settings, Shield, FileText, Code, Search, Zap]
                      const SubIcon = subIcons[subIndex % subIcons.length]
                      const subColors = [
                        'bg-blue-100/80 dark:bg-blue-900/30',
                        'bg-green-100/80 dark:bg-green-900/30',
                        'bg-purple-100/80 dark:bg-purple-900/30'
                      ]
                      const subColor = subColors[subIndex % subColors.length]
                      
                      return (
                        <div key={subIndex} className="bg-white/80 dark:bg-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 ${subColor} rounded-xl`}>
                              <SubIcon className="text-gray-700 dark:text-gray-300" size={20} />
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {subsection.title}
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {subsection.items.map((item, itemIndex) => (
                              <li 
                                key={itemIndex} 
                                className="flex items-start gap-3 text-gray-600 dark:text-gray-400 leading-relaxed"
                              >
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={16} />
                                <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                              </li>
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
                      <div key={stepIndex} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-green-50/50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-200/30 dark:border-blue-700/30">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-sm">
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
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-900/20 dark:to-blue-900/20 rounded-xl border border-gray-200/30 dark:border-gray-700/30 hover:shadow-sm transition-all duration-300">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={18} />
                        <span 
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatText(item) }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Service Packages */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl mb-4">
                <Briefcase className="text-purple-600 dark:text-purple-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Packages & Timeline Estimates
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the package that best fits your implementation needs and timeline
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {content.packages.map((pkg, pkgIndex) => {
                const packageColors = [
                  'border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20',
                  'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-900/20 dark:to-green-800/20',
                  'border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20'
                ]
                const packageColor = packageColors[pkgIndex % packageColors.length]
                
                return (
                  <div key={pkgIndex} className={`p-6 rounded-2xl border ${packageColor} hover:shadow-md transition-all duration-300`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl mb-4">
                <Info className="text-blue-600 dark:text-blue-400 w-5 h-5" />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                {content.note}
              </p>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
            <div className="inline-flex p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl mb-4">
              <CheckCircle className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
              Ready to fix your banner?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Let's start with a free consultation to understand your specific needs and create a tailored solution.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>Get free diagnostics</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
