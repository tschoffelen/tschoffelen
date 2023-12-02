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
