import { CheckCircle, Star } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface PlatformsProps {
  content: {
    title: string
    subtitle: string
    badge?: string
    items: (string | { name: string; description: string })[]
    note?: string
  }
}

export default function Platforms({ content }: PlatformsProps) {
  return (
    <section id="platforms" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '🚀 Platforms'}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.items.map((platform, index) => {
            const colors = [
              'bg-green-600',
              'bg-blue-600',
              'bg-purple-600',
              'bg-orange-600',
              'bg-red-600',
              'bg-indigo-600',
              'bg-pink-600',
              'bg-teal-600',
              'bg-cyan-600',
              'bg-emerald-600'
            ]
            const color = colors[index % colors.length]
            
            // Проверяем, является ли platform объектом или строкой
            const platformName = typeof platform === 'string' ? platform : platform.name
            const platformDescription = typeof platform === 'object' ? platform.description : undefined
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className={`inline-flex p-3 ${color} rounded-xl mb-4 shadow-lg`}>
                    <CheckCircle className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {platformName}
                  </h3>
                  {platformDescription && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {platformDescription}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-2xl mx-auto shadow-lg">
            <p className="text-lg text-gray-600">
              {content.note || '¿No ve su CMP preferido? Podemos trabajar con cualquier plataforma de gestión de cookies para asegurar que se cumplan sus necesidades de cumplimiento.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
