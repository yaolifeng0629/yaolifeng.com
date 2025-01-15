'use client';

import React, { useState } from 'react';

import { BlogList } from '@/components/blog';
import { BlogFilter } from '@/components/blog/BlogFilter';

interface FilteredBlogListProps {
    initialBlogs: any[];
}

export function FilteredBlogList({ initialBlogs }: FilteredBlogListProps) {
    const [blogs] = useState(initialBlogs);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch =
            searchQuery === '' ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = !selectedTag || blog.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    return (
        <>
            <BlogFilter onSearch={setSearchQuery} onTagSelect={setSelectedTag} selectedTag={selectedTag} />
            <BlogList blogs={filteredBlogs} />
        </>
    );
}
