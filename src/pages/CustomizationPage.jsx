import React, { useState, useEffect } from 'react';
import { Scissors, CheckCircle, Send, Sparkles } from 'lucide-react';

export default function CustomizationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    garmentType: 'Ready-to-Wear Suit Alteration',
    details: ''
  });

  useEffect(() => {
    document.title = 'Customization & Tailoring | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Bespoke Services
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Customization &amp; Tailoring
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body mt-2 leading-relaxed">
            Need adjustments on sleeve lengths, trouser waists, unstitched suit stitching, or special bridal party ensembles? Our in-house master tailors are at your service.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-sasta-yellow-cream/60 rounded-lg border border-sasta-border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-sasta-gold font-bold text-xs flex items-center justify-center mx-auto text-sasta-heading">
              1
            </span>
            <h4 className="font-serif font-bold text-sm text-sasta-heading">Choose Your Design</h4>
            <p className="text-xs text-sasta-body">
              Select any ready-to-wear suit or unstitched fabric from our online store.
            </p>
          </div>

          <div className="p-5 bg-sasta-yellow-cream/60 rounded-lg border border-sasta-border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-sasta-gold font-bold text-xs flex items-center justify-center mx-auto text-sasta-heading">
              2
            </span>
            <h4 className="font-serif font-bold text-sm text-sasta-heading">Share Measurements</h4>
            <p className="text-xs text-sasta-body">
              Provide your bust, waist, hips, and preferred kurta/trouser lengths in inches.
            </p>
          </div>

          <div className="p-5 bg-sasta-yellow-cream/60 rounded-lg border border-sasta-border space-y-2 text-center">
            <span className="w-8 h-8 rounded-full bg-sasta-gold font-bold text-xs flex items-center justify-center mx-auto text-sasta-heading">
              3
            </span>
            <h4 className="font-serif font-bold text-sm text-sasta-heading">Flawless Delivery</h4>
            <p className="text-xs text-sasta-body">
              Our tailoring team cuts and sews your garment, dispatched with tracked UK shipping.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-sasta-yellow-cream/30 p-6 sm:p-8 rounded-xl border border-sasta-border max-w-2xl mx-auto shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-sasta-heading">
                Inquiry Received!
              </h3>
              <p className="text-xs text-sasta-body">
                Our tailoring coordinator will review your request and message you with pricing and timing options.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs font-semibold text-sasta-gold-dark underline"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-sasta-border">
                <Scissors className="w-5 h-5 text-sasta-gold-dark" />
                <h3 className="font-serif font-bold text-base text-sasta-heading">
                  Request Custom Stitching or Alteration
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-sasta-heading mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-sasta-border rounded p-2 text-xs focus:outline-none focus:border-sasta-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-sasta-heading mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-sasta-border rounded p-2 text-xs focus:outline-none focus:border-sasta-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sasta-heading mb-1">
                  Service Required
                </label>
                <select
                  value={formData.garmentType}
                  onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                  className="w-full bg-white border border-sasta-border rounded p-2 text-xs focus:outline-none focus:border-sasta-gold"
                >
                  <option>Ready-to-Wear Suit Alteration</option>
                  <option>Unstitched 3-Piece Stitching</option>
                  <option>Kids Ethnic Custom Fit</option>
                  <option>Bridal / Party Bulk Stitching</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-sasta-heading mb-1">
                  Measurements &amp; Garment Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Please state product title/code, required chest, waist, and length measurements in inches..."
                  className="w-full bg-white border border-sasta-border rounded p-2 text-xs focus:outline-none focus:border-sasta-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading font-bold text-xs uppercase tracking-wider py-3 rounded shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Tailoring Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
