/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocorlatte: {
          cream: '#fffdfa',
          'cream-dark': '#fbf8f3',
          chocolate: '#4a3525',
          'chocolate-light': '#6b5b52',
          'chocolate-deep': '#2d1f15',
        },
      },
    },
  },
  plugins: [],
}
