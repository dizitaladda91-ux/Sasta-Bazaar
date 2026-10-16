import React, { useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import productsData from '../data/products.json';
import { CATEGORIES } from '../data/categories';

export default function CollectionPage() {
  const { slug } = useParams();

  const collectionInfo = useMemo(() => {
    // Check main categories first
    const mainCat = CATEGORIES.find(c => c.slug === slug);
    if (mainCat) {
      return {
        title: mainCat.name,
        description: mainCat.description,
        image: mainCat.image,
        categoryFilter: mainCat.name
      };
    }

    // Specific subcategories mapping
    const slugMap = {
      'casual-wear': {
        title: 'Casual Everyday Wear Suits',
        description: 'Breezy cotton and slub 3-piece suit sets tailored with intricate neck patches and lightweight dupattas.',
        categoryFilter: 'Casual Everyday Wear Suits'
      },
      'lehenga-choli': {
        title: 'Lehenga Choli',
        description: 'Exquisite digital print and embroidered silk lehengas crafted for weddings and festive celebrations.',
        categoryFilter: 'Lehenga Choli'
      },
      'sharara-gharara-suits': {
        title: 'Sharara & Gharara Suits',
        description: 'Glamorous tiered sharara silhouettes embellished with sequin work and contrast dupattas.',
        categoryFilter: 'Sharara & Gharara Suits'
      },
      'salwar-kameez-suit-sets': {
        title: 'Salwar Kameez / Suit Sets',
        description: 'Classic thread & zarkan work suits made from premium slub cotton fabrics for comfortable elegance.',
        categoryFilter: 'Salwar Kameez / Suit Sets'
      },
      'dresses': {
        title: 'Dresses & Saree-Drape Gowns',
        description: 'Contemporary georgette drape styled dresses with hand-embroidered belts and modern cuts.',
        categoryFilter: 'Dresses'
      },
      'scarves': {
        title: 'Premium Jersey Hijabs & Scarves',
        description: 'Ultra-soft, breathable double-stitched jersey hijabs available in over 30 beautiful pastel and earthy tones.',
        categoryFilter: 'Scarves'
      },
      'kids-collection': {
        title: 'Kids Ethnic Collection',
        description: 'Comfortable, charming festive wear and lehenga choli sets designed specially for kids.',
        categoryFilter: 'Kids Collection'
      },
      'unstitched-suits': {
        title: 'Unstitched Suits',
        description: 'Premium unstitched dress material in pure cotton and silk with designer dupattas ready to tailor.',
        categoryFilter: 'Unstitched Suits'
      }
    };

    return slugMap[slug] || {
      title: slug?.replace(/-/g, ' ').toUpperCase() || 'Collection',
      description: 'Explore our handpicked ethnic garments designed for everyday comfort and festive grace.',
      categoryFilter: null
    };
  }, [slug]);

  useEffect(() => {
    document.title = `${collectionInfo.title} | SASTA BAZAAR`;
    window.scrollTo(0, 0);
  }, [collectionInfo]);

  // Filter products matching this collection
  const products = useMemo(() => {
    if (!collectionInfo.categoryFilter) return productsData;
    return productsData.filter(p =>
      p.collectionSlug === slug ||
      p.category === collectionInfo.categoryFilter ||
      p.subcategory === collectionInfo.categoryFilter ||
      (slug === 'ladies-collection' && p.category === 'Ladies Collection')
    );
  }, [slug, collectionInfo]);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-sasta-muted mb-6">
          <Link to="/" className="hover:text-sasta-heading">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-sasta-heading">Collections</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-sasta-heading">{collectionInfo.title}</span>
        </nav>

        {/* Collection Header Banner */}
        <div className="bg-gradient-to-r from-sasta-yellow-light/80 to-sasta-yellow-cream p-6 sm:p-10 rounded-xl border border-sasta-border mb-10 text-center max-w-4xl mx-auto shadow-2xs">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Everyday Luxury
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sasta-heading mb-3">
            {collectionInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body max-w-2xl mx-auto leading-relaxed mb-4">
            {collectionInfo.description}
          </p>
          <span className="inline-block text-xs font-semibold text-sasta-navy bg-white/80 border border-sasta-border px-3 py-1 rounded-full">
            {products.length} Products Available in GBP (£)
          </span>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-sasta-yellow-cream/40 rounded-lg border border-dashed border-sasta-border space-y-4">
            <p className="font-serif text-lg font-bold text-sasta-heading">
              New styles coming soon to this collection!
            </p>
            <p className="text-xs text-sasta-body max-w-sm mx-auto">
              Our artisans are currently crafting fresh designs. Explore our other popular collections in the meantime.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore All Products</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
