import { RefreshCw, Lightbulb, Link, Languages, Database, Star } from 'lucide-react'

interface BenefitsProps {
  content: {
    title: string
    subtitle: string
    badge?: string
    items: Array<{
      title: string
      description: string
    }>
  }
}

export default function Benefits({ content }: BenefitsProps) {
  const icons = [RefreshCw, Lightbulb, Link, Languages, Database]

  // Safety check
  if (!content) {
    return null
  }

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '⭐ Benefits'}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title || 'Benefits'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {content.items.map((item, index) => {
            const IconComponent = icons[index % icons.length]
            const colors = [
              'bg-green-600',
              'bg-blue-600',
              'bg-purple-600',
              'bg-orange-600',
              'bg-red-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className={`inline-flex p-4 ${color} rounded-2xl mb-6 shadow-lg`}>
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
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
