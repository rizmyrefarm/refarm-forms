/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;
