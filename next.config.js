/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Content-Type",
            value: "image/x-icon",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: `<link rel="icon" type="image/x-icon" href="/favicon.ico" />`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
