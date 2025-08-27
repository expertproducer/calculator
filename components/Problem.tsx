export default function Problem({ content }: { content: any }) {
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
