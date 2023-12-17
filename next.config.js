/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        permanent: false,
        source: "/box",
        destination: "https://schof.link/",
      },
      {
        permanent: false,
        source: "/scaffold",
        destination: "https://serverless-scaffold.flexible.agency/",
      },
      {
        permanent: false,
        source: "/md",
        destination: "https://schof.link/md",
      },
      {
        permanent: false,
        source: "/consulting",
        destination: "https://includable.com/consultancy",
      },
      {
        permanent: false,
        source: "/rss.xml",
        destination: "/api/rss.xml",
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/f/:path*",
        destination: "https://schof-box.s3-eu-west-1.amazonaws.com/f/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/posts",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
