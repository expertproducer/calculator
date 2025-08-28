import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'C&C CookieComply',
  description: 'GDPR CMP Setup & Cookie Banner Fixes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
