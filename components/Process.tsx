export default function Process({ content }: { content: any }) {
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
