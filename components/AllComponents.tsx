// Problem Component
export function Problem({ content }: { content: any }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
    <section className="py-20 bg-white dark:bg-gray-900">
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
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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
    <section className="py-20 bg-white dark:bg-gray-900">
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
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.cards.map((card: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4">{card.title}</h3>
              <div className="mb-4">
                <p className="text-red-600 font-semibold">Before:</p>
                <p className="text-gray-600 dark:text-gray-400">{card.before}</p>
              </div>
              <div>
                <p className="text-green-600 font-semibold">After:</p>
                <p className="text-gray-600 dark:text-gray-400">{card.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Component
export function Pricing({ content }: { content: any }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {content.plans.map((plan: any, index: number) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <ul className="space-y-2">
                {plan.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="text-gray-600 dark:text-gray-400">• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400">{content.note}</p>
      </div>
    </section>
  )
}

// FAQ Component
export function FAQ({ content }: { content: any }) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
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

// Contact Component
export function Contact({ content, locale }: { content: any; locale: string }) {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{content.title}</h2>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">{content.subtitle}</p>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder={content.fields.name} className="w-full p-3 border rounded-lg" />
              <input type="email" placeholder={content.fields.email} className="w-full p-3 border rounded-lg" />
            </div>
            <input type="url" placeholder={content.fields.url} className="w-full p-3 border rounded-lg" />
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder={content.fields.stack} className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder={content.fields.regions} className="w-full p-3 border rounded-lg" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder={content.fields.languages} className="w-full p-3 border rounded-lg" />
              <input type="text" placeholder={content.fields.cmp} className="w-full p-3 border rounded-lg" />
            </div>
            <input type="text" placeholder={content.fields.integrations} className="w-full p-3 border rounded-lg" />
            <textarea placeholder={content.fields.message} rows={4} className="w-full p-3 border rounded-lg"></textarea>
            <button type="submit" className="btn btn-primary w-full py-4">
              {content.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// Footer Component
export function Footer({ content, locale }: { content: any; locale: string }) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">{content.copyright}</p>
        <div className="flex justify-center space-x-6">
          {content.links.map((link: string, index: number) => (
            <a key={index} href="#" className="text-gray-300 hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// Navbar Component
export function Navbar({ locale }: { locale: string }) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">C&C CookieComply</div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Services</a>
            <a href="#process" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Process</a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Pricing</a>
            <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">FAQ</a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">Contact</a>
          </div>
          <div className="text-sm text-gray-500">{locale.toUpperCase()}</div>
        </div>
      </div>
    </nav>
  )
}
