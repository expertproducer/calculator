'use client'

import { useState } from 'react'

interface BlogImageProps {
  src: string
  alt: string
  className?: string
}

export default function BlogImage({ src, alt, className = '' }: BlogImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  
  const handleError = () => {
    // Fallback to placeholder if image not found
    setImageSrc('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI5MDAiIHZpZXdCb3g9IjAgMCAxNjAwIDkwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2MDAiIGhlaWdodD0iOTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03ODUgNDIwSDgxNVY0NTBINzg1VjQyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTc3MCA0NTBIODMwVjUxMEg3NzBWNDUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSI4MDAiIHk9IjU0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjOUNBM0FGIj5CbG9nIEltYWdlICgxNjo5KTwvdGV4dD4KPC9zdmc+')
  }

  return (
    <img 
      src={imageSrc} 
      alt={alt}
      className={className}
      onError={handleError}
    />
  )
}
