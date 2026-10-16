import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function MobileNav({ isOpen, onClose }) {
  const [openSections, setOpenSections] = useState({
    shopAll: true,
    help: false,
    company: false
  });

  const { wishlistCount } = useWishlist();
  const { totalCount, openCart } = useCart();

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-sasta-border flex items-center justify-between bg-sasta-yellow-cream">
          <Link to="/" onClick={onClose} className="inline-block">
            <img
              src="/logo.png"
              alt="SASTA BAZAAR - Everyday Luxury"
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-sasta-heading hover:bg-white rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick action strip */}
        <div className="grid grid-cols-2 border-b border-sasta-border text-xs divide-x divide-sasta-border bg-white">
          <Link
            to="/wishlist"
            onClick={handleLinkClick}
            className="p-3 flex items-center justify-center gap-2 hover:bg-sasta-yellow-cream transition-colors text-sasta-heading font-medium"
          >
            <Heart className="w-4 h-4 text-sasta-gold-dark" />
            <span>Wishlist ({wishlistCount})</span>
          </Link>
          <button
            onClick={() => {
              onClose();
              openCart();
            }}
            className="p-3 flex items-center justify-center gap-2 hover:bg-sasta-yellow-cream transition-colors text-sasta-heading font-medium"
          >
            <ShoppingBag className="w-4 h-4 text-sasta-gold-dark" />
            <span>Bag ({totalCount})</span>
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex-1 py-4 divide-y divide-sasta-border/60">
          {/* Home */}
          <div className="px-4 py-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="block text-sm font-semibold uppercase tracking-wider text-sasta-heading hover:text-sasta-gold-dark py-1"
            >
              Home
            </Link>
          </div>

          {/* Shop All Accordion */}
          <div className="px-4 py-2">
            <button
              onClick={() => toggleSection('shopAll')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-sasta-heading py-2"
            >
              <span>Shop All</span>
              {openSections.shopAll ? (
                <ChevronDown className="w-4 h-4 text-sasta-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-sasta-muted" />
              )}
            </button>

            {openSections.shopAll && (
              <div className="pl-3 pb-2 space-y-2.5 text-xs animate-fade-in border-l border-sasta-gold/40 ml-1 mt-1">
                <Link
                  to="/shop"
                  onClick={handleLinkClick}
                  className="block font-semibold text-sasta-navy hover:text-sasta-gold-dark"
                >
                  View All Products &rarr;
                </Link>

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sasta-muted block mb-1">
                    Ladies Collection
                  </span>
                  <div className="space-y-1.5 pl-2">
                    <Link
                      to="/collection/casual-wear"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Casual Everyday Wear Suits
                    </Link>
                    <Link
                      to="/collection/lehenga-choli"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Lehenga Choli
                    </Link>
                    <Link
                      to="/collection/sharara-gharara-suits"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Sharara &amp; Gharara Suits
                    </Link>
                    <Link
                      to="/collection/salwar-kameez-suit-sets"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Salwar Kameez / Suit Sets
                    </Link>
                    <Link
                      to="/collection/dresses"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Dresses
                    </Link>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sasta-muted block mb-1">
                    Other Collections
                  </span>
                  <div className="space-y-1.5 pl-2">
                    <Link
                      to="/collection/kids-collection"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Kids Collection
                    </Link>
                    <Link
                      to="/collection/unstitched-suits"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Unstitched Suits
                    </Link>
                    <Link
                      to="/collection/scarves"
                      onClick={handleLinkClick}
                      className="block text-sasta-body hover:text-sasta-heading py-0.5"
                    >
                      Scarves &amp; Hijabs
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* New Arrivals */}
          <div className="px-4 py-2">
            <Link
              to="/shop?filter=new"
              onClick={handleLinkClick}
              className="block text-sm font-semibold uppercase tracking-wider text-sasta-heading hover:text-sasta-gold-dark py-1"
            >
              New Arrivals
            </Link>
          </div>

          {/* Sale */}
          <div className="px-4 py-2">
            <Link
              to="/shop?filter=sale"
              onClick={handleLinkClick}
              className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-red-600 hover:text-red-700 py-1"
            >
              <span>Sale (Up to 50% Off)</span>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                Hot
              </span>
            </Link>
          </div>

          {/* Help Accordion */}
          <div className="px-4 py-2">
            <button
              onClick={() => toggleSection('help')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-sasta-heading py-2"
            >
              <span>Help</span>
              {openSections.help ? (
                <ChevronDown className="w-4 h-4 text-sasta-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-sasta-muted" />
              )}
            </button>

            {openSections.help && (
              <div className="pl-3 pb-2 space-y-2 text-xs animate-fade-in border-l border-sasta-gold/40 ml-1 mt-1">
                <Link to="/contact" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Contact Us
                </Link>
                <Link to="/size-guide" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Size Guide
                </Link>
                <Link to="/shipping-policy" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Shipping &amp; Delivery
                </Link>
                <Link to="/refund-policy" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Returns &amp; Exchanges
                </Link>
                <Link to="/faqs" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Frequently Asked Questions
                </Link>
                <Link to="/care-instructions" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Garment &amp; Fabric Care
                </Link>
                <Link to="/customization" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Customization Requests
                </Link>
              </div>
            )}
          </div>

          {/* Our Company Accordion */}
          <div className="px-4 py-2">
            <button
              onClick={() => toggleSection('company')}
              className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wider text-sasta-heading py-2"
            >
              <span>Our Company</span>
              {openSections.company ? (
                <ChevronDown className="w-4 h-4 text-sasta-muted" />
              ) : (
                <ChevronRight className="w-4 h-4 text-sasta-muted" />
              )}
            </button>

            {openSections.company && (
              <div className="pl-3 pb-2 space-y-2 text-xs animate-fade-in border-l border-sasta-gold/40 ml-1 mt-1">
                <Link to="/about" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  About Sasta Bazaar
                </Link>
                <Link to="/contact" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Customer Care
                </Link>
                <Link to="/privacy-policy" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" onClick={handleLinkClick} className="block text-sasta-body hover:text-sasta-heading">
                  Terms &amp; Conditions
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 bg-sasta-yellow-cream border-t border-sasta-border text-xs text-sasta-body">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-sasta-gold-dark" />
            <span className="font-semibold text-sasta-heading">100% Genuine Quality Guaranteed</span>
          </div>
          <p className="text-[11px] text-sasta-muted">
            Currency: <span className="font-semibold text-sasta-heading">GBP (£)</span> | UK Tracked Dispatch
          </p>
        </div>
      </div>
    </div>
  );
}
