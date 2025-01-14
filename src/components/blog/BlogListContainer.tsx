'use client';

import React, { useEffect } from 'react';
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
  const { setBlogs } = useBlogs();

  useEffect(() => {
    setBlogs(initialBlogs);
  }, [initialBlogs, setBlogs]);

  return (
    <div>
      <BlogList blogs={initialBlogs} />
    </div>
  );
}
