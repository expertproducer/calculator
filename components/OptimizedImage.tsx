'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'empty',
  blurDataURL,
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Ошибка загрузки изображения: ${alt}`}
      >
        <div className="text-center">
          <AlertCircle size={24} className="mx-auto mb-2" />
          <span className="text-sm">Ошибка загрузки</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
          <Loader2 size={24} className="animate-spin text-blue-600" />
        </div>
      )}

      {/* Optimized image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />

      {/* Screen reader only text for better accessibility */}
      <span className="sr-only">{alt}</span>
    </div>
  )
}

// Компонент для фоновых изображений с lazy loading
interface BackgroundImageProps {
  src: string
  alt: string
  className?: string
  children?: React.ReactNode
  priority?: boolean
}

export function BackgroundImage({ 
  src, 
  alt, 
  className = '', 
  children, 
  priority = false 
}: BackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label={alt}
      />
      
      {/* Lazy loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Hidden image for lazy loading */}
      <img
        src={src}
        alt=""
        className="hidden"
        onLoad={() => setIsLoaded(true)}
        loading={priority ? 'eager' : 'lazy'}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Компонент для изображений с WebP поддержкой
interface WebPImageProps extends Omit<OptimizedImageProps, 'src'> {
  src: string
  webpSrc?: string
  fallbackSrc?: string
}

export function WebPImage({
  src,
  webpSrc,
  fallbackSrc,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'empty',
  blurDataURL,
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError
}: WebPImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError && fallbackSrc) {
    return (
      <OptimizedImage
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
      />
    )
  }

  return (
    <picture className={className}>
      {/* WebP format for modern browsers */}
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Fallback image */}
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full"
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  )
}
