import { Search, Ruler, Laptop, Paintbrush, TestTube, ArrowRight, Star, Shield, Calculator, Clock, Zap, Settings, FileText, Info, HelpCircle, Code } from 'lucide-react'

interface ProcessProps {
  content: {
    title: string
    subtitle?: string
    leadText?: string
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
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
}

export default function Process({ content }: ProcessProps) {
  return (
    <section id="process" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full mb-6">
            <Star className="text-blue-600 dark:text-blue-400 w-4 h-4" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Process Section</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle || 'Step-by-step process from analysis to full launch'}
          </p>
        </div>

        {/* Lead paragraph in frame */}
        {content.leadText && (
          <div className="mb-16">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm max-w-5xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Implementation Approach
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  We follow a proven methodology that ensures successful CMP implementation and compliance
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                  <span dangerouslySetInnerHTML={{ __html: formatText(content.leadText) }} />
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Process information block */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-2xl mb-4">
                <Shield className="text-green-600 dark:text-green-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Why This Process Works
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our structured approach ensures compliance, efficiency, and successful implementation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl">
                  <Calculator className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Systematic
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Step-by-step approach ensures nothing is missed
                </p>
              </div>
              
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl">
                  <Clock className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Efficient
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Optimized workflow saves time and resources
                </p>
              </div>
              
              <div className="text-center space-y-3 p-4 rounded-2xl hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300">
                <div className="inline-flex p-3 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 rounded-xl">
                  <Zap className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Proven
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Tested methodology with successful results
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical timeline for all devices */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20">
          {content.steps.map((step, index) => {
            const stepTitle = typeof step === 'string' ? step : step.title
            const stepDescription = typeof step === 'string' ? step : step.description
            
            // Select icon based on step meaning
            const getStepIcon = (index: number) => {
              const stepTitleLower = stepTitle.toLowerCase()
              if (stepTitleLower.includes('legal') || stepTitleLower.includes('analysis') || stepTitleLower.includes('requirements')) {
                return Search
              } else if (stepTitleLower.includes('deployment') || stepTitleLower.includes('script') || stepTitleLower.includes('platform')) {
                return Code
              } else if (stepTitleLower.includes('gtm') || stepTitleLower.includes('integration') || stepTitleLower.includes('configuration')) {
                return Settings
              } else if (stepTitleLower.includes('production') || stepTitleLower.includes('launch')) {
                return Zap
              }
              // Default return icon by index
              const defaultIcons = [Search, Code, Settings, Zap, Star]
              return defaultIcons[index % defaultIcons.length]
            }
            
            const StepIcon = getStepIcon(index)
            
            return (
              <div key={index} className="flex items-start gap-6 group">
                {/* Step number */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative overflow-hidden flex-shrink-0 mt-14">
                    {/* Cool feature: inner glowing circle */}
                    <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    {/* Cool feature: animated border */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                    {/* Cool feature: pulsing effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-400/30 animate-pulse"></div>
                    {/* Icon on top of everything */}
                    <StepIcon className="relative z-10 w-7 h-7" />
                  </div>
                </div>
                
                {/* Step content */}
                <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
                  {typeof step === 'object' && (
                    <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-4 leading-tight">
                      {stepTitle}
                    </h3>
                  )}
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {stepDescription}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm">
            <div className="inline-flex p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl mb-4">
              <HelpCircle className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
              Ready to start your CMP implementation?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Let's begin with a free consultation to understand your specific needs and create a tailored implementation plan.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
