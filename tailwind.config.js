/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary :'#030014',
        secondary :'#151312',
        accent : '#AB8BFF',
        light : {
          100 : '#D6CF77',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark :{
          100 : '#221F3D',
          200: '#0F0D23',
        }
      }
    },
  },
  plugins: [],
}