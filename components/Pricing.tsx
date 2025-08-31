import { Home, Star, Briefcase, Check, Info, Calculator, Shield } from 'lucide-react'

export default function Pricing({ content }: { content: any }) {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            Transparent pricing model: we charge only for implementation, you choose your preferred CMP service plan
          </p>
        </div>

        {/* Pricing explanation */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-100/80 dark:bg-blue-900/30 rounded-2xl mb-4">
                <Calculator className="text-blue-600 dark:text-blue-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How Our Pricing Works
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Check className="text-green-600 dark:text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Implementation Fee Only</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We charge only for our technical work: CMP setup, GTM integration, and configuration
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Shield className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">CMP Service Plans</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You choose and pay directly to your preferred CMP provider (Cookiebot, Iubenda, etc.)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Info className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Transparent Costs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No hidden fees or ongoing charges. One-time implementation fee covers everything
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="text-yellow-600 dark:text-yellow-400 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Flexible Options</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Choose Basic, Pro, or Business implementation based on your complexity needs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
                <strong>Why this model?</strong> It gives you full control over your CMP costs while ensuring professional implementation quality. 
                You pay us once for setup, then manage your CMP subscription directly with providers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pricing plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {content.plans.map((plan: any, index: number) => {
            const icons = [Home, Star, Briefcase]
            const IconComponent = icons[index % icons.length]
            const colors = ['text-blue-500', 'text-yellow-500', 'text-purple-500']
            const bgColors = ['bg-blue-100 dark:bg-blue-900/30', 'bg-yellow-100 dark:bg-yellow-900/30', 'bg-purple-100 dark:bg-purple-900/30']
            
            return (
              <div 
                key={index} 
                className={`glass-card p-8 hover:-translate-y-2 transition-all duration-500 relative ${
                  index === 1 ? 'ring-2 ring-accent/20 scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl ${bgColors[index]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`${colors[index]} w-8 h-8`} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-accent mb-2">
                    Contact Us
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Implementation fee
                  </p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature: string, fIndex: number) => (
                    <li key={fIndex} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full py-3 px-6 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-apple hover:shadow-apple-lg">
                  Get Started
                </button>
              </div>
            )
          })}
        </div>
        
        {/* Additional information */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 rounded-2xl p-6">
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {content.note}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What's Included in Implementation Fee?
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="text-left space-y-2">
                <p>• CMP script deployment & configuration</p>
                <p>• GTM integration & consent triggers</p>
                <p>• Cookie banner customization</p>
                <p>• Testing & validation</p>
              </div>
              <div className="text-left space-y-2">
                <p>• Policy page setup</p>
                <p>• Consent logging configuration</p>
                <p>• Documentation & training</p>
                <p>• Post-launch support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
