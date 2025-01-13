import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				...colors,
			},
			fontFamily: {
				sans: ["Pretendard Variable", "Arial", "sans-serif"],
			},
			fontSize: {
				"display1-b": ["28px", { lineHeight: "42px", fontWeight: "700" }],
				"display2-b": ["24px", { lineHeight: "36px", fontWeight: "700" }],
				"display2-m": ["24px", { lineHeight: "36px", fontWeight: "500" }],
				"headline-b": ["20px", { lineHeight: "30px", fontWeight: "700" }],
				"headline-m": ["20px", { lineHeight: "30px", fontWeight: "500" }],
				"subhead1-sb": ["16px", { lineHeight: "24px", fontWeight: "600" }],
				"subhead2-sb": ["14px", { lineHeight: "21px", fontWeight: "600" }],
				"subhead3-sb": ["12px", { lineHeight: "18px", fontWeight: "600" }],
				"body1-r": ["16px", { lineHeight: "24px", fontWeight: "400" }],
				"body2-r": ["14px", { lineHeight: "21px", fontWeight: "400" }],
				"caption1-r": ["12px", { lineHeight: "18px", fontWeight: "400" }],
				"caption2-l": ["10px", { lineHeight: "15px", fontWeight: "300" }],
			},
		},
	},
	plugins: [],
} satisfies Config;
