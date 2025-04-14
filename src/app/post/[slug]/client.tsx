'use client';
import { useEffect, useState } from 'react';
import { readableDate } from '@/lib/html-utils';
import { Post as PostType } from '@/types/post'
import { Name } from './name';
import { useMDXComponents } from '@/mdx-components';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

interface Props {
  post: PostType;
  markdown: string;
  name: string | undefined;
}

const Post = ({ post, markdown, name }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const components = useMDXComponents();
  
  if (!name) {
    name = 'Montek Kundan';
  }

  useEffect(() => {
    if (post.post.relatedSlug) {
      const url = new URL(window.location.href);
      url.searchParams.set('related', post.post.relatedSlug);
      window.history.replaceState({}, '', url);
    }
    
    document.title = post.post.title;
    
    const processMdx = async () => {
      try {
        setLoading(true);
        const mdxSource = await serialize(markdown, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            development: process.env.NODE_ENV === 'development',
          },
          parseFrontmatter: false
        });
        setContent(mdxSource);
        setError(null);
      } catch (err) {
        console.error('Error processing MDX:', err);
        setError(err instanceof Error ? err.message : 'Unknown error processing markdown');
      } finally {
        setLoading(false);
      }
    };
    
    processMdx();
  }, [markdown, post.post.relatedSlug, post.post.title]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Name name={name} />
      <h1 className="text-3xl font-bold mb-6">{post.post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <time dateTime={post.post.updatedAt}>{readableDate(post.post.updatedAt)}</time>
      </div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {loading ? (
          <div>Loading content...</div>
        ) : error ? (
          <div>
            <p>Error rendering content: {error}</p>
            <pre className="whitespace-pre-wrap">{markdown}</pre>
          </div>
        ) : content ? (
          <MDXRemote {...content} components={components} />
        ) : (
          <pre className="whitespace-pre-wrap">{markdown}</pre>
        )}
      </div>
    </div>
  );
};

export default Post;