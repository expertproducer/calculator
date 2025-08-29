import { RefreshCw, Lightbulb, Link, Languages, Database, Star } from 'lucide-react'

interface BenefitsProps {
  content: {
    title: string
    items: string[]
  }
}

export default function Benefits({ content }: BenefitsProps) {
  const icons = [RefreshCw, Lightbulb, Link, Languages, Database]

  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100/80 dark:bg-purple-900/30 rounded-full mb-6">
            <Star className="text-purple-600 dark:text-purple-400 w-4 h-4" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Benefits</span>
          </div>
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
            const colors = [
              'from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40',
              'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40',
              'from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="text-center">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <IconComponent className="text-gray-700 dark:text-gray-300 w-8 h-8" />
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
