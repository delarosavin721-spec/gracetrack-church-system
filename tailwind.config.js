/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#1A1A2E',
          900: '#16213E',
          800: '#0F3460',
          700: '#2A4A7F',
        },
        teal: {
          50: '#EFFEFB',
          100: '#C8FFF5',
          200: '#91FFEB',
          300: '#52F5DF',
          400: '#1DE0CC',
          500: '#0CBFC7',
          600: '#0A9BA3',
          700: '#0D7C82',
          800: '#0F6268',
          900: '#044B50',
        },
        gold: {
          400: '#5EEAD4',
          500: '#0CBFC7',
          600: '#0A9BA3',
        },
        cream: '#FAFAFA',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(12, 191, 199, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(12, 191, 199, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
