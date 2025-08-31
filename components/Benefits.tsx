import { RefreshCw, Lightbulb, Link, Languages, Database, Star } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

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
    <section id="benefits" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title || 'Benefits'}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {content.items.map((item, index) => {
            const IconComponent = icons[index % icons.length]
            const colors = [
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'bg-gradient-to-br from-green-500 to-green-600',
              'bg-gradient-to-br from-purple-500 to-purple-600',
              'bg-gradient-to-br from-orange-500 to-orange-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-100 transform hover:scale-105">
                <div className={`inline-flex p-4 ${color} rounded-2xl mb-6 shadow-2xl`}>
                  <IconComponent className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                  <span dangerouslySetInnerHTML={{ __html: formatSimpleText(item.title) }} />
                </h3>
                <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  <span dangerouslySetInnerHTML={{ __html: formatSimpleText(item.description) }} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
