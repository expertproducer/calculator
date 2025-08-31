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

// Function to handle markdown-like formatting
const formatText = (text: string) => {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    .replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
}

export default function Services({ content }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero section - StoryBrand style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            ⚙️ Our Services
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Lead paragraph - StoryBrand style */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-6">
                <Shield className="text-white w-8 h-8" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Approach
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 text-center">
              <div dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
            </div>
          </div>
        </div>

        {/* Main sections - Clean StoryBrand cards */}
        <div className="max-w-6xl mx-auto space-y-12 mb-20">
          {content.sections.map((section, sectionIndex) => {
            const sectionIcons = [Search, Code, Settings, Shield, Zap, FileText]
            const SectionIcon = sectionIcons[sectionIndex % sectionIcons.length]
            const colors = [
              'bg-blue-600',
              'bg-green-600', 
              'bg-purple-600',
              'bg-orange-600',
              'bg-red-600',
              'bg-indigo-600'
            ]
            
            return (
              <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                
                {/* Section header */}
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 ${colors[sectionIndex % colors.length]} rounded-xl`}>
                      <SectionIcon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                </div>
                
                {/* Section content */}
                <div className="p-8">
                  {/* Content paragraphs */}
                  {section.content && (
                    <div className="mb-6">
                      {Array.isArray(section.content) ? (
                        <div className="space-y-4">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-gray-700 leading-relaxed">
                              <span dangerouslySetInnerHTML={{ __html: formatText(paragraph) }} />
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">
                          <span dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Subsections */}
                  {section.subsections && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            {subsection.title}
                          </h4>
                          <ul className="space-y-2">
                            {subsection.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <CheckCircle className="text-green-600 w-4 h-4 mt-1 flex-shrink-0" />
                                <span className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Items list */}
                  {section.items && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                          <CheckCircle className="text-green-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Packages - StoryBrand style */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-xl text-gray-600">
              Choose the right solution for your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {content.packages.map((pkg, index) => {
              const packageColors = ['border-blue-200 bg-blue-50', 'border-green-200 bg-green-50', 'border-purple-200 bg-purple-50']
              const badgeColors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600']
              
              return (
                <div key={index} className={`p-6 rounded-2xl border-2 ${packageColors[index % packageColors.length]} hover:shadow-lg transition-all duration-300`}>
                  <div className={`inline-flex px-3 py-1 ${badgeColors[index % badgeColors.length]} text-white text-sm font-semibold rounded-full mb-4`}>
                    {pkg.name}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              {content.note}
            </p>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Ready to get started?</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}