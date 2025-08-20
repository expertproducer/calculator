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
      alert('Copied')
    } catch {}
  }

  const handleCalc = () => {
    track('gas_calc', { gallons, deltaPerGallon })
  }

  const handleCopy = () => {
    track('gas_copy')
    copy(`Gas impact: ${fmtUSD(monthlyImpact)}/month • ${fmtUSD(yearlyImpact)}/year • ${fmtUSD(weeklyImpact)}/week`)
  }

  const handleReset = () => {
    track('gas_reset')
    setGallons(60)
    setDeltaPerGallon(0.10)
  }

  return (
    <>
      <Helmet>
        <title>Gas Expense Calculator | Wallet Impact - Price Impact Analysis</title>
        <meta name="description" content="Analyze how gas price changes impact your budget. Calculate monthly and yearly expenses." />
        <meta name="keywords" content="gas calculator, fuel expenses, gas price impact, budget planning, transportation costs" />
        <meta property="og:title" content="Gas Expense Calculator | Wallet Impact" />
        <meta property="og:description" content="Analyze how gas price changes impact your budget" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page header */}
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
              Gas Expense Calculator
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Analyze how gas price changes impact your budget
          </p>
        </motion.div>

        {/* Main calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gas consumption */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-amber-400" />
                Gas Consumption
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Gallons per month" 
                  value={gallons} 
                  onChange={setGallons} 
                  step={1} 
                />
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Approx. gallons per week</div>
                  <div className="text-lg font-semibold text-amber-400">
                    {(gallons / 4).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Price changes */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Price Changes
              </h2>
              <div className="space-y-4">
                <LabeledNumber 
                  label="Price change per gallon ($)" 
                  value={deltaPerGallon} 
                  onChange={setDeltaPerGallon} 
                  step={0.01} 
                />
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-lg">
                  <div className="text-xs text-slate-400 mb-1">Impact per gallon</div>
                  <div className={`text-lg font-semibold ${deltaPerGallon >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {deltaPerGallon >= 0 ? '+' : ''}{fmtUSD(deltaPerGallon)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultBox title="Monthly Impact" value={fmtUSD(monthlyImpact)} />
            <ResultBox title="Weekly Impact" value={fmtUSD(weeklyImpact)} />
            <ResultBox title="Yearly Impact" value={fmtUSD(yearlyImpact)} accent />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <ActionButton icon={Calculator} label="Calculate" onClick={handleCalc} />
            <ActionButton icon={RefreshCw} label="Reset" onClick={handleReset} />
            <ActionButton icon={Copy} label="Copy Result" onClick={handleCopy} />
          </div>

          {/* Tip */}
          <div className="mt-4 p-4 bg-amber-900/20 border border-amber-800/30 rounded-xl">
            <p className="text-sm text-amber-300">
              🚗 <strong>Tip:</strong> Drivers and couriers: track actual gas consumption 
              for 2 weeks — don't guess.
            </p>
          </div>
        </motion.div>

        {/* Additional information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">How impact is calculated</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Impact = Number of gallons × Price change per gallon. 
              Positive values mean increased expenses, 
              negative values mean savings.
            </p>
          </div>
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Savings strategies</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Track gas prices in different areas, use apps to find better prices, 
              plan routes to minimize mileage.
            </p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-slate-400">
            Not financial advice. Data stays in your browser.
          </p>
        </motion.div>
      </div>
    </>
  )
}

// Helper components
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