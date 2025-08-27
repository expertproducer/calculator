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
    
    // Отправляем в Slack
    const slackMessage = {
      text: `🎯 *Новая заявка от ${validatedData.name}*`,
      blocks: [
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Имя:*\n${validatedData.name}` },
            { type: "mrkdwn", text: `*Email:*\n${validatedData.email}` },
            { type: "mrkdwn", text: `*URL сайта:*\n${validatedData.url}` },
            { type: "mrkdwn", text: `*Локаль:*\n${validatedData.locale}` }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Сообщение:*\n${validatedData.message || 'Не указано'}`
          }
        }
      ]
    }
    
    // POST запрос в Slack
    if (process.env.CONTACT_SLACK_WEBHOOK) {
      await fetch(process.env.CONTACT_SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
      })
    }
    
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
