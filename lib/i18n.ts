// Next.js built-in i18n helper: load per-locale JSON dictionaries
// and merge with English fallback to avoid missing keys.

import { LOCALES } from './locales'

export type Locale = typeof LOCALES[number]

type AnyRecord = Record<string, any>

function isObject(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge<T extends AnyRecord, U extends AnyRecord>(base: T, override: U): T & U {
  const result: AnyRecord = { ...base }
  for (const key of Object.keys(override)) {
    const b = (base as AnyRecord)[key]
    const o = (override as AnyRecord)[key]
    if (isObject(b) && isObject(o)) {
      result[key] = deepMerge(b, o)
    } else {
      result[key] = o
    }
  }
  return result as T & U
}

async function loadMessages(locale: Locale): Promise<AnyRecord> {
  try {
    // Dynamic import of JSON messages (tree-shaken per locale)
    const mod = await import(`../locales/${locale}.json`)
    return (mod as any).default || mod
  } catch {
    return {}
  }
}

// Public API kept the same to minimize changes in pages/components
export async function getContent(locale: Locale): Promise<AnyRecord> {
  const en = await loadMessages('en')
  if (locale === 'en') return en
  const overrides = await loadMessages(locale)
  return deepMerge(en, overrides)
}

