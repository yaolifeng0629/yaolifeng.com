import type { Metadata } from 'next';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';

import { ReactHotToaster } from '@/components/ui/toast';

import { Console } from '@/components/console';
import { Favicon } from '@/components/favicon';
import { Navbar } from '@/components/navbar';
import ParticlesBg from '@/components/particles/index';
import { ThemeProvider } from '@/components/theme/theme-provider';

import '@/styles/global.css';

export const metadata: Metadata = {
    title: '姚利锋',
    description:
        '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【沉浸式趣谈】',
    keywords: ['沉浸式趣谈', '开源', '沉浸式', 'yaolifeng0629', 'Immerse', 'INDIE TOOLS', '姚利锋'],
    generator: 'Next.js',
    applicationName: '姚利锋',
    metadataBase: new URL('https://yaolifeng.com'),
    alternates: {
        canonical: '/',
        types: {
            'application/rss+xml': [{ url: 'rss', title: 'yaolifeng - RSS Feed' }],
        },
    },
    openGraph: {
        title: '姚利锋',
        description:
            '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【沉浸式趣谈】',
        url: 'https://yaolifeng.com',
        siteName: '姚利锋',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/other/share/share.png',
                width: 1920,
                height: 1080,
                alt: 'yaolifeng.com',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://yaolifeng.com',
        creator: '@Immerse_code',
        title: '姚利锋',
        description:
            '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【沉浸式趣谈】',
        images: [
            {
                url: '/other/share/share.png',
                width: 1920,
                height: 1080,
                alt: 'yaolifeng.com',
            },
        ],
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    other: {
        'X-Robots-Tag': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    icons: {
        icon: [
            { url: '/images/Immerse-dark.svg', sizes: 'any' },
            { url: '/images/Immerse-dark.svg', type: 'image/svg+xml' },
        ],
        apple: '/images/Immerse-dark.svg', // iOS设备
        shortcut: '/images/Immerse-dark.svg', // 快捷方式图标
        other: {
            rel: 'mask-icon', // Safari固定标签页
            url: '/images/Immerse-dark.svg',
            color: '#000000',
        },
    },
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <Favicon />
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="theme">
                    {/* <ParticlesBg /> */}
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Console />
                    <Analytics />
                    <ReactHotToaster />
                    <GoogleAnalytics gaId="G-06WLG409EJ" />
                </ThemeProvider>
            </body>
        </html>
    );
}
