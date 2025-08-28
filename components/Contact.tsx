'use client'

import { useState } from 'react'
import { Mail, Clock, MapPin, Rocket, Send } from 'lucide-react'

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
    <section id="contact" className="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Rocket className="text-blue-500" size={32} />
            <span className="text-sm font-medium text-blue-500 uppercase tracking-wider">
              Ready for compliance?
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light mb-8">
            {content.subtitle}
          </p>
          
          {/* What you get */}
          <div className="bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl p-6 max-w-4xl mx-auto mb-12">
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
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.name} *
                  </label>
                    <input
                      type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                  </div>

                  <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.url} *
                </label>
                    <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.stack}
                  </label>
                    <input
                      type="text"
                    name="stack"
                    value={formData.stack}
                    onChange={handleChange}
                    placeholder="WordPress, React, Vue, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.regions}
                  </label>
                    <input
                      type="text"
                    name="regions"
                    value={formData.regions}
                    onChange={handleChange}
                    placeholder="EU, DE, FR, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>
                </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.languages}
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="EN, DE, FR, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.fields.cmp}
                  </label>
                  <select
                    name="cmp"
                    value={formData.cmp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="">Select CMP</option>
                    <option value="cookiebot">Cookiebot</option>
                    <option value="iubenda">Iubenda</option>
                    <option value="usercentrics">Usercentrics</option>
                    <option value="termly">Termly</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.integrations}
                </label>
                <input
                  type="text"
                  name="integrations"
                  value={formData.integrations}
                  onChange={handleChange}
                  placeholder="GTM, GA4, Facebook Pixel, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {content.fields.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300/60 dark:border-gray-600/60 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                ></textarea>
                </div>

                <button
                  type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                      <Send size={20} />
                <span>{content.submit}</span>
                </button>
            </form>
          </div>

          {/* Contact Info */}
                      <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
                {content.contactInfo.title}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100/80 dark:bg-blue-900/30 rounded-xl">
                    <Mail className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{content.contactInfo.email}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      hello@cashandclash.com
                    </p>
                  </div>
            </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100/80 dark:bg-green-900/30 rounded-xl">
                    <Clock className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{content.contactInfo.workingHours}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Mon-Fri: 9:00-18:00 CET<br />
                      European Time
                    </p>
                  </div>
              </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100/80 dark:bg-purple-900/30 rounded-xl">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">{content.contactInfo.location}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      European Union
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-yellow-50/80 dark:bg-yellow-900/20 rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-800/30">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                {content.contactInfo.responseTime}
              </h4>
              <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                {content.contactInfo.responseDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}