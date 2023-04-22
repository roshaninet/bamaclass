/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    reactStrictMode: true,
    crossOrigin: 'anonymous',
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: ['api.bamaclass.com', 'static.bamaclass.com', 'api.bamaclass.test'],
        deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    }
}

module.exports = nextConfig
