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
    <section id="services" className="relative py-24 bg-black">
      {/* Overlay для лучшей читаемости */}
      <div className="absolute inset-0 bg-black/10" style={{ zIndex: 5 }} />
      
      <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
        {/* Hero секция */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-primary-500/20 rounded-full mb-6 border border-primary-400/30">
            <span className="text-sm font-medium text-primary-400">Services Section</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6 tracking-tight drop-shadow-2xl">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle}
          </p>
        </div>

        {/* Лид-абзац в рамке */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white/8 backdrop-blur-md border border-white/15 rounded-[2rem] p-12 shadow-glass hover:shadow-apple-lg hover:bg-white/10 transition-all duration-700 hover:scale-[1.02]">
            <div className="text-center mb-12">
              <div className="inline-flex p-5 bg-gradient-to-br from-primary-500/25 to-primary-600/25 rounded-3xl mb-8 border border-primary-400/25 shadow-lg">
                <Shield className="text-primary-400 w-10 h-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
                Our Service Approach
              </h2>
              <p className="text-gray-200 text-xl max-w-3xl mx-auto leading-relaxed font-light">
                We provide comprehensive CMP implementation services with a focus on compliance and performance
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-3xl p-10 border border-gray-600/40 shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <p className="text-xl leading-[1.8] text-gray-50 text-center font-light tracking-wide">
                  <span dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Основные секции */}
        <div className="max-w-6xl mx-auto space-y-16 mb-20">
          {content.sections.map((section, sectionIndex) => {
            const sectionIcons = [Search, Code, Settings, Shield, Zap, FileText]
            const SectionIcon = sectionIcons[sectionIndex % sectionIcons.length]
            const sectionColors = [
              'from-primary-500/20 to-primary-600/20 border-primary-400/30',
              'from-green-500/20 to-green-600/20 border-green-400/30',
              'from-purple-500/20 to-purple-600/20 border-purple-400/30',
              'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30',
              'from-red-500/20 to-red-600/20 border-red-400/30',
              'from-indigo-500/20 to-indigo-600/20 border-indigo-400/30'
            ]
            const iconColors = [
              'text-primary-400',
              'text-green-400',
              'text-purple-400',
              'text-yellow-400',
              'text-red-400',
              'text-indigo-400'
            ]
            const sectionColor = sectionColors[sectionIndex % sectionColors.length]
            const iconColor = iconColors[sectionIndex % iconColors.length]
            
            return (
              <div key={sectionIndex} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-glass hover:shadow-apple-lg hover:border-white/20 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700/50">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${sectionColor} rounded-xl border`}>
                    <SectionIcon className={`${iconColor} w-6 h-6`} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
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
                          className="text-gray-200 leading-relaxed text-lg"
                          dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}
                        />
                      ))
                    ) : (
                      <p 
                        className="text-gray-200 leading-relaxed text-lg"
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
                        'bg-primary-500/10 border-primary-400/20',
                        'bg-green-500/10 border-green-400/20',
                        'bg-purple-500/10 border-purple-400/20'
                      ]
                      const subIconColors = [
                        'text-primary-400',
                        'text-green-400', 
                        'text-purple-400'
                      ]
                      const subColor = subColors[subIndex % subColors.length]
                      const subIconColor = subIconColors[subIndex % subIconColors.length]
                      
                      return (
                        <div key={subIndex} className={`${subColor} backdrop-blur-sm border rounded-2xl p-6 hover:shadow-md transition-all duration-300`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/10 rounded-xl">
                              <SubIcon className={`${subIconColor}`} size={20} />
                            </div>
                            <h3 className="font-semibold text-white text-lg">
                              {subsection.title}
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {subsection.items.map((item, itemIndex) => (
                              <li 
                                key={itemIndex} 
                                className="flex items-start gap-3 text-gray-200 leading-relaxed"
                              >
                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
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
                      <div key={stepIndex} className="flex items-start gap-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-sm">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-200 leading-relaxed">
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
                      <div key={itemIndex} className="flex items-start gap-3 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-gray-600/50 hover:shadow-sm transition-all duration-300">
                        <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                        <span 
                          className="text-gray-200 leading-relaxed"
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
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-glass">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl mb-4 border border-purple-400/20">
                <Briefcase className="text-purple-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Service Packages & Timeline Estimates
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose the package that best fits your implementation needs and timeline
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {content.packages.map((pkg, pkgIndex) => {
                const packageColors = [
                  'border-primary-400/30 bg-gradient-to-br from-primary-500/10 to-primary-600/10',
                  'border-green-400/30 bg-gradient-to-br from-green-500/10 to-green-600/10',
                  'border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-purple-600/10'
                ]
                const packageColor = packageColors[pkgIndex % packageColors.length]
                
                return (
                  <div key={pkgIndex} className={`p-6 rounded-2xl border ${packageColor} backdrop-blur-sm hover:shadow-md transition-all duration-300`}>
                    <h3 className="font-semibold text-white mb-3 text-lg">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-primary-500/20 rounded-xl mb-4 border border-primary-400/20">
                <Info className="text-primary-400 w-5 h-5" />
              </div>
              <p className="text-gray-300 text-sm italic">
                {content.note}
              </p>
            </div>
          </div>
        </div>

        {/* CTA секция */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto shadow-glass">
            <div className="inline-flex p-3 bg-primary-500/20 rounded-xl mb-4 border border-primary-400/20">
              <CheckCircle className="text-primary-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to fix your banner?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Let's start with a free consultation to understand your specific needs and create a tailored solution.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
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