import React from 'react';

import { cn } from '@/utils/utils';

export const IconLogoBing = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--bing]', className)}></span>;
};
