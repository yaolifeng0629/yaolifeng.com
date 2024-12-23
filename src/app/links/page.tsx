import { PATHS_MAP, PATHS } from '@/constants';
import { Metadata } from 'next';
import { Wrapper } from '@/components/wrapper';

export const metadata: Metadata = {
    title: PATHS_MAP[PATHS.SITE_LINKS],
    description: '友情链接，欢迎交换友链～'
};

interface FriendLink {
    name: string;
    url: string;
}

const friendLinks: FriendLink[] = [
    {
        name: 'LINUX DO',
        url: 'https://linux.do'
    },
    {
        name: 'Corey Chiu',
        url: 'https://coreychiu.com'
    },
];

export default function LinksPage() {
    return (
        <Wrapper className="flex flex-col px-8 pb-24 pt-8">
            <div className="prose dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold md:text-5xl">友情链接</h1>
                <p className="text-muted-foreground">欢迎交换友链～</p>
                <ul className="!pl-0 grid grid-cols-1 md:grid-cols-4 gap-6 list-none">
                    {friendLinks.map((link, index) => (
                        <li key={index} className="!ml-0 !marker:content-none">
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 px-8 py-6 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="font-medium text-xl text-foreground group-hover:text-primary transition-colors">{link.name}</div>
                                    <div className="text-muted-foreground group-hover:translate-x-2 transition-transform duration-300">→</div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Wrapper>
    );
}
