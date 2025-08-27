import { NextRequest, NextResponse } from 'next/server'
import { ContactSchema } from '@/lib/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received form data:', body)
    
    // Validate with Zod
    const validatedData = ContactSchema.parse(body)
    console.log('Validated data:', validatedData)
    
    // Check honeypot
    if (validatedData.honeypot) {
      console.log('Honeypot triggered, treating as spam')
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
            { type: "mrkdwn", text: `*Стек:*\n${validatedData.stack}` },
            { type: "mrkdwn", text: `*Регионы:*\n${validatedData.regions}` },
            { type: "mrkdwn", text: `*Языки:*\n${validatedData.languages}` }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Сообщение:*\n${validatedData.message || 'Не указано'}`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Локаль:*\n${validatedData.locale}` },
            { type: "mrkdwn", text: `*Время:*\n${validatedData.timestamp || 'Не указано'}` }
          ]
        }
      ]
    }
    
    console.log('Slack message prepared:', slackMessage)
    
    // POST запрос в Slack
    if (process.env.CONTACT_SLACK_WEBHOOK) {
      console.log('Sending to Slack webhook:', process.env.CONTACT_SLACK_WEBHOOK)
      const slackResponse = await fetch(process.env.CONTACT_SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
      })
      
      if (slackResponse.ok) {
        console.log('Slack message sent successfully')
      } else {
        console.error('Slack API error:', await slackResponse.text())
      }
    } else {
      console.warn('CONTACT_SLACK_WEBHOOK environment variable not set')
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
