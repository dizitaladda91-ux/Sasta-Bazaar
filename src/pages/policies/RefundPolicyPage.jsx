import React, { useEffect } from 'react';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RefundPolicyPage() {
  useEffect(() => {
    document.title = 'Returns & Exchanges Policy | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-sasta-body leading-relaxed">
        <div className="border-b border-sasta-border pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Customer Guarantee
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Returns &amp; Exchanges Policy
          </h1>
          <p className="text-xs text-sasta-muted mt-1">14-Day Hassle-Free Returns on Unworn Ethnic Wear</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">1. 14-Day Return Window</h2>
          <p>
            We take immense pride in the craftsmanship and fit of our ethnic suits and hijabs. If you are not entirely satisfied with your purchase, you may initiate a return within <strong>14 days</strong> of receiving your package.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">2. Condition of Returned Items</h2>
          <p>
            To be eligible for an exchange or full refund:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Garments must be in pristine, unworn, unwashed condition with no perfume, makeup marks, or snags.</li>
            <li>All original manufacturer tags, sew-in labels, and packaging must remain attached and intact.</li>
            <li>Complete sets (Kurta, Pants, and Dupatta) must be returned together; individual pieces cannot be refunded separately.</li>
            <li>Due to hygiene regulations, hijabs, scarves, and undergarments that have been opened and tried on cannot be accepted for return unless defective upon arrival.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">3. How to Initiate a Return</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Email our support desk at <strong>support@sastabazaarclothing.com</strong> with your order number and reason for return.</li>
            <li>Our team will generate and provide your return authorisation code and UK return address.</li>
            <li>Pack the garment securely and dispatch via a tracked postal service. Return postage costs are the responsibility of the customer unless an item is proven damaged or incorrect.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">4. Refund Processing</h2>
          <p>
            Once our quality assurance team inspects the returned package, your refund will be processed back to your original payment method (card, PayPal, or Klarna) within 3 to 5 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
