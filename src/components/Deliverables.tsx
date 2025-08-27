import { Package, CheckCircle, FileText, Settings, Shield } from 'lucide-react';
import { getContent, Locale } from '../lib/i18n';

interface DeliverablesProps {
  locale: Locale;
}

export default function Deliverables({ locale }: DeliverablesProps) {
  const content = getContent(locale);

  const deliverableIcons = [
    <Settings key="1" className="w-6 h-6" />,
    <Shield key="2" className="w-6 h-6" />,
    <FileText key="3" className="w-6 h-6" />,
    <Package key="4" className="w-6 h-6" />,
    <CheckCircle key="5" className="w-6 h-6" />
  ];

  return (
    <section id="deliverables" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {content.deliverables.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to maintain compliance and manage your cookie consent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.deliverables.items.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                  <div className="text-blue-600 dark:text-blue-400">
                    {deliverableIcons[index]}
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional value proposition */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 shadow-lg">
            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-900 dark:text-white font-medium">
              Plus ongoing support and updates for 3 months
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
