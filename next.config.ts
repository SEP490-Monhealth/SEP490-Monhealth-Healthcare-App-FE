import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "img.vietqr.io",
      "i.pinimg.com",
      "th.bing.com"
    ]
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
