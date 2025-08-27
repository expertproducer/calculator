import { NextRequest, NextResponse } from 'next/server'
import { ContactSchema } from '@/lib/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate with Zod
    const validatedData = ContactSchema.parse(body)
    
    // Check honeypot
    if (validatedData.honeypot) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' })
    }
    
    // Here you would send to email/Slack/Airtable
    // For now, just log the data
    console.log('Contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      url: validatedData.url,
      stack: validatedData.stack,
      regions: validatedData.regions,
      languages: validatedData.languages,
      cmp: validatedData.cmp,
      integrations: validatedData.integrations,
      message: validatedData.message,
      locale: validatedData.locale
    })
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Thank you! We will contact you soon.' 
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: 'Validation error: ' + error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
