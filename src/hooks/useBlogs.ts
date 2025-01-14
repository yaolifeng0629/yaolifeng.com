'use client';

import { create } from 'zustand';

interface Blog {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  description: string;
  content: string;
}

interface BlogsStore {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
}

const useBlogsStore = create<BlogsStore>((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
}));

export function useBlogs() {
  const blogs = useBlogsStore((state) => state.blogs);
  const setBlogs = useBlogsStore((state) => state.setBlogs);

  return {
    blogs,
    setBlogs,
  };
}
