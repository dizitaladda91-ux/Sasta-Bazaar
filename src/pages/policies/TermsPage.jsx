import React, { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    document.title = 'Terms & Conditions | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-sasta-body leading-relaxed">
        <div className="border-b border-sasta-border pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Store Agreements
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-sasta-muted mt-1">Please review before using our website and purchasing goods</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">1. General Conditions</h2>
          <p>
            By visiting our website and/or purchasing from SASTA BAZAAR, you engage in our &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions. We reserve the right to refuse service to anyone for legitimate commercial reasons at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">2. Products &amp; Pricing</h2>
          <p>
            Prices for our products are subject to change without prior notice. All prices are displayed in British Pounds (GBP £) and inclusive of UK taxes where applicable. We have made every reasonable effort to display as accurately as possible the colors and images of our suits, prints, and fabric embroideries; however, actual colors may vary slightly depending on your device monitor calibration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">3. Accuracy of Billing &amp; Account Details</h2>
          <p>
            We reserve the right to refuse or cancel any order you place with us. In the event that we make a change to or cancel an order, we will notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">4. Governing Law</h2>
          <p>
            These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United Kingdom.
          </p>
        </section>
      </div>
    </div>
  );
}
