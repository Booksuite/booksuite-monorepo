/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => [
      {
          source: '/api/:path*',
          destination: `${process.env.API_URL}/:path*`|| 'https://localhost:3000/:path*',
      },
  ],
  experimental: {
      typedRoutes: true,
  },
}

export default nextConfig
