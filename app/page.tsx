import { redirect } from 'next/navigation'

export default function HomePage() {
  // Перенаправляем на английскую версию по умолчанию
  redirect('/en')
}
