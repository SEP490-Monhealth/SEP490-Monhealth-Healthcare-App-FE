import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["img.vietqr.io"]
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/dashboard",
        permanent: false
      }
    ]
  }
}

export default nextConfig
