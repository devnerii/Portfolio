import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        floatDown: {
          '0%': { transform: 'translateY(0)', opacity: '0.8' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        floatLeft: {
          '0%': { transform: 'translateX(0)', opacity: '0.8' },
          '100%': { transform: 'translateX(-100vw)', opacity: '0' },
        },
        floatRight: {
          '0%': { transform: 'translateX(0)', opacity: '0.8' },
          '100%': { transform: 'translateX(100vw)', opacity: '0' },
        },
      },
      animation: {
        floatUp: 'floatUp 15s linear infinite',
        floatDown: 'floatDown 15s linear infinite',
        floatLeft: 'floatLeft 20s linear infinite',
        floatRight: 'floatRight 18s linear infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
