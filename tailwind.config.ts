import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to top right, #FFFFFF,#FFFFFF,#FFFFFF, #FFFFFF,#FFFFFF,#FFFFFF, #FFF5F7, #FFF5F7, #FFF5F7, #FFF3F6,#FFEAF0,#FDD7E3,#F6C2D9,#E5C0E4,#D0B9EC,#D0B9EC)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
	  colors:{
		'warm-blue':'#5547EE'
	  }
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
