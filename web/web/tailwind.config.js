module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#8257E5",
        },

        brand_hover: {
          500: "#996DFF",
        }
      },

      borderRadius: {
        md: '4px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
