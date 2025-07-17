/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'ui-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        'ui-orange': {
          100: '#fed7aa',
          500: '#f97316',
          600: '#ea580c',
          900: '#9a3412',
        },
        'ui-teal': {
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          900: '#134e4a',
        },
        'ui-lightBlue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
        },
        'text-100': '#1f2937',
        'text-60': '#6b7280',
        'text-40': '#9ca3af',
      },
      fontSize: {
        'clamp-sm': ['14px', { lineHeight: '1.5' }],
        'clamp-lg': ['18px', { lineHeight: '1.5' }],
        'clamp-3xl': ['30px', { lineHeight: '1.2' }],
      },
      fontFamily: {
        'sans': ['Onest', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 