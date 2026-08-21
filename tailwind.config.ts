import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        refarm: {
          900: "#0f3d21",
          800: "#14532d",
          700: "#1b6b3a",
          600: "#2f9e44",
          500: "#38b000",
          400: "#70e000",
          100: "#e6f4ea",
          50: "#f2f9f4",
          bg: "#eef2ef",
          ink: "#1a1f1c",
          muted: "#5b6b60",
          line: "#d3ded7",
          "line-strong": "#b7c7bd",
          amber: {
            bg: "#fff8e6",
            line: "#e6c766",
            text: "#6b5100",
            border: "#d4a017",
          }
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
