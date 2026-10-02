/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          red: '#E50914',         // True Bold Crimson Red
          'red-dark': '#8B0000',    // Deep Dark Crimson Red
          'red-glow': '#FF3344',    // Bright Scarlet Red Glow
          blue: '#B30000',        // Secondary Warm Dark Red
          'blue-dark': '#1A0305',   // Deep Black Red
          'blue-glow': '#FF4D4D',   // Vibrant Red Glint
          dark: '#140305',        // Rich Dark Red Background
          darker: '#0A0102',      // Deep Obsidian Red
          card: '#200508',        // Dark Crimson Red Card
          accent: '#FFD700'       // Warm Gold / Scarlet Accent
        }
      },
      fontFamily: {
        comic: ['Bangers', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwritten: ['Caveat', 'Dancing Script', 'cursive']
      },
      boxShadow: {
        'spider-glow': '0 0 25px rgba(229, 9, 20, 0.7), 0 0 50px rgba(229, 9, 20, 0.4)',
        'blue-glow': '0 0 25px rgba(255, 77, 77, 0.7), 0 0 50px rgba(255, 77, 77, 0.4)',
        'comic': '6px 6px 0px #000000',
        'comic-red': '6px 6px 0px #E50914',
        'comic-blue': '6px 6px 0px #8B0000',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'web-swing': 'webSwing 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(229,9,20,0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(229,9,20,1))' },
        },
        webSwing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
}
