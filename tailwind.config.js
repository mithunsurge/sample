/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      colors: {
        'galactic': {
          blue: '#00AAFF',
          green: '#00FF64',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#5856D6',
          pink: '#FF2D92',
          yellow: '#FFCC00',
          gray: '#8E8E93',
        },
        'starwars': {
          light: 'rgba(0, 170, 255, 0.15)',
          medium: 'rgba(0, 170, 255, 0.08)',
          dark: 'rgba(0, 20, 40, 0.5)',
          border: 'rgba(0, 170, 255, 0.3)',
        }
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '100px',
      },
      animation: {
        'float-complex': 'floatComplex 12s ease-in-out infinite',
        'cosmic-shift': 'cosmicShift 6s ease-in-out infinite',
        'background-shift': 'backgroundShift 30s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'hologram-sweep': 'hologramSweep 3s ease-in-out infinite',
      },
      keyframes: {
        floatComplex: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(12px) rotate(3deg)' },
          '50%': { transform: 'translateY(-12px) translateX(-12px) rotate(-3deg)' },
          '75%': { transform: 'translateY(-25px) translateX(8px) rotate(2deg)' },
        },
        cosmicShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        backgroundShift: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2) rotate(180deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 30px rgba(0, 170, 255, 0.5)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 60px rgba(0, 170, 255, 0.8)',
            transform: 'scale(1.1)'
          },
        },
        hologramSweep: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
      },
      boxShadow: {
        'glass': '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 3px 0 rgba(255, 255, 255, 0.25)',
        'galactic-blue': '0 0 30px rgba(0, 170, 255, 0.5), 0 0 60px rgba(0, 170, 255, 0.3)',
        'galactic-green': '0 0 30px rgba(0, 255, 100, 0.5), 0 0 60px rgba(0, 255, 100, 0.3)',
        'galactic-orange': '0 0 30px rgba(255, 149, 0, 0.5), 0 0 60px rgba(255, 149, 0, 0.3)',
        'galactic-red': '0 0 30px rgba(255, 59, 48, 0.5), 0 0 60px rgba(255, 59, 48, 0.3)',
      },
    },
  },
  plugins: [],
};