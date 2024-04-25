/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		extend: {
			backgroundImage: {
				"anime-bg": "url('/src/assests/bg.jpeg')",
			},
		},
	},
	plugins: [flowbite.plugin()],
};
