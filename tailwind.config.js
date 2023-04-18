/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        blue: '#69e5f8',
        purple: '#3c1635',
        black: '#000000',
        violet: '#3C1635'
      },
      fontFamily: {
        header: 'Poppins',
        label: 'Open Sans',
        input: 'Nunito',
        error: 'Open Sans',
        button: 'Poppins',
        footer: 'Nunito'
      }
    }
  },
  plugins: []
}
