import { redirect } from 'next/navigation'

export default function CookiesPage() {
  // Редирект на английскую версию cookies
  redirect('/en/cookies/')
}
