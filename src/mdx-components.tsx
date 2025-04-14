import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type TableProps = ComponentPropsWithoutRef<'table'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type PreProps = ComponentPropsWithoutRef<'pre'>;
type HrProps = ComponentPropsWithoutRef<'hr'>;
type DelProps = ComponentPropsWithoutRef<'del'>;
type InsProps = ComponentPropsWithoutRef<'ins'>;
type MarkProps = ComponentPropsWithoutRef<'mark'>;
type SubProps = ComponentPropsWithoutRef<'sub'>;
type SupProps = ComponentPropsWithoutRef<'sup'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium text-xl mt-8 mb-2" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-800 dark:text-zinc-200 font-medium text-lg mt-6 mb-2"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-800 dark:text-zinc-200 font-medium mt-5 mb-2"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="font-medium text-sm mt-4 mb-1" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <h5 className="font-medium text-xs mt-3 mb-1" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <h6 className="font-medium text-xs text-gray-600 dark:text-zinc-400 mt-3 mb-1" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 text-sm leading-relaxed my-3" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-1 my-3 text-sm"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1 my-3 text-sm"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  pre: (props: PreProps) => (
    <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-md overflow-x-auto my-4 text-sm" {...props} />
  ),
  code: ({ className, children, ...props }: CodeProps) => {
    if (className) {
      // This is a code block with a language
      const codeHTML = highlight(children as string);
      return <code className={className} dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
    }
    // This is inline code
    return (
      <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
        {children}
      </code>
    );
  },
  table: (props: TableProps) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700 text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-gray-50 dark:bg-zinc-800" {...props} />
  ),
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-zinc-800/50" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 whitespace-nowrap" {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-2 border-gray-300 pl-4 py-1 text-gray-700 dark:border-zinc-600 dark:text-zinc-300 my-4 text-sm italic"
      {...props}
    />
  ),
  hr: (props: HrProps) => (
    <hr className="border-t border-gray-200 dark:border-zinc-700 my-6" {...props} />
  ),
  del: (props: DelProps) => (
    <del className="line-through text-gray-500 dark:text-zinc-500" {...props} />
  ),
  ins: (props: InsProps) => (
    <ins className="underline decoration-2 decoration-green-500 dark:decoration-green-700 no-underline" {...props} />
  ),
  mark: (props: MarkProps) => (
    <mark className="bg-yellow-100 dark:bg-yellow-800/30 px-1 rounded" {...props} />
  ),
  sub: (props: SubProps) => (
    <sub className="text-xs" {...props} />
  ),
  sup: (props: SupProps) => (
    <sup className="text-xs" {...props} />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <img className="max-w-full h-auto rounded-md my-4" {...props} />
  ),
  // For Definition Lists
  dl: (props: ComponentPropsWithoutRef<'dl'>) => (
    <dl className="my-4 space-y-4 text-sm" {...props} />
  ),
  dt: (props: ComponentPropsWithoutRef<'dt'>) => (
    <dt className="font-medium text-gray-800 dark:text-zinc-200" {...props} />
  ),
  dd: (props: ComponentPropsWithoutRef<'dd'>) => (
    <dd className="pl-4 text-gray-600 dark:text-zinc-400" {...props} />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

// This hook is for client components only
export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

// This function is safe to use in server components
export function getMDXComponents(): MDXProvidedComponents {
  return components;
}