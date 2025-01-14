'use client';

import React, { useState } from 'react';
import * as Tags from '@/constants/tag';
import { tagCategories } from '@/constants/tagCategories';
import { Search, ChevronDown, Calendar } from 'lucide-react';
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

interface SearchDialogProps {
  onSearch: (query: string) => void;
  onTagSelect: (tag: string) => void;
  selectedTag: string | null;
}

export function SearchDialog({ onSearch, onTagSelect, selectedTag }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const displayedCategories = showAllCategories ? tagCategories : tagCategories.slice(0, 3);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  // 模拟的搜索结果数据，实际使用时替换为真实数据
  const searchResults = [
    {
      title: '深入剖析 React 表单的两种控制方式，让你的状态更高效',
      date: '2024-01-14',
      tags: ['React', 'JavaScript'],
    },
    {
      title: 'VS Code 代码片段指南：从基础到高级技巧',
      date: '2024-01-13',
      tags: ['VS Code', '效率工具'],
    },
  ];

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
                  variant={!selectedTag ? 'default' : 'outline'}
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
              <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">搜索结果</h3>
              <ScrollArea className="h-[320px]">
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <h4 className="font-medium mb-2">{result.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {result.date}
                        </div>
                        <div className="flex gap-1">
                          {result.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
