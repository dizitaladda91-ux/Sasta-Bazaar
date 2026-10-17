import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

export default function SEORankingContent() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-sasta-yellow-cream/50 border-t border-sasta-border py-12 sm:py-16 text-sasta-body overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="left" className="flex items-center gap-2 mb-4 text-sasta-navy">
          <BookOpen className="w-5 h-5 text-sasta-gold-dark" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-sasta-heading">
            Sasta Bazaar &bull; Everyday Luxury Ethnic Fashion in the UK
          </h2>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={80}>
          <p className="text-xs sm:text-sm leading-relaxed text-sasta-body mb-6">
            Welcome to <strong>SASTA BAZAAR</strong>, the premier online destination for <strong>Pakistani suits in the UK</strong>, <strong>Indian ethnic wear in London</strong>, and modern modest fashion. We deliver everyday luxury directly to your doorstep across England, Scotland, Wales, and Northern Ireland in British Pounds (GBP £). Discover ready-to-wear Salwar Kameez, Embroidered Sharara Sets, Chickenkari Kurta Pant sets, and breathable Jersey Hijabs crafted for timeless comfort.
          </p>
        </RevealOnScroll>

        {/* SEO Rich Content Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${expanded ? 'block' : 'line-clamp-4 md:line-clamp-none'}`}>
          {/* Column 1 (Left Slide) */}
          <RevealOnScroll direction="left" delay={100} className="h-full">
            <div className="space-y-3 bg-white p-5 rounded-lg border border-sasta-border shadow-2xs h-full">
              <h3 className="font-serif text-base font-bold text-sasta-navy">
                Ready-to-Wear Ladies Pakistani Suits UK
              </h3>
              <p>
                Looking for authentic <strong>ready to wear Pakistani clothes in the UK</strong> without extortionate boutique prices? Our curated catalog features premium 3-piece suit sets—complete with masterfully tailored kurtas, matching trousers, and flowing chiffon or lawn dupattas. From everyday casual cotton wear starting from £9.99 to elaborate festive Shararas and Ghararas, every piece is designed for flattering silhouettes.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sasta-muted pt-1">
                <li>Lawn Cotton &amp; Cambric 3-Piece Suits</li>
                <li>Handcrafted Chickenkari &amp; Thread Embroidery</li>
                <li>Sizes from Small (UK 8-10) to XXL (UK 16-18)</li>
              </ul>
            </div>
          </RevealOnScroll>

          {/* Column 2 (Up Slide) */}
          <RevealOnScroll direction="up" delay={200} className="h-full">
            <div className="space-y-3 bg-white p-5 rounded-lg border border-sasta-border shadow-2xs h-full">
              <h3 className="font-serif text-base font-bold text-sasta-navy">
                Double-Stitched Jersey Hijabs &amp; Modest Scarves
              </h3>
              <p>
                Elevate your daily modesty with our signature <strong>double-stitched jersey hijabs</strong>. Featuring four-way stretch, ultra-soft breathable bamboo &amp; modal blends, and non-slip finishes, our scarves stay in place effortlessly all day without snagging. Available in neutral earth tones, pastel lilacs, and rich jewel shades to coordinate with any outfit.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sasta-muted pt-1">
                <li>Premium Double-Stitched Seams</li>
                <li>Breathable, Lightweight &amp; All-Day Comfort</li>
                <li>Opaque coverage with zero pin-tears</li>
              </ul>
            </div>
          </RevealOnScroll>

          {/* Column 3 (Right Slide) */}
          <RevealOnScroll direction="right" delay={300} className="h-full">
            <div className="space-y-3 bg-white p-5 rounded-lg border border-sasta-border shadow-2xs h-full">
              <h3 className="font-serif text-base font-bold text-sasta-navy">
                Festive Lehengas, Eid Outfits &amp; Kids Wear
              </h3>
              <p>
                Celebrate weddings, parties, and Eid in style with our majestic <strong>semi-stitched lehenga cholis</strong> and adorable <strong>kids ethnic wear collections</strong>. We ensure high-grade linings, skin-friendly fabrics for delicate young skin, and shimmering foil-print or zari borders that shine gracefully at family celebrations.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sasta-muted pt-1">
                <li>Girls Anarkalis, Ghararas &amp; Festive Dresses</li>
                <li>Free Tracked UK Delivery over £40</li>
                <li>Hassle-free 14-Day Exchanges &amp; Returns</li>
              </ul>
            </div>
          </RevealOnScroll>
        </div>

        {/* Read More Toggle on mobile */}
        <div className="mt-4 text-center md:hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sasta-navy hover:text-sasta-gold-dark bg-white border border-sasta-border px-4 py-2 rounded-full shadow-2xs"
          >
            <span>{expanded ? 'Read Less SEO Guide' : 'Read Full Fashion & Shopping Guide'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
