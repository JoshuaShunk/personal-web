import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-background': 'var(--background-color)',
        'theme-text': 'var(--text-color)',
        'navbar-bg': 'var(--navbar-bg-color)',
        'navbar-text': 'var(--navbar-text-color)',
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: ["light", "dark"],
  },

};
export default config;
