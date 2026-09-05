import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#08070d",
        "stage-dark": "#110e1b",
        "neon-pink": "#ff2a85",
        "neon-cyan": "#00f0ff",
        "neon-purple": "#9d4edd",
        "neon-gold": "#ffd166",
      },
      animation: {
        "lightstick-wave": "wave 2.5s ease-in-out infinite alternate",
        "spotlight-sweep": "sweep 8s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(-12deg) translateY(0px)" },
          "100%": { transform: "rotate(12deg) translateY(-8px)" },
        },
        sweep: {
          "0%": { transform: "rotate(-25deg)", opacity: "0.2" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "rotate(25deg)", opacity: "0.2" },
        },
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 15px rgba(255, 42, 133, 0.6))" },
          "50%": { filter: "drop-shadow(0 0 30px rgba(0, 240, 255, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
