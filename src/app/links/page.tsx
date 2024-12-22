import { PATHS_MAP, PATHS } from '@/constants';
import { Metadata } from 'next';
import { Wrapper } from '@/components/wrapper';

export const metadata: Metadata = {
    title: PATHS_MAP[PATHS.SITE_LINKS],
    description: '友情链接，欢迎交换友链～'
};

interface FriendLink {
    name: string;
    desc: string;
    url: string;
}

const friendLinks: FriendLink[] = [
    {
        name: 'LINUX DO',
        desc: '新的理想型社区',
        url: 'https://linux.do/'
    },
];

export default function LinksPage() {
    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <div className="prose dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold md:text-4xl">友情链接</h1>
                <p className="text-muted-foreground">欢迎交换友链～</p>
                <ul className="!pl-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {friendLinks.map((link, index) => (
                        <li key={index} className="!ml-0">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 px-6 py-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="font-medium text-lg text-foreground group-hover:text-primary transition-colors">{link.name}</div>
                                    <div className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</div>
                                </div>
                                <div className="text-muted-foreground text-sm mt-2">{link.desc}</div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
}
