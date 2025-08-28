import { Shield, AlertTriangle, Users, TrendingUp } from 'lucide-react'

interface WhyImportantProps {
  content: {
    title: string
    subtitle: string
    points: string[]
    description: string
  }
}

export default function WhyImportant({ content }: WhyImportantProps) {
  const icons = [Shield, AlertTriangle, Users, TrendingUp]

  return (
    <section id="why-important" className="py-24 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {content.points.map((point, index) => {
            const IconComponent = icons[index % icons.length]
            
            return (
              <div 
                key={index}
                className="group glass-card p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-4 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200/80 dark:group-hover:bg-blue-800/40 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">
                      {point}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="glass-card p-8 border-l-4 border-blue-500">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
