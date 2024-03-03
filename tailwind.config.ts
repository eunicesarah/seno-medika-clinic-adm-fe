import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'primary1':'#4E937A',
        'shade1':'#46846E',
        'shade2':'#3E7662',
        'shade3':'#376755',
        'shade4':'#2F5849',
        'shade5':'#274A3D',
        'shade6':'#1F3B31',
        'shade7':'#172C25',
        'shade8':'#101D18',
        'tint1':'#609E87',
        'tint2':'#71A995',
        'tint3':'#83B3A2',
        'tint4':'#95BEAF',
        'tint5':'#A7C9BD',
        'tint6':'#CADFD7',
        'tint7':'#EDF4F2',
        'cancel':'#FA7070',
      },
    },
  },
  plugins: [],
};
export default config;
