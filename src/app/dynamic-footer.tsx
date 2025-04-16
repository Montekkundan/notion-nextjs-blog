import { getHomePageContent } from '@/lib/notion-post-service';

export async function DynamicFooter() {
  const { footerLinks } = await getHomePageContent();
  
  // Use default links if no footer links are found in Notion
  const links = footerLinks && footerLinks.length > 0
    ? footerLinks
    : [
        { name: "@montekkundan", url: "https://x.com/montekkundan" },
        { name: "youtube", url: "https://www.youtube.com/@montekkundan" },
        { name: "linkedin", url: "https://www.linkedin.com/in/montekkundan" },
        { name: "github", url: "https://github.com/montekkundan" },
      ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-green-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}