"use client"

import { Settings, Shield, Zap, FileText, BarChart3, CheckCircle, ArrowRight, Star, Calculator, Clock, Code, Search, Check, Info, Briefcase, Users, Target, Award, TrendingUp } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface ServicesProps {
  content: {
    title: string
    subtitle: string
    leadText: string
    badge?: string
    approachTitle?: string
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
    packagesTitle?: string
    packagesSubtitle?: string
    ctaText?: string
  }
}

// Function to handle markdown-like formatting
const formatText = (text: string) => {
  // For single items (not paragraphs), just format the text directly
  if (!text.includes('\n\n') && text.length < 200) {
    // Replace **text** with <strong>text</strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
    console.log('formatText short:', { original: text, formatted })
    return formatted
  }
  
  // Split text into paragraphs and wrap each in <p> tags
  let paragraphs = text.split('\n\n').filter(p => p.trim())
  
  // If no paragraphs found, split by sentence length
  if (paragraphs.length <= 1) {
    const sentences = text.split('. ').filter(s => s.trim())
    paragraphs = []
    let currentParagraph = ''
    
    sentences.forEach((sentence, index) => {
      currentParagraph += sentence + (sentence.endsWith('.') ? '' : '. ')
      
      // Create new paragraph every 2-3 sentences or if paragraph is getting too long
      if ((index + 1) % 3 === 0 || currentParagraph.length > 300) {
        paragraphs.push(currentParagraph.trim())
        currentParagraph = ''
      }
    })
    
    // Add remaining text as last paragraph
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim())
    }
  }
  
  const formattedParagraphs = paragraphs.map(p => {
    // Replace **text** with <strong>text</strong>
    let formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
    console.log('formatText long:', { original: p, formatted })
    return `<p style="margin-bottom: 2rem; font-size: 1.25rem; font-weight: bold; color: #374151; line-height: 1.75;">${formatted}</p>`
  })
  return formattedParagraphs.join('')
}

export default function Services({ content }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="mx-auto w-full max-w-[1280px] px-5">
        
        {/* Header - Enhanced with better visual hierarchy */}
        <div className="text-center mb-20">
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title}
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 max-w-4xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            {content.subtitle}
          </p>
        </div>

        {/* Lead paragraph - Enhanced visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.approachTitle}
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed [&_p]:mb-8 [&_p]:last:mb-0 [&_p]:text-xl [&_p]:md:text-2xl [&_p]:font-bold [&_p]:text-gray-800 [&_p]:leading-relaxed [&_p]:block [&_p]:w-full [&_p]:drop-shadow-lg [&_p]:[text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              <div dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
            </div>
          </div>
        </div>

        {/* Main sections - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto space-y-12 mb-20">
          {content.sections.map((section, sectionIndex) => {
            const sectionIcons = [Search, Code, Settings, Shield, Zap, FileText]
            const SectionIcon = sectionIcons[sectionIndex % sectionIcons.length]
            const colors = [
              'from-blue-500 to-blue-600',
              'from-gray-600 to-gray-700', 
              'from-blue-600 to-blue-700',
              'from-gray-500 to-gray-600',
              'from-blue-700 to-blue-800',
              'from-gray-700 to-gray-800'
            ]
            
            return (
              <div key={sectionIndex} className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:scale-105">
                
                {/* Section header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-6">
                                          <div className={`p-4 bg-gradient-to-br ${colors[sectionIndex % colors.length]} rounded-2xl shadow-2xl`}>
                        <SectionIcon className="text-white w-7 h-7 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                      </div>
                                <h3 className="text-2xl font-bold text-gray-900 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {section.title}
            </h3>
                  </div>
                </div>
                
                {/* Section content */}
                <div className="p-8">
                  {/* Content paragraphs */}
                  {section.content && (
                    <div className="mb-8">
                      {Array.isArray(section.content) ? (
                        <div className="space-y-6">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                              <span dangerouslySetInnerHTML={{ __html: formatText(paragraph) }} />
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                          <span dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
                        </p>
                      )}
                    </div>
                  )}
                  
                  {/* Subsections */}
                  {section.subsections && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <h4 className="text-xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                            {subsection.title}
                          </h4>
                          <ul className="space-y-3">
                            {subsection.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="flex items-start gap-3">
                                <CheckCircle className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                                <span className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Items list */}
                  {section.items && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {section.items.map((item, itemIndex) => (
                                                  <div key={itemIndex} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          <CheckCircle className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                          <span className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" dangerouslySetInnerHTML={{ __html: formatText(item) }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Packages - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.packagesTitle || 'Service Packages'}
            </h2>
            <p className="text-lg font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.packagesSubtitle) }} />
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.packages.map((pkg, index) => {
              const packageColors = ['border-blue-200 bg-blue-50', 'border-gray-200 bg-gray-50', 'border-blue-200 bg-blue-50']
              const badgeColors = ['from-blue-500 to-blue-600', 'from-gray-600 to-gray-700', 'from-blue-600 to-blue-700']
              
              return (
                <div key={index} className={`p-8 rounded-2xl border-2 ${packageColors[index % packageColors.length]} hover:shadow-3xl transition-all duration-300 shadow-2xl transform hover:scale-105`}>
                  <div className={`inline-flex px-4 py-2 bg-gradient-to-r ${badgeColors[index % badgeColors.length]} text-white text-lg font-bold rounded-full mb-6 shadow-2xl drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]`}>
                    {pkg.name}
                  </div>
                  <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                    <span dangerouslySetInnerHTML={{ __html: formatSimpleText(pkg.description) }} />
                  </p>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg font-medium text-gray-600 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.note) }} />
            </p>
          </div>
        </div>

        {/* Enhanced CTA section with social proof */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              Ready to Get Started?
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText('Join **hundreds of businesses** that trust our services') }} />
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">500+</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Businesses Served</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">100%</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">Success Rate</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg transform hover:scale-105">
            <Briefcase className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            <span className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.ctaText}</span>
            <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}