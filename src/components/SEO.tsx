import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Constantes pour les textes et valeurs par défaut du composant SEO
const SEO_TEXT_CONSTANTS = {
  DEFAULT_TITLE: 'Zetoun Labs - Services IT & Formations',
  DEFAULT_DESCRIPTION: `Zetoun Labs : Votre partenaire expert en services IT (support, réseau, vidéosurveillance, web, infogérance, solaire) et formations professionnelles (Linux, Windows, Cisco, virtualisation, maintenance PC).`,
  ORGANIZATION_NAME: 'Zetoun Labs',
  ORGANIZATION_URL: 'https://zetounlabs.com',
  ORGANIZATION_LOGO_PATH: '/lovable-uploads/logo-zetoun-labs.png',
  ORGANIZATION_DESCRIPTION: 'Zetoun Labs : Votre partenaire en services IT et formations professionnelles à Kinshasa.',
  CONTACT_EMAIL: 'contact@zetounlabs.com',
  DEFAULT_IMAGE_PATH: '/lovable-uploads/icon.svg',
  DEFAULT_KEYWORDS: [
    'services IT',
    'formation IT',
    'support technique',
    'ingénierie réseau',
    'vidéosurveillance',
    'conception web',
    'infogérance',
    'installation solaire',
    'formation Linux',
    'formation Windows',
    'formation réseau Cisco',
    'formation virtualisation',
    'startup tech',
    'Kinshasa',
    'Zetoun Labs'
  ],
  LINKEDIN_URL: 'https://www.linkedin.com/company/zetoun-labs',
  TWITTER_URL: 'https://twitter.com/zetounlabs',
};

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  name?: string;
  imageUrl?: string;
  publishDate?: string;
  modifiedDate?: string;
  author?: string;
  category?: string;
  keywords?: string[];
  isBlogPost?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = SEO_TEXT_CONSTANTS.DEFAULT_TITLE,
  description = SEO_TEXT_CONSTANTS.DEFAULT_DESCRIPTION,
  type = 'website',
  name = SEO_TEXT_CONSTANTS.ORGANIZATION_NAME,
  imageUrl = SEO_TEXT_CONSTANTS.DEFAULT_IMAGE_PATH,
  publishDate,
  modifiedDate,
  author,
  category,
  keywords = SEO_TEXT_CONSTANTS.DEFAULT_KEYWORDS,
  isBlogPost = false
}) => {
  const location = useLocation();
  const baseUrl = SEO_TEXT_CONSTANTS.ORGANIZATION_URL;
  const currentUrl = `${baseUrl}${location.pathname}`;
  const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  // Organization JSON-LD Structured Data
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_TEXT_CONSTANTS.ORGANIZATION_NAME,
    url: SEO_TEXT_CONSTANTS.ORGANIZATION_URL,
    logo: `${baseUrl}${SEO_TEXT_CONSTANTS.ORGANIZATION_LOGO_PATH}`,
    description: SEO_TEXT_CONSTANTS.ORGANIZATION_DESCRIPTION,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: SEO_TEXT_CONSTANTS.CONTACT_EMAIL
    },
    sameAs: [
      SEO_TEXT_CONSTANTS.LINKEDIN_URL,
      SEO_TEXT_CONSTANTS.TWITTER_URL
    ]
  };

  // BlogPosting JSON-LD Structured Data (conditionally rendered)
  const blogPostStructuredData = isBlogPost && publishDate ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    headline: title,
    image: absoluteImageUrl,
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      '@type': 'Organization',
      name: author || SEO_TEXT_CONSTANTS.ORGANIZATION_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_TEXT_CONSTANTS.ORGANIZATION_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${SEO_TEXT_CONSTANTS.ORGANIZATION_LOGO_PATH}`
      }
    },
    description: description,
    keywords: keywords.join(', ')
  } : null;

  // Combine keywords with any additional category term
  const keywordString = category
    ? [...keywords, category.toLowerCase()].join(', ')
    : keywords.join(', ');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta name="keywords" content={keywordString} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isBlogPost ? 'article' : type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {isBlogPost && category && <meta property="article:section" content={category} />}
      {isBlogPost && publishDate && <meta property="article:published_time" content={publishDate} />}
      {isBlogPost && modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* LinkedIn specific */}
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta name="author" content={author || name} />

      {/* Pinterest specific */}
      <meta name="pinterest:description" content={description} />
      <meta name="pinterest:image" content={absoluteImageUrl} />

      {/* JSON-LD structured data */}
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {/* Blog Post Structured Data (conditionally rendered) */}
      {blogPostStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(blogPostStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
