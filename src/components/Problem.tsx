import { AlertTriangle, XCircle, AlertCircle, Clock, Ban } from 'lucide-react';
import { getContent, Locale } from '../lib/i18n';

interface ProblemProps {
  locale: Locale;
}

export default function Problem({ locale }: ProblemProps) {
  const content = getContent(locale);

  const problemIcons = [
    <XCircle key="1" className="w-6 h-6 text-red-500" />,
    <AlertTriangle key="2" className="w-6 h-6 text-yellow-500" />,
    <AlertCircle key="3" className="w-6 h-6 text-orange-500" />,
    <Clock key="4" className="w-6 h-6 text-blue-500" />,
    <Ban key="5" className="w-6 h-6 text-purple-500" />
  ];

  return (
    <section id="problem" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {content.problem.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These common issues can lead to GDPR violations, fines, and poor user experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.problem.points.map((point, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {problemIcons[index]}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warning callout */}
        <div className="mt-12 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Non-compliance risks
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300">
                GDPR violations can result in fines up to €20 million or 4% of global annual revenue, 
                plus potential legal action and damage to your brand reputation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
