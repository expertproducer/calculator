import { AllComponents } from '@/components/AllComponents'

export default function HomePage({ params }: { params: { locale: string } }) {
  return <AllComponents locale={params.locale} />
}
