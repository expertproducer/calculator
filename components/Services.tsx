export default function Services({ content }: { content: any }) {
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
