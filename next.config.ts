import type { NextConfig } from "next";

import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default withBotId(nextConfig);
