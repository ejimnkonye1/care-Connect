/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
    
      fontFamily:{
        sans : ['Segoe UI', 'Helvetica'],
        poppins: ['Poppins', 'sans-serif'],
        paci: ['Pacifico ', 'cursive'],
         nun: [ "Nunito", "sans-serif"]
      },
      fontSize: {
        'h4': 'calc(1.275rem + 0.3vw)', 
        'h5': '1.25rem',
        'h1': 'calc(1.525rem + 3.3vw)',
        'query': 'calc(1.375rem + 1.5vw)',
         'hero': 'calc(1.525rem + 3.3vw)'
      },
     

    },
  },
  plugins: [],
}

