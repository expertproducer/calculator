import React from 'react'

interface ProcessStructuredDataProps {
  locale: string
}

export default function ProcessStructuredData({ locale }: ProcessStructuredDataProps) {
  const baseUrl = 'https://www.cashandclash.com'
  const currentUrl = `${baseUrl}/${locale}/process/`
  
  const processSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": locale === 'en' ? "Implementation Process: From Audit to Validation" : 
            locale === 'de' ? "Implementierungsprozess: Von der Prüfung zur Validierung" :
            "Processus d'implémentation: De l'audit à la validation",
    "description": locale === 'en' ? "Our systematic 5-step approach ensures seamless CMP deployment with minimal disruption to your business operations." :
                  locale === 'de' ? "Unser systematischer 5-Schritt-Ansatz gewährleistet eine nahtlose CMP-Bereitstellung mit minimalen Störungen." :
                  "Notre approche systématique en 5 étapes assure un déploiement CMP transparent avec une perturbation minimale.",
    "provider": {
      "@type": "Organization",
      "name": "C&C CookieComply",
      "url": baseUrl
    },
    "url": currentUrl,
    "step": [
      {
        "@type": "HowToStep",
        "name": locale === 'en' ? "Legal Requirements Analysis" : 
                locale === 'de' ? "Rechtsanalyse" : "Analyse des exigences légales",
        "text": locale === 'en' ? "We collaborate with your legal team to identify applicable privacy regulations and determine optimal consent mode configuration for your specific compliance needs." :
                locale === 'de' ? "Wir arbeiten mit Ihrem Rechtsteam zusammen, um anwendbare Datenschutzvorschriften zu identifizieren und die optimale Zustimmungsmodus-Konfiguration zu bestimmen." :
                "Nous collaborons avec votre équipe juridique pour identifier les réglementations de confidentialité applicables et déterminer la configuration optimale du mode de consentement."
      },
      {
        "@type": "HowToStep",
        "name": locale === 'en' ? "CMP Script Deployment" : 
                locale === 'de' ? "CMP-Skript-Bereitstellung" : "Déploiement des scripts CMP",
        "text": locale === 'en' ? "Working with your marketing team, we deploy Cookie Management Platform scripts in a testing environment, providing consultation to address any technical bottlenecks." :
                locale === 'de' ? "Zusammen mit Ihrem Marketing-Team stellen wir CMP-Skripte in einer Testumgebung bereit und bieten Beratung zur Lösung technischer Engpässe." :
                "En collaboration avec votre équipe marketing, nous déployons les scripts de la plateforme de gestion des cookies dans un environnement de test."
      },
      {
        "@type": "HowToStep",
        "name": locale === 'en' ? "GTM Integration & Configuration" : 
                locale === 'de' ? "GTM-Integration & Konfiguration" : "Intégration et configuration GTM",
        "text": locale === 'en' ? "We configure Google Tag Manager to ensure all tags fire appropriately based on user consent preferences, while identifying any hardcoded pixels requiring migration." :
                locale === 'de' ? "Wir konfigurieren Google Tag Manager, um sicherzustellen, dass alle Tags entsprechend den Benutzerpräferenzen ausgelöst werden." :
                "Nous configurons Google Tag Manager pour garantir que tous les tags se déclenchent de manière appropriée selon les préférences de consentement des utilisateurs."
      },
      {
        "@type": "HowToStep",
        "name": locale === 'en' ? "Production Deployment" : 
                locale === 'de' ? "Produktionsbereitstellung" : "Déploiement en production",
        "text": locale === 'en' ? "After comprehensive testing, we support the deployment of CMP and GTM configurations to your live environment with minimal site disruption." :
                locale === 'de' ? "Nach umfassenden Tests unterstützen wir die Bereitstellung von CMP- und GTM-Konfigurationen in Ihrer Live-Umgebung." :
                "Après des tests complets, nous soutenons le déploiement des configurations CMP et GTM dans votre environnement de production."
      },
      {
        "@type": "HowToStep",
        "name": locale === 'en' ? "Data Impact Analysis" : 
                locale === 'de' ? "Datenauswirkungsanalyse" : "Analyse de l'impact sur les données",
        "text": locale === 'en' ? "We quantify potential data loss from consent implementation and provide optimization recommendations to minimize impact on your analytics and marketing efforts." :
                locale === 'de' ? "Wir quantifizieren potenzielle Datenverluste durch die Zustimmungsimplementierung und geben Optimierungsempfehlungen." :
                "Nous quantifions les pertes de données potentielles de l'implémentation du consentement et fournissons des recommandations d'optimisation."
      }
    ]
  }

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }}
      />
    </>
  )
}
