import React from 'react';
import { RssIcon } from 'lucide-react';
import { cn } from '@/utils/utils';
import { showSuccessToast } from '@/components/ui/toast';

type Props = {
    className?: string;
};

const RSS = ({ className }: Props) => {
    // const isProduction = process.env.NODE_ENV !== 'development';
    // const rssUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/rss`;
    const rssUrl = 'https://yaolifeng.com/api/rss';

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(rssUrl);
            showSuccessToast('已复制到粘贴板');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={copyToClipboard}
            className={cn('py-2 text-sm font-medium transition-colors hover:text-foreground/80 flex items-center', className)}
            title="Copy RSS Link"
        >
            <RssIcon className="h-4 w-4" />
        </button>
    );
};

export default RSS;
