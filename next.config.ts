import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      "api.dicebear.com",
      "placehold.co",
      "tyivppecifemhowhtyxb.supabase.co",
      "ui-avatars.com",
      "images.pexels.com",
    ],
  },
};

export default nextConfig;
