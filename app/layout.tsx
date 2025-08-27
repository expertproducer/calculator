import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Calculator - Financial Calculators',
  description: 'Professional financial calculators and tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
