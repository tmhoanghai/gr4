import React from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { Quote, Sparkles } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const DeepDiveQuoteSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-14 overflow-hidden relative font-sans">
      {/* Background oversized quotation watermarks */}
      <div className="absolute right-8 top-12 opacity-5 pointer-events-none">
        <Quote className="w-72 h-72 text-white" />
      </div>

      {/* Top Header */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '06. EXECUTIVE TAKEAWAY'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>Core Guiding Philosophy</span>
        </div>
      </div>

      {/* Center Quote Area */}
      <div className="my-auto max-w-4xl space-y-8 relative z-10">
        <div className="space-y-4">
          <Quote className={`w-10 h-10 ${theme.accentText} opacity-90`} />
          <blockquote className="text-2xl md:text-4xl lg:text-5xl font-lora font-medium leading-[1.3] text-white tracking-tight">
            "{data.quote || 'The objective is not to incrementally copy what others do, but to decisively build what fundamentally transforms the system.'}"
          </blockquote>
        </div>

        {/* Author Attribution */}
        <div className="pt-2 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${theme.accentBg} flex items-center justify-center text-xl font-bold text-white shadow-md`}>
            {data.quoteAuthor ? data.quoteAuthor.charAt(0) : 'P'}
          </div>
          <div>
            <div className="text-base md:text-lg font-bold text-white">
              {data.quoteAuthor || 'Enrique Peñalosa'}
            </div>
            <div className={`text-xs md:text-sm ${theme.mutedColor}`}>
              {data.quoteRole || 'Former Mayor of Bogotá & Global Policy Strategist'}
            </div>
            {data.quoteContext && (
              <div className="text-xs text-stone-400 mt-0.5 italic">
                {data.quoteContext}
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaways */}
        {data.takeawayPoints && data.takeawayPoints.length > 0 && (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.takeawayPoints.map((point, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex items-start gap-3`}
              >
                <Sparkles className={`w-4 h-4 mt-1 shrink-0 ${theme.accentText}`} />
                <p className={`text-xs md:text-sm leading-relaxed ${theme.bodyColor}`}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400 relative z-10">
        <div>Executive Thought Leadership Synthesis</div>
        <div className="font-mono text-[11px]">2030 Strategic Horizon</div>
      </div>
    </div>
  );
};
