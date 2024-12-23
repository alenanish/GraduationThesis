import type { Config } from "tailwindcss";

export default {
  content: [    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h4': '24px',
        'h5': '18px',
        'body-m': '16px',
        'body-s': '14px',
        'caption': '12px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'white': {
          0: '#FFFFFF',
          50: '#EAEAEA',
          100: '#D1D1D1',
          200: '#B0B0B0',
          300: '#888888',
          400: '#6D6D6D',
          500: '#5D5D5D',
          600: '#4F4F4F',
          700: '#454545',
          800: '#383838',
          900: '#212121',
        },
        'blue': {
          50: '#E9F5FD',
          100: '#BCE2F7',
          200: '#8CCFF0',
          300: '#57BCE6',
          400: '#00A8D9',
          500: '#0094C8',
          600: '#007FB3',
          700: '#006A9A',
          800: '#00567F',
          900: '#004161',
        },
        'green': {
          50: '#E7F8E6',
          100: '#B5EAB7',
          200: '#83DA8B',
          300: '#4DC863',
          400: '#00B43E',
          500: '#009F1D',
          600: '#008A00',
          700: '#007400',
          800: '#005D00',
          900: '#004700',
        },
        'red': {
          50: '#FFEDE9',
          100: '#FFCAC0',
          200: '#FFA699',
          300: '#FF8277',
          400: '#FF5E59',
          500: '#FB3B41',
          600: '#E2132D',
          700: '#C4001F',
          800: '#A10015',
          900: '#7C000F',
        },
        'yellow': {
          50: '#FBF3DF',
          100: '#EEDCA1',
          200: '#DCC667',
          300: '#C7B12D',
          400: '#B09C00',
          500: '#988700',
          600: '#817300',
          700: '#6C6000',
          800: '#574C00',
          900: '#443A00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
