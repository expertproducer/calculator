import { Check, Star } from 'lucide-react';
import { getContent, Locale } from '../lib/i18n';

interface PricingProps {
  locale: Locale;
}

export default function Pricing({ locale }: PricingProps) {
  const content = getContent(locale);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {content.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {content.pricing.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {content.pricing.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 border rounded-2xl p-8 hover:shadow-xl transition-all duration-200 ${
                index === 1
                  ? 'border-blue-500 dark:border-blue-400 shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Popular badge */}
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {plan.price}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('#contact')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  index === 1
                    ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {content.pricing.note}
          </p>
        </div>

        {/* Additional info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              What's included in all plans?
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2">
              <li>• Setup and configuration</li>
              <li>• Testing and validation</li>
              <li>• Documentation and training</li>
              <li>• 3 months of support</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
              Need a custom solution?
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              We can tailor our services to your specific requirements and budget.
            </p>
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
