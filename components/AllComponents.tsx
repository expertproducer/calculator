// Problem Component
export function Problem({ content }: { content: any }) {
  return (
    <section id="problem" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.points.map((point: string, index: number) => (
            <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300">{point}</p>
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
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
              <p className="text-lg text-gray-700 dark:text-gray-300">{item}</p>
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
    <section id="process" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-5 gap-8">
          {content.steps.map((step: string, index: number) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">{step}</p>
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
    <section id="deliverables" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
              <p className="text-lg text-gray-700 dark:text-gray-300">{item}</p>
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
    <section id="benefits" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.items.map((item: string, index: number) => (
            <div key={index} className="text-center p-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">{item}</p>
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
    <section id="cases" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.cards.map((card: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-red-600 font-semibold">Before:</p>
                  <p className="text-gray-600 dark:text-gray-400">{card.before}</p>
                </div>
                <div>
                  <p className="text-green-600 font-semibold">After:</p>
                  <p className="text-gray-600 dark:text-gray-400">{card.after}</p>
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
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {content.items.map((item: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">{item.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Component - Re-export from the main Contact component
export { default as Contact } from './Contact'

// Footer Component - Re-export from the main Footer component
export { default as Footer } from './Footer'

// Navbar Component - Re-export from the main Navbar component
export { default as Navbar } from './Navbar'
