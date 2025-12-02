// Sitemap generator utility
interface SitemapUrl {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string = 'https://alpian-portfolio.com'): string => {
  const urls: SitemapUrl[] = [
    {
      url: '',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: '/resume',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: '/#about',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: '/#portfolio',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: '/#contact',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: '/#services',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    ${lastModified ? `<lastmod>${lastModified.split('T')[0]}</lastmod>` : ''}
    ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`).join('')}
</urlset>`;

  return sitemapXml;
};

export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Robots.txt generator
export const generateRobotsTxt = (baseUrl: string = 'https://alpian-portfolio.com'): string => {
  return `User-agent: *
Allow: /

# Disallow admin or sensitive pages
Disallow: /admin/
Disallow: /private/
Disallow: /*.pdf$

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
};

export const downloadRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
