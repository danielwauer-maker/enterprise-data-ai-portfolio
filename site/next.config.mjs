const repositoryName = "enterprise-data-ai-portfolio";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGitHubActions ? `/${repositoryName}` : "",
  assetPrefix: isGitHubActions ? `/${repositoryName}/` : "",
};

export default nextConfig;
