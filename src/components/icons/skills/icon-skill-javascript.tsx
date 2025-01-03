import React from 'react';

import { cn } from '@/utils/utils';

export const IconSkillJavaScript = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return <span {...props} className={cn('icon-[skill-icons--javascript]', className)}></span>;
};
