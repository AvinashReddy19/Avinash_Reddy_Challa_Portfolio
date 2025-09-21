/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-hosting-domain.com'], // Add any image domains you'll use
  },
  // Add any server-side environment variables you need
  env: {
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig