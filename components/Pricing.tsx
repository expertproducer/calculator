export default function Pricing({ content }: { content: any }) {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            Choose the perfect plan for your compliance needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {content.plans.map((plan: any, index: number) => (
            <div 
              key={index} 
              className={`glass-card p-8 hover:-translate-y-2 transition-all duration-500 ${
                index === 1 ? 'ring-2 ring-accent/20 scale-105' : ''
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white tracking-tight">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-accent mb-2">
                  Contact Us
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Custom pricing
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="text-accent text-sm mt-1">—</span>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 px-6 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-apple hover:shadow-apple-lg">
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-3xl mx-auto">
            {content.note}
          </p>
        </div>
      </div>
    </section>
  )
}
