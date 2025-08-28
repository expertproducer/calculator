import { redirect } from 'next/navigation'

export default function RootPage() {
  // Автоматический редирект на английскую версию
  redirect('/en')
}
