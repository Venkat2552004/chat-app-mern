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
		},
	},
	plugins: [flowbite.plugin()],
};
