/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '**',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            }

        ],
        minimumCacheTTL: 2592000,



    }
};

export default nextConfig;
