import { Nextjs, Notion } from '@/components/icons';
import { unstable_ViewTransition as ViewTransition } from 'react';

export function NameTransition({ name }: { name: string }) {
  return (
    <ViewTransition>
      <div className='flex items-center gap-2'>
        <Notion className='h-10 w-10' />
        <span>
          <svg className="fill-black dark:fill-white" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" />
          </svg>
        </span>
        <Nextjs className='h-10 w-10' />
      </div>
      <h1 className="font-medium pt-4">
        <span className="sr-only">{name}</span>
        <span
          aria-hidden="true"
          className="block overflow-hidden group relative"
        >
          <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full whitespace-nowrap">
            {name.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
          <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
            {'blog'.split('').map((letter, index) => (
              <span
                key={index}
                className="inline-block"
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      </h1>
    </ViewTransition>
  );
}