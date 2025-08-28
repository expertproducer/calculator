import { ArrowRight, Clock } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 via-primary-50/50 to-accent/5 dark:from-accent/10 dark:via-primary-900/20 dark:to-accent/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-accent/10 to-primary-300/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary-200/10 to-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8 tracking-tight leading-none">
            Ready to get
            <span className="text-accent"> compliant</span>?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Transform your cookie banners from legal liability into user-friendly compliance. 
            No dark patterns, just clean implementation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-accent hover:bg-accent/90 text-white font-medium rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 shadow-apple hover:shadow-apple-lg text-lg"
            >
              <span>Fix my banner</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-12 py-5 border border-gray-300/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 hover:border-accent hover:text-accent bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl font-medium rounded-2xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 shadow-sm hover:shadow-apple text-lg"
            >
              <span>Free quick check</span>
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-light">We reply within 24h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
