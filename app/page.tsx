import Navbar from '@/components/Navbar'
import FooterENStatic from '@/components/FooterENStatic'
import HeroStatic from '@/components/HeroStatic'
import { Problem, Services, Process, Deliverables, Benefits, Cases, FAQ } from '@/components/AllComponents'
import Contact from '@/components/Contact'

export default function RootPage() {
  // English content for root page
  const content = {
    hero: {
      title: "GDPR CMP Setup & Cookie Banner Fixes",
      subtitle: "Professional GDPR compliance solutions for businesses",
      description: "We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.",
      cta: {
        primary: "Get Started",
        secondary: "Learn More"
      },
      features: [
        "CMP setup and configuration",
        "Cookie banner compliance",
        "Prior consent blocking",
        "Proper consent logging"
      ]
    },
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
      cards: [
        {
          title: "E-commerce Platform",
          before: "GDPR violations, cookie consent issues",
          after: "Fully compliant, proper consent logging"
        },
        {
          title: "News Website",
          before: "Tracking without consent, legal risks",
          after: "CMP setup, prior consent blocking"
        },
        {
          title: "Banking Service",
          before: "Non-compliant cookie banners",
          after: "Professional consent management"
        }
      ]
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
    },
    contact: {
      title: "Get Started Today",
      subtitle: "Ready to make your website GDPR compliant?",
      description: "Contact us for a free consultation and quote.",
      fields: {
        name: "Name",
        email: "Email",
        url: "Website URL",
        stack: "Tech Stack",
        regions: "Target Regions",
        languages: "Languages",
        cmp: "Preferred CMP",
        integrations: "Integrations",
        message: "Message"
      },
      submit: "Send Request"
    }
  }

  return (
    <div>
      <Navbar locale="en" />
      <HeroStatic content={content.hero} />
      <Problem content={content.problem} />
      <Services content={content.services} />
      <Process content={content.process} />
      <Deliverables content={content.deliverables} />
      <Benefits content={content.benefits} />
      <Cases content={content.cases} />
      <FAQ content={content.faq} />
      <Contact content={content.contact} locale="en" />
      <FooterENStatic />
    </div>
  )
}
