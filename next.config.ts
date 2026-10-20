import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Нативный модуль sqlite3 не должен бандлиться — он загружается в Node.js-рантайме
  serverExternalPackages: ["sqlite3"],
};

export default nextConfig;