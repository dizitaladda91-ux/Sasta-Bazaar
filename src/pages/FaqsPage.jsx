import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    document.title = 'Frequently Asked Questions | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: 'What currency are your prices listed in?',
      a: 'All prices on Sasta Bazaar are listed in British Pounds (GBP £) and include applicable VAT.'
    },
    {
      q: 'How long does UK delivery take and is it tracked?',
      a: 'Yes, all orders are dispatched with tracked delivery via Royal Mail or Hermes. Domestic UK delivery typically takes 2-4 business days. You will receive a tracking link via email as soon as your parcel is dispatched.'
    },
    {
      q: 'Do you offer Free Delivery?',
      a: 'Yes! We offer FREE Tracked UK Delivery on all orders of £40 or more. For orders below £40, a standard shipping fee of £3.99 applies.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We want you to love your purchase. If you are not completely satisfied, you may return unwashed, unworn garments with original tags intact within 14 days of receipt for an exchange or store refund.'
    },
    {
      q: 'Are the suits stitched or unstitched?',
      a: 'Most of our suits (e.g. SB01 to SB55 and SL01 to SL05) are completely ready-to-wear stitched 3-piece sets including the Kurta (top), Trousers (bottom), and Dupatta (scarf). We also offer designated Unstitched fabric collections for custom tailoring.'
    },
    {
      q: 'What is the Jersey Hijab bundle promotion?',
      a: 'Our premium double-stitched jersey hijabs are priced at £2.99 each. If you add 4 or more hijabs to your shopping bag, they automatically bundle for just £9.99!'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major debit & credit cards (Visa, Mastercard, Maestro, American Express), Apple Pay, Google Pay, Shop Pay, and Klarna for flexible interest-free installments.'
    },
    {
      q: 'How should I care for my embroidered ethnic garments?',
      a: 'For cotton sets, gentle cold machine wash or hand wash is recommended. For garments featuring sequin, mirror, or zarkan handwork, dry cleaning is strongly recommended to protect delicate embellishments.'
    }
  ];

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Need Help?
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body mt-2">
            Find answers to common questions about orders, sizing, delivery, and payments.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-sasta-border rounded-lg overflow-hidden bg-sasta-yellow-cream/20 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-semibold text-sasta-heading hover:bg-sasta-yellow-cream/50 transition-colors"
              >
                <span>{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="w-4 h-4 text-sasta-gold-dark shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-sasta-muted shrink-0 ml-2" />
                )}
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-sasta-body leading-relaxed border-t border-sasta-border/40 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Assistance Banner */}
        <div className="bg-sasta-yellow-soft/50 p-6 rounded-xl border border-sasta-border text-center space-y-2">
          <h3 className="font-serif font-bold text-base text-sasta-heading">
            Can't find what you're looking for?
          </h3>
          <p className="text-xs text-sasta-body">
            Our customer support specialists are ready to answer any specific sizing or order inquiries.
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@sastabazaarclothing.com"
              className="inline-block bg-sasta-navy text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-xs hover:bg-sasta-navy-light transition-colors"
            >
              Email Customer Care
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
