import { Shield, AlertTriangle, Users, TrendingUp, Star } from 'lucide-react'

interface WhyImportantProps {
  content: {
    title: string
    subtitle: string
    points: string[]
    description: string
  }
}

export default function WhyImportant({ content }: WhyImportantProps) {
  const icons = [Shield, AlertTriangle, Users, TrendingUp]

  return (
    <section id="why-important" className="relative py-24 bg-black">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10" style={{ zIndex: 5 }} />
      
      <div className="container mx-auto px-6 relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-green-500/20 rounded-full mb-6 border border-green-400/30">
            <span className="text-sm font-medium text-green-400">Why Important</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight drop-shadow-2xl">
            {content.title}
          </h2>
          <p className="text-xl text-cyan-100 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {content.points.map((point, index) => {
            const IconComponent = icons[index % icons.length]
            const colors = [
              'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40',
              'from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 bg-gradient-to-br ${color} rounded-xl group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 text-lg leading-relaxed font-medium drop-shadow-lg">
                      {point}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-sm">
            <div className="inline-flex p-3 bg-blue-500/20 rounded-xl mb-4 border border-blue-400/30">
              <Shield className="text-blue-400 w-6 h-6" />
            </div>
            <p className="text-lg text-white/90 leading-relaxed drop-shadow-lg">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
