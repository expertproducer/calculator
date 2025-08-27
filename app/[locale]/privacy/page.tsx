import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react'

import { PAGE_METADATA, GDPR_SUBDOMAIN } from '@/lib/locales'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = PAGE_METADATA.privacy[locale as keyof typeof PAGE_METADATA.privacy] || PAGE_METADATA.privacy.en
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${GDPR_SUBDOMAIN}${locale === 'en' ? '/privacy' : `/${locale}/privacy`}`,
      languages: {
        en: `${GDPR_SUBDOMAIN}/privacy`,
        de: `${GDPR_SUBDOMAIN}/de/privacy`,
        fr: `${GDPR_SUBDOMAIN}/fr/privacy`,
      },
    },
  }
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Shield className="text-blue-600 dark:text-blue-400" size={32} />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                C&C CookieComply
              </span>
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Политика конфиденциальности
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Eye className="text-blue-600" size={24} />
                Обзор
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                C&C CookieComply ("мы", "нас", "наш") обязуется защищать вашу конфиденциальность. 
                Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем 
                вашу личную информацию при использовании нашего веб-сайта и услуг.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Используя наш сайт, вы соглашаетесь с практиками, описанными в этой политике.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Users className="text-blue-600" size={24} />
                Информация, которую мы собираем
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Личная информация
              </h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>Имя и контактная информация</li>
                <li>Email адрес</li>
                <li>URL вашего веб-сайта</li>
                <li>Технический стек и интеграции</li>
                <li>Сообщения и запросы</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Автоматически собираемая информация
              </h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>IP адрес и геолокация</li>
                <li>Тип браузера и операционная система</li>
                <li>Страницы, которые вы посещаете</li>
                <li>Время и дата посещений</li>
                <li>Источник трафика</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Lock className="text-blue-600" size={24} />
                Как мы используем вашу информацию
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Предоставление запрошенных услуг</li>
                <li>Улучшение нашего веб-сайта и услуг</li>
                <li>Связь с вами по поводу ваших запросов</li>
                <li>Отправка важных обновлений и уведомлений</li>
                <li>Анализ использования сайта для улучшения UX</li>
                <li>Соблюдение юридических обязательств</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Shield className="text-blue-600" size={24} />
                Защита вашей информации
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Мы принимаем соответствующие технические и организационные меры для защиты 
                вашей личной информации от несанкционированного доступа, изменения, раскрытия 
                или уничтожения.
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Шифрование данных при передаче (HTTPS)</li>
                <li>Регулярные обновления безопасности</li>
                <li>Ограниченный доступ к личной информации</li>
                <li>Мониторинг безопасности 24/7</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <FileText className="text-blue-600" size={24} />
                Cookies и технологии отслеживания
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Мы используем cookies и аналогичные технологии для улучшения вашего опыта 
                на сайте. Подробную информацию о том, как мы используем cookies, 
                можно найти в нашей <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Обмен информацией с третьими лицами
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Мы не продаем, не обмениваем и не передаем вашу личную информацию 
                третьим лицам, за исключением следующих случаев:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>С вашего явного согласия</li>
                <li>Для выполнения запрошенных услуг</li>
                <li>Для соблюдения юридических обязательств</li>
                <li>Для защиты наших прав и безопасности</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Ваши права
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                В соответствии с GDPR, у вас есть следующие права:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Право на доступ к вашим данным</li>
                <li>Право на исправление неточных данных</li>
                <li>Право на удаление ваших данных</li>
                <li>Право на ограничение обработки</li>
                <li>Право на переносимость данных</li>
                <li>Право на возражение против обработки</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Изменения в политике конфиденциальности
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Мы можем время от времени обновлять эту политику конфиденциальности. 
                Мы уведомим вас о любых существенных изменениях, разместив новую версию 
                на нашем сайте. Рекомендуем регулярно проверять эту страницу.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Mail className="text-blue-600" size={24} />
                Свяжитесь с нами
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Если у вас есть вопросы или опасения по поводу этой политики конфиденциальности, 
                пожалуйста, свяжитесь с нами:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> privacy@cashandclash.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Адрес:</strong> Европейский Союз
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Время ответа:</strong> В течение 24 часов в рабочие дни
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
