import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { SIGNATURE_COLLECTIONS } from '../../data/categories';

export default function SignatureCollection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Craftsmanship &amp; Style"
          title="Our Signature Collection"
          subtitle="Explore our most iconic styles, cherished for their flawless draping, intricate embroidery, and breathable textiles."
          linkText="Explore All Categories"
          linkTo="/shop"
          center={true}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {SIGNATURE_COLLECTIONS.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="group relative rounded-lg overflow-hidden border border-sasta-border shadow-xs hover:shadow-card hover:border-sasta-gold transition-all duration-300 flex flex-col bg-sasta-yellow-cream/40"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-sasta-yellow-light/95 backdrop-blur-xs text-sasta-heading text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border border-sasta-border">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                  <h4 className="font-serif text-sm sm:text-base font-bold leading-tight mb-0.5 group-hover:text-sasta-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/80 line-clamp-1 mb-2 font-light">
                    {item.subtitle}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sasta-gold group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
