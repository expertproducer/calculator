'use client'

interface CookieSettingsButtonProps {
  text: string
}

export default function CookieSettingsButton({ text }: CookieSettingsButtonProps) {
  return (
    <button
      onClick={() => {
        const event = new CustomEvent('openCookiePreferences')
        window.dispatchEvent(event)
      }}
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
    >
      {text}
    </button>
  )
}
