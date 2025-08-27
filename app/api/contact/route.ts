import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, url, message, stack, regions, languages, preferredCmp, integrations, locale, timestamp, userAgent } = body

    // Простая валидация
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Отправляем уведомление в Slack
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
    
    if (slackWebhookUrl) {
      try {
        const slackMessage = {
          text: '🎯 *Новая заявка с сайта C&C CookieComply*',
          blocks: [
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Имя:*\n${name}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Email:*\n${email}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Сайт:*\n${url || 'Не указан'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Стек технологий:*\n${stack || 'Не указан'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Регионы:*\n${regions || 'Не указаны'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Языки:*\n${languages || 'Не указаны'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Предпочтительный CMP:*\n${preferredCmp || 'Не указан'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Интеграции:*\n${integrations || 'Не указаны'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Язык сайта:*\n${locale || 'Не указан'}`
                },
                {
                  type: 'mrkdwn',
                  text: `*Время отправки:*\n${timestamp || new Date().toISOString()}`
                }
              ]
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Сообщение:*\n${message}`
              }
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `🌐 User-Agent: ${userAgent || 'Не указан'}`
                }
              ]
            }
          ]
        }

        const slackResponse = await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(slackMessage)
        })

        if (!slackResponse.ok) {
          console.error('Slack webhook error:', slackResponse.status, slackResponse.statusText)
        } else {
          console.log('Slack notification sent successfully')
        }
      } catch (slackError) {
        console.error('Failed to send Slack notification:', slackError)
        // Не прерываем выполнение, если Slack недоступен
      }
    } else {
      console.warn('SLACK_WEBHOOK_URL не настроен')
    }

    // Логируем данные для отладки
    console.log('Contact form submission:', { name, email, url, message, stack, regions, languages, preferredCmp, integrations, locale, timestamp, userAgent })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
