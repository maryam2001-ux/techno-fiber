import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [new URL('https://via.placeholder.com/**')],
  },
};

export default withNextIntl(nextConfig);