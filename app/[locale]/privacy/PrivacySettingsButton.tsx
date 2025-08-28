'use client'

interface PrivacySettingsButtonProps {
  text: string
}

export default function PrivacySettingsButton({ text }: PrivacySettingsButtonProps) {
  return (
    <button
      onClick={() => {
        const event = new CustomEvent('openCookiePreferences')
        window.dispatchEvent(event)
      }}
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
    >
      {text}
    </button>
  )
}
