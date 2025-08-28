import { redirect } from 'next/navigation'

export default function RootPage() {
  // Редирект на английскую версию по умолчанию
  redirect('/en/')
}
