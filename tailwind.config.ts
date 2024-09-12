import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./frontend/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};

// Adiciona um log para verificar se o Tailwind está sendo processado corretamente
console.log("Tailwind config carregado:", config);

export default config;
