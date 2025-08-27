import { ArrowRight, CheckCircle } from 'lucide-react';
import { getContent, Locale } from '../lib/i18n';

interface ProcessProps {
  locale: Locale;
}

export default function Process({ locale }: ProcessProps) {
  const content = getContent(locale);

  return (
    <section id="process" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {content.process.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our proven 5-step process ensures your cookie compliance is implemented correctly
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-5 gap-8">
            {content.process.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number and content */}
                <div className="text-center">
                  <div className="relative z-10 w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Arrow connector */}
                {index < content.process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Outcome section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Final Outcome
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              No non-essential cookies before consent; compliant banner; consent is recorded and exportable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
