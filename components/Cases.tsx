export default function Cases({ content }: { content: any }) {
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
