module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./hooks/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
		"./nextComponents/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		fontFamily: {
			poppins: "Poppins, sans-serif"
		},
		extend: {
			animation: {
				loaderSpin: "loader 1.5s ease-in-out infinite"
			},
			colors: {
				mBlack: "#162135",
				mGray: "#868D98",
				mWhite: "#F9F9FA"
			},
			keyframes: {
				loader: {
					"0%, 90%": { transform: "rotateY(0deg)" },
					"45%": { transform: "rotateY(180deg)" }
				}
			},
			zIndex: { 999: "999" }
		}
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/typography")
	]
};
