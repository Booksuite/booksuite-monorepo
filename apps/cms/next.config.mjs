
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    rewrites: async () => [
        {
            source: '/api/:path*',
            destination: process.env.API_URL
                ? `${process.env.API_URL}/:path*`
                : 'http://localhost:3000/:path*',
        },
    ],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        typedRoutes: true,
    },
}

export default nextConfig
