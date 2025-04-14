import { notFound } from 'next/navigation';
import Post from './client';
import {
  getHomePageContent,
  getPublishedPosts,
  getSinglePost,
} from '@/lib/notion-post-service';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams(props: Props) {
  const params = await props.params;
  const { locale } = params;
  try {
    const myLocale = locale || 'en-US';
    const allPosts = await getPublishedPosts(myLocale.split('-')[0]);

    return allPosts.map((post) => ({
      slug: post.contentSlug,
      locale: myLocale,
    }));
  } catch (error) {
    console.error('Error generating static params for posts:', error);
    return [];
  }
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const {
    slug
  } = params;


  const post = await getSinglePost(decodeURIComponent(slug), 'en');

  if (!post) {
    return null;
  }

  return {
    title: post.post.seoTitle,
    description: post.post.metaDescription,
    openGraph: {
      title: post.post.seoTitle,
      description: post.post.metaDescription,
      images: [
        {
          alt: post.post.metaDescription,
          type: 'image/webp',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@montekundan',
      title: post.post.seoTitle,
      description: post.post.metaDescription,
      images: [
        {
          alt: post.post.metaDescription,
          type: 'image/webp',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  
  const { slug } = params;

  try {
    const post = await getSinglePost(decodeURIComponent(slug), 'en');
    if (!post) return notFound();
    const { title } = await getHomePageContent().catch(() => ({
      title: undefined,
    }));

    if (typeof post.markdown !== 'string') {
      console.error('Post markdown is not a string:', post.markdown);
      return notFound();
    }
    return <Post post={post} markdown={post.markdown} name={title} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
}
