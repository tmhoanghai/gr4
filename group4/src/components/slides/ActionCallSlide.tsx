import React from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { Mail, Globe, Phone, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const ActionCallSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;
  const actionPoints = data.actionPoints || [];
  const contact = data.contactInfo || { email: 'executive@themaster.io', website: 'https://themaster.io' };

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '07. ACTION CHECKLIST & NEXT STEPS'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>Governance Execution</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className={`text-sm md:text-base ${theme.bodyColor} max-w-3xl`}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Grid: Action Steps & Summary Message */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-stretch">
        {/* Left Column: Concrete Action Checklist */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Immediate Strategic Action Items:</span>
          </div>

          {actionPoints.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} transition-all duration-200 hover:border-amber-500/40`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${theme.accentBg} text-white`}>
                      {item.step}
                    </span>
                    <h4 className="text-sm md:text-base font-bold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className={`text-xs md:text-sm leading-relaxed ${theme.bodyColor}`}>
                    {item.desc}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] uppercase font-mono tracking-tight text-stone-400 block">
                    Accountable Lead
                  </span>
                  <span className="text-xs font-semibold text-stone-200">
                    {item.owner}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Key Takeaway Box & Contact */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className={`p-6 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between h-full`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <MessageSquare className="w-4 h-4" />
                <span>Executive Concluding Thesis</span>
              </div>
              <p className="text-base md:text-lg font-lora italic text-white leading-relaxed">
                "{data.finalMessage || 'Decisive leadership today establishes the sustainable competitive advantage of tomorrow.'}"
              </p>
            </div>

            {/* Contact Details */}
            <div className="pt-6 border-t border-white/10 space-y-2.5">
              <div className="text-xs font-medium uppercase tracking-wider text-stone-400">
                Contact & Board Engagement:
              </div>

              {contact.email && (
                <div className="flex items-center gap-2.5 text-xs text-stone-300">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{contact.email}</span>
                </div>
              )}

              {contact.website && (
                <div className="flex items-center gap-2.5 text-xs text-stone-300">
                  <Globe className="w-3.5 h-3.5 text-stone-400" />
                  <span>{contact.website}</span>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-2.5 text-xs text-stone-300">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Q&A Session:</span>
          <span>Open floor for committee discussion and strategic inquiries</span>
        </div>
        <div className="font-mono text-[11px] text-amber-400 flex items-center gap-1">
          <span>Thank you for your engagement</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
