# Slack Integration Setup

## Step 1: Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click "Create New App"
3. Select "From scratch"
4. Enter app name (e.g., "C&C CookieComply Bot")
5. Select your workspace

## Step 2: Configure Incoming Webhooks

1. In left menu select "Incoming Webhooks"
2. Enable "Activate Incoming Webhooks"
3. Click "Add New Webhook to Workspace"
4. Select channel where notifications will arrive
5. Copy webhook URL

## Step 3: Environment Variables Setup

Create `.env.local` file in project root and add:

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WORKSPACE/YOUR_CHANNEL/YOUR_WEBHOOK_TOKEN
```

**Replace URL with your actual webhook URL**

## Step 4: Restart Server

After adding environment variable restart development server:

```bash
npm run dev
```

## Verify Functionality

1. Fill out form on website
2. Submit application
3. Check if notification arrived in selected Slack channel
4. Check server console for errors

## Troubleshooting

- **Webhook URL not configured**: Check that `SLACK_WEBHOOK_URL` variable is added to `.env.local`
- **403 Forbidden**: Check webhook URL correctness
- **404 Not Found**: Webhook URL is incorrect or app not activated
- **500 Internal Server Error**: Check server logs for error details

## Security

- Never commit `.env.local` to git
- Webhook URL should be secret
- Use HTTPS for production
