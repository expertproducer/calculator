"use client"

import Image from 'next/image'

interface HeroBannerProps {
  content: {
    title: string
    description: string
    button: string
    image?: {
      src: string
      alt: string
    }
  }
}

export default function HeroBanner({ content }: HeroBannerProps) {
  const imageSrc = content.image?.src || '/images/gdpr_fine_2025.webp'
  const imageAlt = content.image?.alt || 'GDPR fines risk banner'
  return (
    <section id="audit" className="relative py-16 px-4 text-white bg-black">
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
              className="object-cover"
              priority
            />
            {/* image gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
            {/* darken edges to blend with black background */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_180px_80px_rgba(0,0,0,0.85)]" />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-red-400 mb-4 leading-tight">
            {content.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {content.description}
          </p>
          <a
            href="#audit"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-black text-lg transform hover:scale-105"
          >
            {content.button}
          </a>
        </div>
      </div>
    </section>
  )
}


