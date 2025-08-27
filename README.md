# C&C CookieComply

Professional cookie compliance solutions for businesses. We make GDPR compliance simple, effective, and user-friendly.

## 🚀 Features

- **Multilingual Support**: English, German, and French
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Tech Stack**: React 18, TypeScript, Vite
- **Accessibility**: WCAG compliant with focus management
- **Dark Mode**: Automatic theme detection and manual toggle

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── content/            # i18n content files (EN, DE, FR)
├── lib/                # Utilities and configurations
├── pages/              # Page components
└── App.tsx            # Main app with routing
```

## 🌍 Internationalization

The app supports three languages:
- **English** (`/en`) - Default
- **German** (`/de`) - Deutsch
- **French** (`/fr`) - Français

Content is managed through JSON files in `src/content/`.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cc-cookiecomply
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 Pages & Sections

- **Hero**: Main value proposition and CTAs
- **Problem**: Common cookie banner issues
- **Services**: What we offer (CMP setup, banner fixes, etc.)
- **Process**: 5-step implementation process
- **Deliverables**: What clients receive
- **Benefits**: Why choose us
- **Cases**: Before/after case studies
- **Pricing**: Service plans and pricing
- **FAQ**: Frequently asked questions
- **Contact**: Contact form with validation

## 🎨 Design System

- **Colors**: Blue primary (#3B82F6), semantic colors for success/warning/error
- **Typography**: Inter font family with responsive sizing
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable button, card, and form components

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=C&C CookieComply
VITE_APP_DESCRIPTION=Professional cookie compliance solutions
```

### Tailwind Configuration

Custom colors and components are defined in `tailwind.config.cjs`.

## 📝 Content Management

To add or modify content:

1. Edit the appropriate language file in `src/content/`
2. Follow the existing structure and keys
3. Ensure all languages have the same keys for consistency

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with default settings

### Other Platforms

The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any VPS with nginx

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: [contact@cccookiecomply.com]
- Website: [https://cccookiecomply.com]

---

Built with ❤️ for compliance 