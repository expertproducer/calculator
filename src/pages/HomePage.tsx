import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Building2, GraduationCap, Fuel, ArrowRight, Calculator, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const tools = [
    {
      title: 'Mortgage Calculator',
      description: 'Calculate monthly mortgage payments and compare different interest rates',
      icon: Building2,
      path: '/mortgage',
      color: 'emerald',
      features: ['Monthly payments', 'Rate comparison', 'Refinancing savings']
    },
    {
      title: 'Student Loan Calculator',
      description: 'Estimate student loan interest and plan your payments',
      icon: GraduationCap,
      path: '/student-loan',
      color: 'blue',
      features: ['Interest calculation', 'Daily accrual', 'Payment planning']
    },
    {
      title: 'Gas Expense Calculator',
      description: 'Analyze how gas price changes impact your budget',
      icon: Fuel,
      path: '/gas',
      color: 'amber',
      features: ['Price impact', 'Monthly expenses', 'Profile analysis']
    }
  ]

  const benefits = [
    {
      icon: Calculator,
      title: 'Accurate Calculations',
      description: 'We use proven financial formulas for precise results'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All data stays in your browser, nothing is sent to servers'
    },
    {
      icon: Zap,
      title: 'Fast & Simple',
      description: 'Intuitive interface for instant calculations'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Wallet Impact - Financial Calculators for Smart Budgeting</title>
        <meta name="description" content="Professional financial calculators for mortgage, student loans, and gas expenses. Plan your budget wisely." />
        <meta name="keywords" content="financial calculators, mortgage, student loans, gas expenses, budget planning" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Plan your budget with{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              confidence
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional financial calculators help you make informed decisions 
            about mortgages, loans, and expense planning
          </p>
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Our Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              const colorClasses = {
                emerald: 'border-emerald-600/30 hover:border-emerald-500/50',
                blue: 'border-blue-600/30 hover:border-blue-500/50',
                amber: 'border-amber-600/30 hover:border-amber-500/50'
              }
              
              return (
                <motion.div
                  key={tool.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className={`bg-slate-900/60 border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${colorClasses[tool.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${tool.color}-500 to-${tool.color}-600 rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className={`w-1.5 h-1.5 bg-${tool.color}-400 rounded-full`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={tool.path}
                    className={`inline-flex items-center gap-2 text-${tool.color}-400 hover:text-${tool.color}-300 font-medium transition-colors`}
                  >
                    Try it <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-emerald-600/20 border border-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-600/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to start planning?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Choose the tool you need and start analyzing your finances today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  <tool.icon className="w-5 h-5" />
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
} 