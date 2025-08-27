export default function Pricing({ content }: { content: any }) {
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
