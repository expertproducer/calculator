'use client'

import { useState } from 'react'
import { Mail, Clock, MapPin, Rocket, Send, Star, CheckCircle, ArrowRight, User, Globe, Code } from 'lucide-react'

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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - StoryBrand style */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            {content.badge || '🚀 Ready to Get Started?'}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {content.subtitle}
          </p>
          
          {/* What you get - StoryBrand benefit */}
          <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200">
            <div className="inline-flex p-4 bg-blue-600 rounded-2xl mb-6">
              <Rocket className="text-white w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              {content.contactInfo.whatYouGet.title}
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.contactInfo.whatYouGet.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form - StoryBrand style */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {content.formTitle || 'Tell Us About Your Project'}
              </h2>
              <p className="text-gray-600">
                {content.formDescription || 'Fill out the form below and we\'ll get back to you within 24 hours'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.email} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {content.fields.url} *
                </label>
                <input
                  type="url"
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {/* Technical Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.stack}
                  </label>
                  <input
                    type="text"
                    name="stack"
                    value={formData.stack}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="WordPress, React, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.regions}
                  </label>
                  <input
                    type="text"
                    name="regions"
                    value={formData.regions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="EU, US, Global"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.languages}
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="EN, DE, FR, ES"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {content.fields.cmp}
                  </label>
                  <select
                    name="cmp"
                    value={formData.cmp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {content.fields.integrations}
                </label>
                <input
                  type="text"
                  name="integrations"
                  value={formData.integrations}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="GTM, GA4, Meta Pixel, etc."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  {content.fields.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project, current issues, or specific requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Send className="w-5 h-5" />
                {content.submit}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Information - StoryBrand style */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content.contactInfo.title}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl flex-shrink-0">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{content.contactInfo.email}</h3>
                    <p className="text-gray-600">info@cashandclash.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-600 rounded-xl flex-shrink-0">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{content.contactInfo.workingHours}</h3>
                    <p className="text-gray-600">CET 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-600 rounded-xl flex-shrink-0">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{content.contactInfo.location}</h3>
                    <p className="text-gray-600">European Union</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Response Time */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <div className="inline-flex p-4 bg-green-600 rounded-2xl mb-6">
                <Rocket className="text-white w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                {content.contactInfo.responseTime}
              </h3>
              
              <p className="text-green-800 leading-relaxed">
                {content.contactInfo.responseDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}