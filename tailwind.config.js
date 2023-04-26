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
        violet: '#3C1635',
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
