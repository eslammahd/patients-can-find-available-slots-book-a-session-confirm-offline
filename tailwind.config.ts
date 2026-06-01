import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f9f6',
          100: '#e3ede3',
          200: '#c7dbc7',
          300: '#9bbf9b',
          400: '#6a9e6a',
          500: '#4a7c4a',
          600: '#3a6339',
          700: '#2f4f2e',
          800: '#283f28',
          900: '#223422',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf6ec',
          200: '#f4edd6',
        },
      },
    },
  },
  plugins: [],
};

export default config;
