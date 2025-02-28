/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: "https",
                hostname: "ik.imagekit.io",
                port: "",
              },

        ],

        minimumCacheTTL: 2592000,




    }
};

export default nextConfig;
