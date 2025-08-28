import { Search, Ruler, Laptop, Paintbrush, TestTube } from 'lucide-react'

interface ProcessProps {
  content: {
    title: string
    subtitle?: string
    steps: Array<{
      title: string
      description: string
    }> | string[]
  }
}

export default function Process({ content }: ProcessProps) {
  const icons = [Search, Ruler, Laptop, Paintbrush, TestTube]

  return (
    <section id="process" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle || 'Step-by-step process from analysis to full launch'}
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 rounded-full transform -translate-y-1/2"></div>
          
          <div className="relative flex justify-between items-center">
            {content.steps.map((step, index) => {
              const IconComponent = icons[index % icons.length]
              const stepTitle = typeof step === 'string' ? step : step.title
              const stepDescription = typeof step === 'string' ? step : step.description
              
              return (
                <div key={index} className="flex flex-col items-center group">
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* Step Content */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 max-w-xs text-center shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:-translate-y-2 transition-all duration-300">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl">
                        <IconComponent className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                    </div>
                    {typeof step === 'object' && (
                      <h3 className="text-gray-900 dark:text-white text-sm font-semibold mb-2">
                        {stepTitle}
                      </h3>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed">
                      {stepDescription}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8 max-w-2xl mx-auto">
          {content.steps.map((step, index) => {
            const IconComponent = icons[index % icons.length]
            const stepTitle = typeof step === 'string' ? step : step.title
            const stepDescription = typeof step === 'string' ? step : step.description
            
            return (
              <div key={index} className="flex items-start gap-6">
                {/* Step Number and Line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  {index < content.steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-blue-500 to-blue-300 mt-4"></div>
                  )}
                </div>
                
                {/* Step Content */}
                <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl">
                      <IconComponent className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <div className="flex-1">
                      {typeof step === 'object' && (
                        <h3 className="text-gray-900 dark:text-white text-base font-semibold mb-2">
                          {stepTitle}
                        </h3>
                      )}
                      <p className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed">
                        {stepDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
