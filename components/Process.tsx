import { Search, Ruler, Laptop, Paintbrush, TestTube, ArrowRight, Star, Shield, Calculator, Clock, Zap, Settings, FileText, Info, HelpCircle, Code, CheckCircle, Users, Target, Award, TrendingUp } from 'lucide-react'

interface ProcessProps {
  content: {
    title: string
    subtitle?: string
    leadText?: string
    badge?: string
    methodologyTitle?: string
    methodologySubtitle?: string
    whyWorksTitle?: string
    whyWorksSubtitle?: string
    systematicTitle?: string
    systematicDesc?: string
    efficientTitle?: string
    efficientDesc?: string
    compliantTitle?: string
    compliantDesc?: string
    ctaText?: string
    stepsTitle?: string
    steps: Array<{
      title: string
      description: string
    }> | string[]
    ui?: {
      readyTitle?: string
      readySubtitle?: string
      statsBusinesses?: string
      statsSupport?: string
    }
  }
}

// Function to handle markdown-like formatting
const formatText = (text: string) => {
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
    return `<p style="margin-bottom: 2rem; font-size: 1.25rem; font-weight: bold; color: #374151; line-height: 1.75;">${formatted}</p>`
  })
  return formattedParagraphs.join('')
}

export default function Process({ content }: ProcessProps) {
  // Safety check
  if (!content) {
    return null
  }

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
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

        {/* Process benefits - Enhanced with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.whyWorksTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-2xl">
                <Calculator className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.systematicTitle}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.systematicDesc}
              </p>
              <div className="mt-6 flex justify-center">
                <CheckCircle className="text-green-500 w-6 h-6" />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl mb-6 shadow-2xl">
                <Clock className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.efficientTitle}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.efficientDesc || 'Optimized workflow saves time and resources'}
              </p>
              <div className="mt-6 flex justify-center">
                <TrendingUp className="text-blue-500 w-6 h-6" />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-2xl">
                <Shield className="text-white w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.compliantTitle || 'Compliant'}
              </h3>
              <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.compliantDesc || 'Ensures full GDPR and privacy law compliance'}
              </p>
              <div className="mt-6 flex justify-center">
                <Award className="text-yellow-500 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Lead paragraph - Enhanced visual design */}
        {content.leadText && (
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
                {content.methodologyTitle || 'Our Implementation Methodology'}
              </h2>
              
              <p className="text-xl font-medium text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.methodologySubtitle || 'Designed to minimize business disruption while ensuring comprehensive GDPR compliance'}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed [&_p]:mb-8 [&_p]:last:mb-0 [&_p]:text-xl [&_p]:md:text-2xl [&_p]:font-bold [&_p]:text-gray-800 [&_p]:leading-relaxed [&_p]:block [&_p]:w-full [&_p]:drop-shadow-lg [&_p]:[text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                <div dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
              </div>
            </div>
          </div>
        )}

        {/* Process steps - Enhanced timeline with better visual design */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight drop-shadow-xl [text-shadow:_2px_2px_3px_rgb(0_0_0_/_25%)]">
              {content.stepsTitle || 'Implementation Steps'}
            </h2>
            <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              Follow our proven methodology for guaranteed success
            </p>
          </div>
          
          <div className="space-y-8 max-w-5xl mx-auto">
            {Array.isArray(content.steps) && content.steps.length > 0 && 
             typeof content.steps[0] === 'object' ? (
              // Handle object steps
              (content.steps as Array<{title: string, description: string}>).map((step, index) => {
                // Select icon based on step meaning
                const stepIcons = [Search, Code, Settings, Zap, TestTube]
                const IconComponent = stepIcons[index % stepIcons.length]
                const colors = ['from-blue-500 to-blue-600', 'from-gray-600 to-gray-700', 'from-blue-600 to-blue-700', 'from-gray-500 to-gray-600', 'from-blue-700 to-blue-800']
                
                return (
                  <div key={index} className="flex items-start gap-8 bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                    {/* Step icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors[index % colors.length]} rounded-xl flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="text-white w-7 h-7" />
                      </div>
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                        {step.title}
                      </h3>
                      <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              // Handle string steps (fallback)
              (content.steps as string[]).map((step, index) => {
                const stepIcons = [Search, Code, Settings, Zap, TestTube]
                const IconComponent = stepIcons[index % stepIcons.length]
                const colors = ['from-blue-500 to-blue-600', 'from-gray-600 to-gray-700', 'from-blue-600 to-blue-700', 'from-gray-500 to-gray-600', 'from-blue-700 to-blue-800']
                
                return (
                  <div key={index} className="flex items-start gap-8 bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 bg-gradient-to-br ${colors[index % colors.length]} rounded-xl flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="text-white w-7 h-7" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-600 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Enhanced CTA section with social proof */}
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.ui?.readyTitle || 'Ready to Get Started?'}
            </h3>
            <p className="text-lg font-medium text-gray-600 mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              {content.ui?.readySubtitle || 'Join hundreds of businesses that trust our proven process'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">500+</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.ui?.statsBusinesses || 'Businesses Served'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Target className="w-5 h-5 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]" />
              <span className="font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">100%</span>
              <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.ui?.statsSupport || 'Success Rate'}</span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg transform hover:scale-105">
            <Settings className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            <span className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.ctaText || 'Start Your Implementation'}</span>
            <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}