import React from 'react';
import Link from 'next/link';
import { RssIcon } from 'lucide-react';
import { cn } from '@/utils/utils';

type Props = {
    className?: string;
};

const RSS = ({ className }: Props) => {
    return (
        <Link
            href="/rss.xml"
            target="_blank"
            className={cn('py-2 text-sm font-medium transition-colors hover:text-foreground/80 flex items-center', className)}
            title="RSS"
        >
            <RssIcon className="h-4 w-4" />
        </Link>
    );
};

export default RSS;
