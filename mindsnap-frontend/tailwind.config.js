module.exports = {
    theme: {
      extend: {
        colors: {
          // your custom colors
        },
        animation: {
          fadeIn: 'fadeIn 2s ease-out forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
      },
    },
    plugins: [],
  };
  