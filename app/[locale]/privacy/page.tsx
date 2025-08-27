import { getContent } from '../../lib/i18n'

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params // Получаем параметры, но не используем locale
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Мы защищаем вашу личную информацию и соблюдаем все требования GDPR. 
            Ваши данные используются только для предоставления услуг и никогда не передаются третьим лицам.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Мы собираем только ту информацию, которая необходима для оказания наших услуг: 
            имя, email, URL сайта и технические детали проекта.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Все данные хранятся в защищенном виде и удаляются по вашему запросу 
            или по истечении срока действия договора.
          </p>
        </div>
      </div>
    </div>
  )
}
