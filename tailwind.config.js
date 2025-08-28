/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0A84FF',
        primary: {
          50: '#E5F3FF',
          100: '#CCE7FF',
          200: '#99CFFF',
          300: '#66B7FF',
          400: '#339FFF',
          500: '#0A84FF',
          600: '#0066CC',
          700: '#004D99',
          800: '#003366',
          900: '#001A33',
        },
        gray: {
          50: '#F8F9FB',
          100: '#F2F4F7',
          200: '#E5E8ED',
          300: '#D1D6DD',
          400: '#8D95A3',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#0B0D12',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'system-ui', 'SF Pro Text', 'Inter', 'sans-serif'],
        display: ['-apple-system', 'system-ui', 'SF Pro Display', 'Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        },
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        'apple': '0 4px 16px rgba(0,0,0,0.08)',
        'apple-lg': '0 10px 30px rgba(0,0,0,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
