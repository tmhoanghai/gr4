import React, { useState } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const InteractiveTimelineSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;
  const steps = data.timelineSteps || [];
  const [selectedStep, setSelectedStep] = useState<number>(0);

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '05. EXECUTION TIMELINE'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>4-Phase Strategic Roadmap</span>
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

      {/* Horizontal Phase Tabs / Progress Bar */}
      <div className="my-auto space-y-6">
        {/* Step Buttons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedStep(idx)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${theme.cardBg} ${theme.accentBorder} ring-2 ring-amber-500/40 shadow-lg scale-[1.02]`
                    : 'bg-stone-900/50 border-stone-800 hover:bg-stone-800/60 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isSelected ? theme.accentText + ' font-bold' : 'text-stone-400'}>
                    {step.phase}
                  </span>
                  <span className="text-[10px] text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {step.period}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-semibold text-white truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus Card for the Selected Phase */}
        {steps[selectedStep] && (
          <div className={`p-6 rounded-xl border ${theme.cardBorder} ${theme.cardBg} space-y-4`}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${theme.accentText}`}>
                  {steps[selectedStep].phase} · {steps[selectedStep].period}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-0.5">
                  {steps[selectedStep].title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  steps[selectedStep].status === 'In Progress'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                    : 'bg-stone-800 text-stone-300'
                }`}>
                  Status: {steps[selectedStep].status || 'Planned'}
                </span>
              </div>
            </div>

            <p className={`text-sm md:text-base leading-relaxed ${theme.bodyColor}`}>
              {steps[selectedStep].description}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Key Milestone Deliverables:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {steps[selectedStep].deliverables.map((deliv, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-black/20 border border-white/5 text-xs text-stone-200"
                  >
                    <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${theme.accentText}`} />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Click any phase above to inspect workstream deliverables</span>
        </div>
        <div className="font-mono text-[11px]">PMI Agile Governance Standards</div>
      </div>
    </div>
  );
};
