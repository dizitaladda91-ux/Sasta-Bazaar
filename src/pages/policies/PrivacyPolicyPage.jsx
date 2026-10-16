import React, { useEffect } from 'react';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs sm:text-sm text-sasta-body leading-relaxed">
        <div className="border-b border-sasta-border pb-6">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Transparency &amp; Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Privacy Policy
          </h1>
          <p className="text-xs text-sasta-muted mt-1">Last updated: October 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">1. Introduction</h2>
          <p>
            Welcome to SASTA BAZAAR (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to safeguarding the privacy of our website visitors and customers. This Privacy Policy outlines how your personal information is collected, utilized, and shared when you visit or make a purchase from our store.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">2. Information We Collect</h2>
          <p>
            When you browse our catalogue or initiate a transaction, we collect personal information such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact details:</strong> Full name, billing address, shipping address, email address, and phone number.</li>
            <li><strong>Payment information:</strong> Payment transactions are handled via encrypted gateway partners (Apple Pay, Visa, Mastercard, Klarna). We do not store raw credit card details on our servers.</li>
            <li><strong>Device data:</strong> IP address, browser type, time zone, and interactions with our product listings.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">3. How We Use Your Information</h2>
          <p>
            We use the order information we gather primarily to fulfill orders placed through the website (including processing payment details, organizing shipping, and providing invoices and order confirmations). Additionally, we use this information to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Communicate with you regarding delivery updates or sizing clarifications.</li>
            <li>Screen our orders for prospective risk or fraud.</li>
            <li>Provide marketing communications (only when opted-in by you).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-bold text-sasta-heading">4. Contact Us</h2>
          <p>
            For questions about our privacy practices, please contact our Data Protection Officer at:
            <br />
            <strong>Email:</strong> privacy@sastabazaarclothing.com
          </p>
        </section>
      </div>
    </div>
  );
}
