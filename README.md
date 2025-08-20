# Wallet Impact App

A production-ready Progressive Web App (PWA) for calculating financial impacts including mortgage payments, student loan interest, and gas price changes.

## Features

- **Mortgage Calculator**: Compare old vs new rates, see monthly payment differences
- **Student Loan Calculator**: Estimate monthly and daily interest
- **Gas Impact Calculator**: Calculate monthly cost impact from price changes
- **Impact Grid**: Visualize financial impacts across different lifestyle profiles
- **PWA**: Installable app with offline capabilities
- **Google Analytics 4**: Optional event tracking for user interactions
- **Responsive Design**: Works on all devices with Tailwind CSS
- **Dark Theme**: Easy on the eyes with modern UI
- **English Interface**: Clean, professional English-only interface

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier
- **Hosting**: Firebase Hosting

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**: Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI (if available)

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## PWA Features

The app is configured as a Progressive Web App with:

- **Auto-updates**: App updates automatically when new versions are deployed
- **Installable**: Users can add to home screen on mobile/desktop
- **Offline support**: Basic offline functionality
- **App-like experience**: Full-screen standalone mode

### PWA Icons

Place these files in the `/public` directory:
- `pwa-192.png` (192x192 pixels)
- `pwa-512.png` (512x512 pixels)
- `favicon.svg` (SVG format)

## Google Analytics 4 (Optional)

### Setup

1. **Create `.env` file** in project root:
   ```bash
   VITE_GA_ID=G-XXXXXXXXXX
   ```

2. **Rebuild the app**:
   ```bash
   npm run build
   ```

### Tracked Events

When GA4 is enabled, the app tracks these events:

- `mortgage_calc` - Mortgage calculations performed
- `mortgage_copy` - Mortgage results copied
- `mortgage_reset` - Mortgage form reset
- `student_calc` - Student loan calculations
- `student_copy` - Student loan results copied
- `student_reset` - Student loan form reset
- `gas_calc` - Gas impact calculations
- `gas_copy` - Gas results copied
- `gas_reset` - Gas form reset
- `grid_export` - CSV export from impact grid

### Disabling Analytics

- **Option 1**: Don't set `VITE_GA_ID` - analytics completely disabled
- **Option 2**: Block GA in browser with ad blockers
- **Option 3**: Use version without GA integration

## Deployment

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (first time only):
   ```bash
   firebase init hosting
   # Select your project
   # Public directory: dist
   # Configure as SPA: Yes
   # Overwrite index.html: No
   ```

4. **Build and deploy**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

### Environment Variables

For production, set these in Firebase:

```bash
firebase functions:config:set ga.id="G-XXXXXXXXXX"
```

## Embedding in Blogger

### HTML/JS Gadget

Add this code to your Blogger post or page:

```html
<div style="position:relative; width:100%; min-height:85vh;">
  <iframe
    src="https://YOUR_PROJECT_ID.web.app"
    style="border:0; position:relative; width:100%; height:85vh;"
    loading="lazy" 
    allow="clipboard-write"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
```

### Post/Page Embed

For direct embedding in posts:

```html
<iframe 
  src="https://YOUR_PROJECT_ID.web.app" 
  width="100%" 
  height="800px" 
  frameborder="0">
</iframe>
```

Replace `YOUR_PROJECT_ID` with your actual Firebase project ID.

## Project Structure

```
/
├── public/                 # Static assets
│   ├── pwa-192.png       # PWA icon 192x192
│   ├── pwa-512.png       # PWA icon 512x512
│   ├── favicon.svg       # Favicon
│   └── privacy.html      # Privacy policy page
├── src/
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   │   ├── money.ts      # Financial calculations
│   │   └── ga.ts         # Google Analytics wrapper
│   ├── test/             # Test setup
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── firebase.json          # Firebase hosting config
├── vite.config.ts         # Vite configuration
├── tailwind.config.cjs    # Tailwind CSS config
└── package.json           # Dependencies and scripts
```

## Testing

### Run Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage report
```

### Test Structure

- **Unit tests**: `src/lib/money.test.ts` - Financial calculation functions
- **Component tests**: Test React components with Testing Library
- **Integration tests**: Test user workflows and interactions

## Performance

### Lighthouse Scores

The app is optimized for:
- **Performance**: 90+ (optimized bundle, lazy loading)
- **Accessibility**: 95+ (semantic HTML, ARIA labels)
- **Best Practices**: 90+ (security headers, HTTPS)
- **SEO**: 90+ (meta tags, structured data)

### Bundle Analysis

```bash
npm run build -- --analyze
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (18+ required)
2. **PWA not installable**: Verify icon files exist in `/public`
3. **GA4 not working**: Ensure `VITE_GA_ID` is set correctly
4. **Tests failing**: Run `npm install` to ensure all deps are installed

### Development Tips

- Use `npm run dev` for local development
- Check browser console for errors
- Use React DevTools for component debugging
- Monitor network tab for API calls

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test: `npm test`
4. Commit changes: `git commit -am 'Add feature'`
5. Push branch: `git push origin feature-name`
6. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

- **Issues**: Create GitHub issue
- **Documentation**: Check this README
- **Community**: Join our discussions

---

**Built with ❤️ using React, Vite, and Tailwind CSS** 