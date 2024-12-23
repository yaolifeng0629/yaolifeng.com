import { PATHS_MAP, PATHS } from '@/constants';
import { Metadata } from 'next';

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
        url: 'https://linux.do'
    },
    {
        name: 'Corey Chiu',
        desc: '',
        url: 'https://coreychiu.com'
    },
];

export default function LinksPage() {
    return (
        <div className="w-full px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">友情链接</h1>
            <ul className="space-y-6">
                {friendLinks.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.url + '?utm_source=yaolifeng.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full border border-[#18181b] rounded-lg hover:bg-primary-foreground transition-colors px-4 py-3"
                        >
                            <div className="font-medium text-lg">{link.name}</div>
                            <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">{link.desc}</div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
