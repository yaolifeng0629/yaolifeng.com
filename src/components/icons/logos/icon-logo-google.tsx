import React from 'react';

import { cn } from '@/utils/utils';

export const IconLogoGoogle = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[logos--google-icon]', className)}></span>;
};
