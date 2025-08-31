import { ArrowDown, ArrowUp, ShoppingCart, Newspaper, Cloud, Star } from 'lucide-react'

interface CaseStudiesProps {
  content: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      result: string
    }>
    cta?: string
  }
}

export default function CaseStudies({ content }: CaseStudiesProps) {
  const typeIcons = [ShoppingCart, Newspaper, Cloud]

  return (
    <section id="cases" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
            📊 Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((caseItem, index) => {
            const TypeIcon = typeIcons[index % typeIcons.length]
            const colors = [
              'bg-purple-600',
              'bg-blue-600',
              'bg-green-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Case Type Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${color} rounded-xl shadow-lg`}>
                    <TypeIcon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>

                {/* Result */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-start gap-3 mb-3">
                    <ArrowUp className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <h4 className="font-bold text-green-800 text-sm">
                      Resultado
                    </h4>
                  </div>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {caseItem.result}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span>{content.cta || 'Obtener Su Caso de Estudio'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
