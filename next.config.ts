import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            // Explicitly disable browsing-topics to avoid the warning.
            // You can add other policies here as needed, e.g., "geolocation=(), microphone=()"
            value: 'browsing-topics=()',
          },
        ],
      },
    ];
  },
  /* other config options here */
};

export default nextConfig;
