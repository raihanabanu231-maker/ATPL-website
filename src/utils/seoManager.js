/**
 * Utility for dynamically updating HTML Document Head metadata & SEO tags
 * Supports OpenGraph, Twitter Cards, Canonical URLs, Robots, and Keywords
 */

const setMetaTag = (selector, attributeName, attributeValue, content) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content || '');
};

const setLinkTag = (rel, href) => {
  if (typeof document === 'undefined') return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href || '');
};

export const applyPageSEO = (pageKey, seoData) => {
  if (typeof document === 'undefined' || !seoData) return;

  const globalConfig = seoData.global || {};
  const pagesConfig = seoData.pages || {};
  const currentPage = pagesConfig[pageKey] || pagesConfig.home || {};

  // Compute Full Title
  const siteTitle = currentPage.title || globalConfig.siteName || 'Archery Technocrats';
  document.title = siteTitle;

  // Primary Meta Tags
  setMetaTag('meta[name="title"]', 'name', 'title', siteTitle);
  setMetaTag('meta[name="description"]', 'name', 'description', currentPage.description || '');
  
  const keywordsStr = Array.isArray(currentPage.keywords) 
    ? currentPage.keywords.join(', ') 
    : (currentPage.keywords || '');
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywordsStr);
  
  setMetaTag('meta[name="robots"]', 'name', 'robots', currentPage.robots || 'index, follow');

  // Canonical URL
  const canonicalUrl = currentPage.canonical || `${globalConfig.baseUrl || 'https://atplgroup.com'}${currentPage.route || '/'}`;
  setLinkTag('canonical', canonicalUrl);

  // Open Graph
  const ogTitle = currentPage.ogTitle || siteTitle;
  const ogDescription = currentPage.ogDescription || currentPage.description || '';
  const ogImage = currentPage.ogImage || globalConfig.defaultOgImage || 'https://atplgroup.com/og-image.png';

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', ogTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', ogDescription);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

  // Twitter Cards
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', ogDescription);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);

  // Verification Tag
  if (globalConfig.googleVerificationCode) {
    setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', globalConfig.googleVerificationCode);
  }
};

/**
 * Apply Dynamic SEO, OpenGraph, Twitter, and JSON-LD Article Schema for an Insight Post
 */
export const applyArticleSEO = (post) => {
  if (typeof document === 'undefined' || !post) return;

  const fullTitle = `${post.seoTitle || post.title} | ATPL Insights`;
  const description = post.seoDescription || post.excerpt || '';
  const canonicalUrl = `https://atplgroup.com/insights/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage || 'https://atplgroup.com/og-image.png';

  document.title = fullTitle;

  setMetaTag('meta[name="title"]', 'name', 'title', fullTitle);
  setMetaTag('meta[name="description"]', 'name', 'description', description);
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', (post.tags || []).join(', '));
  setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow');

  setLinkTag('canonical', canonicalUrl);

  // Open Graph
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

  // Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', canonicalUrl);

  // Article Specific Meta
  if (post.publishedAt) {
    setMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', post.publishedAt);
  }
  if (post.author?.name) {
    setMetaTag('meta[property="article:author"]', 'property', 'article:author', post.author.name);
  }
  if (post.category) {
    setMetaTag('meta[property="article:section"]', 'property', 'article:section', post.category);
  }

  // JSON-LD Article Schema
  try {
    let scriptTag = document.head.querySelector('script[data-schema="article-jsonld"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-schema', 'article-jsonld');
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.title,
      'description': description,
      'image': [ogImage],
      'datePublished': post.publishedAt || new Date().toISOString(),
      'dateModified': post.publishedAt || new Date().toISOString(),
      'author': [{
        '@type': 'Person',
        'name': post.author?.name || 'ATPL Engineering',
        'jobTitle': post.author?.role || 'Automation Specialist'
      }],
      'publisher': {
        '@type': 'Organization',
        'name': 'Archery Technocrats Private Limited',
        'url': 'https://atplgroup.com',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://atplgroup.com/atpl-logo.png'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };

    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  } catch (schemaErr) {
    console.warn('JSON-LD schema injection skipped:', schemaErr);
  }
};


