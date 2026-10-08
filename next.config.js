/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Canonicalize the public routes used by the landing page and older
  // frontend builds to the actual App Router pages.
  async redirects() {
    return [
      { source: "/login", destination: "/auth/login", permanent: false },
      { source: "/register", destination: "/auth/register", permanent: false },
      { source: "/signup", destination: "/auth/register", permanent: false },
      { source: "/sign-up", destination: "/auth/register", permanent: false },
      { source: "/forgot-password", destination: "/auth/forget-password", permanent: false },
      { source: "/forget-password", destination: "/auth/forget-password", permanent: false },
      { source: "/auth/forgot-password", destination: "/auth/forget-password", permanent: false },
    ];
  },
};

module.exports = nextConfig;
