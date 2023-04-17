/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#ffffff',
      blue: '#69e5f8',
      purple: '#3c1635',
      black: '#000000'
    },
    fontFamily: {
      header: 'Poppins',
      label: 'Open Sans',
      input: 'Nunito',
      error: 'Open Sans',
      button: 'Poppins',
      footer: 'Nunito'
    }
  },
  plugins: []
}
