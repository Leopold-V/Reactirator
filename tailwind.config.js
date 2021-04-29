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
      minHeight: {
        big: '33rem',
      },
      height: {
        big: '33rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
