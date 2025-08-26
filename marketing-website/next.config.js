/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
  },
  output: 'standalone',
  eslint: {
    dirs: ['app', 'components'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig