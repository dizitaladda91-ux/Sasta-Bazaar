import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export default function CategoryTiles() {
  // 3 prominent tiles like Hijab House's Hijabs/Clothing/Caps pattern
  const topThree = CATEGORIES.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1.5">
            Curated Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-sasta-heading">
            Shop By Collection
          </h2>
          <p className="text-xs sm:text-sm text-sasta-body mt-2">
            Handpicked ethnic elegance tailored with fine embroidery, soft cotton blends, and modern cuts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {topThree.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-lg overflow-hidden border border-sasta-border shadow-xs hover:shadow-card transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white text-center flex flex-col items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sasta-gold mb-1">
                    {cat.itemCount}+ Designs Available
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-2 max-w-xs mb-4 hidden sm:block">
                    {cat.description}
                  </p>

                  <Link
                    to={`/collection/${cat.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-sasta-heading hover:bg-sasta-gold text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded shadow-md transition-colors"
                  >
                    <span>Shop All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
