'use client';

import React, { useState } from 'react';
import * as Tags from '@/constants/tag';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface SearchDialogProps {
  onSearch: (query: string) => void;
  onTagSelect: (tag: string) => void;
  selectedTag: string | null;
}

export function SearchDialog({ onSearch, onTagSelect, selectedTag }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const allTags = Object.values(Tags);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs md:text-sm min-w-[90px] rounded-[6px]"
        >
          <Search className="h-4 w-4" />
          搜索文章
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>搜索文章</DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="搜索文章..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">标签筛选</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => onTagSelect('')}
                variant={!selectedTag ? 'default' : 'outline'}
                size="sm"
              >
                全部
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
