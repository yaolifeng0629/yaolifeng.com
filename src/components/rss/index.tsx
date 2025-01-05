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
        <div className="relative inline-block">
            <DropdownMenu.Root modal={false}>
                <DropdownMenu.Trigger asChild>
                    <button
                        className={cn('flex h-9 w-5 items-center justify-center rounded-md text-foreground/60 bg-transparent p-0 hover:text-accent-foreground', className)}
                        title="RSS Feed"
                    >
                        <RssIcon className="h-4 w-4" />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="z-[100] w-[140px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                        sideOffset={8}
                        align="end"
                        forceMount
                    >
                        <DropdownMenu.Item
                            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => copyToClipboard(rssUrls.all)}
                        >
                            全部内容
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => copyToClipboard(rssUrls.blogs)}
                        >
                            仅文章
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => copyToClipboard(rssUrls.shorts)}
                        >
                            仅片段
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
};

export default RSS;
