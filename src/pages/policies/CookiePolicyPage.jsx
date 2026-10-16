import React, { useEffect } from 'react';

export default function CookiePolicyPage() {
  useEffect(() => {
    document.title = 'Cookie Policy | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-sasta-body leading-relaxed">
        <div className="border-b border-sasta-border pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Data &amp; Cookies
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Cookie Policy
          </h1>
          <p className="text-xs text-sasta-muted mt-1">Understanding how cookies enhance your shopping experience</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">1. What are Cookies?</h2>
          <p>
            Cookies are small text files placed on your computer or mobile device when you browse websites. They are widely used to make websites function efficiently, retain your shopping cart and wishlist contents, and provide helpful reporting data to store operators.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">2. How We Use Cookies</h2>
          <p>
            SASTA BAZAAR utilizes cookies to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Remember items added to your shopping bag across browsing sessions.</li>
            <li>Maintain your saved wishlist preferences.</li>
            <li>Recognize your regional and currency settings (GBP £).</li>
            <li>Gather aggregated analytical data to improve site navigation and performance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">3. Managing Your Cookie Preferences</h2>
          <p>
            You can modify your browser settings to decline or delete cookies at any time. However, disabling essential cookies may impact certain features like maintaining items in your shopping bag.
          </p>
        </section>
      </div>
    </div>
  );
}
