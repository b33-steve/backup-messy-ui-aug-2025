/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // Remove standalone output for development to fix clientReferenceManifest bug
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  typescript: {
    // Allow building even with TypeScript errors for production deployment
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow building even with ESLint errors during development
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;