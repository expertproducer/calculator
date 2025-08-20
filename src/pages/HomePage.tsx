import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Building2, GraduationCap, Fuel, ArrowRight, Calculator, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const tools = [
    {
      title: 'Ипотечный калькулятор',
      description: 'Рассчитайте ежемесячные платежи по ипотеке и сравните разные процентные ставки',
      icon: Building2,
      path: '/mortgage',
      color: 'emerald',
      features: ['Ежемесячные платежи', 'Сравнение ставок', 'Экономия при рефинансировании']
    },
    {
      title: 'Калькулятор студенческих кредитов',
      description: 'Оцените проценты по студенческим кредитам и планируйте выплаты',
      icon: GraduationCap,
      path: '/student-loan',
      color: 'blue',
      features: ['Расчет процентов', 'Ежедневные начисления', 'Планирование выплат']
    },
    {
      title: 'Калькулятор расходов на бензин',
      description: 'Анализируйте влияние изменения цен на бензин на ваш бюджет',
      icon: Fuel,
      path: '/gas',
      color: 'amber',
      features: ['Влияние цен', 'Месячные расходы', 'Анализ профилей']
    }
  ]

  const benefits = [
    {
      icon: Calculator,
      title: 'Точные расчеты',
      description: 'Используем проверенные финансовые формулы для точных результатов'
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Все данные остаются в вашем браузере, ничего не отправляется на серверы'
    },
    {
      icon: Zap,
      title: 'Быстро и просто',
      description: 'Интуитивный интерфейс для мгновенных расчетов'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Wallet Impact - Главная | Финансовые калькуляторы</title>
        <meta name="description" content="Профессиональные финансовые калькуляторы для планирования бюджета. Ипотека, студенческие кредиты, расходы на бензин." />
        <meta name="keywords" content="финансовые калькуляторы, ипотека, студенческие кредиты, бензин, бюджет" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Планируйте свой бюджет с{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              умом
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Профессиональные финансовые калькуляторы помогут вам принимать обоснованные решения 
            по ипотеке, кредитам и планированию расходов
          </p>
        </motion.div>

        {/* Инструменты */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Наши инструменты
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
                    Попробовать <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Преимущества */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Почему выбирают нас
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

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-600/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Готовы начать планирование?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Выберите нужный инструмент и начните анализировать свои финансы уже сегодня
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