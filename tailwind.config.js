/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-dark': '#EDE8DF',
        'cream-light': '#FAF7F2',
        black: '#000000',
        accent: '#D4FF2B',
        'accent-hover': '#c4ef1b',
        blue: '#A8D8EA',
        pink: '#FFB6C1',
        'green-dot': '#22C55E',
        'text-main': '#000000',
        'text-secondary': '#444444',
        'text-dim': '#777777',
      },
      fontFamily: {
        mono: ['"Space Mono"', '"JetBrains Mono"', 'monospace'],
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-med': 'floatMed 6s ease-in-out infinite',
        'float-fast': 'floatFast 5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        floatMed: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-2deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
