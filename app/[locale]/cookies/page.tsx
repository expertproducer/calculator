import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Cookie, Settings, Info, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy — C&C CookieComply',
  description: 'Learn about how we use cookies and similar technologies on our website.',
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
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
              Политика использования Cookies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Cookie className="text-blue-600" size={24} />
                Что такое Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies — это небольшие текстовые файлы, которые размещаются на вашем устройстве 
                (компьютер, планшет, смартфон) при посещении веб-сайта. Они помогают сайту 
                "запомнить" информацию о вашем посещении, что может сделать его более удобным 
                и полезным при следующем посещении.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies не содержат вирусов и не могут получить доступ к информации на вашем 
                компьютере. Они могут только хранить информацию, которую вы предоставляете 
                сайту, или информацию, которую сайт может получить в результате вашего 
                взаимодействия с ним.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <Settings className="text-blue-600" size={24} />
                Типы Cookies, которые мы используем
              </h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Essential Cookies (Необходимые)
                    </h3>
                    <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                      Всегда активны
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Эти cookies необходимы для работы сайта и не могут быть отключены. 
                    Они обычно устанавливаются только в ответ на действия, которые вы выполняете, 
                    такие как установка предпочтений конфиденциальности, вход в систему или 
                    заполнение форм.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Примеры использования:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400">
                      <li>Сохранение настроек языка и региона</li>
                      <li>Функции безопасности и аутентификации</li>
                      <li>Корзина покупок и предпочтения</li>
                      <li>Настройки конфиденциальности</li>
                    </ul>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="text-blue-600" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Analytics Cookies (Аналитические)
                    </h3>
                    <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                      По согласию
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Эти cookies позволяют нам подсчитывать посещения и источники трафика, 
                    чтобы мы могли измерять и улучшать производительность нашего сайта. 
                    Они помогают нам узнать, какие страницы наиболее и наименее популярны.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Примеры использования:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400">
                      <li>Google Analytics для анализа трафика</li>
                      <li>Отслеживание поведения пользователей</li>
                      <li>Анализ производительности страниц</li>
                      <li>Исследования пользовательского опыта</li>
                    </ul>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="text-orange-600" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Marketing Cookies (Маркетинговые)
                    </h3>
                    <span className="px-3 py-1 text-sm bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                      По согласию
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Эти cookies могут быть установлены через наш сайт нашими рекламными 
                    партнерами. Они могут использоваться этими компаниями для создания 
                    профиля ваших интересов и показа релевантной рекламы на других сайтах.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Примеры использования:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400">
                      <li>Facebook Pixel для ретаргетинга</li>
                      <li>Google Ads для рекламных кампаний</li>
                      <li>Отслеживание конверсий</li>
                      <li>Персонализация рекламы</li>
                    </ul>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="text-purple-600" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Functional Cookies (Функциональные)
                    </h3>
                    <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                      По согласию
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Эти cookies позволяют сайту предоставлять расширенную функциональность 
                    и персонализацию. Они могут быть установлены нами или сторонними 
                    поставщиками, чьи услуги мы добавили на наши страницы.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Примеры использования:
                    </h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-400">
                      <li>Чат-виджеты и поддержка</li>
                      <li>Социальные медиа интеграции</li>
                      <li>Персонализированные настройки</li>
                      <li>Интерактивные функции</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Как управлять Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Вы можете контролировать и/или удалять cookies по своему усмотрению. 
                Вы можете удалить все cookies, которые уже находятся на вашем компьютере, 
                и можете настроить большинство браузеров, чтобы они не размещали их.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    Настройки браузера
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    Большинство веб-браузеров позволяют вам управлять cookies через 
                    настройки конфиденциальности или безопасности.
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Chrome: Настройки → Конфиденциальность и безопасность</li>
                    <li>• Firefox: Настройки → Конфиденциальность и безопасность</li>
                    <li>• Safari: Настройки → Конфиденциальность</li>
                    <li>• Edge: Настройки → Cookies и разрешения сайтов</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                    Настройки на нашем сайте
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                    Вы можете изменить свои предпочтения cookies в любое время, 
                    используя наш центр управления cookies.
                  </p>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Открыть настройки
                  </button>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Cookies от третьих лиц
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                В дополнение к нашим собственным cookies, мы можем также использовать 
                различные cookies от третьих лиц для анализа, рекламы и улучшения 
                пользовательского опыта.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                        Поставщик
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                        Назначение
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600">
                        Тип
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Google Analytics
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Анализ трафика и поведения пользователей
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Analytics
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Facebook Pixel
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Ретаргетинг и отслеживание конверсий
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Marketing
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Intercom
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Чат поддержки и аналитика
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Functional
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Обновления этой политики
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Мы можем время от времени обновлять эту политику cookies, чтобы отразить 
                изменения в наших практиках или по другим операционным, юридическим или 
                нормативным причинам. Мы уведомим вас о любых существенных изменениях, 
                разместив новую версию на нашем сайте.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Свяжитесь с нами
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Если у вас есть вопросы или опасения по поводу нашей политики cookies, 
                пожалуйста, свяжитесь с нами:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Email:</strong> cookies@cashandclash.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Тема:</strong> Вопросы по cookies
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
