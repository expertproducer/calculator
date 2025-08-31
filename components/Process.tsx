import { Search, Ruler, Laptop, Paintbrush, TestTube, ArrowRight, Star, Shield, Calculator, Clock, Zap, Settings, FileText, Info, HelpCircle, Code } from 'lucide-react'

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
  }
}

// Function to handle markdown-like formatting
const formatText = (text: string) => {
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Replace `code` with <code>code</code>
    .replace(/`([^`]+)`/g, '<code class="bg-blue-100 px-2 py-1 rounded text-sm font-mono text-blue-800">$1</code>')
}

export default function Process({ content }: ProcessProps) {
  // Safety check
  if (!content) {
    return null
  }

  return (
    <section id="process" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Clean style */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title || 'Our Process'}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            {content.subtitle || 'Our proven 5-step process ensures seamless CMP deployment with minimal disruption'}
          </p>
        </div>

        {/* Process benefits - Moved to top */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              {content.whyWorksTitle || 'Why Our Process Works'}
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              {content.whyWorksSubtitle || 'Structured approach that guarantees success and compliance'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-4">
                <Calculator className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {content.systematicTitle || 'Systematic'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.systematicDesc || 'Step-by-step approach ensures nothing is missed'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 bg-gray-700 rounded-2xl mb-4">
                <Clock className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {content.efficientTitle || 'Efficient'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.efficientDesc || 'Optimized workflow saves time and resources'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 bg-blue-700 rounded-2xl mb-4">
                <Shield className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {content.compliantTitle || 'Compliant'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content.compliantDesc || 'Ensures full GDPR and privacy law compliance'}
              </p>
            </div>
          </div>
        </div>

        {/* Lead paragraph - Clean text */}
        {content.leadText && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
                {content.methodologyTitle || 'Our Implementation Methodology'}
              </h2>
              
              <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                {content.methodologySubtitle || 'Designed to minimize business disruption while ensuring comprehensive GDPR compliance'}
              </p>
            </div>
            
            <div className="process-text max-w-4xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
            </div>
          </div>
        )}

        {/* Process steps - Clean timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              {content.stepsTitle || 'Implementation Steps'}
            </h2>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {Array.isArray(content.steps) && content.steps.length > 0 && 
             typeof content.steps[0] === 'object' ? (
              // Handle object steps
              (content.steps as Array<{title: string, description: string}>).map((step, index) => {
                // Select icon based on step meaning
                const stepIcons = [Search, Code, Settings, Zap, TestTube]
                const IconComponent = stepIcons[index % stepIcons.length]
                const colors = ['bg-blue-600', 'bg-gray-700', 'bg-blue-700', 'bg-gray-600', 'bg-blue-800']
                
                return (
                  <div key={index} className="flex items-start gap-6">
                    {/* Step icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 ${colors[index % colors.length]} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="text-white w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Step content */}
                    <div className="flex-1 pb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
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
                const colors = ['bg-blue-600', 'bg-gray-700', 'bg-blue-700', 'bg-gray-600', 'bg-blue-800']
                
                return (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 ${colors[index % colors.length]} rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-2`}>
                        {index + 1}
                      </div>
                      <div className={`w-12 h-12 ${colors[index % colors.length]} rounded-xl flex items-center justify-center mx-auto`}>
                        <IconComponent className="text-white w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="font-semibold">{content.ctaText || 'Start Your Implementation'}</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}