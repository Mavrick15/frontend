import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  noIndex?: boolean;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

const EnhancedSEO: React.FC<EnhancedSEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/lovable-uploads/og-image.png',
  author = 'Zetoun Labs',
  publishedTime,
  modifiedTime,
  articleSection,
  tags = [],
  noIndex = false,
  canonicalUrl,
  structuredData
}) => {
  const location = useLocation();
  const baseUrl = 'https://zetounlabs.cd';
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  const siteTitle = title ? `${title} | Zetoun Labs` : 'Zetoun Labs - Services IT & Formations | Kinshasa';
  const siteDescription = description || 'Zetoun Labs offre des services IT complets et des formations certifiantes à Kinshasa, incluant le développement logiciel, la cybersécurité, l\'ingénierie réseau et l\'installation solaire.';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': articleSection ? 'Article' : 'WebSite',
    name: siteTitle,
    description: siteDescription,
    url: currentUrl,
    image: `${baseUrl}${image}`,
    publisher: {
      '@type': 'Organization',
      name: 'Zetoun Labs',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/lovable-uploads/logo/Logo2.png`
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CD',
        addressLocality: 'Kinshasa'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+243XXXXXXXXX',
        contactType: 'customer service',
        availableLanguage: ['fr', 'en']
      }
    },
    author: {
      '@type': 'Organization',
      name: author
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    ...(articleSection && {
      articleSection,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      keywords: tags.join(', ')
    }),
    ...structuredData
  };

  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={articleSection ? 'article' : 'website'} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Zetoun Labs" />
      <meta property="og:locale" content="fr_CD" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      <meta name="twitter:site" content="@zetounlabs" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      
      {/* Additional SEO */}
      <meta name="language" content="fr" />
      <meta name="geo.region" content="CD-KN" />
      <meta name="geo.placename" content="Kinshasa" />
      <meta name="ICBM" content="-4.441931, 15.266295" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      
      {/* Preconnect pour les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//server-backend-zetounlabs.onrender.com" />
    </Helmet>
  );
};

export default EnhancedSEO;
