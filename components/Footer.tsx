import Link from 'next/link'
import { Shield, Mail, MapPin, Clock, Settings } from 'lucide-react'

export default function Footer({ content, locale }: { content: any; locale: string }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-400" size={32} />
              <span className="text-2xl font-bold">C&C CookieComply</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Профессиональные решения для GDPR-совместимости. Настраиваем CMP, 
              исправляем cookie баннеры и обеспечиваем правильное логирование согласий.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Европейский Союз</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>CET 9:00-18:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Быстрые ссылки</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}#services`} className="text-gray-300 hover:text-white transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#process`} className="text-gray-300 hover:text-white transition-colors">
                  Процесс работы
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#pricing`} className="text-gray-300 hover:text-white transition-colors">
                  Цены
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#contact`} className="text-gray-300 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Правовая информация</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-300 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="text-gray-300 hover:text-white transition-colors">
                  Политика cookies
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    // Открываем настройки cookies
                    const event = new CustomEvent('openCookiePreferences')
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Settings size={16} />
                  Настройки cookies
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} C&C CookieComply by Cash & Clash. Все права защищены.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href={`/${locale}#contact`} className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
