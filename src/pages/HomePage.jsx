import React, { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryTiles from '../components/home/CategoryTiles';
import NewArrivals from '../components/home/NewArrivals';
import SignatureCollection from '../components/home/SignatureCollection';
import EditorialBlocks from '../components/home/EditorialBlocks';
import BestSellersCarousel from '../components/home/BestSellersCarousel';
import TrustStrip from '../components/home/TrustStrip';

export default function HomePage() {
  useEffect(() => {
    document.title = 'SASTA BAZAAR | Everyday Luxury - Ladies & Kids Ethnic Fashion';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroBanner />
      <CategoryTiles />
      <NewArrivals />
      <SignatureCollection />
      <EditorialBlocks />
      <BestSellersCarousel />
      <TrustStrip />
    </div>
  );
}
