# C&C CookieComply - GDPR Compliance Solution

## 🚀 Quick Deployment

### 1. Development
```bash
npm run dev
```

### 2. Build Project
```bash
npm run build
```

### 3. Deploy to Cloudflare Pages
```bash
# Automatic deployment via Wrangler
npm run deploy

# Or manually
npx wrangler pages deploy .next --project-name calculator
```

## 📁 Project Structure

```
Calculator/
├── .next/                   # Next.js build folder
├── functions/              # Cloudflare Functions
│   ├── _worker.js         # Main worker for Cloudflare Pages
│   └── api/
│       └── contact.js     # Contact form API
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities and configuration
├── next.config.js          # Next.js configuration
├── wrangler.toml           # Cloudflare configuration
└── package.json            # Dependencies and scripts
```

## 🔧 Technical Details

### API Endpoint
- **URL:** `/api/contact`
- **Method:** POST
- **Format:** JSON
- **Handler:** Cloudflare Functions

### Required Form Fields
- `name` - Name
- `email` - Email
- `url` - Website URL
- `message` - Message

### Optional Fields
- `stack` - Technology stack
- `regions` - Regions
- `languages` - Languages
- `locale` - Locale

## 🌐 Supported Languages

- 🇺🇸 English (en)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)

## 📚 Documentation

- [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) - Detailed deployment instructions
- [SETUP.md](./SETUP.md) - Project setup

## 🆘 Support

If the form doesn't work:
1. Check logs in Cloudflare Dashboard
2. Make sure Functions are enabled
3. Verify all files are uploaded to the project

## 🎯 What Happens When Form is Submitted

1. **Frontend** sends JSON data to `/api/contact`
2. **Cloudflare Worker** (`_worker.js`) processes the request
3. **API function** (`functions/api/contact.js`) validates data
4. **Response** is returned to user

Now everything should work without errors! 🎉 