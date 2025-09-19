import * as React from 'react';
import { BRAND_NAME } from '@/content/brand';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEOHead({
  title = `${BRAND_NAME} - AI-Powered Brand & Growth Partner`,
  description = "AI-powered brand, web, and growth partner for India's startups. Founder-friendly, efficient delivery.",
  canonical = "https://wittwizz.github.io/Wittwizz/",
  ogImage = "https://wittwizz.github.io/Wittwizz/assets/hero_og.jpg"
}: SEOHeadProps) {
  
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
    
    // Update Open Graph tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', title);
    
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) ogDescMeta.setAttribute('content', description);
    
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) ogUrlMeta.setAttribute('content', canonical);
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) ogImageMeta.setAttribute('content', ogImage);
    
    // Update Twitter Card tags
    const twitterTitleMeta = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleMeta) twitterTitleMeta.setAttribute('content', title);
    
    const twitterDescMeta = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescMeta) twitterDescMeta.setAttribute('content', description);
    
    const twitterUrlMeta = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrlMeta) twitterUrlMeta.setAttribute('content', canonical);
    
    const twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
    if (twitterImageMeta) twitterImageMeta.setAttribute('content', ogImage);
    
  }, [title, description, canonical, ogImage]);
  
  return null; // This component doesn't render anything
}
