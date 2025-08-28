# Deployment to Cloudflare Pages

## Project Structure

- `out/` - static files folder (created by Next.js)
- `functions/` - Cloudflare Workers functions for API

## Environment Variables Setup

In Cloudflare Pages Dashboard add:

```
CONTACT_SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Deployment Commands

1. **Build project:**
   ```bash
   npm run build
   ```

2. **Deploy via Wrangler:**
   ```bash
   npx wrangler pages deploy out
   ```

3. **Or via Cloudflare Dashboard:**
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set output folder: `out`

## Verify Functionality

After deployment, the form should work at:
`https://your-domain.com/api/contact`

## Troubleshooting

- Make sure the `out` folder is created after `npm run build`
- Verify that `CONTACT_SLACK_WEBHOOK` variable is set
- Browser console should not show CORS errors
