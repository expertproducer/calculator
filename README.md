# C&C CookieComply

Professional cookie compliance solutions for businesses. We make GDPR compliance simple, effective, and user-friendly.

## 🚀 Features

- **Multi-language support**: English, German, French
- **Responsive design**: Works on all devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Form validation**: Contact form with Zod validation
- **Dark mode**: Automatic theme detection

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Next.js 15
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Routing**: Next.js App Router

## 📁 Project Structure

```
app/
├── [locale]/      # Localized pages
├── components/    # React components
├── lib/          # Utilities and schemas
├── globals.css   # Global styles
└── layout.tsx    # Root layout
```

## 🌍 Languages

- `/en` - English (default)
- `/de` - German
- `/fr` - French

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Export static files**:
   ```bash
   npm run export
   ```

## 📱 Sections

- **Hero** - Main landing section with CTAs
- **Problem** - Common cookie banner issues
- **Services** - What we offer (10 services)
- **Process** - 5-step implementation process
- **Deliverables** - What clients receive
- **Benefits** - Why choose us
- **Cases** - Before/after case studies
- **Pricing** - Service plans
- **FAQ** - Frequently asked questions
- **Contact** - Contact form

## 🔧 Configuration

- **Next.js**: `next.config.js`
- **Tailwind**: `tailwind.config.js`
- **TypeScript**: `tsconfig.json`
- **ESLint**: `.eslintrc.cjs`

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static files
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The project is configured for deployment on various platforms:

- **Cloudflare Pages**: Git-based deployment with `wrangler.toml` and Cloudflare Functions
- **Vercel**: Automatic deployment from GitHub with Vercel Functions
- **Netlify**: Drag & drop deployment with Netlify Functions
- **GitHub Pages**: Static site hosting

### Cloudflare Pages Deployment

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `out`
4. Enable Cloudflare Functions in your project settings
5. Deploy automatically on push to main branch

### API Configuration

The contact form uses serverless functions for form processing:

- **Cloudflare Pages**: Uses Cloudflare Functions in `/functions` directory
- **Vercel**: Uses Vercel Functions in `/app/api` directory  
- **Netlify**: Uses Netlify Functions in `/netlify/functions` directory

### Environment Variables

Set these environment variables in your deployment platform:

- `NEXT_PUBLIC_CONTACT_EMAIL`: Contact email for form submissions
- `NEXT_PUBLIC_GDPR_SUBDOMAIN`: Your domain URL 