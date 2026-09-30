/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/test", destination: "/", permanent: true },
      { source: "/test/:path*", destination: "/:path*", permanent: true },
      { source: "/projects", destination: "/old-view/projects", permanent: true },
      { source: "/posts", destination: "/old-view/posts", permanent: true },
      { source: "/team", destination: "/old-view/team", permanent: true },
    ]
  },
}

export default nextConfig
