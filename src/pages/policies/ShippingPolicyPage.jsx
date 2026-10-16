import React, { useEffect } from 'react';
import { Truck, CheckCircle2, Clock, Globe } from 'lucide-react';

export default function ShippingPolicyPage() {
  useEffect(() => {
    document.title = 'Shipping & Tracked Delivery Policy | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-sasta-body leading-relaxed">
        <div className="border-b border-sasta-border pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Dispatch &amp; Delivery
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs text-sasta-muted mt-1">Reliable, Tracked Delivery Across the United Kingdom</p>
        </div>

        {/* Shipping Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-sasta-yellow-cream/60 rounded-xl border border-sasta-border">
          <div className="space-y-1">
            <Truck className="w-5 h-5 text-sasta-gold-dark" />
            <strong className="block text-sasta-heading text-xs uppercase font-bold">Free UK Delivery</strong>
            <p className="text-[11px] text-sasta-muted">On all qualifying orders over £40.00</p>
          </div>
          <div className="space-y-1">
            <Clock className="w-5 h-5 text-sasta-gold-dark" />
            <strong className="block text-sasta-heading text-xs uppercase font-bold">Standard Delivery</strong>
            <p className="text-[11px] text-sasta-muted">2 &ndash; 4 business days (£3.99)</p>
          </div>
          <div className="space-y-1">
            <Globe className="w-5 h-5 text-sasta-gold-dark" />
            <strong className="block text-sasta-heading text-xs uppercase font-bold">Fully Tracked</strong>
            <p className="text-[11px] text-sasta-muted">Tracking link sent on dispatch</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">1. Order Processing Time</h2>
          <p>
            All standard orders placed Monday through Friday (excluding bank holidays) are processed and prepared within 24 to 48 hours. Orders placed on weekends will be dispatched on the subsequent Monday.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">2. UK Delivery Rates &amp; Timelines</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>UK Standard Tracked (Royal Mail 48 / Evri):</strong> £3.99 flat rate for orders under £40. Delivery takes approximately 2 to 4 business days.</li>
            <li><strong>Free UK Shipping:</strong> Automatically applied to orders with a subtotal of £40.00 or higher.</li>
            <li><strong>Next-Day Priority Courier:</strong> Available at checkout for £6.99 (orders placed before 1:00 PM GMT).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">3. Tracking Your Parcel</h2>
          <p>
            As soon as our dispatch facility hands over your package to the carrier, a dispatch confirmation email containing your direct tracking URL will be generated. You can track your ethnic garments from our warehouse to your doorstep in real time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">4. Address Accuracy</h2>
          <p>
            Please double-check your shipping address and postcode prior to completing checkout. Sasta Bazaar cannot be held responsible for transit delays caused by inaccurate delivery addresses.
          </p>
        </section>
      </div>
    </div>
  );
}
