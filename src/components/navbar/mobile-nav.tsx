'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import RSS from "@/components/rss";
import { cn } from '@/utils/utils';

import { NICKNAME, SLOGAN, WEBSITE } from '@/constants';
import { navItems } from './config';

export function MobileNav() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <MenuIcon className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] pr-4">
                <SheetHeader>
                    <SheetTitle>{WEBSITE}</SheetTitle>
                    <SheetDescription>{SLOGAN}</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={cn(
                                'px-4 py-2 text-sm font-medium transition-colors rounded-md',
                                pathname === item.link
                                    ? 'bg-accent text-accent-foreground'
                                    : 'hover:bg-accent/50 text-foreground/60'
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center px-4">
                        <RSS />
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
