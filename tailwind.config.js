import { rgbToHex } from '@mui/material';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        calc: "calc(50% - 10px)"
      },
      maxHeight: {
        150: "150px"
      },
      backgroundColor: {
        primary: "#514983",
        secondary: "#261f47"
      }
    },
  },
  plugins: [],
}

