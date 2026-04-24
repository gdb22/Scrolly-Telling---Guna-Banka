import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0] ?? "";
const isUserOrOrgSite = repository === `${owner}.github.io`;
const shouldUseBasePath =
  !!process.env.GITHUB_ACTIONS && repository.length > 0 && !isUserOrOrgSite;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: shouldUseBasePath ? `/${repository}` : "",
  },
  basePath: shouldUseBasePath ? `/${repository}` : "",
  assetPrefix: shouldUseBasePath ? `/${repository}/` : undefined,
};

export default nextConfig;
