"use client"

import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Video autoplay failed')
      })
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full">
      <video 
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src="/images/banners/demo/hero-background.mp4"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
  )
}
