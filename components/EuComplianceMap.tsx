"use client"

import { memo, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Graticule } from 'react-simple-maps'
import { geoMercator, geoCentroid } from 'd3-geo'

type CountryInfo = {
  code: string
  name: string
  consentRate?: number
  violationsFixed?: number
  sitesCount?: number
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
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string; countryCode: string } | null>(null)
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selected, setSelected] = useState<{ code: string; label: string; iso2: string | null; sitesCount: number | null } | null>(null)

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

  const getSitesFill = (sites?: number, isSpecial?: boolean): string => {
    if (isSpecial) return "#EF4444" // Switzerland special red
    if (sites === undefined || sites === null || !isFinite(sites)) return "#E5E7EB"
    const { q1, q2 } = sitesQuantiles
    if (q1 === 0 && q2 === 0) return "rgba(134,239,172,0.7)" // default light green
    if (sites <= q1) return "rgba(134,239,172,0.7)" // light green
    if (sites <= q2) return "rgba(253,224,71,0.7)" // light yellow
    return "rgba(251,207,232,0.7)" // light pink
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
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-1 leading-tight">{title}</h2>
          <p className="text-base md:text-lg text-gray-600 font-semibold leading-tight">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="relative rounded-3xl border border-gray-100 bg-white shadow-2xl overflow-hidden w-full" style={{ aspectRatio: '10 / 16' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 [background:radial-gradient(70%_50%_at_50%_55%,rgba(59,130,246,0.06)_0%,rgba(59,130,246,0)_70%)] pointer-events-none" />

            <div className="p-2 md:p-3">
              <div className="relative w-full" style={{ maxWidth: '100%' }}>
                <div className="relative transform-gpu will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
                  <div className="[transform:rotateX(4deg)_rotateZ(-1deg)] md:[transform:rotateX(5deg)_rotateZ(-1deg)] transition-transform duration-500">
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
                            const fill = getSitesFill(data?.sitesCount, isSpecial)
                            const centroid = geoCentroid(geo as any) as [number, number]
                            return (
                              <>
                              <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseEnter={(evt) => {
                                  if (hideTimeout) {
                                    clearTimeout(hideTimeout)
                                    setHideTimeout(null)
                                  }
                                  const cr = data?.consentRate !== undefined ? `${Math.round((data!.consentRate) * 100)}%` : "n/a"
                                  const label = (code && EU_COUNTRY_LABELS[code]) || nameStr || code || 'Unknown'
                                  const sitesTxt = data?.sitesCount !== undefined ? formatNumber(data!.sitesCount) : 'n/a'
                                  const risk = data && (data as any).fineRisk ? String((data as any).fineRisk).replace(/_/g,' ') : 'n/a'
                                  const newContent = `${label} — consent: ${cr}, sites: ${sitesTxt}, risk: ${risk}`
                                  
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
                                  setSelected({ code: code || 'unknown', label, iso2, sitesCount: sites })
                                }}
                                onMouseMove={(evt) => {
                                  if (tooltip) setTooltip({ ...tooltip, x: evt.clientX, y: evt.clientY })
                                }}
                                onMouseLeave={() => {
                                  // Keep tooltip visible - it will only hide when entering another country or clicking outside
                                }}
                                style={{
                                  default: {
                                    fill,
                                    outline: "none",
                                    stroke: "#FFFFFF",
                                    strokeWidth: isSpecial ? 1.2 : 0.4,
                                    vectorEffect: "non-scaling-stroke",
                                    transition: "transform 180ms ease, filter 180ms ease, stroke-width 180ms ease",
                                    transform: "translateZ(0)",
                                    transformBox: "fill-box",
                                    transformOrigin: "center"
                                  },
                                  hover: {
                                    fill,
                                    outline: "none",
                                    stroke: "#CBD5E1",
                                    strokeWidth: isSpecial ? 1.2 : 0.8,
                                    vectorEffect: "non-scaling-stroke",
                                    filter: "brightness(1.04) drop-shadow(0 6px 12px rgba(0,0,0,0.18))",
                                    transform: "translateY(-2px) scale(1.01)",
                                    cursor: "pointer"
                                  },
                                  pressed: {
                                    fill,
                                    outline: "none",
                                    stroke: "#94A3B8",
                                    strokeWidth: isSpecial ? 1.2 : 0.8,
                                    vectorEffect: "non-scaling-stroke",
                                    filter: "brightness(0.98)",
                                    transform: "translateY(-1px) scale(1.005)"
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
            <div className="h-full p-4 md:p-5 flex flex-col items-center justify-start">
              {selected ? (
                <div className="text-center space-y-3">
                  {selected.iso2 ? (
                    <img
                      src={`https://flagcdn.com/w80/${selected.iso2.toLowerCase()}.png`}
                      alt={selected.label}
                      className="mx-auto rounded shadow"
                      width={80}
                      height={60}
                    />
                  ) : (
                    <div className="w-20 h-14 bg-gray-100 rounded mx-auto" />
                  )}
                  <div className="text-lg font-bold text-gray-900">{selected.label}</div>
                  <div className="text-sm text-gray-600">Sites registered: {formatNumber(selected.sitesCount)}</div>
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm">Hover a country to see info</div>
              )}
            </div>
          </div>
        </div>

        {tooltip && <Tooltip key={tooltip.countryCode} x={tooltip.x} y={tooltip.y} content={tooltip.content} />}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(134,239,172,0.7)" }} /> Low sites (≤ Q33)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(253,224,71,0.7)" }} /> Medium (Q33–Q66)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "rgba(251,207,232,0.7)" }} /> High (&gt; Q66)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#E5E7EB" }} /> No data</span>
        </div>
      </div>
    </section>
  )
}

export default memo(EuComplianceMapComponent)


