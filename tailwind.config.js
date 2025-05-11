/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,tsx}',
    './App.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './node_modules/nativewind/dist/**/*.js',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
