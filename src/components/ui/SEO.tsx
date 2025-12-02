import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

interface PortfolioSEOProps extends SEOProps {
  projectName?: string;
  technologies?: string[];
  category?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = 'Alpian Portfolio - Full Stack Developer & UI/UX Designer',
  description = 'Professional portfolio showcasing full-stack development projects, UI/UX designs, and creative web solutions by Alpian.',
  keywords = ['Web Developer', 'Full Stack', 'React', 'TypeScript', 'UI/UX', 'Portfolio'],
  image = '/public/img/Foto.jpg',
  url = window.location.href,
  type = 'website',
  author = 'Alpian',
  publishedTime,
  modifiedTime,
  structuredData
}) => {
  const siteTitle = 'Alpian Portfolio';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  // Default structured data for person/professional
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alpian",
    "jobTitle": "Full Stack Developer & UI/UX Designer",
    "url": "https://alpian-portfolio.com",
    "image": image,
    "description": description,
    "knowsAbout": keywords,
    "alumniOf": "University/Institution Name",
    "workLocation": "Indonesia",
    "sameAs": [
      "https://github.com/alpian",
      "https://linkedin.com/in/alpian",
      "https://twitter.com/alpian"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@alpian" />
      <meta name="twitter:site" content="@alpian" />

      {/* Additional Article Meta */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export const PortfolioSEO: React.FC<PortfolioSEOProps> = ({
  projectName,
  technologies = [],
  category,
  ...seoProps
}) => {
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": projectName,
    "creator": {
      "@type": "Person",
      "name": "Alpian",
      "jobTitle": "Full Stack Developer"
    },
    "description": seoProps.description,
    "image": seoProps.image,
    "url": seoProps.url,
    "keywords": [...(seoProps.keywords || []), ...technologies],
    "genre": category,
    "dateCreated": seoProps.publishedTime,
    "dateModified": seoProps.modifiedTime
  };

  return (
    <SEOHead
      {...seoProps}
      structuredData={projectStructuredData}
      keywords={[...(seoProps.keywords || []), ...technologies]}
    />
  );
};

// Hook for dynamic SEO updates
export const useSEO = () => {
  const updateSEO = React.useCallback((seoData: SEOProps) => {
    // Update document title
    document.title = seoData.title || 'Alpian Portfolio';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && seoData.description) {
      metaDescription.setAttribute('content', seoData.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (ogTitle && seoData.title) {
      ogTitle.setAttribute('content', seoData.title);
    }
    if (ogDescription && seoData.description) {
      ogDescription.setAttribute('content', seoData.description);
    }
    if (ogImage && seoData.image) {
      ogImage.setAttribute('content', seoData.image);
    }
  }, []);

  return { updateSEO };
};
