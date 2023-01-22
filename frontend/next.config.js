/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'drive.google.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
