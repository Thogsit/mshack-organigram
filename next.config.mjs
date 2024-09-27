/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/mshack-organigram",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
