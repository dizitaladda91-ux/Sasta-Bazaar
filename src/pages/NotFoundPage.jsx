import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found (404) | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-5 bg-sasta-yellow-cream/50 p-8 sm:p-10 rounded-2xl border border-sasta-border shadow-xs">
        <span className="text-5xl sm:text-6xl font-serif font-extrabold text-sasta-navy">
          404
        </span>
        <h1 className="font-serif text-2xl font-bold text-sasta-heading">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-sasta-body leading-relaxed">
          The ethnic style or page you're searching for might have moved, been renamed, or is temporarily out of stock.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-sasta-yellow-cream text-sasta-heading border border-sasta-border text-xs font-bold uppercase tracking-wider px-6 py-3 rounded shadow-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Shop All</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
