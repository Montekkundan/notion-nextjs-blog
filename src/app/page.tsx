import React from 'react'
import Link from 'next/link'
import { NameTransition } from './name'
import { getHomePageContent, getPublishedPosts } from '@/lib/notion-post-service';
import { readableDate } from '@/lib/html-utils';
import { MDXContent } from './mdx-content';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

async function getPosts(locale: string) {
    try {
        const posts = await getPublishedPosts(locale);
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function Home() {
    const posts = await getPosts('en');
    let { title, markdown } = await getHomePageContent().catch(() => ({
        title: undefined,
        markdown: undefined
    }));

    // fallback implementation if getHomePageContent() is not available
    if (!title || !markdown) {
        title = 'Montek Kundan';
        markdown = `
        ### Welcome to my digital garden!

        This is where I share my thoughts, projects, and explorations in technology, programming, and design.
      `.trim();
    }
    const mdxSource = await serialize(markdown, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: process.env.NODE_ENV === 'development',
        },
        parseFrontmatter: false
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <NameTransition name={title} />
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                <MDXContent source={mdxSource} />
            </div>

            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="group">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                            <Link
                                href={`/post/${post.slug}`}
                                className="text-lg font-medium text-gray-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                prefetch={true}
                            >
                                {post.title}
                            </Link>
                            <time
                                dateTime={post.date}
                                className="text-sm text-gray-500 dark:text-zinc-400 mt-1 sm:mt-0"
                            >
                                {readableDate(post.date)}
                            </time>
                        </div>
                        {post.description && (
                            <p className="text-gray-600 dark:text-zinc-400 text-sm mt-1">{post.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}