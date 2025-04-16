/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "fastly.picsum.photos",
          pathname: "**",
        },
      ],
    },
    rewrites: async () => [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*` || "https://localhost:3000/:path*",
      },
    ],
    experimental: {
      typedRoutes: true,
    },
  }
  
  export default nextConfig
  