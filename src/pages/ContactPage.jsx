import React, { useState, useEffect } from 'react';
import { Mail, Instagram, MessageCircle, Clock, CheckCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderRef: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Customer Care
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sasta-heading">
            Get in Touch With Us
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body mt-2 leading-relaxed">
            Have questions regarding sizing, custom stitching, order tracking, or bulk inquiries? We're here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-sasta-yellow-cream/80 p-6 sm:p-8 rounded-xl border border-sasta-border space-y-6">
            <h3 className="font-serif font-bold text-lg text-sasta-heading">
              Support Channels
            </h3>

            <div className="space-y-4 text-xs text-sasta-body">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sasta-gold-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sasta-heading text-sm font-semibold">Email Us</strong>
                  <span>support@sastabazaarclothing.com</span>
                  <p className="text-[11px] text-sasta-muted mt-0.5">Average reply time: within 12-24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-sasta-gold-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sasta-heading text-sm font-semibold">Instagram DM</strong>
                  <span>@sastabazaarclothing</span>
                  <p className="text-[11px] text-sasta-muted mt-0.5">Direct messaging for quick sizing help</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-sasta-gold-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sasta-heading text-sm font-semibold">Support Hours</strong>
                  <span>Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM GMT</span>
                  <p className="text-[11px] text-sasta-muted mt-0.5">Orders dispatched daily on working weekdays</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sasta-border">
              <h4 className="font-serif font-bold text-sm text-sasta-heading mb-2">
                Fast UK Dispatch
              </h4>
              <p className="text-xs text-sasta-body leading-relaxed">
                All domestic orders are packed securely and dispatched via tracked Royal Mail / Hermes delivery services.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-sasta-border shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-sasta-heading">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-sasta-body max-w-sm mx-auto">
                  Thank you for reaching out. One of our customer care specialists will review your inquiry and respond to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-sasta-gold-dark underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif font-bold text-lg text-sasta-heading mb-2">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sasta-heading mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Fatima Khan"
                      className="w-full bg-sasta-yellow-cream/30 border border-sasta-border rounded-md px-3.5 py-2.5 text-xs text-sasta-heading focus:outline-none focus:border-sasta-gold"
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
                      placeholder="e.g. name@example.com"
                      className="w-full bg-sasta-yellow-cream/30 border border-sasta-border rounded-md px-3.5 py-2.5 text-xs text-sasta-heading focus:outline-none focus:border-sasta-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-sasta-heading mb-1">
                      Order Reference (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.orderRef}
                      onChange={(e) => setFormData({ ...formData, orderRef: e.target.value })}
                      placeholder="e.g. SB-10492"
                      className="w-full bg-sasta-yellow-cream/30 border border-sasta-border rounded-md px-3.5 py-2.5 text-xs text-sasta-heading focus:outline-none focus:border-sasta-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sasta-heading mb-1">
                      Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-sasta-yellow-cream/30 border border-sasta-border rounded-md px-3.5 py-2.5 text-xs text-sasta-heading focus:outline-none focus:border-sasta-gold"
                    >
                      <option>General Inquiry</option>
                      <option>Size &amp; Measurements Question</option>
                      <option>Order &amp; Tracking Update</option>
                      <option>Returns &amp; Exchanges</option>
                      <option>Custom Stitching Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sasta-heading mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you today?"
                    className="w-full bg-sasta-yellow-cream/30 border border-sasta-border rounded-md px-3.5 py-2.5 text-xs text-sasta-heading focus:outline-none focus:border-sasta-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sasta-gold hover:bg-sasta-gold-hover text-sasta-heading font-bold text-xs uppercase tracking-wider py-3 rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
