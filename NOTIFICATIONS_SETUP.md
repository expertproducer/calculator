# Contact Form Notifications Setup

This file contains instructions for setting up various ways to receive notifications about new applications from the website.

## Option 1: Slack Webhook (simplest)

1. Go to your Slack workspace
2. Create new channel for notifications (e.g., #leads)
3. In channel settings select "Integrations" → "Add apps"
4. Find "Incoming Webhooks" and add
5. Copy webhook URL
6. Add to environment variables:
   ```
   CONTACT_SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

## Option 2: Slack Bot API (more reliable)

1. Go to https://api.slack.com/apps
2. Create new app
3. In OAuth & Permissions settings add scope: `chat:write`
4. Install app to your workspace
5. Copy Bot User OAuth Token
6. Add to environment variables:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_CHANNEL=#leads
   ```

## Option 3: Discord Webhook (Slack alternative)

1. In Discord server select channel
2. Channel settings → Integrations → Webhooks
3. Create new webhook
4. Copy URL
5. Add to environment variables:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR/WEBHOOK/URL
   ```

## Option 4: Email via EmailJS

1. Register at https://www.emailjs.com/
2. Create email template
3. Get required data:
   - User ID
   - Template ID
   - Service ID
4. Add to environment variables:
   ```
   EMAILJS_URL=https://api.emailjs.com/api/v1.0/email/send
   EMAILJS_TEMPLATE=your_template_id
   EMAILJS_USER_ID=your_user_id
   ADMIN_EMAIL=your-email@example.com
   ```

## Environment Variables Setup in Cloudflare

1. Go to Cloudflare Dashboard
2. Select your Workers & Pages
3. Go to Settings → Environment variables
4. Add needed variables

## Testing

After setup test the form:
1. Fill out contact form on website
2. Check logs in Cloudflare Dashboard
3. Make sure notifications arrive

## Recommendations

- **To start**: use Slack Webhook (simplest)
- **For production**: Slack Bot API + Discord as backup
- **If nothing works**: EmailJS as last option

## Troubleshooting

### Slack Webhook not working:
- Check URL correctness
- Make sure webhook is active
- Check access permissions

### Slack Bot API not working:
- Check Bot Token
- Make sure bot is added to channel
- Check scope permissions

### Discord not working:
- Check webhook URL
- Make sure webhook is active
- Check bot permissions in channel
