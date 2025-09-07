"use client"

import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from './Container'
import { getContent } from '@/lib/i18n'
import ReactCountryFlag from 'react-country-flag'
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

function Gauge({ title, value, max }: { title: string; value: number; max: number }) {
  const pct = clamp(value / max, 0, 1)
  const angle = -180 + 180 * pct
  
  // Цвет шкалы в зависимости от значения
  const getGaugeColor = () => {
    if (title.includes('CMP')) {
      // Для CMP adoption: зеленый при высоких значениях
      return pct > 0.7 ? '#10B981' : pct > 0.5 ? '#22D3EE' : pct > 0.3 ? '#F59E0B' : '#EF4444'
    } else {
      // Для Urgency: красный при высоких значениях
      return pct > 0.7 ? '#EF4444' : pct > 0.5 ? '#F59E0B' : pct > 0.3 ? '#22D3EE' : '#10B981'
    }
  }
  
  const gaugeColor = getGaugeColor()
  
  return (
    <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
      <div className="text-gray-700 font-medium mb-3">{title}</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <svg viewBox="0 0 200 120" className="w-full h-auto">
          {/* Фоновая шкала */}
          <path 
            d="M10,110 A90,90 0 0 1 190,110" 
            fill="none" 
            stroke="#E5E7EB" 
            strokeWidth="16" 
          />
          
          {/* Заполненная шкала с анимацией */}
          <motion.path 
            d="M10,110 A90,90 0 0 1 190,110" 
            fill="none" 
            stroke={gaugeColor} 
            strokeWidth="16" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: pct }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round" 
          />
          
          {/* Стрелка */}
          <motion.g 
            initial={{ rotate: -180 }}
            animate={{ rotate: angle }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.5 }}
            style={{ originX: 100, originY: 110 }}
          >
            <rect x={-2} y={-80} width={4} height={80} fill="#0F172A" rx={2} />
            <circle cx={0} cy={-80} r={6} fill={gaugeColor} stroke="#ffffff" strokeWidth={2} />
          </motion.g>
          
          {/* Значение */}
          <motion.text 
            x={100} 
            y={105} 
            textAnchor="middle" 
            fontSize={24} 
            fill="#111827" 
            fontWeight={700}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {Math.round(value)}
          </motion.text>
          
          {/* Шкала значений */}
          <g className="text-xs fill-gray-400">
            <text x={10} y={130} textAnchor="middle" fontSize={10}>0</text>
            <text x={100} y={130} textAnchor="middle" fontSize={10}>{Math.round(max/2)}</text>
            <text x={190} y={130} textAnchor="middle" fontSize={10}>{max}</text>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

export default function EuGdprCharts({ locale }: { locale?: 'en' | 'de' | 'fr' | 'es' }) {
  const [labels, setLabels] = useState<any>({})
  const [patternTranslations, setPatternTranslations] = useState<Record<string, string>>({})
  const [leaderboardMode, setLeaderboardMode] = useState<'absolute' | 'perCapita' | 'log'>('absolute')
  const [activeTab, setActiveTab] = useState<'market' | 'adoption' | 'scatter' | 'risks' | 'violations' | 'gauges'>('market')
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [isChartVisible, setIsChartVisible] = useState(false)
  
  useEffect(() => {
    ;(async () => {
      try {
        const htmlLang = (locale || (typeof document !== 'undefined' ? document.documentElement.lang : 'en')) as 'en' | 'de' | 'fr' | 'es'
        const content = await getContent(htmlLang)
        setLabels(content?.charts || {})
        setPatternTranslations(content?.map?.patternTranslations || {})
      } catch {}
    })()
    // Добавляем небольшую задержку для анимации появления графиков
    const timer = setTimeout(() => {
      setIsChartVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [locale])

  const normalizePattern = (s: string) => (s || '')
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()

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
      <Container>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="mb-6">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-display font-bold text-gray-900 mb-2"
          >
            {labels.title}
          </motion.h2>
          <motion.p 
            initial={{ y: -10, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 font-light"
          >
            {labels.subtitle}
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='market'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('market')}
          >
            {labels.tabs?.market}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='adoption'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('adoption')}
          >
            {labels.tabs?.adoption}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='scatter'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('scatter')}
          >
            {labels.tabs?.scatter}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='gauges'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('gauges')}
          >
            {labels.tabs?.gauges}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='risks'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('risks')}
          >
            {labels.tabs?.risks}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl border shadow-sm font-medium transition-all ${activeTab==='violations'?'bg-primary-600 text-white border-primary-600 shadow-primary-100':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
            onClick={() => setActiveTab('violations')}
          >
            {labels.tabs?.violations}
          </motion.button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'market' && (
            <motion.div 
              key="market"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div 
                className="flex items-center gap-3 text-sm bg-gray-50 p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-gray-700 font-medium">{labels.show}</span>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg border shadow-sm transition-all ${leaderboardMode==='absolute'?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
                  onClick={() => setLeaderboardMode('absolute')}
                >
                  {labels.modes?.absolute}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg border shadow-sm transition-all ${leaderboardMode==='perCapita'?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
                  onClick={() => setLeaderboardMode('perCapita')}
                >
                  {labels.modes?.perCapita}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg border shadow-sm transition-all ${leaderboardMode==='log'?'bg-primary-500 text-white border-primary-500':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`} 
                  onClick={() => setLeaderboardMode('log')}
                >
                  {labels.modes?.log}
                </motion.button>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-3">
                {marketLeaderboard.list.map((row, index) => (
                  <motion.div 
                    key={row.code} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" 
                    onClick={() => setSelectedCode(row.code)}
                  >
                    <div className="w-16 flex items-center gap-2">
                      <ReactCountryFlag 
                        countryCode={row.code} 
                        svg 
                        style={{ width: '1.5em', height: '1.5em' }} 
                        title={row.code}
                      />
                      <span className="text-sm font-medium text-gray-700">{row.code}</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400" 
                        initial={{ width: 0 }}
                        animate={{ width: `${(row.value / marketLeaderboard.max) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-medium text-gray-900">
                      {leaderboardMode === 'perCapita' ? row.value.toFixed(2) : Math.round(row.value).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'adoption' && (
            <motion.div 
              key="adoption"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div 
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-glass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <motion.h3 
                    className="text-xl font-semibold text-gray-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {labels.adoptionTitle}
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-sm"
                  >
                    <span>{labels.average}</span>
                    <span>{Math.round(adoptionOrdered.euAvg)}%</span>
                  </motion.div>
                </div>
                
                <div className="relative">
                  {/* Убрали серую горизонтальную линию поверх полос */}
                  <div className="grid grid-cols-1 gap-3 mt-12">
                    {adoptionOrdered.list.map((row, index) => (
                      <motion.div 
                        key={row.code} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.03 }}
                        whileHover={{ scale: 1.01, backgroundColor: '#f8fafc' }}
                        className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all" 
                        onClick={() => setSelectedCode(row.code)}
                      >
                        <div className="w-16 flex items-center gap-2">
                          <ReactCountryFlag 
                            countryCode={row.code} 
                            svg 
                            style={{ width: '1.5em', height: '1.5em', borderRadius: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} 
                            title={row.code}
                          />
                          <span className="text-sm font-medium text-gray-700">{row.code}</span>
                        </div>
                        
                        <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner relative">
                          <motion.div 
                            className={`h-full rounded-full ${row.consentRate > adoptionOrdered.euAvg ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-yellow-500 to-yellow-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(row.consentRate / 85) * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                          />
                          
                          {/* Маркер среднего значения на полосе */}
                          <div className="absolute inset-y-0" style={{ left: `${(adoptionOrdered.euAvg / 85) * 100}%` }}>
                            <div className="w-0.5 h-full bg-red-500/70" />
                          </div>
                        </div>
                        
                        <div className="w-16 text-right">
                          <span className="font-semibold text-gray-900">{Math.round(row.consentRate)}%</span>
                          <motion.span 
                            className={`ml-1 text-xs ${row.consentRate > adoptionOrdered.euAvg ? 'text-green-600' : 'text-yellow-600'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.03 }}
                          >
                            {row.consentRate > adoptionOrdered.euAvg ? '↑' : '↓'} 
                            {Math.abs(Math.round(row.consentRate - adoptionOrdered.euAvg))}%
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-3 mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full" /> 
                      <span>{labels.legend?.aboveAverage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full" /> 
                      <span>{labels.legend?.belowAverage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full" /> 
                      <span>{labels.legend?.euAverage}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'scatter' && (
            <motion.div 
              key="scatter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-auto"
            >
              <div className="w-full max-w-full">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-glass overflow-hidden">
                  <motion.h3 
                    className="text-xl font-semibold mb-6 text-gray-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {labels.axes?.density} / {labels.axes?.adoption}
                  </motion.h3>
                  <svg viewBox="0 0 600 360" className="w-full h-auto">
                    {/* Фоновая сетка */}
                    <motion.g 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <line 
                          key={`grid-h-${i}`} 
                          x1="50" 
                          y1={20 + i * 70} 
                          x2="580" 
                          y2={20 + i * 70} 
                          stroke="#E2E8F0" 
                          strokeWidth="1" 
                          strokeDasharray="4 4"
                        />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <line 
                          key={`grid-v-${i}`} 
                          x1={50 + i * 106} 
                          y1="20" 
                          x2={50 + i * 106} 
                          y2="300" 
                          stroke="#E2E8F0" 
                          strokeWidth="1" 
                          strokeDasharray="4 4"
                        />
                      ))}
                    </motion.g>
                    
                    {/* Оси */}
                    <motion.g 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                    >
                      <line x1="50" y1="300" x2="580" y2="300" stroke="#94A3B8" strokeWidth="2" />
                      <line x1="50" y1="20" x2="50" y2="300" stroke="#94A3B8" strokeWidth="2" />
                    </motion.g>
                    
                    {/* Точки */}
                    {data.map((pt, idx) => {
                      const x = 50 + (clamp(pt.marketDensity, 0, 200) / 200) * 530
                      const y = 300 - (clamp(pt.consentRate, 0, 85) / 85) * 280
                      const r = Math.max(6, Math.min(22, Math.log10(Math.max(1, pt.sitesCount)) * 3.5))
                      const color = RISK_COLOR[pt.fineRisk]
                      return (
                        <motion.g 
                          key={pt.code} 
                          onClick={() => setSelectedCode(pt.code)}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + idx * 0.02, duration: 0.5, type: "spring" }}
                          whileHover={{ scale: 1.15, cursor: "pointer" }}
                        >
                          <circle 
                            cx={x} 
                            cy={y} 
                            r={r} 
                            fill={color} 
                            fillOpacity={0.8} 
                            stroke="#ffffff" 
                            strokeWidth={2} 
                          />
                          <foreignObject x={x - 12} y={y - 12} width={24} height={24} style={{ overflow: 'visible', textAlign: 'center' }}>
                            <div className="flex items-center justify-center h-full">
                              <ReactCountryFlag 
                                countryCode={pt.code} 
                                svg 
                                style={{ 
                                  width: '1.2em', 
                                  height: '1.2em',
                                  filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.3))'
                                }} 
                                title={pt.code}
                              />
                            </div>
                          </foreignObject>
                          <text 
                            x={x} 
                            y={y + r + 12} 
                            textAnchor="middle" 
                            fontSize={10} 
                            fontWeight="bold"
                            fill="#334155"
                          >
                            {pt.code}
                          </text>
                        </motion.g>
                      )
                    })}
                    
                    {/* Подписи осей */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <text x={300} y={340} textAnchor="middle" fontSize={14} fontWeight="500" fill="#475569">{labels.axes?.density}</text>
                      <text x={-160} y={15} transform="rotate(-90)" textAnchor="middle" fontSize={14} fontWeight="500" fill="#475569">{labels.axes?.adoption}</text>
                      
                      {/* Метки на осях */}
                      {[0, 50, 100, 150, 200].map((val, i) => (
                        <g key={`x-label-${i}`}>
                          <text x={50 + (val/200) * 530} y={320} textAnchor="middle" fontSize={10} fill="#64748B">{val}</text>
                        </g>
                      ))}
                      {[0, 20, 40, 60, 80].map((val, i) => (
                        <g key={`y-label-${i}`}>
                          <text x={40} y={300 - (val/85) * 280} textAnchor="end" fontSize={10} fill="#64748B">{val}%</text>
                        </g>
                      ))}
                    </motion.g>
                  </svg>
                  
                  {/* Легенда */}
                  <motion.div 
                    className="mt-4 flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-sm text-gray-600">{labels.legend?.lowRisk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="text-sm text-gray-600">{labels.legend?.mediumRisk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="text-sm text-gray-600">{labels.legend?.highRisk}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border border-gray-300 rounded-full relative">
                        <span className="absolute inset-0.5 bg-gray-200 rounded-full"></span>
                      </span>
                      <span className="text-sm text-gray-600">{labels.legend?.sizeMeaning}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'gauges' && (
            <motion.div 
              key="gauges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              <motion.div 
                className="p-6 border border-gray-200 rounded-2xl shadow-glass bg-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h3 
                  className="text-lg font-semibold mb-4 text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {labels.selectCountryTitle}
                </motion.h3>
                
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    {selectedCode && (
                      <ReactCountryFlag 
                        countryCode={selectedCode} 
                        svg 
                        style={{ width: '1.5em', height: '1.5em' }} 
                      />
                    )}
                  </div>
                  <select 
                    className={`w-full border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none transition-all ${selectedCode ? 'pl-10' : ''}`} 
                    value={selectedCode || ''} 
                    onChange={(e) => setSelectedCode(e.target.value || null)}
                  >
                    <option value="">{labels.selectCountryPlaceholder}</option>
                    {data.map(d => (
                      <option key={d.code} value={d.code}>
                        {d.code}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Gauge title={labels.gauge?.adoption || 'Adoption'} value={(selected?.consentRate ?? 0)} max={85} />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Gauge title={labels.gauge?.priority || 'Priority'} value={(selected?.priorityScore ?? 0)} max={100} />
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="p-6 border border-gray-200 rounded-2xl shadow-glass bg-white"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h3 
                  className="text-lg font-semibold mb-4 text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {labels.details?.title}
                </motion.h3>
                
                {selected ? (
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      {selectedCode && (
                        <div className="mr-3">
                          <ReactCountryFlag 
                            countryCode={selected.code} 
                            svg 
                            style={{ width: '2.5em', height: '2.5em', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }} 
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-gray-500">{labels.details?.countryCode}</div>
                        <div className="font-semibold text-gray-900 text-lg">{selected.code}</div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{labels.details?.regulator}</div>
                      <div className="font-semibold text-gray-900">{selected.regulator}</div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{labels.details?.fineRisk}</div>
                      <div className="font-semibold text-lg flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: RISK_COLOR[selected.fineRisk] }}></span>
                        <span style={{ color: RISK_COLOR[selected.fineRisk] }}>
                          {labels.fineRisk?.[selected.fineRisk] || selected.fineRisk}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{labels.details?.marketDensity}</div>
                      <div className="font-semibold text-gray-900 text-lg">{selected.marketDensity.toFixed(1)}</div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500 mb-1">{labels.details?.sitesCount}</div>
                      <div className="font-semibold text-gray-900 text-lg">{selected.sitesCount.toLocaleString()}</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-xl h-64"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-gray-500 font-medium">{labels.details?.empty}</div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'risks' && (
            <motion.div 
              key="risks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 border border-gray-200 rounded-2xl shadow-glass bg-white"
            >
              <motion.h3 
                className="text-xl font-semibold mb-6 text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {labels.risksTitle}
              </motion.h3>
              
              <div className="mb-8">
                <motion.div 
                  className="h-10 w-full bg-gray-100 rounded-xl overflow-hidden flex shadow-inner"
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {(['low','low_medium','medium','medium_high','high'] as ChartsItem['fineRisk'][]).map((k, idx) => {
                    const share = (riskBuckets.counts[k] / riskBuckets.total) * 100
                    return (
                      <motion.div 
                        key={k} 
                        className="h-full relative group cursor-pointer" 
                        style={{ width: `${share}%`, background: RISK_COLOR[k] }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                        whileHover={{ y: -3 }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {(labels.fineRisk?.[k] || k)}: {riskBuckets.counts[k]}
                          </div>
                          <div className="text-xs text-gray-500">{Math.round(share)}%</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {(['low','low_medium','medium','medium_high','high'] as ChartsItem['fineRisk'][]).map((k, idx) => {
                  const riskLabel = labels.fineRisk?.[k] || k
                  const countries = data.filter(d => d.fineRisk === k)
                  
                  return (
                    <motion.div 
                      key={k} 
                      className="p-4 bg-gray-50 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="w-4 h-4 inline-block rounded-full" 
                          style={{ background: RISK_COLOR[k] }} 
                        />
                        <span className="font-medium text-gray-800">{riskLabel}</span>
                        <span className="ml-auto bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {riskBuckets.counts[k]}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {countries.map(country => (
                          <div 
                            key={country.code} 
                            className="flex items-center bg-white rounded-lg px-2 py-1 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => setSelectedCode(country.code)}
                          >
                            <ReactCountryFlag 
                              countryCode={country.code} 
                              svg 
                              style={{ width: '1.2em', height: '1.2em', marginRight: '4px' }} 
                            />
                            <span className="text-xs font-medium">{country.code}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'violations' && (
            <motion.div 
              key="violations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 border border-gray-200 rounded-2xl shadow-glass bg-white overflow-x-auto"
            >
              <motion.h3 
                className="text-xl font-semibold mb-6 text-gray-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {labels.violationsTitle}
              </motion.h3>
              
              <motion.div 
                className="mb-4 flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {violationsSet.map((v, idx) => (
                  <motion.div 
                    key={v} 
                    className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <span className="inline-block w-3 h-3 bg-primary-500 rounded-full" />
                    <span className="text-sm font-medium">{patternTranslations[normalizePattern(v)] || v}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="relative overflow-hidden rounded-xl border border-gray-200">
                <motion.table 
                  className="min-w-[640px] w-full text-sm bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="py-3 px-4 font-semibold text-gray-700">{labels.table?.country}</th>
                      {violationsSet.map(v => (
                        <th key={v} className="py-3 px-4 font-semibold text-gray-700">
                          <div className="truncate max-w-[150px]" title={v}>{v}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, rowIdx) => (
                      <motion.tr 
                        key={row.code} 
                        className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCode(row.code)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + rowIdx * 0.02 }}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <ReactCountryFlag 
                              countryCode={row.code} 
                              svg 
                              style={{ width: '1.5em', height: '1.5em' }} 
                            />
                            <span className="font-medium text-gray-800">{row.code}</span>
                          </div>
                        </td>
                        {violationsSet.map((v, colIdx) => (
                          <td key={v} className="py-3 px-4">
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.8 + rowIdx * 0.02 + colIdx * 0.01, type: "spring" }}
                            >
                              {row.violationsPattern.includes(v) ? (
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-primary-500 text-white rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </span>
                              )}
                            </motion.div>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      </Container>
    </section>
  )
}