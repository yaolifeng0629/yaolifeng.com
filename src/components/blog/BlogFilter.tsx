'use client';

import React, { useState } from 'react';
import * as Tags from '@/constants/tag';
import { cn } from '@/utils/utils';

interface BlogFilterProps {
  onSearch: (query: string) => void;
  onTagSelect: (tag: string) => void;
  selectedTag: string | null;
}

export function BlogFilter({ onSearch, onTagSelect, selectedTag }: BlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const allTags = Object.values(Tags);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="mb-8 space-y-6">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-4 w-4 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜索文章..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full rounded-xl border border-gray-200 bg-white/50 py-2.5 pl-11 pr-4 text-sm backdrop-blur transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-950/50 dark:placeholder:text-gray-500 dark:hover:border-gray-700 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagSelect('')}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            !selectedTag
              ? 'bg-blue-500 text-white shadow-sm dark:bg-blue-400'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-800'
          )}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              selectedTag === tag
                ? 'bg-blue-500 text-white shadow-sm dark:bg-blue-400'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-800'
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
