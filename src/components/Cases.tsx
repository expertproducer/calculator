import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { getContent, Locale } from '../lib/i18n';

interface CasesProps {
  locale: Locale;
}

export default function Cases({ locale }: CasesProps) {
  const content = getContent(locale);

  return (
    <section id="cases" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {content.cases.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.cases.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {content.cases.cards.map((caseStudy, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-200"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  {caseStudy.industry}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Before</h4>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {caseStudy.before}
                    </p>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">After</h4>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {caseStudy.after}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Results</span>
                  </div>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• GDPR compliance achieved</li>
                    <li>• User experience improved</li>
                    <li>• Legal risk eliminated</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-6 py-4 shadow-lg">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <span className="text-gray-900 dark:text-white font-medium">
              Ready to see similar results for your business?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
