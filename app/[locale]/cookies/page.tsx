import { getContent } from '../../lib/i18n'

export default function CookiesPage({ params }: { params: { locale: string } }) {
  const content = getContent(params.locale as 'en' | 'de' | 'fr')
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{content.cookies.title}</h1>
        <div className="prose max-w-none">
          {content.cookies.content}
        </div>
      </div>
    </div>
  )
}
