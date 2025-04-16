import { Metadata, Post } from "@/types/post";
import { getPageContent, notionClient } from "./notion-client";

export const getPublishedPosts = async (locale: string): Promise<Metadata[]> => {
    const databaseId = process.env.NOTION_POST_DATABASE_ID;
    if (!databaseId) {
      throw new Error('NOTION_POST_DATABASE_ID environment variable is not set');
    }
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'locale',
            select: {
              equals: locale,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Updated',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((res) => {
      return pageToPostTransformer(res);
    });
};

export const getSinglePost = async (slug: string, locale: string): Promise<Post> => {
    const databaseId = process.env.NOTION_POST_DATABASE_ID;
    if (!databaseId) {
      throw new Error('NOTION_POST_DATABASE_ID environment variable is not set');
    }
    const response = await notionClient.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Content slug',
            formula: {
              string: {
                equals: slug,
              },
            },
          },
          {
            property: 'locale',
            select: {
              equals: locale,
            },
          },
        ],
      },
    });

    if (!response.results[0]) {
      throw new Error('No results available');
    }

    const page = response.results[0];
    const markdown = await getPageContent(page.id);
    const post = pageToPostTransformer(page);
    return {
      post,
      markdown: markdown,
    };
};

export interface FooterLink {
  name: string;
  url: string;
}

export const getHomePageContent = async (): Promise<{ title: string | undefined; markdown: string | undefined; footerLinks?: FooterLink[] }> => {
    const pageId = process.env.NOTION_HOME_DATA_ID;
    if (!pageId) {
      console.warn('NOTION_HOME_DATA_ID environment variable is not set');
      return {
        title: undefined,
        markdown: undefined
      };
    }

    try {
      const page = await notionClient.pages.retrieve({ page_id: pageId });
      // @ts-expect-error Notion API types are complex
      const title = page.properties?.title?.title?.[0]?.plain_text || 'Home';
      const fullMarkdown = await getPageContent(pageId);
      const { cleanedMarkdown, footerLinks } = processMarkdownAndFooterLinks(fullMarkdown);
      
      return {
        title,
        markdown: cleanedMarkdown,
        footerLinks
      };
    } catch (error) {
      console.error('Error fetching home page content:', error);
      return {
        title: 'Home',
        markdown: '*There was an error loading the home page content.*',
      };
    }
};

function processMarkdownAndFooterLinks(markdown: string): { 
  cleanedMarkdown: string; 
  footerLinks: FooterLink[] 
} {
  const links: FooterLink[] = [];
  const footerHeadingPattern = /\n#+\s*Footer\s*\n/i;
  const parts = markdown.split(footerHeadingPattern);
  
  // If no Footer heading is found, return the original markdown with no footer links
  if (parts.length === 1) {
    return { 
      cleanedMarkdown: markdown, 
      footerLinks: [] 
    };
  }
  
  // The content before the Footer heading
  const cleanedMarkdown = parts[0].trim();
  
  // Everything after the Footer heading
  const footerSection = parts[1];
  
  // Finding all markdown links in the footer section
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(footerSection)) !== null) {
    links.push({
      name: match[1],
      url: match[2]
    });
  }
  
  return {
    cleanedMarkdown,
    footerLinks: links
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToPostTransformer(page: any): Metadata {
  const authors = 'Montek'; // Notion authors are not supported yet
  const authorImage = '/images/montek.png'; // default image
  const title = page.properties.Name.title[0].plain_text;
  const description = page.properties.Description.rich_text[0].plain_text;
  const date = page.properties.Updated.last_edited_time;
  const slug = page.properties.Slug.formula.string;
  const type = page.properties['Type']
    ? page.properties['Type'].rich_text[0].plain_text
    : '';
  const coverImageAlt = page.properties['Cover Image alt']
    ? page.properties['Cover Image alt'].rich_text[0].plain_text
    : '';
  const metaDescription = page.properties['Meta Description']
    ? page.properties['Meta Description'].rich_text[0].plain_text
    : '';
  const seoTitle =
    page.properties['SEO title'] &&
    page.properties['SEO title'].rich_text.length > 0
      ? page.properties['SEO title'].rich_text[0].plain_text
      : '';
  const relatedSlug =
      page.properties['Related slug']?.rich_text?.[0]?.plain_text || '';
  const updatedAt = page.properties.Updated.last_edited_time;
  const createdAt = page.properties.Created.date.start;
  const isPublished = page.properties.Published.checkbox ?? false;
  const contentSlug =
    page.properties['Content slug']?.rich_text?.[0]?.plain_text || '';
  return {
    id: page.id,
    title,
    description,
    date,
    slug,
    contentSlug,
    relatedSlug,
    author: authors,
    authorImage,
    type,
    coverImageAlt,
    metaDescription,
    seoTitle,
    createdAt,
    updatedAt,
    isPublished,
  };
}
