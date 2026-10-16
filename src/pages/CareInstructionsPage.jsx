import React, { useEffect } from 'react';
import { Sparkles, ShieldCheck, Sun, Droplets, Wind, RotateCcw } from 'lucide-react';

export default function CareInstructionsPage() {
  useEffect(() => {
    document.title = 'Garment Care Instructions | SASTA BAZAAR';
    window.scrollTo(0, 0);
  }, []);

  const careGuides = [
    {
      title: 'Cotton & Chickenkari Kurta Sets',
      tag: 'Everyday Suits (SB01 - SB55)',
      instructions: [
        'Gentle machine wash or hand wash in cold water (30°C max).',
        'Use mild liquid detergent; avoid harsh bleaches or optical brighteners.',
        'Turn garments inside out prior to washing to protect surface embroidery.',
        'Medium iron on reverse side while slightly damp for crisp lines.'
      ]
    },
    {
      title: 'Slub Cotton with Zarkan & Mirror Work',
      tag: 'Festive Suits (SL01 - SL05)',
      instructions: [
        'Dry clean recommended to preserve handcrafted zarkan, thread work, and sequins.',
        'If spot-cleaning, dab gently with a damp microfibre cloth &mdash; do not scrub.',
        'Store in breathable cotton garment bags away from moisture.',
        'Iron on low heat using a protective pressing cloth over embellished sections.'
      ]
    },
    {
      title: 'Silk Lehengas & Georgette Saree Gowns',
      tag: 'Occasion Wear (L001, D001 - D005)',
      instructions: [
        'Strictly professional dry clean only.',
        'Do not wring, machine wash, or tumble dry.',
        'Hang on padded hangers to maintain structured pleating and silhouette.',
        'Steam gently from a safe distance to remove transit creases.'
      ]
    },
    {
      title: 'Premium Jersey Hijabs (Double Stitch)',
      tag: 'Scarves Collection',
      instructions: [
        'Machine wash warm with similar colours.',
        'Tumble dry low or air dry flat to prevent static and preserve stitch tension.',
        'Fabric is naturally wrinkle-resistant and rarely requires ironing.'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1">
            Garment Longevity
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sasta-heading">
            Fabric &amp; Garment Care Instructions
          </h1>
          <p className="text-xs sm:text-sm text-sasta-body mt-2 leading-relaxed">
            Preserve the vibrancy, fine embroidery, and soft hand-feel of your Sasta Bazaar ethnic garments.
          </p>
        </div>

        {/* Universal Care Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-sasta-yellow-cream/60 rounded-xl border border-sasta-border text-center">
          <div className="space-y-1">
            <Droplets className="w-6 h-6 text-sasta-gold-dark mx-auto" />
            <h4 className="font-bold text-xs text-sasta-heading">Cold Water</h4>
            <p className="text-[11px] text-sasta-muted">Prevents shrinkage &amp; fading</p>
          </div>
          <div className="space-y-1">
            <Sun className="w-6 h-6 text-sasta-gold-dark mx-auto" />
            <h4 className="font-bold text-xs text-sasta-heading">Line Dry in Shade</h4>
            <p className="text-[11px] text-sasta-muted">Protects gold foil &amp; threads</p>
          </div>
          <div className="space-y-1">
            <RotateCcw className="w-6 h-6 text-sasta-gold-dark mx-auto" />
            <h4 className="font-bold text-xs text-sasta-heading">Wash Inside Out</h4>
            <p className="text-[11px] text-sasta-muted">Shields sequin necklines</p>
          </div>
          <div className="space-y-1">
            <Wind className="w-6 h-6 text-sasta-gold-dark mx-auto" />
            <h4 className="font-bold text-xs text-sasta-heading">Gentle Steam</h4>
            <p className="text-[11px] text-sasta-muted">Removes folds effortlessly</p>
          </div>
        </div>

        {/* Detailed Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careGuides.map((guide, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg border border-sasta-border shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-serif font-bold text-base text-sasta-heading">
                  {guide.title}
                </h3>
              </div>
              <span className="inline-block bg-sasta-yellow-soft text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {guide.tag}
              </span>

              <ul className="space-y-2 text-xs text-sasta-body pt-2">
                {guide.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sasta-gold shrink-0 mt-1.5" />
                    <span dangerouslySetInnerHTML={{ __html: inst }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
