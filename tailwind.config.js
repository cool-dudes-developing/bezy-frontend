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
        violet: '#3c1635',
        pink: '#ff5be6',
        background: {
          100: '#661c5b',
          200: '#3c1635',
          300: '#342738',
          400: '#272528',
          500: '#1f1e1e'
        },
        border: '#5b5b5b',
        purplePizzaz: '#FF5BE6',
        electricBlue: '#69E5F8'
      },
      fontFamily: {
        header: 'Poppins',
        label: 'Open Sans',
        input: 'Nunito',
        error: 'Open Sans',
        small: 'Open Sans',
        button: 'Poppins',
        footer: 'Nunito',
        paragraph: 'Nunito',
        sidebarButton: 'Poppins',
      },
      space: {
        header: '4rem',
        sidebar: '13rem'
      }
    }
  },
  plugins: []
}
