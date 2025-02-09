import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	
	images: {

		remotePatterns: [
			{
				protocol: "https",
				hostname: "dailymed.nlm.nih.gov",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "shopping-phinf.pstatic.net",
			},
		],
		domains: process.env.NEXT_PUBLIC_IMAGE_DOMAIN
			? [process.env.NEXT_PUBLIC_IMAGE_DOMAIN]
			: [],
	},

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: ["@svgr/webpack"],
		});

		return config;
	},

	experimental: {
		turbo: {
			rules: {
				"*.svg": {
					loaders: ["@svgr/webpack"],
					as: "*.js",
				},
			},
		},
	},
};

export default nextConfig;
