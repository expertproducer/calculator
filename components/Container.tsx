import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 ${className}`}>
      {children}
    </div>
  )
}


