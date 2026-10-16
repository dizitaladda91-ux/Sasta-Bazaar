import React, { useEffect } from 'react';
import { Ruler, Check, Info } from 'lucide-react';

export default function SizeGuidePage() {
  useEffect(() => {
    document.title = 'Size Guide & Measurement Charts | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Precision Fit
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Size Guide &amp; Measurement Charts
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body mt-2 leading-relaxed">
            Ensure the perfect fit for your stitched ethnic suits, dresses, and trousers. All measurements are given in inches.
          </p>
        </div>

        {/* Women's Ready-to-Wear Suits Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-sasta-gold-dark" />
            <h2 className="font-serif text-xl font-bold text-sasta-heading">
              Women's Stitched Suits &amp; Kurtas (Inches)
            </h2>
          </div>

          <div className="border border-sasta-border rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-xs text-left text-sasta-heading">
              <thead className="bg-sasta-yellow-light/80 border-b border-sasta-border font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust / Chest</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Hips</th>
                  <th className="py-3 px-4">Kurta Length</th>
                  <th className="py-3 px-4">Trouser Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sasta-border/60">
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">Small (S)</td>
                  <td className="py-3 px-4">36"</td>
                  <td className="py-3 px-4">32"</td>
                  <td className="py-3 px-4">38"</td>
                  <td className="py-3 px-4">38" - 40"</td>
                  <td className="py-3 px-4">37" - 38"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">Medium (M)</td>
                  <td className="py-3 px-4">38" - 40"</td>
                  <td className="py-3 px-4">34" - 36"</td>
                  <td className="py-3 px-4">40" - 42"</td>
                  <td className="py-3 px-4">39" - 41"</td>
                  <td className="py-3 px-4">38"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">Large (L)</td>
                  <td className="py-3 px-4">42"</td>
                  <td className="py-3 px-4">38"</td>
                  <td className="py-3 px-4">44"</td>
                  <td className="py-3 px-4">40" - 42"</td>
                  <td className="py-3 px-4">38" - 39"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">XL (X-Large)</td>
                  <td className="py-3 px-4">44"</td>
                  <td className="py-3 px-4">40"</td>
                  <td className="py-3 px-4">46"</td>
                  <td className="py-3 px-4">41" - 42"</td>
                  <td className="py-3 px-4">39"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">XXL (2X-Large)</td>
                  <td className="py-3 px-4">46"</td>
                  <td className="py-3 px-4">42"</td>
                  <td className="py-3 px-4">48"</td>
                  <td className="py-3 px-4">42"</td>
                  <td className="py-3 px-4">39" - 40"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Kids Sizing Section */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-bold text-sasta-heading">
            Kids Ethnic Wear Chart
          </h2>
          <div className="border border-sasta-border rounded-lg overflow-x-auto shadow-2xs">
            <table className="w-full text-xs text-left text-sasta-heading">
              <thead className="bg-sasta-yellow-light/80 border-b border-sasta-border font-serif uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Recommended Age</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Waist</th>
                  <th className="py-3 px-4">Lehenga/Skirt Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sasta-border/60">
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">3 &ndash; 4 Years</td>
                  <td className="py-3 px-4">22" - 24"</td>
                  <td className="py-3 px-4">20" - 22"</td>
                  <td className="py-3 px-4">24"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">5 &ndash; 6 Years</td>
                  <td className="py-3 px-4">25" - 26"</td>
                  <td className="py-3 px-4">22" - 24"</td>
                  <td className="py-3 px-4">27"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">7 &ndash; 8 Years</td>
                  <td className="py-3 px-4">27" - 28"</td>
                  <td className="py-3 px-4">24" - 26"</td>
                  <td className="py-3 px-4">30"</td>
                </tr>
                <tr className="hover:bg-sasta-yellow-cream/40">
                  <td className="py-3 px-4 font-bold text-sasta-navy">9 &ndash; 11 Years</td>
                  <td className="py-3 px-4">29" - 31"</td>
                  <td className="py-3 px-4">26" - 28"</td>
                  <td className="py-3 px-4">33"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure Tip Box */}
        <div className="bg-sasta-yellow-cream/70 p-6 rounded-xl border border-sasta-border space-y-3">
          <div className="flex items-center gap-2 text-sasta-heading font-serif font-bold text-base">
            <Info className="w-5 h-5 text-sasta-gold-dark" />
            <span>How to Measure Accurately</span>
          </div>
          <ul className="text-xs text-sasta-body space-y-2 pl-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sasta-gold shrink-0 mt-1.5" />
              <span><strong>Bust / Chest:</strong> Measure around the fullest part of your bust while keeping the tape comfortably relaxed under your arms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sasta-gold shrink-0 mt-1.5" />
              <span><strong>Waist:</strong> Measure around your natural waistline, usually 1 to 2 inches above your navel.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sasta-gold shrink-0 mt-1.5" />
              <span><strong>Hips:</strong> Measure around the fullest point of your hips with feet together.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sasta-gold shrink-0 mt-1.5" />
              <span><strong>Trousers:</strong> Our stitched suit trousers feature elasticated / drawstring waistbands for adaptable comfort.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
