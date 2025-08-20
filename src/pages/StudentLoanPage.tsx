import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Calculator, RefreshCw, Copy, GraduationCap, DollarSign, TrendingUp } from 'lucide-react'
import { monthlyInterest } from '../lib/money'
import { initGA, track } from '../lib/ga'

export default function StudentLoanPage() {
  // Initialize GA4
  useEffect(() => {
    initGA()
  }, [])

  // State
  const [balance, setBalance] = useState<number>(() => Number(localStorage.getItem('wia_balance')) || 20000)
  const [rate, setRate] = useState<number>(() => Number(localStorage.getItem('wia_srate')) || 5.5)

  // Save to localStorage
  useEffect(() => { localStorage.setItem('wia_balance', String(balance)) }, [balance])
  useEffect(() => { localStorage.setItem('wia_srate', String(rate)) }, [rate])

  // Computations
  const monthlyInterestAmount = useMemo(() => monthlyInterest(balance, rate), [balance, rate])
  const dailyInterest = useMemo(() => monthlyInterestAmount / 30, [monthlyInterestAmount])
  const yearlyInterest = useMemo(() => monthlyInterestAmount * 12, [monthlyInterestAmount])

  const fmtUSD = (n: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(Number.isFinite(n) ? n : 0)

  const copy = async (text: string) => {
    try { 
      await navigator.clipboard.writeText(text)
      alert('Скопировано')
    } catch {}
  }

  const handleCalc = () => {
    track('student_calc', { balance, rate })
  }

  const handleCopy = () => {
    track('student_copy')
    copy(`Проценты в месяц: ${fmtUSD(monthlyInterestAmount)} • В день: ${fmtUSD(dailyInterest)} • В год: ${fmtUSD(yearlyInterest)}`)
  }

  const handleReset = () => {
    track('student_reset')
    setBalance(20000)
    setRate(5.5)
  }

  return (
    <>
      <Helmet>
        <title>Калькулятор студенческих кредитов | Wallet Impact - Расчет процентов</title>
        <meta name="description" content="Рассчитайте проценты по студенческим кредитам, ежемесячные и ежедневные начисления. Планируйте выплаты с умом." />
        <meta name="keywords" content="студенческие кредиты, калькулятор процентов, расчет кредита, проценты по кредиту, планирование выплат" />
        <meta property="og:title" content="Калькулятор студенческих кредитов | Wallet Impact" />
        <meta property="og:description" content="Рассчитайте проценты по студенческим кредитам и планируйте выплаты" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Заголовок страницы */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Калькулятор студенческих кредитов
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Оцените проценты по студенческим кредитам и планируйте выплаты
          </p>
        </motion.div>

        {/* Основной калькулятор */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Параметры кредита */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                Параметры кредита
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Баланс кредита ($)" 
                  value={balance} 
                  onChange={setBalance} 
                  step={100} 
                />
                <LabeledNumber 
                  label="Годовая ставка (%)" 
                  value={rate} 
                  onChange={setRate} 
                  step={0.01} 
                />
              </div>
            </div>

            {/* Информация о ставке */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Информация о ставке
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Месячная ставка</div>
                  <div className="text-lg font-semibold text-blue-400">
                    {(rate / 12).toFixed(4)}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Дневная ставка</div>
                  <div className="text-lg font-semibold text-emerald-400">
                    {(rate / 365).toFixed(4)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultBox title="Проценты в месяц" value={fmtUSD(monthlyInterestAmount)} />
            <ResultBox title="Проценты в день" value={fmtUSD(dailyInterest)} />
            <ResultBox title="Проценты в год" value={fmtUSD(yearlyInterest)} accent />
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap gap-3 mt-6">
            <ActionButton icon={Calculator} label="Рассчитать" onClick={handleCalc} />
            <ActionButton icon={RefreshCw} label="Сбросить" onClick={handleReset} />
            <ActionButton icon={Copy} label="Копировать результат" onClick={handleCopy} />
          </div>

          {/* Подсказка */}
          <div className="mt-4 p-4 bg-blue-900/20 border border-blue-800/30 rounded-xl">
            <p className="text-sm text-blue-300">
              ⚠️ <strong>Важно:</strong> Даже если у вас '$0 платеж', проценты могут продолжать начисляться. 
              Войдите в свой аккаунт и проверьте текущий статус.
            </p>
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Как рассчитываются проценты</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Проценты начисляются ежедневно на основе текущего баланса кредита. 
              Ежемесячная сумма процентов = (Баланс × Годовая ставка) ÷ 12. 
              Ежедневная сумма = Ежемесячная ÷ 30.
            </p>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Стратегии выплат</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Начните выплачивать проценты как можно раньше, даже если основной платеж не требуется. 
              Это предотвратит капитализацию процентов и рост общего долга.
            </p>
          </div>
        </motion.div>

        {/* Отказ от ответственности */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-slate-400">
            Не является финансовой консультацией. Данные остаются в вашем браузере.
          </p>
        </motion.div>
      </div>
    </>
  )
}

// Вспомогательные компоненты
function LabeledNumber({ label, value, onChange, step = 1 }: { 
  label: string; 
  value: number; 
  onChange: (v: number) => void; 
  step?: number; 
}) {
  return (
    <label className="block">
      <div className="text-sm text-slate-400 mb-2">{label}</div>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full rounded-xl bg-slate-950/50 border border-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-white"
      />
    </label>
  )
}

function ResultBox({ title, value, accent = false }: { 
  title: string; 
  value: string; 
  accent?: boolean; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-xl border px-4 py-3 text-center bg-slate-950/40 ${
        accent 
          ? 'border-blue-700/60 text-blue-300' 
          : 'border-slate-800 text-slate-200'
      }`}
    >
      <div className="text-xs uppercase tracking-wide opacity-70 mb-1">{title}</div>
      <div className="font-semibold tabular-nums text-lg">{value}</div>
    </motion.div>
  )
}

function ActionButton({ icon: Icon, label, onClick }: { 
  icon: any; 
  label: string; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm hover:bg-slate-800/70 transition shadow text-white"
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  )
} 