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
    <section id="platforms" className="py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((platform, index) => {
            const colors = [
              'bg-gradient-to-br from-green-500 to-green-600',
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'bg-gradient-to-br from-purple-500 to-purple-600',
              'bg-gradient-to-br from-orange-500 to-orange-600',
              'bg-gradient-to-br from-red-500 to-red-600',
              'bg-gradient-to-br from-indigo-500 to-indigo-600',
              'bg-gradient-to-br from-pink-500 to-pink-600',
              'bg-gradient-to-br from-teal-500 to-teal-600',
              'bg-gradient-to-br from-cyan-500 to-cyan-600',
              'bg-gradient-to-br from-emerald-500 to-emerald-600'
            ]
            const color = colors[index % colors.length]
            
            // Проверяем, является ли platform объектом или строкой
            const platformName = typeof platform === 'string' ? platform : platform.name
            const platformDescription = typeof platform === 'object' ? platform.description : undefined
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-center">
                  <div className={`inline-flex p-4 ${color} rounded-2xl mb-6 shadow-2xl`}>
                    <CheckCircle className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {platformName}
                  </h3>
                  {platformDescription && (
                    <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                      {platformDescription}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-3xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <p className="text-xl font-medium text-gray-600 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              {content.note || '¿No ve su CMP preferido? Podemos trabajar con cualquier plataforma de gestión de cookies para asegurar que se cumplan sus necesidades de cumplimiento.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
