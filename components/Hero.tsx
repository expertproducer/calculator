export default function Hero({ content }: { content: any }) {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {content.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary text-lg px-8 py-4">
            {content.ctaPrimary}
          </button>
          <button className="btn btn-outline text-lg px-8 py-4">
            {content.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  )
}
