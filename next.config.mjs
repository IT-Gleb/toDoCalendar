/** @type {import('next').NextConfig} */

const nextConfig = {
  //output: "standalone",
  images: {
    // localPatterns: [{ pathname: "/storage/**", search: "" }],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3010",
        pathname: "/storage/**",
        // search: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://172.16.0.5:3001",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3001",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
