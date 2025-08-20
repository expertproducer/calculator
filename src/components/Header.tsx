import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calculator, Home, Building2, GraduationCap, Fuel } from 'lucide-react'

export default function Header() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Главная', icon: Home },
    { path: '/mortgage', label: 'Ипотека', icon: Building2 },
    { path: '/student-loan', label: 'Студенческие кредиты', icon: GraduationCap },
    { path: '/gas', label: 'Бензин', icon: Fuel },
  ]

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип и название */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <Calculator className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                Wallet Impact
              </h1>
              <p className="text-xs text-slate-400">Финансовые калькуляторы</p>
            </div>
          </Link>

          {/* Навигация */}
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
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Мобильное меню */}
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