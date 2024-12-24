'use client';

import React from 'react';
import Image from 'next/image';

import { ImageAssets, WEBSITE } from '@/constants';
import { cn } from '@/utils/utils';
import { useTheme } from '../theme/theme-provider';

type Props = {
    className?: string;
};

export const Logo = ({ className }: Props) => {
    const { theme } = useTheme();

    return (
        <div className={cn('relative w-8 h-8', className)}>
            <Image
                src={theme === 'light' ? ImageAssets.logoDark : ImageAssets.logoLight}
                width={32}
                height={32}
                className="h-8 w-8"
                alt={WEBSITE}
                priority
            />
        </div>
    );
};
