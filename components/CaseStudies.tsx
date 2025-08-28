import { ArrowDown, ArrowUp, ShoppingCart, Newspaper, Cloud } from 'lucide-react'

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
    <section id="cases" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
            
            return (
              <div 
                key={index}
                className="group glass-card p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Case Type Icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100/80 dark:bg-purple-900/30 rounded-xl">
                    <TypeIcon className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Before/After Cards */}
                <div className="space-y-6">
                  {/* Before */}
                  <div className="bg-red-50/80 dark:bg-red-900/20 rounded-xl p-6 border border-red-200/50 dark:border-red-800/30">
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
                  <div className="bg-green-50/80 dark:bg-green-900/20 rounded-xl p-6 border border-green-200/50 dark:border-green-800/30">
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
                  <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-300 text-sm font-medium">
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
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
