/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#ffae00',
        second: '#262f37',
        hover: '#FF9500',
        button: '#90c446'
      },
      colors: {
        primary: '#ffae00',
        second: '#555',
        hover: '#FF9500'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem'
      }
    }
  },
  plugins: []
};
