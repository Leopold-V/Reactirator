module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'arrow-bounce': 'abounce 1s infinite;',
        'spin-slow': 'spin 3s linear infinite',
       },
       keyframes: {
        abounce: {
          '0%, 100%': { 
            transform: 'translateX(+15%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        }
      },
      inset: {
        '23': '5.5rem'
      },
      minHeight: {
        small: '2rem',
        medium: '14rem',
        big: '33rem',
      },
      maxHeight: {
        small: '2rem',
        medium: '14rem',
        big: '33rem',
      },
      height: {
        big: '33rem',
      },
      colors: {
        primary: '#181b33',
        text: '#cdd5e1',
        blueGrayLight: '#fafcff', 
        blueGray: '#2e3748',
        blueGray2: '#4a5567',
      },
      zIndex: {
        '-10': '-10',
       },
      boxShadow: {
        'red-lg': '0 10px 15px 0 rgba(239, 68, 68, 0.3)',
        red: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
