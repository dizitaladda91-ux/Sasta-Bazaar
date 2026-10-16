// Application Environment Configuration
export const ENV = {
  storeName: import.meta.env.VITE_STORE_NAME || 'SASTA BAZAAR',
  tagline: import.meta.env.VITE_STORE_TAGLINE || 'Everyday Luxury',
  currencySymbol: import.meta.env.VITE_CURRENCY_SYMBOL || '£',
  currencyCode: import.meta.env.VITE_CURRENCY_CODE || 'GBP',
  freeShippingThreshold: Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 40.00,
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@sastabazaarclothing.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '+447000000000',
  instagramHandle: import.meta.env.VITE_INSTAGRAM_HANDLE || '@sastabazaarclothing',

  // Optional external integrations
  shopifyDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '',
  shopifyToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
  stripeKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  pixelId: import.meta.env.VITE_META_PIXEL_ID || '',
};
