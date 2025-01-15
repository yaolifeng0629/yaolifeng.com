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
import { useRouter } from 'next/navigation';

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
  searchQuery: string;
}

export function SearchDialog({
  onSearch,
  onTagSelect,
  selectedTag,
  searchResults,
  searchQuery
}: SearchDialogProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const displayedCategories = showAllCategories ? tagCategories : tagCategories.slice(0, 3);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleBlogClick = (slug: string) => {
    setIsLoading(true);
    router.push(`/blog/${slug}`);
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
            {/* 左侧标签区域 - 在移动端隐藏 */}
            <div className="hidden md:block w-[200px] shrink-0 border-r pr-3">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  {displayedCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <h4 className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-wider">
                        {category.name}
                      </h4>
                      <div className="space-y-1">
                        {category.tags.map((tag) => (
                          <Button
                            key={tag}
                            onClick={() => onTagSelect(tag)}
                            variant="ghost"
                            size="sm"
                            className={`w-full h-7 justify-start text-xs font-normal ${
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

                  {!showAllCategories && tagCategories.length > 3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full h-7 mt-4 text-xs text-muted-foreground/70 hover:text-foreground"
                      onClick={() => setShowAllCategories(true)}
                    >
                      更多分类
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* 右侧搜索结果 - 移动端下占满宽度 */}
            <div className="flex-1">
              {searchResults ? (
                <>
                  <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                    搜索结果 ({searchResults.length})
                  </h3>
                  <ScrollArea className="h-[360px]">
                    <div className="space-y-4 pr-4">
                      {searchResults.length > 0 ? (
                        searchResults.map((blog) => (
                          <div
                            key={blog.slug}
                            className="group rounded-lg border p-4 hover:border-primary/50 transition-colors"
                          >
                            <Link
                              href={`/blog/${blog.slug}`}
                              onClick={() => handleBlogClick(blog.slug)}
                              className="block"
                            >
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {blog.title}
                              </h4>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {blog.description}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(blog.date).toLocaleDateString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                  })}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {blog.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-muted-foreground/10"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </Link>
                          </div>
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
                <div className="flex flex-col items-center justify-center h-[360px] text-muted-foreground">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
                      <p className="text-sm">加载中...</p>
                    </div>
                  ) : (
                    <>
                      <Search className="h-12 w-12 mb-2 stroke-[1.5]" />
                      <p className="text-sm">输入关键词开始搜索</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
