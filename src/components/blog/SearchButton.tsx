'use client';

import React, { useState, useMemo } from 'react';
import { SearchDialog } from './SearchDialog';
import { useBlogs } from '@/hooks/useBlogs';

export function SearchButton() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { blogs } = useBlogs();

  const filteredBlogs = useMemo(() => {
    if (!searchQuery && !selectedTag) return undefined;

    return blogs.filter(blog => {
      const matchesSearch = searchQuery === '' || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = !selectedTag || blog.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag || null);
  };

  return (
    <SearchDialog
      onSearch={handleSearch}
      onTagSelect={handleTagSelect}
      selectedTag={selectedTag}
      searchResults={filteredBlogs}
    />
  );
}
