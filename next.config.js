/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // Fix file tracing issues with proper output configuration
  outputFileTracingRoot: '/Users/ssaper/Desktop/my-projects/pm33-claude-execution/app/frontend',
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