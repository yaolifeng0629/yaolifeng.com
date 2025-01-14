'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BlogList } from '@/components/blog';
import { useBlogs } from '@/hooks/useBlogs';

interface Blog {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  description: string;
  content: string;
}

interface BlogListContainerProps {
  initialBlogs: Blog[];
}

export function BlogListContainer({ initialBlogs }: BlogListContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { setBlogs } = useBlogs();

  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs, setBlogs]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery && !selectedTag) {
      return initialBlogs;
    }

    return initialBlogs.filter(blog => {
      const matchesSearch = searchQuery === '' || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialBlogs, searchQuery, selectedTag]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag || null);
  };

  return (
    <div>
      <BlogList blogs={filteredBlogs} />
    </div>
  );
}
