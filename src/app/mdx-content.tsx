'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/mdx-components';
import { useState, useEffect } from 'react';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
  rawMarkdown?: string; 
}

export function MDXContent({ source }: MDXContentProps) {
  const [mounted, setMounted] = useState(false);
  const components = useMDXComponents();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading content...</div>;
  }
  
  return <MDXRemote {...source} components={components} />;
}