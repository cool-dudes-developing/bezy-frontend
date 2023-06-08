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
        border: '#5b5b5b',
        purplePizzaz: '#FF5BE6',
        electricBlue: '#69E5F8',
        text: {
          DEFAULT: '#fafafa',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
          950: '#292929'
        },
        background: {
          50: '#fcf7fc',
          100: '#faedfa',
          200: '#f3dbf3',
          300: '#e9bee6',
          400: '#db97d5',
          500: '#c76ebe',
          600: '#ab4ea1',
          700: '#8d3e83',
          800: '#733569',
          900: '#602f58',
          DEFAULT: '#4a1a42'
        },
        primary: {
          50: '#fff3fe',
          100: '#ffe7fc',
          200: '#ffcefa',
          300: '#ffa7f2',
          DEFAULT: '#ff5be6',
          500: '#f73eda',
          600: '#db1eba',
          700: '#b61596',
          800: '#95137a',
          900: '#791662',
          950: '#51013e'
        },
        secondary: {
          50: '#f9f5ff',
          100: '#f1e9fe',
          200: '#e5d7fd',
          300: '#d0b7fb',
          400: '#b388f8',
          500: '#965bf1',
          600: '#7f3ae3',
          700: '#6b28c8',
          800: '#5c26a3',
          DEFAULT: '#51228c',
          950: '#310a61'
        },
        accent: {
          50: '#ecfeff',
          100: '#cff9fe',
          200: '#a6f2fb',
          DEFAULT: '#69e5f8',
          400: '#23cfed',
          500: '#07b2d3',
          600: '#098db1',
          700: '#0f718f',
          800: '#165c74',
          900: '#174d62',
          950: '#083244'
        }
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
        sidebarButton: 'Poppins'
      },
      space: {
        header: '4rem',
        sidebar: '13rem'
      }
    }
  },
  plugins: []
}
