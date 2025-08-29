import { ArrowRight, Clock, Star } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 dark:bg-green-900/30 rounded-full mb-6">
            <Star className="text-green-600 dark:text-green-400 w-4 h-4" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Final CTA</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-8 tracking-tight leading-none">
            Ready to get
            <span className="text-green-600 dark:text-green-400"> compliant</span>?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Transform your cookie banners from legal liability into user-friendly compliance. 
            No dark patterns, just clean implementation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 shadow-lg hover:shadow-xl text-lg"
            >
              <span>Fix my banner</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-12 py-5 border border-gray-300/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl font-medium rounded-2xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 shadow-sm hover:shadow-lg text-lg"
            >
              <span>Free quick check</span>
            </a>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">We reply within 24h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
