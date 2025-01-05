'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from 'ahooks';
import { MoreHorizontal } from 'lucide-react';

import RSS from "@/components/rss";
import Sponsor from "@/components/sponsor";
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { cn } from '@/utils/utils';
import { NICKNAME, PATHS, WEBSITE } from '@/constants';
import { navItems } from './config';
import { MobileNav } from './mobile-nav';
import { Logo } from '../logo';
import { NextLink } from '../next-link';
import { Wrapper } from '../wrapper';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
    const pathname = usePathname();
    const scroll = useScroll();

    const isScrolled = useMemo(() => {
        if (scroll && scroll.top > 0) return true;
        return false;
    }, [scroll]);

    const memoizedNextLink = useMemo(() => (
        <NextLink href={PATHS.SITE_HOME} className="flex items-center" style={{ paddingLeft: 0 }} aria-label={NICKNAME}>
            <Logo className="sm:block" />
            <span className="ml-3 text-lg font-semibold text-foreground">{WEBSITE}</span>
        </NextLink>
    ), []);

    // 过滤掉友链，将其放入更多菜单
    const mainNavItems = navItems.filter(item => item.link !== PATHS.SITE_LINKS);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                isScrolled ? 'border-border' : 'border-transparent'
            )}
        >
            <Wrapper>
                <div className="flex h-14 items-center">
                    <div className="flex w-full items-center">
                        <div className="flex items-center">
                            {memoizedNextLink}
                        </div>

                        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
                            <div className="hidden items-center space-x-4 md:flex">
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.link}
                                        href={item.link}
                                        className={cn(
                                            'px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80',
                                            pathname === item.link
                                                ? 'text-foreground'
                                                : 'text-foreground/60'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}

                                <div className="relative inline-block">
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger className="flex h-9 w-9 items-center text-foreground/60 justify-center rounded-md bg-transparent p-0 hover:text-accent-foreground">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            sideOffset={8}
                                            className="z-[100] w-[140px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
                                            forceMount
                                        >
                                            <DropdownMenuItem className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                <Link href={PATHS.SITE_LINKS} className="w-full">
                                                    友链
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <ThemeToggle />
                                <RSS className="hidden sm:block" />
                                <Sponsor className="hidden sm:block" />
                                <MobileNav />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};
