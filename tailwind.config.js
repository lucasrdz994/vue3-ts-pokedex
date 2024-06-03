/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F22539',
        'primary-dark': '#C00E20',
        secondary: '#BFBFBF',
        'soft-gray': '#F9F9F9'
      }
    }
  },
  plugins: []
}
