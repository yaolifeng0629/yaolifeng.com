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
        '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【非同质前端札记】',
    keywords: ['非同质前端札记', '开源', '沉浸式', 'yaolifeng0629', 'Immerse', 'INDIE TOOLS'],
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
            '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【非同质前端札记】',
        url: 'https://yaolifeng.com',
        siteName: '姚利锋',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/images/Immerse-dark.svg',
                width: 1200,
                height: 630,
                alt: '姚利锋',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@Immerse_code',
        title: '姚利锋',
        description:
            '欢迎来到姚利锋的个人网站 yaolifeng.com，这里分享我的前端开发、技术思考与学习心得。我热爱开源 (Github: github.com/yaolifeng0629)，并探索各种实用工具，我的独立开发工具站 www.indietools.work。我也热衷远程工作，欢迎关注微信公众号【非同质前端札记】',
        images: ['/images/Immerse-dark.svg'],
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
        icon: '/images/Immerse-dark.svg',
        shortcut: '/images/Immerse-dark.svg',
    },
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
