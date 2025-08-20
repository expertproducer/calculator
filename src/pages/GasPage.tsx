import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Calculator, RefreshCw, Copy, Fuel, TrendingUp, Car } from 'lucide-react'
import { gasImpact } from '../lib/money'
import { initGA, track } from '../lib/ga'

export default function GasPage() {
  // Initialize GA4
  useEffect(() => {
    initGA()
  }, [])

  // State
  const [gallons, setGallons] = useState<number>(() => Number(localStorage.getItem('wia_gallons')) || 60)
  const [deltaPerGallon, setDeltaPerGallon] = useState<number>(() => Number(localStorage.getItem('wia_dpg')) || 0.10)

  // Save to localStorage
  useEffect(() => { localStorage.setItem('wia_gallons', String(gallons)) }, [gallons])
  useEffect(() => { localStorage.setItem('wia_dpg', String(deltaPerGallon)) }, [deltaPerGallon])

  // Computations
  const monthlyImpact = useMemo(() => gasImpact(gallons, deltaPerGallon), [gallons, deltaPerGallon])
  const yearlyImpact = useMemo(() => monthlyImpact * 12, [monthlyImpact])
  const weeklyImpact = useMemo(() => monthlyImpact / 4, [monthlyImpact])

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
    track('gas_calc', { gallons, deltaPerGallon })
  }

  const handleCopy = () => {
    track('gas_copy')
    copy(`Влияние на бензин: ${fmtUSD(monthlyImpact)}/месяц • ${fmtUSD(yearlyImpact)}/год • ${fmtUSD(weeklyImpact)}/неделю`)
  }

  const handleReset = () => {
    track('gas_reset')
    setGallons(60)
    setDeltaPerGallon(0.10)
  }

  return (
    <>
      <Helmet>
        <title>Калькулятор расходов на бензин | Wallet Impact - Анализ влияния цен</title>
        <meta name="description" content="Анализируйте влияние изменения цен на бензин на ваш бюджет. Рассчитайте месячные и годовые расходы." />
        <meta name="keywords" content="калькулятор бензина, расходы на топливо, влияние цен на бензин, планирование бюджета на транспорт" />
        <meta property="og:title" content="Калькулятор расходов на бензин | Wallet Impact" />
        <meta property="og:description" content="Анализируйте влияние изменения цен на бензин на ваш бюджет" />
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
            <div className="w-12 h-12 bg-amber-600/20 border border-amber-600/30 rounded-xl flex items-center justify-center">
              <Fuel className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Калькулятор расходов на бензин
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Анализируйте влияние изменения цен на бензин на ваш бюджет
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
            {/* Потребление бензина */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-400" />
                Потребление бензина
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Галлонов в месяц" 
                  value={gallons} 
                  onChange={setGallons} 
                  step={1} 
                />
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Примерно галлонов в неделю</div>
                  <div className="text-lg font-semibold text-amber-400">
                    {(gallons / 4).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Изменение цен */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Изменение цен
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Изменение цены за галлон ($)" 
                  value={deltaPerGallon} 
                  onChange={setDeltaPerGallon} 
                  step={0.01} 
                />
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Влияние на 1 галлон</div>
                  <div className={`text-lg font-semibold ${deltaPerGallon >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {deltaPerGallon >= 0 ? '+' : ''}{fmtUSD(deltaPerGallon)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Результаты */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultBox title="Влияние в месяц" value={fmtUSD(monthlyImpact)} />
            <ResultBox title="Влияние в неделю" value={fmtUSD(weeklyImpact)} />
            <ResultBox title="Влияние в год" value={fmtUSD(yearlyImpact)} accent />
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap gap-3 mt-6">
            <ActionButton icon={Calculator} label="Рассчитать" onClick={handleCalc} />
            <ActionButton icon={RefreshCw} label="Сбросить" onClick={handleReset} />
            <ActionButton icon={Copy} label="Копировать результат" onClick={handleCopy} />
          </div>

          {/* Подсказка */}
          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/30 rounded-xl">
            <p className="text-sm text-amber-300">
              🚗 <strong>Совет:</strong> Водители и курьеры: отслеживайте реальное потребление бензина 
              в течение 2 недель — не угадывайте.
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
            <h3 className="text-lg font-semibold text-white mb-3">Как рассчитывается влияние</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Влияние = Количество галлонов × Изменение цены за галлон. 
              Положительное значение означает увеличение расходов, 
              отрицательное — экономию.
            </p>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Стратегии экономии</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Отслеживайте цены на бензин в разных районах, используйте 
              приложения для поиска лучших цен, планируйте маршруты 
              для минимизации пробега.
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
        className="w-full rounded-xl bg-slate-950/50 border border-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-white"
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
          ? 'border-amber-700/60 text-amber-300' 
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