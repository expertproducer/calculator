// Problem Component
export function Problem({ content }: { content: any }) {
  return (
    <section id="problem" className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {content.points.map((point: string, index: number) => (
            <div key={index} className="glass-card text-center p-8 hover:-translate-y-1 transition-all duration-300">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Component
export function Services({ content }: { content: any }) {
  return (
    <section id="services" className="py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="glass-card p-8 hover:-translate-y-1 transition-all duration-300">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Component
export function Process({ content }: { content: any }) {
  return (
    <section id="process" className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {content.steps.map((step: string, index: number) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center text-xl font-semibold mx-auto mb-6 shadow-apple">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-light">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Deliverables Component
export function Deliverables({ content }: { content: any }) {
  return (
    <section id="deliverables" className="py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="glass-card p-8 hover:-translate-y-1 transition-all duration-300">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Benefits Component
export function Benefits({ content }: { content: any }) {
  return (
    <section id="benefits" className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="text-center p-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Cases Component
export function Cases({ content }: { content: any }) {
  return (
    <section id="cases" className="py-28 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.cards.map((card: any, index: number) => (
            <div key={index} className="glass-card p-8 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">{card.title}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-red-500 font-medium mb-2">Before:</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.before}</p>
                </div>
                <div>
                  <p className="text-green-500 font-medium mb-2">After:</p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Component - Re-export from the main Pricing component
export { default as Pricing } from './Pricing'

// FAQ Component
export function FAQ({ content }: { content: any }) {
  return (
    <section id="faq" className="py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">{content.title}</h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {content.items.map((item: any, index: number) => (
            <div key={index} className="glass-card p-8 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white tracking-tight">{item.question}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Component - Re-export from the main Contact component
export { default as Contact } from './Contact'

// Final CTA Component - Re-export from the main FinalCTA component
export { default as FinalCTA } from './FinalCTA'

// Footer Component - Re-export from the main Footer component
export { default as Footer } from './Footer'

// Navbar Component - Re-export from the main Navbar component
export { default as Navbar } from './Navbar'
