# Calculator Project Setup

## Form Issue

If you get a 404 error when submitting the form, it's because Next.js API routes don't work in static export.

## Solution 1: Remove Static Export (Recommended)

1. In `next.config.js` comment out the line `output: 'export'`
2. Restart development server: `npm run dev`

## Solution 2: Environment Variables Setup

1. Create `.env.local` file in project root
2. Add to it:

```bash
CONTACT_SLACK_WEBHOOK=your_slack_webhook_url_here
```

### How to Get Slack Webhook URL:

1. Go to Slack → Settings & administration → Manage apps
2. Find or install "Incoming Webhooks" app
3. Create new webhook for desired channel
4. Copy URL and paste into environment variable

## Project Launch

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production version
npm start
```

## Verify Functionality

1. Open browser console (F12)
2. Fill and submit the form
3. Check logs in browser console and server terminal
4. Check if message arrived in Slack

## Possible Issues

- **404 error**: API route not found - check Next.js settings
- **Slack not receiving messages**: check CONTACT_SLACK_WEBHOOK environment variable
- **Validation errors**: check that all required fields are filled
