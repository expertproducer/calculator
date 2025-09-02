import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const videoPath = join(process.cwd(), 'public', 'images', 'banners', 'demo', 'hero-background.mp4')
    const videoBuffer = readFileSync(videoPath)
    
    return new NextResponse(videoBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': videoBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error serving video:', error)
    return new NextResponse('Video not found', { status: 404 })
  }
}
