import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin()
const nextConfig = {
    // i18n: {
    //     locales: ['es', 'en'],
    //     defaultLocale: 'es',
    //     localeDetection: false,
    // },
    compiler: {
        styledComponents: true,
    },
};

export default withNextIntl(nextConfig);
