'use client';

import type { Metadata } from 'next';

import { Console } from '@/components/console';
import { Favicon } from '@/components/favicon';
import { Navbar } from '@/components/navbar';
import ParticlesBg from '@/components/particles/index';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ReactHotToaster } from '@/components/ui/toast';

import '@/styles/global.css';

const metadata = {
    title: '姚利锋',
    description: '姚利锋',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
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
                </ThemeProvider>
            </body>
        </html>
    );
}
