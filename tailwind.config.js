/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // gradientColorStops: {
      //   'custom-gradient': 'linear-gradient(to right, rgba(71,178,178,1) 0%, rgba(26,162,194,1) 30%, rgba(62,140,199,1) 50%, rgba(113,114,184,1) 70%, rgba(148,84,147,1) 90%, rgba(160,57,96,1) 100%)',
      // },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#7e6fff',
          secondary: '#47b2b2',
          // accent: '#dc8850',
          // neutral: '#18182f',
          // 'neutral-focus': '#fff',
          // 'base-100': '#f0f0f0',
          // info: '#3abff8',
          // success: '#36d399',
          // warning: '#fbbd23',
          // error: '#ea5d6f',
          // 'info-content': '#e5e7eb',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          primary: '#fda131',
          secondary: '#47b2b2',
          // accent: '#dc8850',
          // neutral: '#18182f',
          // info: '#3abff8',
          // success: '#36d399',
          // warning: '#fbbd23',
          // error: '#ea5d6f',
          // 'info-content': '#374151',
        },
      },
    ],
  },
}
