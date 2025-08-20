declare global { 
  interface Window { 
    gtag?: (...args:any[])=>void 
    dataLayer?: any[]
  } 
}

export const GA_ID = import.meta.env.VITE_GA_ID

export function initGA() {
  if (!GA_ID) return
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  
  window.dataLayer = window.dataLayer || []
  function gtag(...args: any[]){ 
    window.dataLayer!.push(args) 
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

export function track(event: string, params?: Record<string, any>) {
  if (window.gtag && GA_ID) window.gtag('event', event, params || {})
} 