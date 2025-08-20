import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, RefreshCw, Download, Copy } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { initGA, track } from './lib/ga'
import { monthlyPayment, monthlyInterest, gasImpact } from './lib/money'

// ---------------------------------------------
// Utility helpers
// ---------------------------------------------
const fmtUSD = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0)

function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv = rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// ---------------------------------------------
// i18n (EN only as requested)
// ---------------------------------------------
const STR = {
  title: 'Wallet Impact App',
  subtitle: 'Plain-language money calculators for your month.',
  notAdvice: 'Not financial advice. Data stays in your browser.',
  lang: 'Language',
  mortgage: {
    title: 'Mortgage — monthly payment & delta',
    principal: 'Loan amount ($)',
    years: 'Term (years)',
    oldRate: 'Old rate (%)',
    newRate: 'New rate (%)',
    calc: 'Calculate',
    reset: 'Reset',
    copy: 'Copy result',
    tip: 'Buying points lowers payments but costs upfront — check payback time.',
  },
  student: {
    title: 'Student loan — interest estimate',
    balance: 'Balance ($)',
    rate: 'Annual rate (%)',
    calc: 'Calculate',
    reset: 'Reset',
    copy: 'Copy result',
    tip: 'Real talk: a \'$0 payment\' can still allow interest to creep. Log in and verify.',
  },
  gas: {
    title: 'Gas — price change impact',
    gallons: 'Gallons per month',
    delta: 'Price change per gallon ($)',
    calc: 'Calculate',
    reset: 'Reset',
    copy: 'Copy result',
    tip: 'Drivers & couriers: track actual gallons for 2 weeks — don\'t guess.',
  },
  grid: {
    title: 'Impact grid — quick view',
    ur: 'Urban renter: gallons/mo',
    sh: 'Suburban homeowner: gallons/mo',
    re: 'Retiree: gallons/mo',
    refresh: 'Refresh',
    export: 'Export CSV',
    note: 'Mortgage delta here uses your Old vs New rate above. For renters it\'s $0 by default.',
  },
}

// ---------------------------------------------
// Main Component
// ---------------------------------------------
export default function WalletImpactApp() {
  // Initialize GA4
  useEffect(() => {
    initGA()
  }, [])

  // Mortgage state
  const [principal, setPrincipal] = useState<number>(() => Number(localStorage.getItem('wia_principal')) || 400000)
  const [years, setYears] = useState<number>(() => Number(localStorage.getItem('wia_years')) || 30)
  const [oldRate, setOldRate] = useState<number>(() => Number(localStorage.getItem('wia_oldRate')) || 6.63)
  const [newRate, setNewRate] = useState<number>(() => Number(localStorage.getItem('wia_newRate')) || 6.58)

  // Student loan state
  const [balance, setBalance] = useState<number>(() => Number(localStorage.getItem('wia_balance')) || 20000)
  const [sRate, setSRate] = useState<number>(() => Number(localStorage.getItem('wia_srate')) || 5.5)

  // Gas state
  const [gallons, setGallons] = useState<number>(() => Number(localStorage.getItem('wia_gallons')) || 60)
  const [deltaPerGallon, setDeltaPerGallon] = useState<number>(() => Number(localStorage.getItem('wia_dpg')) || 0.10)

  // Grid profiles - более реалистичные значения по умолчанию
  const [urGallons, setUrGallons] = useState<number>(() => Number(localStorage.getItem('wia_ur')) || 25)
  const [shGallons, setShGallons] = useState<number>(() => Number(localStorage.getItem('wia_sh')) || 45)
  const [reGallons, setReGallons] = useState<number>(() => Number(localStorage.getItem('wia_re')) || 30)

  // Save to localStorage
  useEffect(() => { localStorage.setItem('wia_principal', String(principal)) }, [principal])
  useEffect(() => { localStorage.setItem('wia_years', String(years)) }, [years])
  useEffect(() => { localStorage.setItem('wia_oldRate', String(oldRate)) }, [oldRate])
  useEffect(() => { localStorage.setItem('wia_newRate', String(newRate)) }, [newRate])
  useEffect(() => { localStorage.setItem('wia_balance', String(balance)) }, [balance])
  useEffect(() => { localStorage.setItem('wia_srate', String(sRate)) }, [sRate])
  useEffect(() => { localStorage.setItem('wia_gallons', String(gallons)) }, [gallons])
  useEffect(() => { localStorage.setItem('wia_dpg', String(deltaPerGallon)) }, [deltaPerGallon])
  useEffect(() => { localStorage.setItem('wia_ur', String(urGallons)) }, [urGallons])
  useEffect(() => { localStorage.setItem('wia_sh', String(shGallons)) }, [shGallons])
  useEffect(() => { localStorage.setItem('wia_re', String(reGallons)) }, [reGallons])

  // Computations
  const oldMonthly = useMemo(() => monthlyPayment(principal, oldRate, years), [principal, oldRate, years])
  const newMonthly = useMemo(() => monthlyPayment(principal, newRate, years), [principal, newRate, years])
  const mortgageDelta = useMemo(() => oldMonthly - newMonthly, [oldMonthly, newMonthly])

  const studentMonthly = useMemo(() => monthlyInterest(balance, sRate), [balance, sRate])
  const studentDaily = useMemo(() => studentMonthly / 30, [studentMonthly])

  const gasMonthly = useMemo(() => gasImpact(gallons, deltaPerGallon), [gallons, deltaPerGallon])

  const gridData = useMemo(() => {
    return [
      {
        profile: 'Urban renter',
        mortgage: 0,
        student: studentMonthly,
        gas: urGallons * deltaPerGallon,
      },
      {
        profile: 'Suburban homeowner',
        mortgage: Math.max(0, mortgageDelta), // homeowners only
        student: 0,
        gas: shGallons * deltaPerGallon,
      },
      {
        profile: 'Retiree',
        mortgage: 0,
        student: 0,
        gas: reGallons * deltaPerGallon,
      },
    ]
  }, [studentMonthly, urGallons, deltaPerGallon, mortgageDelta, shGallons, reGallons])

  const copy = async (text: string) => {
    try { 
      await navigator.clipboard.writeText(text)
      alert('Copied')
    } catch {}
  }

  const handleMortgageCalc = () => {
    track('mortgage_calc', { principal, years, oldRate, newRate })
  }

  const handleMortgageCopy = () => {
    track('mortgage_copy')
    copy(`Old: ${fmtUSD(oldMonthly)} | New: ${fmtUSD(newMonthly)} | Δ ${fmtUSD(mortgageDelta)}`)
  }

  const handleMortgageReset = () => {
    track('mortgage_reset')
    setPrincipal(400000)
    setYears(30)
    setOldRate(6.63)
    setNewRate(6.58)
  }

  const handleStudentCalc = () => {
    track('student_calc', { balance, rate: sRate })
  }

  const handleStudentCopy = () => {
    track('student_copy')
    copy(`Interest/mo ${fmtUSD(studentMonthly)} • /day ${fmtUSD(studentDaily)}`)
  }

  const handleStudentReset = () => {
    track('student_reset')
    setBalance(20000)
    setSRate(5.5)
  }

  const handleGasCalc = () => {
    track('gas_calc', { gallons, deltaPerGallon })
  }

  const handleGasCopy = () => {
    track('gas_copy')
    copy(`Gas impact ${fmtUSD(gasMonthly)}/mo`)
  }

  const handleGasReset = () => {
    track('gas_reset')
    setGallons(60)
    setDeltaPerGallon(0.10)
  }

  const handleGridExport = () => {
    track('grid_export')
    downloadCSV('impact_grid.csv', [
      ['Profile','Mortgage_Delta_per_Month','Student_Interest_per_Month','Gas_Impact_per_Month'],
      ...gridData.map(r => [r.profile, r.mortgage.toFixed(2), r.student.toFixed(2), r.gas.toFixed(2)])
    ])
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{STR.title}</h1>
          <p className="text-slate-400 text-sm mt-1">{STR.subtitle}</p>
        </motion.div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 pb-10">
        {/* Mortgage */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{STR.mortgage.title}</h2>
            <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-800 px-2 py-1 rounded-full">evergreen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={STR.mortgage.principal} value={principal} onChange={setPrincipal} step={1000} />
            <LabeledNumber label={STR.mortgage.years} value={years} onChange={setYears} step={1} />
            <LabeledNumber label={STR.mortgage.oldRate} value={oldRate} onChange={setOldRate} step={0.01} />
            <LabeledNumber label={STR.mortgage.newRate} value={newRate} onChange={setNewRate} step={0.01} />
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <ResultBox title="Payment (old)" value={fmtUSD(oldMonthly)} />
            <ResultBox title="Payment (new)" value={fmtUSD(newMonthly)} />
            <ResultBox title="Saving/mo" value={fmtUSD(mortgageDelta)} accent />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={STR.mortgage.calc} onClick={handleMortgageCalc} />
            <ActionButton icon={RefreshCw} label={STR.mortgage.reset} onClick={handleMortgageReset} />
            <ActionButton icon={Copy} label={STR.mortgage.copy} onClick={handleMortgageCopy} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{STR.mortgage.tip}</p>
        </motion.section>

        {/* Student Loan */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{STR.student.title}</h2>
            <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-800 px-2 py-1 rounded-full">evergreen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={STR.student.balance} value={balance} onChange={setBalance} step={100} />
            <LabeledNumber label={STR.student.rate} value={sRate} onChange={setSRate} step={0.01} />
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ResultBox title="Interest/mo" value={fmtUSD(studentMonthly)} />
            <ResultBox title="Interest/day" value={fmtUSD(studentDaily)} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={STR.student.calc} onClick={handleStudentCalc} />
            <ActionButton icon={RefreshCw} label={STR.student.reset} onClick={handleStudentReset} />
            <ActionButton icon={Copy} label={STR.student.copy} onClick={handleStudentCopy} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{STR.student.tip}</p>
        </motion.section>

        {/* Gas */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{STR.gas.title}</h2>
            <span className="text-xs text-amber-400 bg-amber-900/30 border border-amber-800 px-2 py-1 rounded-full">seasonal</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={STR.gas.gallons} value={gallons} onChange={setGallons} step={1} />
            <LabeledNumber label={STR.gas.delta} value={deltaPerGallon} onChange={setDeltaPerGallon} step={0.01} />
          </div>
          <div className="mt-3">
            <ResultBox title="Impact/mo" value={fmtUSD(gasMonthly)} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={STR.gas.calc} onClick={handleGasCalc} />
            <ActionButton icon={RefreshCw} label={STR.gas.reset} onClick={handleGasReset} />
            <ActionButton icon={Copy} label={STR.gas.copy} onClick={handleGasCopy} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{STR.gas.tip}</p>
        </motion.section>

        {/* Impact Grid + Chart */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl lg:col-span-2"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-semibold">{STR.grid.title}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Shows monthly financial impact across different lifestyle profiles
              </p>
            </div>
            <div className="flex gap-2">
              <ActionButton icon={RefreshCw} label={STR.grid.refresh} onClick={() => { /* values already reactive */ }} />
              <ActionButton icon={Download} label={STR.grid.export} onClick={handleGridExport} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <LabeledNumber label={STR.grid.ur} value={urGallons} onChange={setUrGallons} step={1} />
            <LabeledNumber label={STR.grid.sh} value={shGallons} onChange={setShGallons} step={1} />
            <LabeledNumber label={STR.grid.re} value={reGallons} onChange={setReGallons} step={1} />
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-slate-200 mb-2">Monthly Impact Summary</h4>
              <div className="space-y-2">
                {gridData.map((r, index) => (
                  <div key={index} className="text-xs text-slate-300 border-l-2 border-slate-600 pl-3">
                    <div className="font-medium text-slate-200">{r.profile}</div>
                    <div className="grid grid-cols-3 gap-2 mt-1 text-[11px]">
                      <div>Mortgage: <span className="text-emerald-400">{fmtUSD(r.mortgage)}</span></div>
                      <div>Student: <span className="text-blue-400">{fmtUSD(r.student)}</span></div>
                      <div>Gas: <span className="text-amber-400">{fmtUSD(r.gas)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-3 p-2 bg-slate-800/30 rounded">{STR.grid.note}</p>
            </div>
            <div className="h-64 bg-slate-950/40 border border-slate-800 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gridData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.3} />
                  <XAxis 
                    dataKey="profile" 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }} 
                    axisLine={{ stroke: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }} 
                    axisLine={{ stroke: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    formatter={(val: any) => fmtUSD(Number(val))} 
                    contentStyle={{ 
                      background: '#0f172a', 
                      border: '1px solid #1f2937', 
                      color: '#E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#10b981', fontWeight: 'bold' }}
                    cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }}
                  />
                  <Legend wrapperStyle={{ color: '#E5E7EB', fontSize: 11 }} />
                  <Bar 
                    dataKey="mortgage" 
                    name="Mortgage Δ/mo" 
                    fill="#10b981" 
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="student" 
                    name="Student/mo" 
                    fill="#3b82f6" 
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar 
                    dataKey="gas" 
                    name="Gas/mo" 
                    fill="#f59e0b" 
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <div className="lg:col-span-2 text-center text-xs text-slate-400">
          {STR.notAdvice}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------
// Reusable UI bits (Tailwind-only, sleek)
// ---------------------------------------------
function LabeledNumber({ label, value, onChange, step = 1 }: { label: string; value: number; onChange: (v: number) => void; step?: number; }) {
  return (
    <label className="block">
      <div className="text-[12px] text-slate-400 mb-1">{label}</div>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full rounded-xl bg-slate-950/50 border border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      />
    </label>
  )
}

function ResultBox({ title, value, accent = false }: { title: string; value: string; accent?: boolean; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-xl border px-3 py-2 text-sm bg-slate-950/40 ${accent ? 'border-emerald-700/60 text-emerald-300' : 'border-slate-800 text-slate-200'}`}
    >
      <div className="text-[11px] uppercase tracking-wide opacity-70 mb-1">{title}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </motion.div>
  )
}

function ActionButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm hover:bg-slate-800/70 transition shadow"
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  )
}

 