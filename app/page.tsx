import { Problem, Services, Process, Deliverables, Benefits, Cases, FAQ } from '@/components/AllComponents'
import FooterEN from '@/components/FooterEN'
import NavbarEN from '@/components/NavbarEN'

export default function RootPage() {
  // English content for root page
  const content = {
    problem: {
      title: "Cookie Compliance Issues",
      points: [
        "GDPR compliance violations",
        "Risk of fines and penalties", 
        "Loss of customer trust",
        "Legal complications"
      ]
    },
    services: {
      title: "Our Services",
      items: [
        "Cookie audit",
        "Consent management setup",
        "Technical implementation",
        "Legal support"
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        "Analysis",
        "Planning", 
        "Implementation",
        "Testing",
        "Launch"
      ]
    },
    deliverables: {
      title: "What You Get",
      items: [
        "Complete report",
        "Ready solution",
        "Documentation",
        "Support"
      ]
    },
    benefits: {
      title: "Benefits",
      items: [
        "Legal compliance",
        "Protection from fines",
        "Customer trust",
        "Professional approach"
      ]
    },
    cases: {
      title: "Case Studies",
      items: [
        "E-commerce platform",
        "News website",
        "Banking service",
        "Medical portal"
      ],
      note: "All projects successfully passed compliance checks"
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How long does setup take?",
          answer: "Usually 2-4 weeks depending on complexity"
        },
        {
          question: "What laws are covered?",
          answer: "GDPR, CCPA, LGPD and other international regulations"
        }
      ]
    }
  }

  return (
    <div>
      <NavbarEN />
      <Problem content={content.problem} />
      <Services content={content.services} />
      <Process content={content.process} />
      <Deliverables content={content.deliverables} />
      <Benefits content={content.benefits} />
      <Cases content={content.cases} />
      <FAQ content={content.faq} />
      <FooterEN />
    </div>
  )
}
