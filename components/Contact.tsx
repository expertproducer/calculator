'use client'

import { useState } from 'react'
import { Mail, Clock, MapPin, Rocket, Send, Star, CheckCircle, ArrowRight, User, Globe, Code } from 'lucide-react'
import { formatSimpleText } from '../lib/textFormatting'

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
    badge: string
    formTitle: string
    formDescription: string
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
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Process Page style */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-10 leading-tight tracking-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_30%)]">
            {content.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-12 font-semibold drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
            <span dangerouslySetInnerHTML={{ __html: formatSimpleText(content.subtitle) }} />
          </p>
          
          {/* What you get - Process Page benefit */}
          <div className="bg-white rounded-2xl p-8 max-w-5xl mx-auto border border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-8 shadow-2xl">
              <Rocket className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            </div>
            
            <h3 className="text-3xl font-bold text-blue-900 mb-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              {content.contactInfo.whatYouGet.title}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.contactInfo.whatYouGet.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-blue-800">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  <span className="font-bold text-lg drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form - Process Page style */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.formTitle || 'Tell Us About Your Project'}
              </h2>
              <p className="text-lg font-medium text-gray-600 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.formDescription || 'Fill out the form below and we\'ll get back to you within 24 hours'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                  {content.fields.url} *
                </label>
                <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Technical Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.stack}
                  </label>
                  <input
                    type="text"
                    name="stack"
                    value={formData.stack}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                    placeholder="WordPress, React, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.regions}
                  </label>
                  <input
                    type="text"
                    name="regions"
                    value={formData.regions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                    placeholder="EU, US, Global"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.languages}
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                    placeholder="EN, DE, FR, ES"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                    {content.fields.cmp}
                  </label>
                  <select
                    name="cmp"
                    value={formData.cmp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                  >
                    <option value="">Select CMP</option>
                    <option value="cookiebot">Cookiebot</option>
                    <option value="iubenda">Iubenda</option>
                    <option value="usercentrics">Usercentrics</option>
                    <option value="termly">Termly</option>
                    <option value="onetrust">OneTrust</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Integrations */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                  {content.fields.integrations}
                </label>
                <input
                  type="text"
                  name="integrations"
                  value={formData.integrations}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-lg"
                  placeholder="GTM, GA4, Meta Pixel, etc."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                  {content.fields.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none shadow-lg"
                  placeholder="Tell us about your project, current issues, or specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-xl transform hover:scale-105 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)] w-full justify-center"
              >
                <Send className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                {content.submit}
                <ArrowRight className="w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </button>
            </form>
          </div>

          {/* Contact Information - Process Page style */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.contactInfo.title}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex-shrink-0 shadow-2xl">
                    <Mail className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.contactInfo.email}</h3>
                    <p className="text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">info@cashandclash.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex-shrink-0 shadow-2xl">
                    <Clock className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.contactInfo.workingHours}</h3>
                    <p className="text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">CET 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex-shrink-0 shadow-2xl">
                    <MapPin className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.contactInfo.location}</h3>
                    <p className="text-gray-600 font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">European Union</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Response Time */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-8 shadow-2xl">
                <Rocket className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </div>
              
              <h3 className="text-3xl font-bold text-green-900 mb-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
                {content.contactInfo.responseTime}
              </h3>
              
              <p className="text-green-800 leading-relaxed text-lg font-medium drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                {content.contactInfo.responseDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}