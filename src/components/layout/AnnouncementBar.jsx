import React, { useState } from 'react';
import { Tag, Truck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-sasta-yellow-light border-b border-sasta-border text-sasta-heading text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold text-sasta-navy">
            <Tag className="w-3.5 h-3.5 text-sasta-gold-dark" />
            SPECIAL OFFERS - UP TO 50% OFF
          </span>
          <span className="hidden sm:inline text-sasta-muted">|</span>
          <span className="inline-flex items-center gap-1.5 text-sasta-body">
            <Truck className="w-3.5 h-3.5 text-sasta-gold-dark" />
            Fast, tracked UK delivery on every order
          </span>
          <Link
            to="/shop?filter=sale"
            className="underline ml-1 font-semibold hover:text-sasta-gold-dark transition-colors"
          >
            Shop Sale
          </Link>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-sasta-muted hover:text-sasta-heading p-1 ml-2 transition-colors"
          aria-label="Close announcement bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
