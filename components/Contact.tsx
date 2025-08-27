export default function Contact({ content, locale }: { content: any; locale: string }) {
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
