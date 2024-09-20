module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          thumb: 'linear-gradient(135deg, #ffffff, #d3c7dd)',
          track: '#f1f1f1',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}