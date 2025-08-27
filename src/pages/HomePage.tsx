import { Locale } from '../lib/i18n';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Services from '../components/Services';
import Process from '../components/Process';
import Deliverables from '../components/Deliverables';
import Benefits from '../components/Benefits';
import Cases from '../components/Cases';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <Hero locale={locale} />
        <Problem locale={locale} />
        <Services locale={locale} />
        <Process locale={locale} />
        <Deliverables locale={locale} />
        <Benefits locale={locale} />
        <Cases locale={locale} />
        <Pricing locale={locale} />
        <FAQ locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
