import { getContent, Locale } from '../lib/i18n';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface CookiesPageProps {
  locale: Locale;
}

export default function CookiesPage({ locale }: CookiesPageProps) {
  // Убираем неиспользуемую переменную content
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Cookie Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2>1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience and understand how you use our site.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Preference cookies:</strong> Remember your language and other preferences</li>
            </ul>

            <h2>3. Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages, such as:
            </p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Google Fonts (functionality)</li>
            </ul>

            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            <ul>
              <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
              <li>Cookie preferences: Use our cookie preference center to manage consent</li>
              <li>Third-party opt-outs: Visit individual service providers' opt-out pages</li>
            </ul>

            <h2>5. Your Choices</h2>
            <p>
              When you first visit our website, you'll see a cookie banner that allows you to:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Decline non-essential cookies</li>
              <li>Customize your preferences</li>
            </ul>

            <h2>6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes 
              by posting the new policy on this page.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us through our contact form.
            </p>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
