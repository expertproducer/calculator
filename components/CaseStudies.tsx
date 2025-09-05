import { ArrowDown, ArrowUp, ShoppingCart, Newspaper, Cloud, Star } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

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
  locale?: string
}

export default function CaseStudies({ content, locale = 'en' }: CaseStudiesProps) {
  const typeIcons = [ShoppingCart, Newspaper, Cloud]

  return (
    <section id="cases" className="py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title}
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((caseItem, index) => {
            const TypeIcon = typeIcons[index % typeIcons.length]
            const colors = [
              'bg-gradient-to-br from-purple-500 to-purple-600',
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'bg-gradient-to-br from-green-500 to-green-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Case Type Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 ${color} rounded-2xl shadow-2xl`}>
                    <TypeIcon className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-lg font-medium text-gray-600 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                    <span dangerouslySetInnerHTML={{ __html: formatSimpleText(caseItem.description) }} />
                  </p>
                </div>

                {/* Result */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <ArrowUp className="text-green-600 flex-shrink-0 mt-1 w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                    <h4 className="font-bold text-green-800 text-lg drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                      Resultado
                    </h4>
                  </div>
                  <p className="text-green-700 text-lg leading-relaxed font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                    {caseItem.result}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={locale === 'en' ? '/contact' : `/${locale}/contact`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
              >
                <span>{content.cta || 'Get Your Case Study'}</span>
                <svg className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a
                href={locale === 'en' ? '/services' : `/${locale}/services`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]"
              >
                <span>Learn More</span>
                <ArrowUp className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </a>
            </div>
        </div>
      </div>
    </section>
  )
}
