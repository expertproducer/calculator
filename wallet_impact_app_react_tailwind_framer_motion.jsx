"import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, RefreshCw, Download, Copy, Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ---------------------------------------------
// Utility helpers
// ---------------------------------------------
const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

function monthlyPayment(principal: number, annualRatePct: number, years: number) {
  const r = (annualRatePct / 100) / 12;
  const n = years * 12;
  if (!n || principal <= 0) return 0;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

function downloadCSV(filename: string, rows: (string | number)[][]) {
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------
// i18n (EN/RU minimal)
// ---------------------------------------------
const STR = {
  en: {
    title: "Wallet Impact App",
    subtitle: "Plain-language money calculators for your month.",
    notAdvice: "Not financial advice. Data stays in your browser.",
    lang: "Language",
    mortgage: {
      title: "Mortgage — monthly payment & delta",
      principal: "Loan amount ($)",
      years: "Term (years)",
      oldRate: "Old rate (%)",
      newRate: "New rate (%)",
      calc: "Calculate",
      reset: "Reset",
      copy: "Copy result",
      tip: "Buying points lowers payments but costs upfront — check payback time.",
    },
    student: {
      title: "Student loan — interest estimate",
      balance: "Balance ($)",
      rate: "Annual rate (%)",
      calc: "Calculate",
      reset: "Reset",
      copy: "Copy result",
      tip: "Real talk: a ‘$0 payment’ can still allow interest to creep. Log in and verify.",
    },
    gas: {
      title: "Gas — price change impact",
      gallons: "Gallons per month",
      delta: "Price change per gallon ($)",
      calc: "Calculate",
      reset: "Reset",
      copy: "Copy result",
      tip: "Drivers & couriers: track actual gallons for 2 weeks — don’t guess.",
    },
    grid: {
      title: "Impact grid — quick view",
      ur: "Urban renter: gallons/mo",
      sh: "Suburban homeowner: gallons/mo",
      re: "Retiree: gallons/mo",
      refresh: "Refresh",
      export: "Export CSV",
      note: "Mortgage delta here uses your Old vs New rate above. For renters it’s $0 by default.",
    },
  },
  ru: {
    title: "Wallet Impact App",
    subtitle: "Простые калькуляторы для вашего месяца.",
    notAdvice: "Не финсовет. Данные остаются в вашем браузере.",
    lang: "Язык",
    mortgage: {
      title: "Ипотека — платёж и разница",
      principal: "Сумма кредита ($)",
      years: "Срок (лет)",
      oldRate: "Старая ставка (%)",
      newRate: "Новая ставка (%)",
      calc: "Посчитать",
      reset: "Сброс",
      copy: "Скопировать",
      tip: "Понижение ставки за счёт ‘поинтов’ стоит денег сейчас — считайте окупаемость.",
    },
    student: {
      title: "Студкредит — оценка процентов",
      balance: "Остаток долга ($)",
      rate: "Годовая ставка (%)",
      calc: "Посчитать",
      reset: "Сброс",
      copy: "Скопировать",
      tip: "Нулевой платёж не всегда значит нулевые проценты. Зайдите и проверьте.",
    },
    gas: {
      title: "Бензин — влияние изменения цены",
      gallons: "Галлонов в месяц",
      delta: "Изменение цены за галлон ($)",
      calc: "Посчитать",
      reset: "Сброс",
      copy: "Скопировать",
      tip: "Водителям: 2 недели считайте реальные галлоны — не гадайте.",
    },
    grid: {
      title: "Сводка — влияние по типам",
      ur: "Городской арендатор: галлонов/мес",
      sh: "Пригородный домовладелец: галлонов/мес",
      re: "Пенсионер: галлонов/мес",
      refresh: "Обновить",
      export: "Экспорт CSV",
      note: "Разница по ипотеке берётся из полей выше. Для арендаторов — $0 по умолчанию.",
    },
  },
};

type LangKey = keyof typeof STR;

// ---------------------------------------------
// Main Component
// ---------------------------------------------
export default function WalletImpactApp() {
  const [lang, setLang] = useState<LangKey>(() => (localStorage.getItem("wia_lang") as LangKey) || "en");

  // Mortgage state
  const [principal, setPrincipal] = useState<number>(() => Number(localStorage.getItem("wia_principal")) || 400000);
  const [years, setYears] = useState<number>(() => Number(localStorage.getItem("wia_years")) || 30);
  const [oldRate, setOldRate] = useState<number>(() => Number(localStorage.getItem("wia_oldRate")) || 6.63);
  const [newRate, setNewRate] = useState<number>(() => Number(localStorage.getItem("wia_newRate")) || 6.58);

  // Student loan state
  const [balance, setBalance] = useState<number>(() => Number(localStorage.getItem("wia_balance")) || 20000);
  const [sRate, setSRate] = useState<number>(() => Number(localStorage.getItem("wia_srate")) || 5.5);

  // Gas state
  const [gallons, setGallons] = useState<number>(() => Number(localStorage.getItem("wia_gallons")) || 60);
  const [deltaPerGallon, setDeltaPerGallon] = useState<number>(() => Number(localStorage.getItem("wia_dpg")) || 0.10);

  // Grid profiles
  const [urGallons, setUrGallons] = useState<number>(() => Number(localStorage.getItem("wia_ur")) || 30);
  const [shGallons, setShGallons] = useState<number>(() => Number(localStorage.getItem("wia_sh")) || 60);
  const [reGallons, setReGallons] = useState<number>(() => Number(localStorage.getItem("wia_re")) || 40);

  useEffect(() => { localStorage.setItem("wia_lang", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("wia_principal", String(principal)); }, [principal]);
  useEffect(() => { localStorage.setItem("wia_years", String(years)); }, [years]);
  useEffect(() => { localStorage.setItem("wia_oldRate", String(oldRate)); }, [oldRate]);
  useEffect(() => { localStorage.setItem("wia_newRate", String(newRate)); }, [newRate]);
  useEffect(() => { localStorage.setItem("wia_balance", String(balance)); }, [balance]);
  useEffect(() => { localStorage.setItem("wia_srate", String(sRate)); }, [sRate]);
  useEffect(() => { localStorage.setItem("wia_gallons", String(gallons)); }, [gallons]);
  useEffect(() => { localStorage.setItem("wia_dpg", String(deltaPerGallon)); }, [deltaPerGallon]);
  useEffect(() => { localStorage.setItem("wia_ur", String(urGallons)); }, [urGallons]);
  useEffect(() => { localStorage.setItem("wia_sh", String(shGallons)); }, [shGallons]);
  useEffect(() => { localStorage.setItem("wia_re", String(reGallons)); }, [reGallons]);

  const t = STR[lang];

  // Computations
  const oldMonthly = useMemo(() => monthlyPayment(principal, oldRate, years), [principal, oldRate, years]);
  const newMonthly = useMemo(() => monthlyPayment(principal, newRate, years), [principal, newRate, years]);
  const mortgageDelta = useMemo(() => oldMonthly - newMonthly, [oldMonthly, newMonthly]);

  const studentMonthly = useMemo(() => (balance * (sRate / 100)) / 12, [balance, sRate]);
  const studentDaily = useMemo(() => studentMonthly / 30, [studentMonthly]);

  const gasMonthly = useMemo(() => gallons * deltaPerGallon, [gallons, deltaPerGallon]);

  const gridData = useMemo(() => {
    return [
      {
        profile: lang === "ru" ? "Арендатор (город)" : "Urban renter",
        mortgage: 0,
        student: studentMonthly,
        gas: urGallons * deltaPerGallon,
      },
      {
        profile: lang === "ru" ? "Домовладелец (пригород)" : "Suburban homeowner",
        mortgage: Math.max(0, mortgageDelta), // homeowners only
        student: 0,
        gas: shGallons * deltaPerGallon,
      },
      {
        profile: lang === "ru" ? "Пенсионер" : "Retiree",
        mortgage: 0,
        student: 0,
        gas: reGallons * deltaPerGallon,
      },
    ];
  }, [lang, studentMonthly, urGallons, deltaPerGallon, mortgageDelta, shGallons, reGallons]);

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); alert(lang === "ru" ? "Скопировано" : "Copied"); } catch {}
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{t.title}</h1>
            <p className="text-slate-400 text-sm mt-1">{t.subtitle}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl p-1">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${lang === "en" ? "bg-slate-900/70 shadow" : "opacity-80"}`}
                onClick={() => setLang("en")}
                aria-label="English"
              >
                <Globe className="w-4 h-4" /> EN
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${lang === "ru" ? "bg-slate-900/70 shadow" : "opacity-80"}`}
                onClick={() => setLang("ru")}
                aria-label="Русский"
              >
                <Globe className="w-4 h-4" /> RU
              </button>
            </div>
          </motion.div>
        </div>
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
            <h2 className="text-lg font-semibold">{t.mortgage.title}</h2>
            <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-800 px-2 py-1 rounded-full">evergreen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={t.mortgage.principal} value={principal} onChange={setPrincipal} step={1000} />
            <LabeledNumber label={t.mortgage.years} value={years} onChange={setYears} step={1} />
            <LabeledNumber label={t.mortgage.oldRate} value={oldRate} onChange={setOldRate} step={0.01} />
            <LabeledNumber label={t.mortgage.newRate} value={newRate} onChange={setNewRate} step={0.01} />
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            <ResultBox title={lang === "ru" ? "Платёж (старая)" : "Payment (old)"} value={fmtUSD(oldMonthly)} />
            <ResultBox title={lang === "ru" ? "Платёж (новая)" : "Payment (new)"} value={fmtUSD(newMonthly)} />
            <ResultBox title={lang === "ru" ? "Экономия/мес" : "Saving/mo"} value={fmtUSD(mortgageDelta)} accent />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={t.mortgage.calc} onClick={() => { /* values autocalc via useMemo */ }} />
            <ActionButton icon={RefreshCw} label={t.mortgage.reset} onClick={() => { setPrincipal(400000); setYears(30); setOldRate(6.63); setNewRate(6.58); }} />
            <ActionButton icon={Copy} label={t.mortgage.copy} onClick={() => copy(`Old: ${fmtUSD(oldMonthly)} | New: ${fmtUSD(newMonthly)} | Δ ${fmtUSD(mortgageDelta)}`)} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{t.mortgage.tip}</p>
        </motion.section>

        {/* Student Loan */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.student.title}</h2>
            <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-800 px-2 py-1 rounded-full">evergreen</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={t.student.balance} value={balance} onChange={setBalance} step={100} />
            <LabeledNumber label={t.student.rate} value={sRate} onChange={setSRate} step={0.01} />
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ResultBox title={lang === "ru" ? "Проценты/мес" : "Interest/mo"} value={fmtUSD(studentMonthly)} />
            <ResultBox title={lang === "ru" ? "Проценты/день" : "Interest/day"} value={fmtUSD(studentDaily)} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={t.student.calc} onClick={() => { /* computed live */ }} />
            <ActionButton icon={RefreshCw} label={t.student.reset} onClick={() => { setBalance(20000); setSRate(5.5); }} />
            <ActionButton icon={Copy} label={t.student.copy} onClick={() => copy(`Interest/mo ${fmtUSD(studentMonthly)} • /day ${fmtUSD(studentDaily)}`)} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{t.student.tip}</p>
        </motion.section>

        {/* Gas */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t.gas.title}</h2>
            <span className="text-xs text-amber-400 bg-amber-900/30 border border-amber-800 px-2 py-1 rounded-full">seasonal</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <LabeledNumber label={t.gas.gallons} value={gallons} onChange={setGallons} step={1} />
            <LabeledNumber label={t.gas.delta} value={deltaPerGallon} onChange={setDeltaPerGallon} step={0.01} />
          </div>
          <div className="mt-3">
            <ResultBox title={lang === "ru" ? "Влияние/мес" : "Impact/mo"} value={fmtUSD(gasMonthly)} />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <ActionButton icon={Calculator} label={t.gas.calc} onClick={() => { /* live */ }} />
            <ActionButton icon={RefreshCw} label={t.gas.reset} onClick={() => { setGallons(60); setDeltaPerGallon(0.10); }} />
            <ActionButton icon={Copy} label={t.gas.copy} onClick={() => copy(`Gas impact ${fmtUSD(gasMonthly)}/mo`)} />
          </div>
          <p className="text-xs text-slate-400 mt-2">{t.gas.tip}</p>
        </motion.section>

        {/* Impact Grid + Chart */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl lg:col-span-2"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-semibold">{t.grid.title}</h2>
            <div className="flex gap-2">
              <ActionButton icon={RefreshCw} label={t.grid.refresh} onClick={() => { /* values already reactive */ }} />
              <ActionButton icon={Download} label={t.grid.export} onClick={() => {
                downloadCSV("impact_grid.csv", [
                  ["Profile","Mortgage_Delta_per_Month","Student_Interest_per_Month","Gas_Impact_per_Month"],
                  ...gridData.map(r => [r.profile, r.mortgage.toFixed(2), r.student.toFixed(2), r.gas.toFixed(2)])
                ]);
              }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <LabeledNumber label={t.grid.ur} value={urGallons} onChange={setUrGallons} step={1} />
            <LabeledNumber label={t.grid.sh} value={shGallons} onChange={setShGallons} step={1} />
            <LabeledNumber label={t.grid.re} value={reGallons} onChange={setReGallons} step={1} />
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3">
              <pre className="text-xs whitespace-pre-wrap leading-relaxed text-slate-300">
{gridData.map(r => `${r.profile}:  Mortgage Δ/mo ${fmtUSD(r.mortgage)} • Student/mo ${fmtUSD(r.student)} • Gas/mo ${fmtUSD(r.gas)}`).join("\n")}
              </pre>
              <p className="text-[11px] text-slate-400 mt-2">{t.grid.note}</p>
            </div>
            <div className="h-64 bg-slate-950/40 border border-slate-800 rounded-xl p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gridData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="profile" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                  <Tooltip formatter={(val: any) => fmtUSD(Number(val))} contentStyle={{ background: "#0f172a", border: "1px solid #1f2937", color: "#E5E7EB" }} />
                  <Legend wrapperStyle={{ color: "#E5E7EB" }} />
                  <Bar dataKey="mortgage" name={lang === "ru" ? "Ипотека" : "Mortgage Δ/mo"} />
                  <Bar dataKey="student" name={lang === "ru" ? "Студ. проценты" : "Student/mo"} />
                  <Bar dataKey="gas" name={lang === "ru" ? "Бензин" : "Gas/mo"} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <div className="lg:col-span-2 text-center text-xs text-slate-400">
          {t.notAdvice}
        </div>
      </div>
    </div>
  );
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
  );
}

function ResultBox({ title, value, accent = false }: { title: string; value: string; accent?: boolean; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-xl border px-3 py-2 text-sm bg-slate-950/40 ${accent ? "border-emerald-700/60 text-emerald-300" : "border-slate-800 text-slate-200"}`}
    >
      <div className="text-[11px] uppercase tracking-wide opacity-70 mb-1">{title}</div>
      <div className="font-semibold tabular-nums">{value}</div>
    </motion.div>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void; }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm hover:bg-slate-800/70 transition shadow"
    >
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}
"