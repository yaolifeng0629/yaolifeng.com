'use client';

import React, { useState } from 'react';
import * as Tags from '@/constants/tag';
import { tagCategories } from '@/constants/tagCategories';
import { Search, ChevronDown, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';

interface Blog {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  description: string;
}

interface SearchDialogProps {
  onSearch: (query: string) => void;
  onTagSelect: (tag: string) => void;
  selectedTag: string | null;
  searchResults?: Blog[];
}

export function SearchDialog({ 
  onSearch, 
  onTagSelect, 
  selectedTag, 
  searchResults = [] 
}: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const displayedCategories = showAllCategories ? tagCategories : tagCategories.slice(0, 3);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>搜索文章</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* 搜索输入框 */}
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

          <div className="flex gap-6 h-[400px]">
            {/* 左侧标签区域 */}
            <div className="w-[200px] shrink-0 border-r pr-3">
              <div className="space-y-3">
                <Button
                  onClick={() => onTagSelect('')}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start text-xs font-normal ${
                    !selectedTag ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''
                  }`}
                >
                  全部
                </Button>

                <ScrollArea className="h-[340px]">
                  <div className="space-y-4 pr-2">
                    {displayedCategories.map((category) => (
                      <div key={category.name} className="space-y-1.5">
                        <h4 className="text-[11px] font-medium text-muted-foreground">
                          {category.name}
                        </h4>
                        <div className="space-y-0.5">
                          {category.tags.map((tag) => (
                            <Button
                              key={tag}
                              onClick={() => onTagSelect(tag)}
                              variant="ghost"
                              size="sm"
                              className={`w-full h-6 justify-start text-xs font-normal ${
                                selectedTag === tag
                                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                  : 'hover:bg-muted'
                              }`}
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!showAllCategories && tagCategories.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-7 mt-2 text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => setShowAllCategories(true)}
                    >
                      更多分类
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </ScrollArea>
              </div>
            </div>

            {/* 右侧搜索结果列表 */}
            <div className="flex-1 overflow-hidden">
              {searchResults ? (
                <>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    搜索结果 ({searchResults.length})
                  </h3>
                  <ScrollArea className="h-[340px]">
                    <div className="space-y-4 pr-4">
                      {searchResults.length > 0 ? (
                        searchResults.map((blog) => (
                          <Link
                            key={blog.slug}
                            href={`/blog/${blog.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {blog.title}
                              </h4>
                              <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            </div>
                            <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {blog.description}
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(blog.date).toLocaleDateString('zh-CN')}
                              </div>
                              <div className="flex gap-1">
                                {blog.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full bg-muted"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                          <Search className="h-12 w-12 mb-2 stroke-[1.5]" />
                          <p className="text-sm">未找到相关文章</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[340px] text-muted-foreground">
                  <Search className="h-12 w-12 mb-2 stroke-[1.5]" />
                  <p className="text-sm">输入关键词开始搜索</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
