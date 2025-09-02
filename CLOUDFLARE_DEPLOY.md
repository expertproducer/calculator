# Deployment to Cloudflare Pages with Functions

This project is configured to work on Cloudflare Pages using Cloudflare Functions for API.

## 🚀 Quick Start

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare
```bash
wrangler login
```

### 3. Environment Variables Setup
Create `.env.local` file in project root:
```env
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

### 4. Build and Deploy
```bash
# Build project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy out --project-name calculator
```

## 📁 Project Structure

- **`out/`** - Static export folder (used for deployment)
- **`functions/`** - Cloudflare Functions (replace Next.js API routes)
- **`app/`** - Next.js pages and components
- **`wrangler.toml`** - Cloudflare configuration

## 🔧 How It Works

### Static Pages
- Next.js builds static pages to `out` folder using static export
- Cloudflare Pages serves static content

### API Functions
- Instead of Next.js API routes, Cloudflare Functions are used
- Functions are located in `functions/` folder
- Automatically available at `/api/*`

### Contact Form
- Function `functions/api/contact.ts` handles POST requests
- Sends notifications to Slack
- Uses environment variable `SLACK_WEBHOOK_URL`

## 🌐 Environment Variables

In Cloudflare Pages Dashboard configure:

- `SLACK_WEBHOOK_URL` - Slack webhook URL for notifications

## 🚨 Important Points

1. **DO NOT use `output: 'export'`** in `next.config.js` - this disables API
2. **Next.js API routes don't work** in static export
3. **Use Cloudflare Functions** for server logic
4. **`out` folder** is used for deployment (static export)

## 🔍 Debugging

### Function Logs
```bash
wrangler pages deployment tail --project-name calculator
```

### Local Development
```bash
# Run Next.js
npm run dev

# Run functions locally
wrangler pages dev out --compatibility-date=2024-01-01
```

## 📚 Useful Links

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/workers/)
- [Next.js Documentation](https://nextjs.org/docs)
