import { getContent, Locale } from '../lib/i18n';
import LangSwitcher from './LangSwitcher';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const content = getContent(locale);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">C&C CookieComply</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Professional cookie compliance solutions for businesses. 
              We make GDPR compliance simple, effective, and user-friendly.
            </p>
            <div className="flex items-center gap-4">
              <LangSwitcher />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#process')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.nav.process}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#cases')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.nav.cases}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#pricing')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.nav.pricing}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal & Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`/${locale}/privacy`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.footer.links.privacy}
                </a>
              </li>
              <li>
                <a
                  href={`/${locale}/cookies`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.footer.links.cookies}
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {content.footer.links.contact}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {content.footer.copyright}
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">
              Made with ❤️ for compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
