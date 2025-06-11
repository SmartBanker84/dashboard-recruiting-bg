/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: undefined // puoi anche rimuoverlo del tutto
  }
}

module.exports = nextConfig
