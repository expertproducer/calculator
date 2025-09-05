import { Shield, AlertTriangle, Users, TrendingUp, Star, CheckCircle } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'
import Container from './Container'

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
    <section id="why-important" className="py-20">
      <Container>
        
        {/* Header - Process Page style */}
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {content.title}
          </h2>
          
          <p className="text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed prose">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
        </div>

        {/* Benefits Grid - Process Page style */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {content.points.map((point, index) => {
            const IconComponent = icons[index % icons.length]
            const colors = [
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'bg-gradient-to-br from-green-500 to-green-600', 
              'bg-gradient-to-br from-purple-500 to-purple-600',
              'bg-gradient-to-br from-orange-500 to-orange-600'
            ]
            const color = colors[index % colors.length]
            
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 transform hover:scale-105"
              >
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 p-4 ${color} rounded-2xl shadow-2xl`}>
                    <IconComponent className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-xl leading-relaxed font-bold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                      <span dangerouslySetInnerHTML={{ __html: formatSimpleText(point) }} />
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Description - Process Page style */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-12 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-8 shadow-2xl">
              <Shield className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.expertiseTitle || 'Our Expertise Makes the Difference'}
            </h3>
            
            <p className="text-xl text-gray-700 leading-relaxed font-semibold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.description) }} />
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
