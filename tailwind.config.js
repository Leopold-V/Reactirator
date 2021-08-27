module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: 'class', // or 'media' or 'class'
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
      maxWidth: {
        small: '2rem',
        medium: '14rem',
        big: '33rem',
      },
      colors: {
        primary: '#181b33',
        blueGray: '#2e3748',
      },
      zIndex: {
        '-10': '-10',
       },
    },
  },
  variants: {
    extend: {
      ringWidth: ['dark'],
    }
  },
  plugins: [],
}
