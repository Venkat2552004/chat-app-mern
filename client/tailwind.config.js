/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	darkMode: "class",
	theme: {
		extend: {
			backgroundImage: {
				"anime-bg": "url('/src/assests/bg.jpeg')",
			},
			fontFamily: {
				sans: ['"Open Sans"', "sans-serif"],
			},
			colors: {
				foreground: {
					primary: "var(--color-foreground-primary)",
					secondary:"var(--color-foreground-secondary)",
				},
				background: {
					primary: "var(--color-background-primary)",
					secondary:"var(--color-background-secondary)",
				},
			},
		},
	},
	plugins: [flowbite.plugin()],
};
