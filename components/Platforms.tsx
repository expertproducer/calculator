import { CheckCircle } from 'lucide-react'

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
    <section id="platforms" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.items.map((platform, index) => (
            <div 
              key={index}
              className="group glass-card p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-2 bg-green-100/80 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200/80 dark:group-hover:bg-green-800/40 transition-all duration-300">
                  <CheckCircle className="text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300" size={20} />
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
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't see your preferred CMP? We can work with any Cookie Management Platform to ensure your compliance needs are met.
          </p>
        </div>
      </div>
    </section>
  )
}
