import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, url, message, stack, regions, languages, preferredCmp, integrations, locale, timestamp, userAgent } = body

    console.log('=== CONTACT FORM SUBMISSION START ===')
    console.log('Received data:', { name, email, url, message, stack, regions, languages, preferredCmp, integrations, locale, timestamp, userAgent })

    // Простая валидация
    if (!name || !email || !message) {
      console.log('Validation failed: missing required fields')
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    console.log('Validation passed, proceeding with Slack notification...')

    // Отправляем уведомление в Slack
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
    
    console.log('Slack webhook URL configured:', !!slackWebhookUrl)
    if (slackWebhookUrl) {
      console.log('Webhook URL starts with:', slackWebhookUrl.substring(0, 30) + '...')
    }
    
    if (slackWebhookUrl) {
      try {
        console.log('Preparing Slack message...')
        
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

        console.log('Slack message prepared:', JSON.stringify(slackMessage, null, 2))
        console.log('Sending to Slack webhook...')

        const slackResponse = await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(slackMessage)
        })

        console.log('Slack response status:', slackResponse.status)
        console.log('Slack response status text:', slackResponse.statusText)

        if (!slackResponse.ok) {
          const errorText = await slackResponse.text()
          console.error('Slack webhook error response:', errorText)
          console.error('Slack webhook error:', slackResponse.status, slackResponse.statusText)
        } else {
          console.log('Slack notification sent successfully!')
        }
              } catch (slackError) {
          console.error('Failed to send Slack notification:', slackError)
          if (slackError instanceof Error) {
            console.error('Error details:', {
              name: slackError.name,
              message: slackError.message,
              stack: slackError.stack
            })
          } else {
            console.error('Unknown error type:', typeof slackError)
          }
          // Не прерываем выполнение, если Slack недоступен
        }
    } else {
      console.warn('SLACK_WEBHOOK_URL не настроен - уведомления в Slack не будут отправляться')
    }

    // Логируем данные для отладки
    console.log('Contact form submission completed successfully')
    console.log('=== CONTACT FORM SUBMISSION END ===')

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('=== CONTACT FORM SUBMISSION ERROR ===')
    console.error('Contact API error:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    } else {
      console.error('Unknown error type:', typeof error)
    }
    console.error('=== CONTACT FORM SUBMISSION ERROR END ===')
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
