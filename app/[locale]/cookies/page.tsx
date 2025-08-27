import { getContent } from '../../lib/i18n'

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params // Получаем параметры, но не используем locale
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Политика использования cookies</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Мы используем cookies для улучшения работы сайта и анализа трафика. 
            Продолжая использовать сайт, вы соглашаетесь с нашей политикой cookies.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
            и помогают нам улучшать пользовательский опыт.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Вы можете отключить cookies в настройках вашего браузера, 
            но это может повлиять на функциональность сайта.
          </p>
        </div>
      </div>
    </div>
  )
}
