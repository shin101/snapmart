/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "imagedelivery.net",
      },
      {
        hostname: "roost.nbcuni.com",
      },
      {
        hostname: "qph.cf2.quoracdn.net",
      },
      {
        hostname: "artmajeur.com",
      },
    ],
  },
};

export default nextConfig;
