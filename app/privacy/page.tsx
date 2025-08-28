import { redirect } from 'next/navigation'

export default function PrivacyPage() {
  // Редирект на английскую версию privacy
  redirect('/en/privacy/')
}
