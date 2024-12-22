import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wrapper } from '@/components/wrapper';
import { IconArrowLeft } from '@/components/icons';

export default function NotFound() {
    return (
        <Wrapper>
            <div className="grid min-h-[calc(100vh-190px)] place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-primary">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">页面不存在</h1>
                    <p className="mt-6 text-base leading-7 text-muted-foreground">
                        抱歉，我们找不到您要访问的页面。
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button asChild variant="default">
                            <Link href="/" className="flex items-center gap-2">
                                <IconArrowLeft className="h-4 w-4" />
                                返回首页
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
