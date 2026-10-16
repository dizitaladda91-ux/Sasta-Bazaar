import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, User, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import SearchModal from './SearchModal';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileNavOpen(false);
    setIsSearchOpen(false);
    setHelpDropdownOpen(false);
    setCompanyDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-md border-b border-sasta-border/70' : 'border-b border-sasta-border'
        }`}
      >
        {/* Top Header Bar: Logo & Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Left Column: Mobile Menu & Search */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-sasta-heading hover:text-sasta-gold-dark hover:bg-sasta-yellow-cream rounded-full transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-sasta-heading hover:text-sasta-gold-dark hover:bg-sasta-yellow-cream rounded-full transition-colors flex items-center gap-1.5"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
                <span className="hidden md:inline text-xs font-medium text-sasta-muted">
                  Search
                </span>
              </button>
            </div>

            {/* Center Column: Logo */}
            <div className="text-center flex flex-col items-center justify-center">
              <Link to="/" className="inline-block group">
                <span className="font-serif font-extrabold text-xl sm:text-2xl md:text-3xl tracking-widest text-sasta-navy group-hover:text-sasta-gold-dark transition-colors">
                  SASTA BAZAAR
                </span>
                <span className="block text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] text-sasta-gold-dark font-semibold uppercase -mt-0.5 sm:-mt-1">
                  Everyday Luxury
                </span>
              </Link>
            </div>

            {/* Right Column: Account, Wishlist, Cart */}
            <div className="flex items-center justify-end gap-1 sm:gap-2">
              <Link
                to="/about"
                className="hidden sm:inline-flex p-2 text-sasta-heading hover:text-sasta-gold-dark hover:bg-sasta-yellow-cream rounded-full transition-colors"
                title="Account / Our Brand"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-sasta-heading hover:text-sasta-gold-dark hover:bg-sasta-yellow-cream rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-sasta-gold text-sasta-heading text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Bag */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-sasta-heading hover:text-sasta-gold-dark hover:bg-sasta-yellow-cream rounded-full transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute top-1 right-1 bg-sasta-navy text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block border-t border-sasta-border/60 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <ul className="flex items-center justify-center space-x-8 text-xs font-bold uppercase tracking-widest text-sasta-heading py-2.5">
              <li>
                <Link
                  to="/"
                  className="hover:text-sasta-gold-dark transition-colors py-2 block"
                >
                  Home
                </Link>
              </li>

              {/* Shop All with Mega Menu */}
              <li
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                className="relative"
              >
                <Link
                  to="/shop"
                  className="hover:text-sasta-gold-dark transition-colors py-2 flex items-center gap-1"
                >
                  <span>Shop All</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?filter=new"
                  className="hover:text-sasta-gold-dark transition-colors py-2 block"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?filter=sale"
                  className="text-red-600 hover:text-red-700 transition-colors py-2 flex items-center gap-1.5"
                >
                  <span>Sale</span>
                  <span className="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.2 rounded font-extrabold">
                    50% Off
                  </span>
                </Link>
              </li>

              {/* Help Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setHelpDropdownOpen(true)}
                onMouseLeave={() => setHelpDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="hover:text-sasta-gold-dark transition-colors py-2 flex items-center gap-1 uppercase tracking-widest text-xs font-bold text-sasta-heading"
                >
                  <span>Help</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {helpDropdownOpen && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-sasta-border shadow-xl rounded-b-md py-2 z-50 animate-fade-in text-left">
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/size-guide"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Size Guides
                    </Link>
                    <Link
                      to="/shipping-policy"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Shipping &amp; Tracked Delivery
                    </Link>
                    <Link
                      to="/refund-policy"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Returns Policy
                    </Link>
                    <Link
                      to="/faqs"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      FAQs
                    </Link>
                    <Link
                      to="/care-instructions"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Garment Care Instructions
                    </Link>
                  </div>
                )}
              </li>

              {/* Our Company Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setCompanyDropdownOpen(true)}
                onMouseLeave={() => setCompanyDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="hover:text-sasta-gold-dark transition-colors py-2 flex items-center gap-1 uppercase tracking-widest text-xs font-bold text-sasta-heading"
                >
                  <span>Our Company</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {companyDropdownOpen && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-sasta-border shadow-xl rounded-b-md py-2 z-50 animate-fade-in text-left">
                    <Link
                      to="/about"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      About Sasta Bazaar
                    </Link>
                    <Link
                      to="/customization"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Custom Tailoring Inquiries
                    </Link>
                    <Link
                      to="/privacy-policy"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms-of-service"
                      className="block px-4 py-2 text-xs normal-case font-medium text-sasta-body hover:bg-sasta-yellow-cream hover:text-sasta-heading"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>

        {/* Mega Menu Overlay */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
        />
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
