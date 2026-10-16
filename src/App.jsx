import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';

// Layout
import AnnouncementBar from './components/layout/AnnouncementBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SizeGuidePage from './pages/SizeGuidePage';
import FaqsPage from './pages/FaqsPage';
import CustomizationPage from './pages/CustomizationPage';
import CareInstructionsPage from './pages/CareInstructionsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Policies
import PrivacyPolicyPage from './pages/policies/PrivacyPolicyPage';
import ShippingPolicyPage from './pages/policies/ShippingPolicyPage';
import RefundPolicyPage from './pages/policies/RefundPolicyPage';
import TermsPage from './pages/policies/TermsPage';
import CookiePolicyPage from './pages/policies/CookiePolicyPage';
import NotFoundPage from './pages/NotFoundPage';

// Floating Toast Notification
function ToastAlert() {
  const { notification: cartNote } = useCart();
  const { notification: wishNote } = useWishlist();
  const note = cartNote || wishNote;

  if (!note) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-sasta-navy text-white text-xs sm:text-sm font-medium py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 animate-fade-in border border-sasta-gold/40">
      <span className="w-2 h-2 rounded-full bg-sasta-gold animate-pulse" />
      <span>{note}</span>
    </div>
  );
}

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collection/:slug" element={<CollectionPage />} />
          <Route path="/product/:handle" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/customization" element={<CustomizationPage />} />
          <Route path="/care-instructions" element={<CareInstructionsPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <ToastAlert />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <MainLayout />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
