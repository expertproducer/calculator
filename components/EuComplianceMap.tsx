"use client"

import { memo, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { geoMercator } from 'd3-geo'

type CountryInfo = {
  code: string
  name: string
  consentRate?: number
  violationsFixed?: number
}

interface EuComplianceMapProps {
  title?: string
  subtitle?: string
  countries?: CountryInfo[]
}

// Lightweight TopoJSON: EU countries subset (ISO codes). Using CDN URL to keep bundle small.
const TOPO_JSON_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const EU_ISO_CODES = new Set([
  "AUT","BEL","BGR","HRV","CYP","CZE","DNK","EST","FIN","FRA","DEU","GRC","HUN","IRL","ITA","LVA","LTU","LUX","MLT","NLD","POL","PRT","ROU","SVK","SVN","ESP","SWE"
])

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
  Sweden: "SWE"
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
  SWE: "Sweden"
}

function getCountryColor(consentRate?: number): string {
  if (consentRate === undefined) return "#E5E7EB" // gray-200
  if (consentRate >= 0.7) return "#60A5FA" // blue-400
  if (consentRate >= 0.5) return "#93C5FD" // blue-300
  return "#BFDBFE" // blue-200
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

  const countryByCode = useMemo(() => {
    const map = new Map<string, CountryInfo>()
    for (const c of countries) map.set(c.code.toUpperCase(), c)
    return map
  }, [countries])

  // Focused mercator projection centered on Europe; slight tilt via scale/translate to get a pseudo-3D feel with CSS.
  // Keep mercator object if needed later, but ComposableMap will use projection by name for compatibility
  useMemo(() => geoMercator().center([15, 55]).scale(650), [])

  return (
    <section 
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50" 
      aria-label="EU GDPR compliance map"
      onClick={(e) => {
        // Hide tooltip when clicking outside the map
        if (e.target === e.currentTarget) {
          setTooltip(null)
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">{title}</h2>
          <p className="text-lg md:text-xl text-gray-600 font-semibold">{subtitle}</p>
        </div>

        <div className="relative rounded-3xl border border-gray-100 bg-white shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50/40 to-transparent pointer-events-none" />

          <div className="p-4 md:p-8">
            <div className="relative mx-auto w-full" style={{ maxWidth: 820 }}>
              <div className="relative transform-gpu will-change-transform [perspective:1200px] [transform-style:preserve-3d]">
                <div className="[transform:rotateX(4deg)_rotateZ(-1deg)] md:[transform:rotateX(5deg)_rotateZ(-1deg)] transition-transform duration-500">
                  <ComposableMap projection="geoMercator" projectionConfig={{ center: [15, 55], scale: 540 }} width={780} height={440} style={{ width: "100%", height: "auto" }}>
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
                          if (!isEu) return null
                          const data = code ? countryByCode.get(code) : undefined
                          const fill = getCountryColor(data?.consentRate)
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={(evt) => {
                                if (hideTimeout) {
                                  clearTimeout(hideTimeout)
                                  setHideTimeout(null)
                                }
                                const cr = data?.consentRate !== undefined ? `${Math.round((data!.consentRate) * 100)}%` : "n/a"
                                const vf = data?.violationsFixed !== undefined ? `${data!.violationsFixed}` : "n/a"
                                const label = (code && EU_COUNTRY_LABELS[code]) || nameStr || code || 'Unknown'
                                const newContent = `${label} — consent: ${cr}, fixed: ${vf}`
                                
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
                              }}
                              onMouseMove={(evt) => {
                                if (tooltip) setTooltip({ ...tooltip, x: evt.clientX, y: evt.clientY })
                              }}
                              onMouseLeave={() => {
                                // Keep tooltip visible - it will only hide when entering another country or clicking outside
                              }}
                              style={{
                                default: { fill, outline: "none", stroke: "#93C5FD", strokeWidth: 0.6 },
                                hover: { fill: "#3B82F6", outline: "none" },
                                pressed: { fill: "#2563EB", outline: "none" }
                              }}
                            />
                          )
                        })}
                    </Geographies>
                  </ComposableMap>
                </div>
              </div>
            </div>
          </div>

          {tooltip && <Tooltip key={tooltip.countryCode} x={tooltip.x} y={tooltip.y} content={tooltip.content} />}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#60A5FA" }} /> High consent (≥70%)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#93C5FD" }} /> Medium (50–69%)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#BFDBFE" }} /> Low (&lt;50%)</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#E5E7EB" }} /> No data</span>
        </div>
      </div>
    </section>
  )
}

export default memo(EuComplianceMapComponent)


