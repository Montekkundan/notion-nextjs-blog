# Notion Next.js Blog

A minimal, performance-optimized blog built with Next.js, TypeScript, and Notion as a CMS.

## Features

- ✨ Minimal and beautiful design with date formatting
- 🚀 Excellent Lighthouse performance scores
- 📝 MDX rendering with next-mdx-remote
- 🔄 View transitions for smooth page navigation
- 💾 Notion as a headless CMS
- 🌙 Dark mode support
- 🔍 SEO optimized with OpenGraph tags
- ⚡ Static Site Generation with Incremental Static Regeneration
- 🗃️ React cache for efficient data fetching
- 🖼️ Optimized image loading with Next.js Image
- 🔄 Prefetching for faster navigation
- 🖊️ Syntax highlighting with Sugar High

## Getting Started

### Prerequisites

1. **Notion API Key**:
   - Go to [Notion Developers](https://www.notion.so/my-integrations)
   - Create a new integration and copy the API key

2. **Notion Database**:
   - Create a new Notion database for your blog posts
   - Share the database with your integration
   - Copy the database ID from the URL: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`

3. **Environment Variables**:
   - Create a `.env` file in the root directory
   - Add your Notion credentials:
   ```
   NOTION_ACCESS_TOKEN=your_notion_api_key
   NOTION_POST_DATABASE_ID=your_notion_database_id
   ```

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/notion-nextjs-blog.git
cd notion-nextjs-blog

# Install dependencies
npm install
# or
yarn
# or
bun install

# Start the development server
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Understanding Notion Integration

### Notion Database Structure

Your Notion database should have the following properties for each post:

- `Name` (title): The title of your blog post
- `Description` (rich text): A short description or excerpt
- `Slug` (formula): A formula that generates a URL-friendly slug (can be `replaceAll(replaceAll(prop("Name"), " ", "-"), ".", ""`)
- `Content slug` (rich text): The slug to use for the post URL
- `Published` (checkbox): Whether the post is published
- `Updated` (last edited time): When the post was last updated
- `SEO title` (rich text): Custom SEO title
- `Meta Description` (rich text): Custom meta description

### How the Notion Integration Works

This blog uses the `notion-to-md` package (v4) which has a plugin-based architecture:

1. **Renderer**: Converts Notion blocks into Markdown
2. **Exporter**: Decides where the converted content goes

The implementation in `notion-client.ts` looks like this:

```typescript
import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { DefaultExporter } from 'notion-to-md/plugins/exporter';

// Initialize Notion client
export const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export const getPageContent = async (pageId: string) => {
  // Create a buffer to store the output
  const buffer = {}; // markdown output will be stored here
  // Use default exporter with buffer
  const exporter = new DefaultExporter({
      outputType: 'buffer',
      buffer: buffer
  });
  
  // Set up the converter with the builder pattern
  const n2m = new NotionConverter(notionClient)
    .withExporter(exporter);
  
  // Convert the page in a single call
  await n2m.convert(pageId); // this will save the markdown content under pageId
  
  // Get markdown from the buffer using pageId as key
  return buffer[pageId];
};
```

When a page is converted, the buffer will store the markdown content with the pageId as key:
```
{
  "page_id_123": "# Markdown content here"
}
```

## MDX Rendering Architecture

This blog uses Next.js MDX integration to render Markdown content with React components:

1. **Server-Side Rendering**: 
   - MDX content is pre-rendered on the server using `next-mdx-remote/rsc`
   - Custom components defined in `mdx-components.tsx` are applied to the MDX content

2. **Component Separation**:
   - Server Component: Handles data fetching and MDX transformation
   - Client Component: Handles interactive features and display

This architecture provides the best performance by leveraging Next.js App Router's Server Components for content processing while maintaining interactivity where needed.

## Performance Optimizations

This blog includes several performance optimizations:

1. **Static Site Generation (SSG)** with Incremental Static Regeneration (ISR)
   - Pages are pre-rendered at build time
   - Content is revalidated every hour (configurable)

2. **React Cache for Data Fetching**
   - Avoids redundant API calls to Notion
   - Improves response times

3. **Link Prefetching**
   - Pre-loads linked pages for instant navigation

4. **Image Optimization**
   - Uses Next.js Image component
   - Supports modern formats (AVIF, WebP)

5. **View Transitions API**
   - Smooth transitions between pages

## Customization

### Styling

This blog uses Tailwind CSS for styling. You can customize the design by editing the CSS classes in the components.

### MDX Components

You can customize how Markdown elements are rendered by editing the `mdx-components.tsx` file. The blog comes with pre-configured components for:

- Headings (h1-h4)
- Paragraphs
- Lists (ordered and unordered)
- Links (with special handling for internal/external)
- Code blocks with syntax highlighting
- Blockquotes
- Tables

## Deployment

The easiest way to deploy this blog is using [Vercel](https://vercel.com/new):

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project into Vercel
3. Add your environment variables
4. Deploy!

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Documentation](https://developers.notion.com/)
- [notion-to-md Documentation](https://github.com/souvikinator/notion-to-md)
- [Next.js MDX Documentation](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [next-mdx-remote Documentation](https://github.com/hashicorp/next-mdx-remote)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
