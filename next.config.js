/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix workspace root warning
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  typescript: {
    // Temporarily ignore TypeScript errors to resolve infinite type checking
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow building even with ESLint errors during development  
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;