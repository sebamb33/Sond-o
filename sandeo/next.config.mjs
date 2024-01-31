/** @type {import('next').NextConfig} */
{
  import("bcrypt-ts").NextConfig;
}
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
