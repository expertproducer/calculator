import { Problem, Services, Process, Deliverables, Benefits, Cases, FAQ, Footer, Navbar } from '@/components/AllComponents'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  // Mock content for demonstration - in real app this would come from i18n
  const content = {
    problem: {
      title: "Проблемы с cookies",
      points: [
        "Несоответствие GDPR требованиям",
        "Риск штрафов и санкций", 
        "Потеря доверия клиентов",
        "Правовые сложности"
      ]
    },
    services: {
      title: "Наши услуги",
      items: [
        "Аудит cookies",
        "Настройка согласия",
        "Техническая реализация",
        "Правовая поддержка"
      ]
    },
    process: {
      title: "Процесс работы",
      steps: [
        "Анализ",
        "Планирование", 
        "Реализация",
        "Тестирование",
        "Запуск"
      ]
    },
    deliverables: {
      title: "Что вы получите",
      items: [
        "Полный отчет",
        "Готовое решение",
        "Документация",
        "Поддержка"
      ]
    },
    benefits: {
      title: "Преимущества",
      items: [
        "Соответствие законам",
        "Защита от штрафов",
        "Доверие клиентов",
        "Профессионализм"
      ]
    },
    cases: {
      title: "Кейсы",
      items: [
        "E-commerce платформа",
        "Новостной сайт",
        "Банковский сервис",
        "Медицинский портал"
      ],
      note: "Все проекты успешно прошли проверки"
    },
    faq: {
      title: "Частые вопросы",
      items: [
        {
          question: "Сколько времени занимает настройка?",
          answer: "Обычно 2-4 недели в зависимости от сложности"
        },
        {
          question: "Какие законы учитываются?",
          answer: "GDPR, CCPA, LGPD и другие международные нормы"
        }
      ]
    },
    footer: {
      copyright: "© 2024 C&C CookieComply. Все права защищены.",
      links: ["Политика конфиденциальности", "Условия использования", "Cookies"]
    }
  }

  return (
    <div>
      <Navbar locale={locale} />
      <Problem content={content.problem} />
      <Services content={content.services} />
      <Process content={content.process} />
      <Deliverables content={content.deliverables} />
      <Benefits content={content.benefits} />
      <Cases content={content.cases} />
      <FAQ content={content.faq} />
      <Footer content={content.footer} locale={locale} />
    </div>
  )
}
