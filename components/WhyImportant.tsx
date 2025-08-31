import { Shield, AlertTriangle, Users, TrendingUp, Star, CheckCircle } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

interface WhyImportantProps {
  content: {
    title: string
    subtitle: string
    points: string[]
    description: string
    badge?: string
    expertiseTitle?: string
  }
}

export default function WhyImportant({ content }: WhyImportantProps) {
  const icons = [Shield, AlertTriangle, Users, TrendingUp]

  return (
    <section id="why-important" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - StoryBrand style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '⚡ Why It Matters'}
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        {/* Benefits Grid - StoryBrand style */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {content.points.map((point, index) => {
            const IconComponent = icons[index % icons.length]
            const colors = [
              'bg-blue-600',
              'bg-green-600', 
              'bg-purple-600',
              'bg-orange-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 ${color} rounded-xl shadow-lg`}>
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-lg leading-relaxed font-medium">
                      <span dangerouslySetInnerHTML={{ __html: formatSimpleText(point) }} />
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Description - StoryBrand style */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
            <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-6">
              <Shield className="text-white w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {content.expertiseTitle || 'Our Expertise Makes the Difference'}
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.description) }} />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
