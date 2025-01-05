import React from 'react';
import { RssIcon } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/utils/utils';
import { showSuccessToast } from '@/components/ui/toast';

type Props = {
    className?: string;
};

const RSS = ({ className }: Props) => {
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/rss'
        : 'https://yaolifeng.com/api/rss';

    const rssUrls = {
        all: baseUrl,
        blogs: `${baseUrl}?type=blogs`,
        shorts: `${baseUrl}?type=shorts`,
    };

    const copyToClipboard = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            showSuccessToast('已复制到粘贴板');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className={cn('py-2 text-sm font-medium transition-colors hover:text-foreground/80 flex items-center', className)}
                    title="RSS Feed"
                >
                    <RssIcon className="h-4 w-4" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="z-50 min-w-[140px] md:min-w-[160px] bg-white dark:bg-zinc-900 rounded-lg p-1.5 shadow-lg border border-zinc-200 dark:border-zinc-800 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                    sideOffset={8}
                    align="end"
                    collisionPadding={16}
                >
                    <DropdownMenu.Item
                        className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 md:py-2 text-sm outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 focus:bg-zinc-100 dark:focus:bg-zinc-800"
                        onClick={() => copyToClipboard(rssUrls.all)}
                    >
                        全部内容
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 md:py-2 text-sm outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 focus:bg-zinc-100 dark:focus:bg-zinc-800"
                        onClick={() => copyToClipboard(rssUrls.blogs)}
                    >
                        仅文章
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2.5 md:py-2 text-sm outline-none transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 focus:bg-zinc-100 dark:focus:bg-zinc-800"
                        onClick={() => copyToClipboard(rssUrls.shorts)}
                    >
                        仅片段
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default RSS;
