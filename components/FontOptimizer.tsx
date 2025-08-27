'use client'

import { useEffect, useState } from 'react'

interface FontOptimizerProps {
  fonts?: Array<{
    family: string
    weights: number[]
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
    preload?: boolean
    fallback?: string[]
  }>
  children?: React.ReactNode
}

export default function FontOptimizer({ 
  fonts = [
    {
      family: 'Inter',
      weights: [400, 500, 600, 700],
      display: 'swap',
      preload: true,
      fallback: ['system-ui', 'sans-serif']
    }
  ], 
  children 
}: FontOptimizerProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    // Проверяем загрузку шрифтов
    if ('fonts' in document) {
      Promise.all(
        fonts.map(font => 
          Promise.all(
            font.weights.map(weight =>
              (document as any).fonts.load(`${weight} 1em "${font.family}"`)
            )
          )
        )
      ).then(() => {
        setFontsLoaded(true)
      }).catch(() => {
        // Fallback если шрифты не загрузились
        setFontsLoaded(true)
      })
    } else {
      // Fallback для браузеров без Font Loading API
      setFontsLoaded(true)
    }
  }, [fonts])

  // CSS для оптимизации шрифтов
  const fontCSS = fonts.map(font => `
    @font-face {
      font-family: '${font.family}';
      font-display: ${font.display || 'swap'};
      font-weight: ${font.weights.join(' ')};
      src: local('${font.family}'), 
           url('/fonts/${font.family.toLowerCase()}-${font.weights.join('-')}.woff2') format('woff2'),
           url('/fonts/${font.family.toLowerCase()}-${font.weights.join('-')}.woff') format('woff');
    }
  `).join('')

  return (
    <>
      {/* Preload critical fonts */}
      {fonts.filter(f => f.preload).map(font => 
        font.weights.map(weight => (
          <link
            key={`${font.family}-${weight}`}
            rel="preload"
            href={`/fonts/${font.family.toLowerCase()}-${weight}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))
      )}

      {/* Font CSS */}
      <style dangerouslySetInnerHTML={{ __html: fontCSS }} />

      {/* Font loading indicator */}
      {!fontsLoaded && (
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: ${fonts.map(f => f.fallback?.join(', ') || 'system-ui, sans-serif').join(', ')};
            }
          `
        }} />
      )}

      {/* Content */}
      <div className={fontsLoaded ? 'fonts-loaded' : 'fonts-loading'}>
        {children}
      </div>

      {/* Font loading performance monitoring */}
      {typeof window !== 'undefined' && 'performance' in window && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor font loading performance
              if ('performance' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.name.includes('font')) {
                      console.log('Font loaded:', entry.name, entry.duration + 'ms');
                    }
                  }
                });
                observer.observe({ entryTypes: ['resource'] });
              }
            `
          }}
        />
      )}
    </>
  )
}

// Хук для отслеживания загрузки шрифтов
export function useFontLoading(fontFamily: string) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if ('fonts' in document) {
      (document as any).fonts.load(`1em "${fontFamily}"`).then(() => {
        setIsLoaded(true)
      })
    } else {
      setIsLoaded(true)
    }
  }, [fontFamily])

  return isLoaded
}

// Компонент для условной загрузки шрифтов
interface ConditionalFontProps {
  fontFamily: string
  weight?: number
  children: React.ReactNode
  fallback?: string
  className?: string
}

export function ConditionalFont({ 
  fontFamily, 
  weight = 400, 
  children, 
  fallback = 'system-ui, sans-serif',
  className = ''
}: ConditionalFontProps) {
  const isLoaded = useFontLoading(fontFamily)

  return (
    <span
      className={className}
      style={{
        fontFamily: isLoaded ? `"${fontFamily}", ${fallback}` : fallback,
        fontWeight: weight
      }}
    >
      {children}
    </span>
  )
}

// Компонент для оптимизации критических шрифтов
export function CriticalFonts() {
  return (
    <>
      {/* Preload Inter font for better performance */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      
      {/* Critical font CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Font display optimization */
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          /* Font loading optimization */
          .fonts-loading {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          .fonts-loaded {
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `
      }} />
    </>
  )
}
