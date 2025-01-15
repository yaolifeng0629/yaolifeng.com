import React from 'react';
import type { Metadata } from 'next';
import { Wrapper } from '@/components/wrapper';
import { getBlogs } from '@/api/blogs';
import { BlogListContainer } from '@/components/blog/BlogListContainer';
import { SearchButton } from '@/components/blog/SearchButton';

export const metadata: Metadata = {
    title: '姚利锋 | 博客',
    description: '姚利锋 | 博客',
};

export const revalidate = 60;

export default async function Page() {
    const blogs = await getBlogs();

    return (
        <Wrapper className="flex flex-col px-6 pb-24 pt-8">
            <div className="flex items-center justify-between pb-8">
                <h2 className="text-3xl font-bold md:text-4xl">最新文章</h2>
                <SearchButton />
            </div>
            <BlogListContainer initialBlogs={blogs} />
        </Wrapper>
    );
}
