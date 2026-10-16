import fs from 'fs';
import path from 'path';

const raw = JSON.parse(fs.readFileSync('products_raw.json', 'utf8'));

function cleanTitle(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/^📛-product-title-|^product-title-|^Product Title:\s*/i, '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function determineCategory(p) {
  const handle = (p.handle || '').toLowerCase();
  const title = (p.title || '').toLowerCase();

  if (handle.includes('hijab') || handle.includes('scarf') || title.includes('hijab') || title.includes('scarf')) {
    return {
      category: 'Scarves',
      subcategory: 'Premium Jersey Hijabs',
      collection: 'scarves'
    };
  }
  if (handle.startsWith('k0') || title.includes('kids')) {
    return {
      category: 'Kids Collection',
      subcategory: 'Kids Ethnic Wear',
      collection: 'kids-collection'
    };
  }
  if (handle.startsWith('l0') || title.includes('lehenga')) {
    return {
      category: 'Ladies Collection',
      subcategory: 'Lehenga Choli',
      collection: 'lehenga-choli'
    };
  }
  if (handle.startsWith('s001') || title.includes('sharara') || title.includes('gharara')) {
    return {
      category: 'Ladies Collection',
      subcategory: 'Sharara & Gharara Suits',
      collection: 'sharara-gharara-suits'
    };
  }
  if (handle.startsWith('d0') || title.includes('saree drape') || title.includes('long dress') || title.includes('dress')) {
    return {
      category: 'Ladies Collection',
      subcategory: 'Dresses',
      collection: 'dresses'
    };
  }
  if (handle.startsWith('sl0')) {
    return {
      category: 'Ladies Collection',
      subcategory: 'Salwar Kameez / Suit Sets',
      collection: 'salwar-kameez-suit-sets'
    };
  }
  if (handle.includes('unstitched') || title.includes('unstitched')) {
    return {
      category: 'Unstitched Suits',
      subcategory: 'Unstitched Suits',
      collection: 'unstitched-suits'
    };
  }
  return {
    category: 'Ladies Collection',
    subcategory: 'Casual Everyday Wear Suits',
    collection: 'casual-wear'
  };
}

// Fallback high-quality ethnic wear placeholder images when a product record has 0 images
const ethnicSuitPlaceholders = [
  'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/A9A58E82-7169-4537-965C-00EEEA5F386E.jpg?v=1782830760',
  'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/8DA859B8-D954-4D4A-A052-1E1973B90BC9.jpg?v=1782830836',
  'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/8D3E0A65-E3E2-4A12-AD6E-B8322A127AC5.jpg?v=1782830892',
  'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/5B4516CE-1744-4BC4-B5F8-496E0908B7B8.jpg?v=1782830970',
  'https://cdn.shopify.com/s/files/1/1083/5361/8269/files/IMG_3452.jpg?v=1782585999'
];

let placeholderIdx = 0;

const cleanedProducts = raw.products.map((p, index) => {
  const cleanedName = cleanTitle(p.title);
  const catInfo = determineCategory(p);

  const rawImages = (p.images && p.images.length > 0)
    ? p.images.map(img => img.src)
    : [];

  const isImagePlaceholder = rawImages.length === 0;
  
  // If no image is available, assign a clearly flagged ethnic fallback from the store collection
  const images = !isImagePlaceholder
    ? rawImages
    : [
        ethnicSuitPlaceholders[placeholderIdx % ethnicSuitPlaceholders.length],
        ethnicSuitPlaceholders[(placeholderIdx + 1) % ethnicSuitPlaceholders.length]
      ];
  if (isImagePlaceholder) placeholderIdx++;

  const firstVariant = p.variants && p.variants[0] ? p.variants[0] : {};
  const price = parseFloat(firstVariant.price || '9.99');
  let compareAt = firstVariant.compare_at_price ? parseFloat(firstVariant.compare_at_price) : null;
  
  if (!compareAt && price > 0) {
    if (price === 9.99) compareAt = 19.99;
    else if (price === 2.99) compareAt = 5.99;
    else compareAt = Math.round(price * 1.5 * 100) / 100;
  }

  const discount = compareAt && compareAt > price
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  const isAvailable = p.variants ? p.variants.some(v => v.available) : true;

  // Sizes & Colors
  let sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  let colors = [];
  if (p.options && p.options.length > 0) {
    const sizeOpt = p.options.find(o => o.name && o.name.toLowerCase() === 'size');
    if (sizeOpt && sizeOpt.values && sizeOpt.values.length > 0) {
      sizes = sizeOpt.values;
    }
    const colorOpt = p.options.find(o => o.name && (o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'colour' || o.name.toLowerCase() === 'title'));
    if (colorOpt && colorOpt.values && colorOpt.values.length > 0 && !sizeOpt) {
      colors = colorOpt.values;
    }
  }

  // Best seller and new arrival flags
  const isBestSeller = index < 12 || p.handle.startsWith('sb01') || p.handle.startsWith('sb10') || p.handle.startsWith('sl01') || p.handle.startsWith('d001') || p.handle.startsWith('premium-jersey');
  const isNewArrival = index < 18 || p.handle.startsWith('sb2') || p.handle.startsWith('d0');

  return {
    id: p.id,
    handle: p.handle,
    title: cleanedName,
    rawTitle: p.title,
    category: catInfo.category,
    subcategory: catInfo.subcategory,
    collectionSlug: catInfo.collection,
    price: price,
    compareAtPrice: compareAt,
    discountPercent: discount,
    currency: '£',
    available: isAvailable,
    images: images,
    primaryImage: images[0],
    hoverImage: images[1] || images[0],
    isImagePlaceholder: isImagePlaceholder,
    description: p.body_html || '<p>Experience authentic ethnic luxury crafted with premium fabrics and timeless detailing.</p>',
    sizes: sizes,
    colors: colors,
    vendor: p.vendor || 'SASTA BAZAAR',
    isBestSeller: isBestSeller,
    isNewArrival: isNewArrival,
    variants: (p.variants || []).map(v => ({
      id: v.id,
      title: v.title,
      price: parseFloat(v.price),
      compareAtPrice: v.compare_at_price ? parseFloat(v.compare_at_price) : null,
      available: v.available,
      image: v.featured_image ? v.featured_image.src : null
    }))
  };
});

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/products.json', JSON.stringify(cleanedProducts, null, 2));

console.log('Processed', cleanedProducts.length, 'products successfully into src/data/products.json');
