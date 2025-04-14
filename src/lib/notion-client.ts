import { Client } from '@notionhq/client';
import { NotionConverter } from 'notion-to-md';
import { DefaultExporter } from 'notion-to-md/plugins/exporter';

export const notionClient = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export const getPageContent = async (pageId: string): Promise<string> => {
  try {
    // Create a buffer to store the output
    const buffer: Record<string, string> = {}; // markdown output will be stored here
    // use default exporter with buffer
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
    if (!buffer[pageId]) {
      console.warn(`No markdown content found for page ${pageId}`);
      return '';
    }
    
    return buffer[pageId];
  } catch (error) {
    console.error('Error converting Notion page to markdown:', error);
    return `*There was an error loading this content.*`;
  }
};