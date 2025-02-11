/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "https://api-booksuite.hivegroup.com.br/api/v1",
    GOOGLE_MAPS_API: "AIzaSyCp3KfAPsYDEOulVMYOY7c3MTRvXbWYGN4",
  },
};

export default nextConfig;
