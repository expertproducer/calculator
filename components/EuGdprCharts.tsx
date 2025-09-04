"use client"

import { useMemo, useState } from 'react'
import rawChartsData from '../eu_gdpr_charts_v3.json'

type ChartsItem = {
  code: string
  sitesCount: number
  consentRate: number
  regulator: string
  fineRisk: 'low' | 'low_medium' | 'medium' | 'medium_high' | 'high'
  violationsPattern: string[]
  marketDensity: number
  cmpGap?: number
  deltaVsEU?: number
  priorityScore?: number
  populationM?: number
}

const RISK_COLOR: Record<ChartsItem['fineRisk'], string> = {
  low: '#16a34a',
  low_medium: '#65a30d',
  medium: '#f59e0b',
  medium_high: '#ea580c',
  high: '#dc2626'
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export default function EuGdprCharts() {
  const [leaderboardMode, setLeaderboardMode] = useState<'absolute' | 'perCapita' | 'log'>('absolute')
  const [activeTab, setActiveTab] = useState<'market' | 'adoption' | 'scatter' | 'risks' | 'violations' | 'gauges'>('market')
  const [selectedCode, setSelectedCode] = useState<string | null>(null)

  const data = useMemo(() => {
    const items = (rawChartsData as unknown as ChartsItem[]).map(d => ({
      ...d,
      cmpGap: d.cmpGap ?? (100 - d.consentRate),
    }))
    const euOnly = items.filter(it => it.code !== 'CH')
    const euAvg = euOnly.length > 0 ? euOnly.reduce((s, x) => s + (x.consentRate || 0), 0) / euOnly.length : 0
    const withDerived = items.map(it => {
      const c = it.consentRate
      const rWeight = it.fineRisk === 'low' ? 0.2 : it.fineRisk === 'low_medium' ? 0.35 : it.fineRisk === 'medium' ? 0.55 : it.fineRisk === 'medium_high' ? 0.75 : 1
      const cNorm = clamp(c / 85, 0, 1)
      const dNorm = clamp(it.marketDensity / 200, 0, 1)
      const priorityScore = 100 * (0.6 * (1 - cNorm) + 0.3 * rWeight + 0.1 * dNorm)
      return {
        ...it,
        deltaVsEU: it.deltaVsEU ?? (c - euAvg),
        priorityScore: it.priorityScore ?? priorityScore,
        euAvgConsent: euAvg,
      } as ChartsItem & { euAvgConsent: number }
    })
    return withDerived
  }, [])

  const selected = useMemo(() => data.find(d => d.code === selectedCode) || null, [data, selectedCode])

  const marketLeaderboard = useMemo(() => {
    let list = data.map(d => ({
      code: d.code,
      label: d.code,
      value: d.sitesCount,
      aux: d.populationM || 0,
    }))
    if (leaderboardMode === 'perCapita') {
      list = list.map(x => ({ ...x, value: x.aux ? (x.value / (x.aux * 1000)) : 0 }))
    }
    if (leaderboardMode === 'log') {
      list = list.map(x => ({ ...x, value: x.value > 0 ? Math.log10(x.value) : 0 }))
    }
    list.sort((a, b) => b.value - a.value)
    const max = Math.max(...list.map(x => x.value || 0), 1)
    return { list, max }
  }, [data, leaderboardMode])

  const adoptionOrdered = useMemo(() => {
    const list = [...data].sort((a, b) => b.consentRate - a.consentRate)
    const euAvg = list.find(Boolean) ? (list.reduce((s, x) => s + x.consentRate, 0) / list.length) : 0
    return { list, euAvg }
  }, [data])

  const violationsSet = useMemo(() => {
    const counter = new Map<string, number>()
    data.forEach(d => d.violationsPattern.forEach(v => counter.set(v, (counter.get(v) || 0) + 1)))
    const sorted = [...counter.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(x => x[0])
    return sorted
  }, [data])

  const riskBuckets = useMemo(() => {
    const counts: Record<ChartsItem['fineRisk'], number> = { low: 0, low_medium: 0, medium: 0, medium_high: 0, high: 0 }
    data.forEach(d => { counts[d.fineRisk] += 1 })
    const total = data.length || 1
    return { counts, total }
  }, [data])

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">GDPR Маркет аналитика</h2>
          <p className="text-gray-600">Лидерборды, внедрение CMP, риски и нарушения</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='market'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('market')}>Рынок</button>
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='adoption'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('adoption')}>Внедрение</button>
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='scatter'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('scatter')}>Плотность vs Внедрение</button>
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='gauges'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('gauges')}>Приоритет</button>
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='risks'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('risks')}>Риски</button>
          <button className={`px-3 py-1.5 rounded-full border ${activeTab==='violations'?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setActiveTab('violations')}>Нарушения</button>
        </div>

        {activeTab === 'market' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Показать:</span>
              <button className={`px-2 py-1 rounded border ${leaderboardMode==='absolute'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setLeaderboardMode('absolute')}>Абсолют</button>
              <button className={`px-2 py-1 rounded border ${leaderboardMode==='perCapita'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setLeaderboardMode('perCapita')}>На 1000 жителей</button>
              <button className={`px-2 py-1 rounded border ${leaderboardMode==='log'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-800 border-gray-300'}`} onClick={() => setLeaderboardMode('log')}>Log-scale</button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {marketLeaderboard.list.slice(0, 20).map(row => (
                <div key={row.code} className="flex items-center gap-3" onClick={() => setSelectedCode(row.code)}>
                  <div className="w-12 text-xs text-gray-600">{row.code}</div>
                  <div className="flex-1 bg-gray-100 rounded">
                    <div className="h-3 rounded bg-blue-500" style={{ width: `${(row.value / marketLeaderboard.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'adoption' && (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-0 right-0" style={{ top: 0 }}>
                <div className="h-0.5 bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 gap-2 mt-4">
                {adoptionOrdered.list.map(row => (
                  <div key={row.code} className="flex items-center gap-3" onClick={() => setSelectedCode(row.code)}>
                    <div className="w-12 text-xs text-gray-600">{row.code}</div>
                    <div className="flex-1 bg-gray-100 rounded relative">
                      <div className="h-3 rounded bg-green-500" style={{ width: `${(row.consentRate / 85) * 100}%` }} />
                      <div className="absolute inset-y-0" style={{ left: `${(adoptionOrdered.euAvg / 85) * 100}%` }}>
                        <div className="w-0.5 h-full bg-red-500/70" />
                      </div>
                    </div>
                    <div className="w-10 text-xs text-gray-800 text-right">{Math.round(row.consentRate)}%</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-sm" /> Среднее по ЕС
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scatter' && (
          <div className="overflow-x-auto">
            <div className="w-full max-w-full">
              <svg viewBox="0 0 600 360" className="w-full h-auto bg-white border border-gray-200 rounded-xl">
                {/* axes */}
                <line x1="50" y1="300" x2="580" y2="300" stroke="#CBD5E1" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="300" stroke="#CBD5E1" strokeWidth="1" />
                {/* points */}
                {data.map(pt => {
                  const x = 50 + (clamp(pt.marketDensity, 0, 200) / 200) * 530
                  const y = 300 - (clamp(pt.consentRate, 0, 85) / 85) * 280
                  const r = Math.max(4, Math.min(18, Math.log10(Math.max(1, pt.sitesCount)) * 3))
                  const color = RISK_COLOR[pt.fineRisk]
                  return (
                    <g key={pt.code} onClick={() => setSelectedCode(pt.code)}>
                      <circle cx={x} cy={y} r={r} fill={color} fillOpacity={0.7} stroke="#ffffff" strokeWidth={1} />
                      <text x={x + r + 2} y={y + 3} fontSize={9} fill="#334155">{pt.code}</text>
                    </g>
                  )
                })}
                {/* labels */}
                <text x={300} y={340} textAnchor="middle" fontSize={12} fill="#64748B">Плотность рынка (на 1000 жителей)</text>
                <text x={-160} y={15} transform="rotate(-90)" textAnchor="middle" fontSize={12} fill="#64748B">Внедрение CMP (%)</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'gauges' && (
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="p-4 border rounded-xl">
              <div className="text-sm text-gray-600 mb-2">Страна</div>
              <select className="w-full border rounded-lg px-3 py-2" value={selectedCode || ''} onChange={(e) => setSelectedCode(e.target.value || null)}>
                <option value="">— Выбрать —</option>
                {data.map(d => (<option key={d.code} value={d.code}>{d.code}</option>))}
              </select>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Gauge title="CMP adoption" value={(selected?.consentRate ?? 0)} max={85} />
                <Gauge title="Urgency" value={(selected?.priorityScore ?? 0)} max={100} />
              </div>
            </div>
            <div className="p-4 border rounded-xl">
              <div className="text-sm text-gray-600 mb-2">Подробности</div>
              {selected ? (
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Регулятор:</span> <span className="font-semibold text-gray-800">{selected.regulator}</span></div>
                  <div><span className="text-gray-500">Риск штрафов:</span> <span className="font-semibold" style={{ color: RISK_COLOR[selected.fineRisk] }}>{selected.fineRisk.replace(/_/g,' ')}</span></div>
                  <div><span className="text-gray-500">Плотность рынка:</span> <span className="font-semibold text-gray-800">{selected.marketDensity}</span></div>
                </div>
              ) : (
                <div className="text-gray-500">Выберите страну слева</div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="p-4 border rounded-xl">
            <div className="text-sm text-gray-600 mb-2">Распределение стран по рискам</div>
            <div className="h-6 w-full bg-gray-100 rounded overflow-hidden flex">
              {(['low','low_medium','medium','medium_high','high'] as ChartsItem['fineRisk'][]).map((k) => {
                const share = (riskBuckets.counts[k] / riskBuckets.total) * 100
                return <div key={k} className="h-full" style={{ width: `${share}%`, background: RISK_COLOR[k] }} />
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              {(['low','low_medium','medium','medium_high','high'] as ChartsItem['fineRisk'][]).map((k) => (
                <span key={k} className="inline-flex items-center gap-2"><span className="w-3 h-3 inline-block rounded-sm" style={{ background: RISK_COLOR[k] }} /> {k.replace(/_/g,' ')}: {riskBuckets.counts[k]}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'violations' && (
          <div className="p-4 border rounded-xl overflow-x-auto">
            <div className="text-sm text-gray-600 mb-2">Матрица нарушений (топ-3)</div>
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Страна</th>
                  {violationsSet.map(v => (<th key={v} className="py-2 pr-4">{v}</th>))}
                </tr>
              </thead>
              <tbody>
                {data.map(row => (
                  <tr key={row.code} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-2 pr-4 font-semibold text-gray-800">{row.code}</td>
                    {violationsSet.map(v => (
                      <td key={v} className="py-2 pr-4">
                        {row.violationsPattern.includes(v) ? <span className="inline-block w-2.5 h-2.5 bg-blue-600 rounded-sm" /> : <span className="inline-block w-2.5 h-2.5 bg-gray-200 rounded-sm" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

function Gauge({ title, value, max }: { title: string; value: number; max: number }) {
  const pct = clamp(value / max, 0, 1)
  const angle = -180 + 180 * pct
  return (
    <div className="p-3 border rounded-xl">
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <svg viewBox="0 0 200 120" className="w-full h-auto">
        <path d="M10,110 A90,90 0 0 1 190,110" fill="none" stroke="#E5E7EB" strokeWidth="16" />
        <path d="M10,110 A90,90 0 0 1 190,110" fill="none" stroke="#10B981" strokeWidth="16" strokeDasharray={`${Math.max(1, 283 * pct)} 283`} strokeLinecap="round" />
        <g transform={`translate(100,110) rotate(${angle})`}>
          <rect x={-2} y={-80} width={4} height={80} fill="#0F172A" rx={2} />
        </g>
        <text x={100} y={105} textAnchor="middle" fontSize={18} fill="#111827" fontWeight={800}>{Math.round(value)}</text>
      </svg>
    </div>
  )
}


