'use client'

import { useState } from 'react'
import { Mail, Clock, MapPin, Rocket, Send, Star } from 'lucide-react'

interface ContactProps {
  content: {
    title: string
    subtitle: string
    fields: {
      name: string
      email: string
      url: string
      stack: string
      regions: string
      languages: string
      cmp: string
      integrations: string
      message: string
    }
    submit: string
    contactInfo: {
      title: string
      email: string
      workingHours: string
      location: string
      responseTime: string
      responseDescription: string
      whatYouGet: {
        title: string
        items: string[]
      }
    }
  }
}

export default function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    url: '',
    stack: '',
    regions: '',
    languages: '',
    cmp: '',
    integrations: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full mb-6">
            <Star className="text-blue-600 dark:text-blue-400 w-4 h-4" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Ready for compliance?</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light mb-8">
            {content.subtitle}
          </p>
          
          {/* What you get */}
          <div className="bg-gradient-to-r from-blue-50/80 to-green-50/80 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6 max-w-4xl mx-auto mb-12 border border-blue-200/50 dark:border-blue-700/50">
            <div className="inline-flex p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl mb-4">
              <Rocket className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
              {content.contactInfo.whatYouGet.title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-blue-700 dark:text-blue-300">
              {content.contactInfo.whatYouGet.items.map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.url}
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.stack}
                  </label>
                  <select
                    name="stack"
                    value={formData.stack}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                  >
                    <option value="">Select your tech stack</option>
                    <option value="wordpress">WordPress</option>
                    <option value="shopify">Shopify</option>
                    <option value="react">React/Next.js</option>
                    <option value="vue">Vue.js</option>
                    <option value="angular">Angular</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.regions}
                  </label>
                  <select
                    name="regions"
                    value={formData.regions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                  >
                    <option value="">Select target regions</option>
                    <option value="eu">European Union (GDPR)</option>
                    <option value="us">United States (CCPA)</option>
                    <option value="uk">United Kingdom</option>
                    <option value="global">Global</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.languages}
                  </label>
                  <select
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                  >
                    <option value="">Select languages</option>
                    <option value="en">English</option>
                    <option value="de">German</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.cmp}
                  </label>
                  <select
                    name="cmp"
                    value={formData.cmp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                  >
                    <option value="">Select CMP preference</option>
                    <option value="cookiebot">Cookiebot</option>
                    <option value="iubenda">Iubenda</option>
                    <option value="onetrust">OneTrust</option>
                    <option value="cookieconsent">Cookie Consent</option>
                    <option value="other">Other/Not sure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.integrations}
                </label>
                <select
                  name="integrations"
                  value={formData.integrations}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white"
                >
                  <option value="">Select integrations</option>
                  <option value="gtm">Google Tag Manager</option>
                  <option value="ga4">Google Analytics 4</option>
                  <option value="facebook">Facebook Pixel</option>
                  <option value="hotjar">Hotjar</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Tell us about your specific needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Send className="w-5 h-5" />
                {content.submit}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {content.contactInfo.title}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl">
                    <Mail className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">{content.contactInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100/80 dark:bg-green-900/30 rounded-xl">
                    <Clock className="text-green-600 dark:text-green-400 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Working Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400">{content.contactInfo.workingHours}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100/80 dark:bg-purple-900/30 rounded-xl">
                    <MapPin className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">{content.contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50/80 to-blue-50/80 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200/50 dark:border-green-700/50 rounded-3xl p-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {content.contactInfo.responseTime}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {content.contactInfo.responseDescription}
              </p>
              <div className="inline-flex p-3 bg-green-100/80 dark:bg-green-900/30 rounded-xl">
                <Clock className="text-green-600 dark:text-green-400 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}