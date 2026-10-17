import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal SEO & Meta Tag Component for SASTA BAZAAR
 * Handles dynamic Title, Meta Description, Meta Keywords, OpenGraph,
 * Twitter Cards, Canonical URLs, and Schema.org JSON-LD Structured Data.
 */
export default function SEO({
  title = 'SASTA BAZAAR | Everyday Luxury - Ladies & Kids Ethnic Fashion UK',
  description = 'Shop affordable & premium Ladies & Kids ethnic wear at Sasta Bazaar UK. Ready-to-wear Salwar Kameez, Embroidered Shararas, Cotton Suits & Hijabs with fast tracked delivery in GBP (£).',
  keywords = 'sasta bazaar, pakistani suits uk, indian ethnic wear uk, salwar kameez london, everyday luxury, ready to wear suits, chickenkari kurta, lehenga choli uk, sharara suit, kids ethnic clothes, jersey hijabs uk, modest fashion uk, ladies dresses uk',
  canonical,
  ogImage = '/logo.png',
  ogType = 'website',
  schema = null
}) {
  const location = useLocation();
  const siteUrl = 'https://sastabazaarclothing.com';
  const fullTitle = title.includes('SASTA BAZAAR') ? title : `${title} | SASTA BAZAAR - Everyday Luxury`;
  const canonicalUrl = canonical 
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`)
    : `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // 1. Page Title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const setMetaTag = (attributeName, attributeValue, contentValue) => {
      if (!contentValue) return;
      let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, attributeValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', contentValue);
    };

    // 2. Standard Meta Tags & Ranking Keywords
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'Sasta Bazaar - Everyday Luxury');

    // 3. Open Graph Protocol (Facebook, WhatsApp, LinkedIn, Pinterest)
    setMetaTag('property', 'og:site_name', 'SASTA BAZAAR - Everyday Luxury');
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:locale', 'en_GB');

    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
    setMetaTag('property', 'og:image', fullOgImage);
    setMetaTag('property', 'og:image:alt', fullTitle);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullOgImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Schema.org JSON-LD Structured Data
    const scriptId = 'sasta-bazaar-jsonld-schema';
    let scriptTag = document.getElementById(scriptId);

    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
