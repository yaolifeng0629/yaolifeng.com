import type { Metadata } from 'next';

import { Console } from '@/components/console';
import { Favicon } from '@/components/favicon';
import { Navbar } from '@/components/navbar';
import ParticlesBg from '@/components/particles/index';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/global.css';

export const metadata: Metadata = {
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
                <Favicon />
            </head>
            <body>
                <ThemeProvider defaultTheme="dark" storageKey="theme">
                    {/* <ParticlesBg /> */}
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Console />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
