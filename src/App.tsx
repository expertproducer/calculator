import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { locales, Locale } from './lib/i18n';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import './index.css';

function App() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    // Detect user's preferred language
    const userLang = navigator.language.split('-')[0];
    if (locales.includes(userLang as Locale)) {
      setLocale(userLang as Locale);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redirect root to default locale */}
        <Route path="/" element={<Navigate to={`/${locale}`} replace />} />
        
        {/* Localized routes */}
        {locales.map((lang) => (
          <Route key={lang} path={`/${lang}`} element={<HomePage locale={lang} />} />
        ))}
        
        {/* Policy pages */}
        {locales.map((lang) => (
          <Route key={lang} path={`/${lang}/privacy`} element={<PrivacyPage locale={lang} />} />
        ))}
        
        {locales.map((lang) => (
          <Route key={lang} path={`/${lang}/cookies`} element={<CookiesPage locale={lang} />} />
        ))}
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to={`/${locale}`} replace />} />
      </Routes>
    </Router>
  );
}

export default App;

 