import React from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const ComparativeMatrixSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;
  const comparisons = data.comparisons || [];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden font-sans">
      {/* Background Image if specified */}
      {slide.backgroundImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={slide.backgroundImage}
            alt=""
            className="w-full h-full object-cover filter brightness-[0.3] contrast-110"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-stone-950/75" />
        </div>
      )}

      {/* Top Header */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '04. COMPARATIVE MATRIX'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>Before vs Target State</span>
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

      {/* Comparison Table / Grid */}
      <div className={`my-auto rounded-xl border ${theme.cardBorder} ${theme.cardBg} overflow-hidden`}>
        {/* Table Header Row */}
        <div className="grid grid-cols-12 bg-stone-900/90 p-3.5 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-stone-300">
          <div className="col-span-3 text-stone-400">Evaluation Dimension</div>
          <div className="col-span-4 text-rose-400 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{data.currentLabel || 'Status Quo Baseline'}</span>
          </div>
          <div className="col-span-5 text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{data.newLabel || 'TheMaster Target Solution'}</span>
          </div>
        </div>

        {/* Table Body Rows */}
        <div className="divide-y divide-white/5">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-3.5 text-xs md:text-sm items-center hover:bg-white/5 transition-colors duration-150"
            >
              {/* Aspect */}
              <div className="col-span-3 font-semibold text-stone-200 pr-3">
                {item.aspect}
              </div>

              {/* Current Approach */}
              <div className="col-span-4 text-stone-400 font-light pr-3 leading-relaxed">
                {item.currentApproach}
              </div>

              {/* New Solution & Impact */}
              <div className="col-span-5 flex flex-col justify-center space-y-1">
                <div className="font-medium text-white leading-relaxed flex items-start gap-1.5">
                  <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${theme.accentText}`} />
                  <span>{item.newSolution}</span>
                </div>
                <div className="text-[11px] font-mono font-semibold text-emerald-400 pl-5">
                  ✦ {item.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div>Benchmark Gap Analysis & Strategic Leverage Points</div>
        <div className="font-medium text-stone-300">Comprehensive total cost of ownership (TCO) optimization</div>
      </div>
    </div>
  );
};
