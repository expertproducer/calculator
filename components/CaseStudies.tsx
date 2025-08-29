import { ArrowDown, ArrowUp, ShoppingCart, Newspaper, Cloud, Star } from 'lucide-react'

interface CaseStudiesProps {
  content: {
    title: string
    cards: Array<{
      title: string
      before: string
      after: string
    }>
  }
}

export default function CaseStudies({ content }: CaseStudiesProps) {
  const typeIcons = [ShoppingCart, Newspaper, Cloud]

  return (
    <section id="cases" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100/80 dark:bg-orange-900/30 rounded-full mb-6">
            <Star className="text-orange-600 dark:text-orange-400 w-4 h-4" />
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Case Studies</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Real results from our clients
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.cards.map((caseItem, index) => {
            const TypeIcon = typeIcons[index % typeIcons.length]
            const colors = [
              'from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Case Type Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${color} rounded-xl`}>
                    <TypeIcon className="text-gray-700 dark:text-gray-300" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Before/After Cards */}
                <div className="space-y-6">
                  {/* Before */}
                  <div className="bg-gradient-to-r from-red-50/80 to-red-100/80 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-6 border border-red-200/50 dark:border-red-800/30">
                    <div className="flex items-start gap-3 mb-3">
                      <ArrowDown className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm">
                        Before
                      </h4>
                    </div>
                    <p className="text-red-600 dark:text-red-300 text-sm leading-relaxed">
                      {caseItem.before}
                    </p>
                  </div>

                  {/* After */}
                  <div className="bg-gradient-to-r from-green-50/80 to-green-100/80 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/30">
                    <div className="flex items-start gap-3 mb-3">
                      <ArrowUp className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <h4 className="font-semibold text-green-700 dark:text-green-400 text-sm">
                        After
                      </h4>
                    </div>
                    <p className="text-green-600 dark:text-green-300 text-sm leading-relaxed">
                      {caseItem.after}
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 text-sm font-medium hover:shadow-md">
                    Learn More
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <span>Get Your Case Study</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
