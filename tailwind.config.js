// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],

  theme: {
    extend: {
      colors: {
        'mon-bleu': '#1FB6FF',
        'orange-custom': '#FFBA08',
        'customGreen': '#4AA441', // ta couleur verte
      },
    },
  },
  plugins: [],
}
