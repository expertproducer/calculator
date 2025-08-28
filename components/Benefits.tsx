import { RefreshCw, Lightbulb, Link, Languages, Database } from 'lucide-react'

interface BenefitsProps {
  content: {
    title: string
    items: string[]
  }
}

export default function Benefits({ content }: BenefitsProps) {
  const icons = [RefreshCw, Lightbulb, Link, Languages, Database]

  return (
    <section id="benefits" className="py-24 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Your GDPR compliance partner with proven solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((item, index) => {
            const IconComponent = icons[index % icons.length]
            
            return (
              <div 
                key={index}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-xl border border-gray-200/30 dark:border-gray-700/30"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 bg-green-100/80 dark:bg-green-900/30 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <IconComponent className="text-green-600 dark:text-green-400 w-8 h-8" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
