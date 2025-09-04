"use client"

interface FineLink {
  title: string
  href: string
}

interface FinesLinksProps {
  content: {
    title: string
    subtitle: string
    links: FineLink[]
  }
}

export default function FinesLinks({ content }: FinesLinksProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300"
            >
              <div className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                {link.title}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {link.href}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}


