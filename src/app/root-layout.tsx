import { metadata } from './metadata';
import ClientLayout from './layout';

export { metadata };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ClientLayout>{children}</ClientLayout>;
}
