import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Calculator, RefreshCw, Copy, Building2, TrendingDown, DollarSign, Calendar } from 'lucide-react'
import { monthlyPayment } from '../lib/money'
import { initGA, track } from '../lib/ga'

export default function MortgagePage() {
  // Initialize GA4
  useEffect(() => {
    initGA()
  }, [])

  // State
  const [principal, setPrincipal] = useState<number>(() => Number(localStorage.getItem('wia_principal')) || 400000)
  const [years, setYears] = useState<number>(() => Number(localStorage.getItem('wia_years')) || 30)
  const [oldRate, setOldRate] = useState<number>(() => Number(localStorage.getItem('wia_oldRate')) || 6.63)
  const [newRate, setNewRate] = useState<number>(() => Number(localStorage.getItem('wia_newRate')) || 6.58)

  // Save to localStorage
  useEffect(() => { localStorage.setItem('wia_principal', String(principal)) }, [principal])
  useEffect(() => { localStorage.setItem('wia_years', String(years)) }, [years])
  useEffect(() => { localStorage.setItem('wia_oldRate', String(oldRate)) }, [oldRate])
  useEffect(() => { localStorage.setItem('wia_newRate', String(newRate)) }, [newRate])

  // Computations
  const oldMonthly = useMemo(() => monthlyPayment(principal, oldRate, years), [principal, oldRate, years])
  const newMonthly = useMemo(() => monthlyPayment(principal, newRate, years), [principal, newRate, years])
  const mortgageDelta = useMemo(() => oldMonthly - newMonthly, [oldMonthly, newMonthly])

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
    track('mortgage_calc', { principal, years, oldRate, newRate })
  }

  const handleCopy = () => {
    track('mortgage_copy')
    copy(`Старая ставка: ${fmtUSD(oldMonthly)} | Новая ставка: ${fmtUSD(newMonthly)} | Экономия: ${fmtUSD(mortgageDelta)}`)
  }

  const handleReset = () => {
    track('mortgage_reset')
    setPrincipal(400000)
    setYears(30)
    setOldRate(6.63)
    setNewRate(6.58)
  }

  return (
    <>
      <Helmet>
        <title>Ипотечный калькулятор | Wallet Impact - Расчет платежей и экономии</title>
        <meta name="description" content="Рассчитайте ежемесячные платежи по ипотеке, сравните разные процентные ставки и узнайте, сколько вы сэкономите при рефинансировании." />
        <meta name="keywords" content="ипотечный калькулятор, расчет ипотеки, ежемесячные платежи, рефинансирование ипотеки, процентные ставки" />
        <meta property="og:title" content="Ипотечный калькулятор | Wallet Impact" />
        <meta property="og:description" content="Рассчитайте ежемесячные платежи по ипотеке и экономию при рефинансировании" />
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
            <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-600/30 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Ипотечный калькулятор
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Рассчитайте ежемесячные платежи по ипотеке и сравните разные процентные ставки
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
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Параметры кредита
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Сумма кредита ($)" 
                  value={principal} 
                  onChange={setPrincipal} 
                  step={1000} 
                />
                <LabeledNumber 
                  label="Срок кредита (лет)" 
                  value={years} 
                  onChange={setYears} 
                  step={1} 
                />
              </div>
            </div>

            {/* Процентные ставки */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-400" />
                Процентные ставки
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Старая ставка (%)" 
                  value={oldRate} 
                  onChange={setOldRate} 
                  step={0.01} 
                />
                <LabeledNumber 
                  label="Новая ставка (%)" 
                  value={newRate} 
                  onChange={setNewRate} 
                  step={0.01} 
                />
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultBox title="Платеж (старая ставка)" value={fmtUSD(oldMonthly)} />
            <ResultBox title="Платеж (новая ставка)" value={fmtUSD(newMonthly)} />
            <ResultBox title="Экономия в месяц" value={fmtUSD(mortgageDelta)} accent />
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap gap-3 mt-6">
            <ActionButton icon={Calculator} label="Рассчитать" onClick={handleCalc} />
            <ActionButton icon={RefreshCw} label="Сбросить" onClick={handleReset} />
            <ActionButton icon={Copy} label="Копировать результат" onClick={handleCopy} />
          </div>

          {/* Подсказка */}
          <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-800/30 rounded-xl">
            <p className="text-sm text-emerald-300">
              💡 <strong>Совет:</strong> Покупка дисконтных пунктов снижает ежемесячные платежи, 
              но требует дополнительных затрат. Рассчитайте время окупаемости.
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
            <h3 className="text-lg font-semibold text-white mb-3">Как это работает</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Калькулятор использует стандартную формулу аннуитетных платежей для расчета 
              ежемесячных взносов по ипотеке. Сравнение старой и новой ставки показывает 
              потенциальную экономию при рефинансировании.
            </p>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Когда рефинансировать</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Рефинансирование имеет смысл, если новая ставка на 0.5-1% ниже текущей 
              и вы планируете оставаться в доме достаточно долго для окупаемости 
              затрат на рефинансирование.
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
        className="w-full rounded-xl bg-slate-950/50 border border-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-white"
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
          ? 'border-emerald-700/60 text-emerald-300' 
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