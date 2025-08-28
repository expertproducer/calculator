'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const getContactSchema = (locale: string) => {
  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  
  const validationMessages = {
    en: {
      nameMin: 'Name must contain at least 2 characters',
      emailInvalid: 'Enter a valid email',
      urlInvalid: 'Enter a valid website URL',
      stackRequired: 'Specify your tech stack',
      regionsRequired: 'Specify regions',
      languagesRequired: 'Specify languages',
      messageMin: 'Message must contain at least 10 characters',
      noSpam: 'Spam not allowed!'
    },
    de: {
      nameMin: 'Name muss mindestens 2 Zeichen enthalten',
      emailInvalid: 'Geben Sie eine gültige E-Mail ein',
      urlInvalid: 'Geben Sie eine gültige Website-URL ein',
      stackRequired: 'Geben Sie Ihren Tech-Stack an',
      regionsRequired: 'Geben Sie Regionen an',
      languagesRequired: 'Geben Sie Sprachen an',
      messageMin: 'Nachricht muss mindestens 10 Zeichen enthalten',
      noSpam: 'Spam nicht erlaubt!'
    },
    fr: {
      nameMin: 'Le nom doit contenir au moins 2 caractères',
      emailInvalid: 'Entrez un email valide',
      urlInvalid: 'Entrez une URL de site web valide',
      stackRequired: 'Spécifiez votre stack technique',
      regionsRequired: 'Spécifiez les régions',
      languagesRequired: 'Spécifiez les langues',
      messageMin: 'Le message doit contenir au moins 10 caractères',
      noSpam: 'Spam non autorisé !'
    }
  }[localeTyped]

  return z.object({
    name: z.string().min(2, validationMessages.nameMin),
    email: z.string().email(validationMessages.emailInvalid),
    url: z.string().url(validationMessages.urlInvalid),
    stack: z.string().min(1, validationMessages.stackRequired),
    regions: z.string().min(1, validationMessages.regionsRequired),
    languages: z.string().min(1, validationMessages.languagesRequired),
    preferredCmp: z.string().optional(),
    integrations: z.string().optional(),
    message: z.string().min(10, validationMessages.messageMin),
    honeypot: z.string().max(0, validationMessages.noSpam)
  })
}

export default function Contact({ content, locale }: { content: any; locale: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  
  const translations = {
    en: {
      whatYouGet: "What you get?",
      freeConsultation: "Free consultation about your project",
      technicalAudit: "Technical audit of current state",
      personalOffer: "Personal solution proposal",
      timelineEstimate: "Timeline and cost estimate",
      responseTime: "Response Time",
      responseDescription: "We respond to all inquiries within 24 hours on business days.",
      workingHours: "🕐 Mon-Fri: 9:00 - 18:00 CET",
      timezone: "🌍 European Time",
      sending: "Sending...",
      successMessage: "Thank you! Your request has been sent. We will contact you shortly.",
      errorPrefix: "An error occurred while sending: "
    },
    de: {
      whatYouGet: "Was Sie erhalten?",
      freeConsultation: "Kostenlose Beratung zu Ihrem Projekt",
      technicalAudit: "Technisches Audit des aktuellen Zustands",
      personalOffer: "Persönliches Lösungsangebot",
      timelineEstimate: "Zeitplan- und Kostenschätzung",
      responseTime: "Antwortzeit",
      responseDescription: "Wir antworten auf alle Anfragen innerhalb von 24 Stunden an Werktagen.",
      workingHours: "🕐 Mo-Fr: 9:00 - 18:00 CET",
      timezone: "🌍 Europäische Zeit",
      sending: "Senden...",
      successMessage: "Vielen Dank! Ihre Anfrage wurde gesendet. Wir werden uns in Kürze bei Ihnen melden.",
      errorPrefix: "Beim Senden ist ein Fehler aufgetreten: "
    },
    fr: {
      whatYouGet: "Ce que vous obtenez ?",
      freeConsultation: "Consultation gratuite sur votre projet",
      technicalAudit: "Audit technique de l'état actuel",
      personalOffer: "Proposition de solution personnalisée",
      timelineEstimate: "Estimation des délais et coûts",
      responseTime: "Temps de Réponse",
      responseDescription: "Nous répondons à toutes les demandes dans les 24 heures les jours ouvrables.",
      workingHours: "🕐 Lun-Ven : 9:00 - 18:00 CET",
      timezone: "🌍 Heure Européenne",
      sending: "Envoi...",
      successMessage: "Merci ! Votre demande a été envoyée. Nous vous contacterons sous peu.",
      errorPrefix: "Une erreur s'est produite lors de l'envoi : "
    }
  }[localeTyped]

  const contactSchema = getContactSchema(locale)
  type ContactFormData = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    console.log('onSubmit called with data:', data)
    
    if (data.honeypot) {
      console.log('Honeypot triggered, form not submitted')
      return // Спам-защита
    }

    console.log('Form validation passed, starting submission...')
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      console.log('Submitting form data:', data)
      
      // Создаем объект данных для отправки
      const requestData = {
        name: data.name,
        email: data.email,
        url: data.url,
        message: data.message,
        stack: data.stack,
        regions: data.regions,
        languages: data.languages,
        preferredCmp: data.preferredCmp || '',
        integrations: data.integrations || '',
        locale: locale,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        honeypot: data.honeypot
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      console.log('Response status:', response.status)
      
      // Проверяем, есть ли содержимое в ответе
      let responseData
      const responseText = await response.text()
      
      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
          console.log('Response data:', responseData)
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError)
          throw new Error('Неверный формат ответа от сервера')
        }
      } else {
        responseData = {}
      }

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(translations.successMessage)
        reset()
      } else {
        throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setSubmitMessage(`${translations.errorPrefix}${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact us directly.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Форма */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot поле */}
                <input
                  type="text"
                  {...register('honeypot')}
                  className="absolute -left-[9999px]"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Основные поля */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder={content.fields.name}
                      className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder={content.fields.email}
                      className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="url"
                    {...register('url')}
                    placeholder={content.fields.url}
                    className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.url ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors.url && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.url.message}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      {...register('stack')}
                      placeholder={content.fields.stack}
                      className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.stack ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    />
                    {errors.stack && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.stack.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register('regions')}
                      placeholder={content.fields.regions}
                      className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.regions ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    />
                    {errors.regions && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.regions.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      {...register('languages')}
                      placeholder={content.fields.languages}
                      className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.languages ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    />
                    {errors.languages && (
                      <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {errors.languages.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register('preferredCmp')}
                      placeholder={content.fields.cmp}
                      className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    {...register('integrations')}
                    placeholder={content.fields.integrations}
                    className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <textarea
                    {...register('message')}
                    placeholder={content.fields.message}
                    rows={4}
                    className={`w-full p-4 border rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-600'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {translations.sending}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {content.submit}
                    </>
                  )}
                </button>

                {/* Статус отправки */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                    <p className="text-green-800 dark:text-green-200">{submitMessage}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
                    <p className="text-red-800 dark:text-red-200">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-100 dark:border-blue-800">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {translations.whatYouGet}
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <span>{translations.freeConsultation}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <span>{translations.technicalAudit}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <span>{translations.personalOffer}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <span>{translations.timelineEstimate}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {translations.responseTime}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {translations.responseDescription}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  <p>{translations.workingHours}</p>
                  <p>{translations.timezone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
// Force rebuild 08/28/2025 08:28:48
