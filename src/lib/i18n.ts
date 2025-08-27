import enContent from '../content/en.json';
import deContent from '../content/de.json';
import frContent from '../content/fr.json';

export type Locale = 'en' | 'de' | 'fr';

export const locales: Locale[] = ['en', 'de', 'fr'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français'
};

export const content = {
  en: enContent,
  de: deContent,
  fr: frContent
};

export function getContent(locale: Locale) {
  return content[locale] || content.en;
}

export function getLocaleFromPath(pathname: string): Locale {
  const path = pathname.split('/')[1];
  return locales.includes(path as Locale) ? (path as Locale) : 'en';
}

export function getPathWithLocale(pathname: string, locale: Locale): string {
  if (pathname === '/') {
    return `/${locale}`;
  }
  
  const currentLocale = getLocaleFromPath(pathname);
  if (currentLocale === locale) {
    return pathname;
  }
  
  return pathname.replace(`/${currentLocale}`, `/${locale}`);
}
