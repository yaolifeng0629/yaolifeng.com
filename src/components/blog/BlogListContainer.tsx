'use client';

import React from 'react';
import { BlogList } from '@/components/blog';

interface BlogListContainerProps {
    initialBlogs: any[];
}

export function BlogListContainer({ initialBlogs }: BlogListContainerProps) {
    return (
        <div>
            <BlogList blogs={initialBlogs} />
        </div>
    );
}
