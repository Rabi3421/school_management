/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C4ED8',
          light: '#3B6FE8',
          dark: '#1338B0',
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          500: '#1C4ED8',
          600: '#1338B0',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          50: '#F0F9FF',
        },
        background: '#F8FAFF',
        surface: '#FFFFFF',
        foreground: '#0F172A',
        muted: '#64748B',
        'muted-light': '#94A3B8',
        border: '#E2E8F0',
        'border-light': '#F1F5F9',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(15, 23, 42, 0.06)',
        'card': '0 4px 24px rgba(15, 23, 42, 0.08)',
        'lifted': '0 20px 40px rgba(28, 78, 216, 0.12)',
        'blue': '0 8px 32px rgba(28, 78, 216, 0.2)',
        'inner-soft': 'inset 0 1px 3px rgba(15, 23, 42, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFF 40%, #E0F2FE 100%)',
        'blue-gradient': 'linear-gradient(135deg, #1C4ED8 0%, #0EA5E9 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(28, 78, 216, 0.04) 0%, rgba(14, 165, 233, 0.04) 100%)',
      },
      animation: {
        'float': 'floatY 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'gradient': 'gradientShift 6s ease infinite',
        'fade-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(28, 78, 216, 0.4)' },
          '70%': { transform: 'scale(1)', boxShadow: '0 0 0 12px rgba(28, 78, 216, 0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(28, 78, 216, 0)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};