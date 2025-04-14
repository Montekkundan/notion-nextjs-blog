import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

export function Name({name}: { name: string }) {
  return (
    <ViewTransition>
      <Link
        href="/"
        className="flex mb-8 font-medium text-gray-400 dark:text-zinc-400"
      >
        {name}
      </Link>
    </ViewTransition>
  );
}