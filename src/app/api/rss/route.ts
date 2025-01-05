import { NextResponse, Request } from 'next/server';

import { Feed } from 'feed';
import fs from 'fs';
import { marked } from 'marked';
import path from 'path';

import blogPosts from '@/data/posts/parsed/blogs';
import shorts from '@/data/shorts/parsed/shorts';

const SITE_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

const AUTHOR = {
    name: '姚利锋',
    email: 'yaolifeng666@gmail.com',
    link: `${SITE_URL}/about`,
};

// 博客文章类型定义
interface BlogPost {
    id: string;
    url?: string;
    slug: string;
    createdAt: number;
    title: string;
    description: string;
    tags: string[];
    content: string;
}

interface Short {
    id: string;
    url: string;
    slug: string;
    createdAt: number;
    title: string;
    description: string;
    tags: string[];
    content: string;
}

type ContentItem = BlogPost | Short;

async function getMarkdownContent(filePath: string): Promise<string> {
    try {
        const fullPath = path.join(process.cwd(), 'public', filePath);
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Error reading markdown file: ${filePath}`, error);
        return '';
    }
}

async function processContentItem(item: ContentItem, type: 'blog' | 'short', feed: Feed) {
    try {
        const markdownContent = await getMarkdownContent(item.content);
        const htmlContent = marked(markdownContent);

        feed.addItem({
            title: `${type === 'blog' ? '【博客】' : '【片段】'}${item.title}`,
            id: item.id,
            url: `${SITE_URL}/${type === 'blog' ? 'blog' : 'shorts'}/${item.slug}`,
            link: `${SITE_URL}/${type === 'blog' ? 'blog' : 'shorts'}/${item.slug}`,
            description: item.description,
            author: [AUTHOR],
            contributor: [AUTHOR],
            content: htmlContent,
            date: new Date(item.createdAt),
            category: [{ name: type === 'blog' ? 'Blog' : 'Short' }, ...item.tags.map((tag) => ({ name: tag }))],
        });
    } catch (error) {
        console.error(`Error processing ${type} ${item.slug}:`, error);
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';

    const feed = new Feed({
        title: '姚利锋的个人网站',
        description: '记录我的思考和学习',
        id: SITE_URL!,
        link: SITE_URL,
        language: 'zh-CN',
        favicon: `${SITE_URL}/favicon.ico`,
        copyright: 'All rights reserved 2024, 姚利锋',
        author: AUTHOR,
    });

    let items: ContentItem[] = [];
    switch (type) {
        case 'blogs':
            items = blogPosts;
            break;
        case 'shorts':
            items = shorts;
            break;
        default:
            items = [...blogPosts, ...shorts].sort((a, b) => b.createdAt - a.createdAt);
    }

    for (const item of items) {
        const itemType = 'url' in item ? 'short' : 'blog';
        await processContentItem(item, itemType, feed);
    }

    return new NextResponse(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
