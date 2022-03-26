/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: [
			"@types",
			"components",
			"hooks",
			"layout",
			"nextComponents",
			"pages",
			"redux",
			"utils"
		]
	},
	reactStrictMode: true
};

module.exports = nextConfig;
