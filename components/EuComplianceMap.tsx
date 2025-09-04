"use client"

import { memo, useMemo, useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Graticule } from 'react-simple-maps'
import { geoMercator, geoCentroid } from 'd3-geo'

type CountryInfo = {
  code: string
  name: string
  consentRate?: number
  violationsFixed?: number
  sitesCount?: number
  regulator?: string | null
  fineRisk?: string | null
  violationsPattern?: string[] | null
  marketDensity?: number | null
}

interface EuComplianceMapProps {
  title?: string
  subtitle?: string
  countries?: CountryInfo[]
}

// TopoJSON: All European countries (including Switzerland). Using world-atlas for full coverage.
const TOPO_JSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

const EU_ISO_CODES = new Set([
  "AUT","BEL","BGR","HRV","CYP","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","IRL","ITA","LVA","LTU","LUX","MLT","NLD","POL","PRT","ROU","SVK","SVN","ESP","SWE"
])

// Non‑EU countries we still want to display alongside EU
const SPECIAL_INCLUDE = new Set(["CHE"]) // Switzerland

// Fallback mapping from common English names to ISO3 codes (for world-atlas properties without iso_a3)
const NAME_TO_ISO3: Record<string, string> = {
  Austria: "AUT",
  Belgium: "BEL",
  Bulgaria: "BGR",
  Croatia: "HRV",
  Cyprus: "CYP",
  "Czech Republic": "CZE",
  Czechia: "CZE",
  Denmark: "DNK",
  Estonia: "EST",
  Finland: "FIN",
  France: "FRA",
  Germany: "DEU",
  Greece: "GRC",
  Hungary: "HUN",
  Ireland: "IRL",
  Italy: "ITA",
  Latvia: "LVA",
  Lithuania: "LTU",
  Luxembourg: "LUX",
  Malta: "MLT",
  Netherlands: "NLD",
  Poland: "POL",
  Portugal: "PRT",
  Romania: "ROU",
  Slovakia: "SVK",
  Slovenia: "SVN",
  Spain: "ESP",
  Sweden: "SWE",
  Switzerland: "CHE"
}

// Canonical EU country labels by ISO3 (short English names)
const EU_COUNTRY_LABELS: Record<string, string> = {
  AUT: "Austria",
  BEL: "Belgium",
  BGR: "Bulgaria",
  HRV: "Croatia",
  CYP: "Cyprus",
  CZE: "Czechia",
  DNK: "Denmark",
  EST: "Estonia",
  FIN: "Finland",
  FRA: "France",
  DEU: "Germany",
  GRC: "Greece",
  HUN: "Hungary",
  IRL: "Ireland",
  ITA: "Italy",
  LVA: "Latvia",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  MLT: "Malta",
  NLD: "Netherlands",
  POL: "Poland",
  PRT: "Portugal",
  ROU: "Romania",
  SVK: "Slovakia",
  SVN: "Slovenia",
  ESP: "Spain",
  SWE: "Sweden",
  CHE: "Switzerland"
}

// Map ISO3 to ISO2 for flags
const ISO3_TO_ISO2: Record<string, string> = {
  AUT: 'AT', BEL: 'BE', BGR: 'BG', HRV: 'HR', CYP: 'CY', CZE: 'CZ', DNK: 'DK',
  EST: 'EE', FIN: 'FI', FRA: 'FR', DEU: 'DE', GRC: 'GR', HUN: 'HU', IRL: 'IE',
  ITA: 'IT', LVA: 'LV', LTU: 'LT', LUX: 'LU', MLT: 'MT', NLD: 'NL', POL: 'PL',
  PRT: 'PT', ROU: 'RO', SVK: 'SK', SVN: 'SI', ESP: 'ES', SWE: 'SE', CHE: 'CH'
}

function getCountryColor(consentRate?: number): string {
  if (consentRate === undefined) return "#E5E7EB" // gray-200
  if (consentRate >= 0.7) return "#60A5FA" // blue-400
  if (consentRate >= 0.5) return "#93C5FD" // blue-300
  return "#BFDBFE" // blue-200
}

function formatNumber(value?: number | null): string {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a'
  try {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
  } catch {
    return String(value)
  }
}

function Tooltip({ x, y, content }: { x: number; y: number; content: string }) {
  return (
    <div
      className="pointer-events-none fixed z-50 rounded-xl bg-white/90 px-3 py-2 text-sm font-medium text-gray-900 shadow-2xl border border-gray-200 backdrop-blur"
      style={{ left: x + 12, top: y + 12 }}
    >
      {content}
    </div>
  )
}

function EuComplianceMapComponent({ title = "EU Compliance Map", subtitle = "Hover a country to see details", countries = [] }: EuComplianceMapProps) {
  // Добавляем CSS стили для анимаций
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes country-hover-pulse {
        0%, 100% { 
          filter: brightness(1.15) drop-shadow(0 6px 20px rgba(0,0,0,0.3));
        }
        50% { 
          filter: brightness(1.2) drop-shadow(0 8px 25px rgba(0,0,0,0.35));
        }
      }
      .country-hover-animation {
        animation: country-hover-pulse 1.5s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string; countryCode: string } | null>(null)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selected, setSelected] = useState<{ code: string; label: string; iso2: string | null; sitesCount: number | null; consentRate: number | null; regulator: string | null; fineRisk: string | null; violationsPattern: string[] | null; marketDensity: number | null } | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const countryByCode = useMemo(() => {
    const map = new Map<string, CountryInfo>()
    for (const c of countries) map.set(c.code.toUpperCase(), c)
    return map
  }, [countries])

  // Quantiles for sitesCount to color countries by volume (green → yellow → pink)
  const sitesQuantiles = useMemo(() => {
    const values = countries
      .map(c => (typeof c.sitesCount === 'number' && isFinite(c.sitesCount) ? c.sitesCount : null))
      .filter((v): v is number => v !== null)
      .sort((a, b) => a - b)
    if (values.length === 0) return { q1: 0, q2: 0 }
    const pick = (p: number) => values[Math.floor((values.length - 1) * p)]
    return { q1: pick(0.33), q2: pick(0.66) }
  }, [countries])

  // Флаги стран - точные цвета без градиентов
  const FLAG_COLORS: Record<string, string> = {
    AUT: 'rgba(237, 41, 57, 0.8)',     // Австрия: красный
    BEL: 'rgba(0, 0, 0, 0.7)',         // Бельгия: черный
    BGR: 'rgba(0, 150, 110, 0.8)',     // Болгария: зеленый
    HRV: 'rgba(237, 41, 57, 0.8)',     // Хорватия: красный
    CYP: 'rgba(0, 150, 110, 0.7)',     // Кипр: зеленый
    CZE: 'rgba(17, 69, 126, 0.8)',     // Чехия: синий
    DNK: 'rgba(198, 12, 48, 0.8)',     // Дания: красный
    EST: 'rgba(0, 114, 206, 0.8)',     // Эстония: синий
    FIN: 'rgba(0, 47, 108, 0.8)',      // Финляндия: синий
    FRA: 'rgba(0, 146, 70, 0.9)',      // Франция: тёмно-зелёный
    DEU: 'rgba(176, 135, 0, 0.9)',     // Германия: тёмно-жёлтый
    GRC: 'rgba(13, 94, 175, 0.8)',     // Греция: синий
    HUN: 'rgba(205, 42, 62, 0.8)',     // Венгрия: красный
    IRL: 'rgba(22, 155, 98, 0.8)',     // Ирландия: зеленый
    ITA: 'rgba(0, 146, 70, 0.8)',      // Италия: зеленый
    LVA: 'rgba(158, 48, 57, 0.8)',     // Латвия: темно-красный
    LTU: 'rgba(253, 185, 19, 0.8)',    // Литва: желтый
    LUX: 'rgba(237, 41, 57, 0.8)',     // Люксембург: красный
    MLT: 'rgba(207, 20, 43, 0.8)',     // Мальта: красный
    NLD: 'rgba(174, 28, 40, 0.8)',     // Нидерланды: красный
    POL: 'rgba(220, 20, 60, 0.8)',     // Польша: красный
    PRT: 'rgba(0, 102, 0, 0.8)',       // Португалия: зеленый
    ROU: 'rgba(0, 43, 127, 0.8)',      // Румыния: синий
    SVK: 'rgba(238, 28, 37, 0.8)',     // Словакия: красный
    SVN: 'rgba(237, 41, 57, 0.8)',     // Словения: красный
    ESP: 'rgba(198, 11, 30, 0.8)',     // Испания: красный
    SWE: 'rgba(0, 106, 167, 0.8)'      // Швеция: синий
  }

  const getFlagFill = (code?: string): string => {
    if (!code) return "#E5E7EB"
    if (code === 'CHE') return "rgba(220, 38, 38, 0.8)" // Швейцария особая
    return FLAG_COLORS[code] || "rgba(147, 197, 253, 0.5)"
  }

  // Focused mercator projection centered on Europe; slight tilt via scale/translate to get a pseudo-3D feel with CSS.
  // Keep mercator object if needed later, but ComposableMap will use projection by name for compatibility
  useMemo(() => geoMercator().center([15, 55]).scale(650), [])

  return (
    <section 
      className="py-4 bg-gradient-to-br from-gray-50 via-white to-blue-50" 
      aria-label="EU GDPR compliance map"
      onClick={(e) => {
        // Hide tooltip when clicking outside the map
        if (e.target === e.currentTarget) {
          setTooltip(null)
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">{title}</h2>
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-snug opacity-90">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="relative rounded-3xl border border-gray-100 bg-white shadow-2xl overflow-hidden w-full" style={{ aspectRatio: '10 / 16' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 [background:radial-gradient(70%_50%_at_50%_55%,rgba(59,130,246,0.06)_0%,rgba(59,130,246,0)_70%)] pointer-events-none" />

            <div className="p-2 md:p-3">
              <div className="relative w-full" style={{ maxWidth: '100%' }}>
                <div className="relative transform-gpu will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
                  <div className="[transform:rotateX(4deg)_rotateZ(-1deg)] md:[transform:rotateX(5deg)_rotateZ(-1deg)] transition-transform duration-500 hover:[transform:rotateX(3deg)_rotateZ(-0.5deg)] md:hover:[transform:rotateX(4deg)_rotateZ(-0.5deg)]">
                    <ComposableMap projection="geoMercator" projectionConfig={{ center: [12.8, 55.2], scale: 650 }} width={640} height={1024} style={{ width: "100%", height: "auto" }}>
                      <Graticule stroke="#93C5FD22" strokeWidth={0.5} />
                      <Geographies geography={TOPO_JSON_URL}>
                        {({ geographies }) => geographies
                          // Render only EU countries, no deduplication to allow all polygons
                          .map(geo => {
                            const props: any = geo.properties || {}
                            const rawCode: unknown = props.iso_a3 || props.ISO_A3 || props.ISO_A3_EH || props.ADM0_A3 || props.A3 || props.ISO3
                            const rawName: unknown = props.name || props.NAME || props.NAME_EN
                            const nameStr = typeof rawName === 'string' ? rawName : undefined
                            const codeFromName = nameStr && NAME_TO_ISO3[nameStr]
                            const code = (typeof rawCode === 'string' ? rawCode : codeFromName || '').toUpperCase()
                            const isEu = code ? EU_ISO_CODES.has(code) : false
                            const isSpecial = code ? SPECIAL_INCLUDE.has(code) : false
                            if (!isEu && !isSpecial) return null
                            const data = code ? countryByCode.get(code) : undefined
                                                         const fill = getFlagFill(code)
                            const centroid = geoCentroid(geo as any) as [number, number]
                            return (
                              <>
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                className={hoveredCountry === code ? 'country-hover-animation' : ''}
                                onMouseEnter={(evt) => {
                                  setHoveredCountry(code || null)
                                  if (hideTimeout) {
                                    clearTimeout(hideTimeout)
                                    setHideTimeout(null)
                                  }
                                  const label = (code && EU_COUNTRY_LABELS[code]) || nameStr || code || 'Unknown'
                                  const newContent = label
                                  
                                  console.log(`Mouse entered ${code}: ${label}`)
                                  // Clear tooltip first, then set new one to force re-render
                                  setTooltip(null)
                                  setTimeout(() => {
                                    setTooltip({
                                      x: evt.clientX,
                                      y: evt.clientY,
                                      content: newContent,
                                      countryCode: code || 'unknown'
                                    })
                                  }, 10)
                                  const iso2 = code ? (ISO3_TO_ISO2[code] || null) : null
                                  const sites = typeof data?.sitesCount === 'number' ? data!.sitesCount : null
                                  const consentRate = typeof data?.consentRate === 'number' ? data!.consentRate : null
                                  const regulator = (data as any)?.regulator ? String((data as any).regulator) : null
                                  const fineRisk = (data as any)?.fineRisk ? String((data as any).fineRisk) : null
                                  const violationsPattern = Array.isArray((data as any)?.violationsPattern) ? (data as any).violationsPattern as string[] : null
                                  const marketDensity = typeof (data as any)?.marketDensity === 'number' ? (data as any).marketDensity as number : null
                                  setSelected({ code: code || 'unknown', label, iso2, sitesCount: sites, consentRate, regulator, fineRisk, violationsPattern, marketDensity })
                                }}
                                onMouseMove={(evt) => {
                                  if (tooltip) setTooltip({ ...tooltip, x: evt.clientX, y: evt.clientY })
                                }}
                                onMouseLeave={() => {
                                  setHoveredCountry(null)
                                  // Keep tooltip visible - it will only hide when entering another country or clicking outside
                                }}
                                style={{
                                  default: { 
                                    fill, 
                                    outline: "none", 
                                    stroke: "#FFFFFF", 
                                    strokeWidth: isSpecial ? 1.2 : 0.6, 
                                    vectorEffect: "non-scaling-stroke", 
                                    transition: "transform 360ms cubic-bezier(0.16, 1, 0.3, 1), filter 360ms ease, fill 360ms ease",
                                    transform: "translateZ(0)",
                                    transformOrigin: "center"
                                  },
                                  hover: { 
                                    fill: fill, 
                                    outline: "none", 
                                    stroke: "#FFFFFF", 
                                    strokeWidth: isSpecial ? 1.2 : 0.6, 
                                    vectorEffect: "non-scaling-stroke", 
                                    filter: "brightness(1.06) drop-shadow(0 6px 16px rgba(0,0,0,0.18))", 
                                    cursor: "pointer",
                                    transform: "translateY(-1.5px) scale(1.012)",
                                    transformOrigin: "center"
                                  },
                                  pressed: { 
                                    fill, 
                                    outline: "none", 
                                    stroke: "#FFFFFF", 
                                    strokeWidth: isSpecial ? 1.2 : 0.6, 
                                    vectorEffect: "non-scaling-stroke", 
                                    filter: "brightness(0.99) drop-shadow(0 3px 10px rgba(0,0,0,0.16))",
                                    transform: "translateY(-0.75px) scale(1.006)",
                                    transformOrigin: "center"
                                  }
                                }}
                              />
                              {isSpecial && code === 'CHE' && (
                                <Marker key={`${geo.rsmKey}-swiss`} coordinates={centroid}>
                                  <g pointerEvents="none" transform="translate(0,-2)">
                                    <rect x={-2} y={-6} width={4} height={12} fill="#FFFFFF" />
                                    <rect x={-6} y={-2} width={12} height={4} fill="#FFFFFF" />
                                  </g>
                                </Marker>
                              )}
                              </>
                            )
                          })}
                      </Geographies>
                    </ComposableMap>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-gray-100 bg-white shadow-2xl overflow-hidden w-full" style={{ aspectRatio: '10 / 16' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 to-transparent pointer-events-none" />
            <div className="h-full p-6 md:p-8 flex flex-col items-center justify-center">
              {selected ? (
                <div className="text-center space-y-4 md:space-y-6 w-full flex flex-col items-center justify-center">
                  {selected.iso2 ? (
                    <img
                      src={`https://flagcdn.com/${selected.iso2.toLowerCase()}.svg`}
                      onError={(e) => {
                        const t = e.target as HTMLImageElement
                        if (!t.dataset.fallback) {
                          t.dataset.fallback = '1'
                          t.src = `https://flagcdn.com/w320/${selected.iso2!.toLowerCase()}.png`
                        }
                      }}
                      alt={selected.label}
                      className="mx-auto rounded-xl shadow-md"
                      width={160}
                      height={110}
                      loading="eager"
                    />
                  ) : (
                    <div className="w-28 h-20 bg-gray-100 rounded-xl mx-auto" />
                  )}
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{selected.label}</div>

                  <div className="space-y-1">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{formatNumber(selected.sitesCount)}</div>
                    <div className="text-xs md:text-sm uppercase tracking-wider text-gray-500">Sites registered</div>
                  </div>

                  <div className="mx-auto max-w-sm grid grid-cols-1 gap-3 md:gap-4 w-full">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500">Consent rate</div>
                      <div className="text-base md:text-lg font-semibold text-gray-800">{selected.consentRate !== null ? `${Math.round(selected.consentRate * 100)}%` : 'n/a'}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500">Regulator</div>
                      <div className="text-sm md:text-base font-semibold text-gray-800 break-words">{selected.regulator || 'n/a'}</div>
                    </div>
                    <div className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 inline-flex items-center justify-center mx-auto">
                      <span className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500 mr-2">Fine risk</span>
                      <span className="text-sm md:text-base font-semibold text-gray-800">{selected.fineRisk ? selected.fineRisk.replace(/_/g,' ') : 'n/a'}</span>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500">Market density</div>
                      <div className="text-base md:text-lg font-semibold text-gray-800">{selected.marketDensity !== null ? `${selected.marketDensity}` : 'n/a'}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="text-[11px] md:text-xs uppercase tracking-wider text-gray-500 mb-1">Violations pattern</div>
                      {selected.violationsPattern && selected.violationsPattern.length > 0 ? (
                        <ul className="text-sm md:text-base text-gray-800 list-disc list-inside space-y-0.5 text-left">
                          {selected.violationsPattern.map((v, i) => (
                            <li key={i}>{v}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm md:text-base text-gray-500">n/a</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">Hover a country to see info</div>
              )}
            </div>
          </div>
        </div>

        {tooltip && <Tooltip key={tooltip.countryCode} x={tooltip.x} y={tooltip.y} content={tooltip.content} />}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(0, 35, 149, 0.8)" }} /> 
            Синие флаги
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(220, 20, 60, 0.8)" }} /> 
            Красные флаги
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(22, 155, 98, 0.8)" }} /> 
            Зелёные флаги
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(220, 38, 38, 0.8)" }} /> 
            Швейцария
          </span>
        </div>
      </div>
    </section>
  )
}

export default memo(EuComplianceMapComponent)


