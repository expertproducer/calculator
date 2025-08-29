import { CheckCircle, Star } from 'lucide-react'

interface PlatformsProps {
  content: {
    title: string
    subtitle: string
    items: Array<{
      name: string
      description: string
    }>
  }
}

export default function Platforms({ content }: PlatformsProps) {
  return (
    <section id="platforms" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100/80 dark:bg-indigo-900/30 rounded-full mb-6">
            <Star className="text-indigo-600 dark:text-indigo-400 w-4 h-4" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Platforms</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.items.map((platform, index) => {
            const colors = [
              'from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40',
              'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40',
              'from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40',
              'from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 p-3 bg-gradient-to-br ${color} rounded-xl group-hover:scale-110 transition-all duration-300`}>
                    <CheckCircle className="text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {platform.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {platform.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 max-w-2xl mx-auto shadow-sm">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Don't see your preferred CMP? We can work with any Cookie Management Platform to ensure your compliance needs are met.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
