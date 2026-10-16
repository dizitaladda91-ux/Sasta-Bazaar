import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  linkText,
  linkTo,
  center = true
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${center ? 'text-center' : 'flex flex-col sm:flex-row sm:items-end justify-between'}`}>
      <div className={center ? 'max-w-2xl mx-auto' : ''}>
        {eyebrow && (
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-sasta-gold-dark uppercase block mb-1.5">
            {eyebrow}
          </span>
        )}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-sasta-heading tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-sasta-body mt-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {linkText && linkTo && (
        <div className={`mt-4 sm:mt-0 ${center ? 'pt-3' : ''}`}>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sasta-heading hover:text-sasta-gold-dark transition-colors group"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}
