import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Building2, GraduationCap, Fuel } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/mortgage', label: 'Mortgage', icon: Building2 },
    { path: '/student-loan', label: 'Student Loans', icon: GraduationCap },
    { path: '/gas', label: 'Gas', icon: Fuel },
  ]

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-green-500/30 transition-all duration-500 overflow-hidden border border-slate-200"
            >
              {/* Cash & Clash Logo - Exact Figma Copy */}
              <div className="relative text-center transform group-hover:scale-105 transition-transform duration-300">
                {/* cash - Top */}
                <div className="text-green-500 font-bold text-2xl leading-none mb-1 tracking-wide">
                  cash
                </div>
                
                {/* & - Center */}
                <div className="text-black font-bold text-lg leading-none mb-1">
                  &
                </div>
                
                {/* clash - Bottom */}
                <div className="text-red-500 font-bold text-2xl leading-none tracking-wide">
                  clash
                </div>
              </div>
            </motion.div>
            
            <div className="group-hover:transform group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-black text-white group-hover:text-green-400 transition-colors duration-300 tracking-tight">
                Cash & Clash
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">Financial Calculators</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-green-600/20 text-green-400 border border-green-600/30 shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 hover:shadow-md'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 