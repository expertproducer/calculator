export default function FAQ({ content }: { content: any }) {
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
