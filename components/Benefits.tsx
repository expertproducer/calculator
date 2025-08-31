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
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '⭐ Benefits'}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title || 'Benefits'}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {content.items.map((item, index) => {
            const IconComponent = icons[index % icons.length]
            
            return (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-blue-600 rounded-lg mb-4">
                  <IconComponent className="text-white w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
