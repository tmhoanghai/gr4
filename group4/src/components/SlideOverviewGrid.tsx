import React from 'react';
import { PresentationDeck, Slide } from '../types/presentation';
import { X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deck: PresentationDeck;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewGrid: React.FC<Props> = ({
  isOpen,
  onClose,
  deck,
  currentSlideIndex,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto font-sans">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-5xl p-6 max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h2 className="text-xl font-bold text-white">Slide Index & Quick Jump ({deck.slides.length} Slides)</h2>
            <p className="text-xs text-stone-400">Click any slide thumbnail to jump directly or inspect structural balance</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of Slides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 overflow-y-auto pr-2">
          {deck.slides.map((slide: Slide, idx: number) => {
            const isCurrent = currentSlideIndex === idx;
            return (
              <div
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`group cursor-pointer rounded-xl border p-3.5 transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-stone-800 border-amber-500 ring-2 ring-amber-500/50 shadow-lg scale-[1.02]'
                    : 'bg-stone-950/80 border-stone-800 hover:border-stone-600 hover:bg-stone-800/60'
                }`}
              >
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[11px] ${
                    isCurrent ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    Slide {idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-stone-500 truncate max-w-[120px]">
                    {slide.type.replace('_', ' ')}
                  </span>
                </div>

                {/* Preview Box */}
                <div className="aspect-video w-full rounded bg-stone-900 border border-stone-800/80 p-2.5 flex flex-col justify-center space-y-1 mb-2 overflow-hidden">
                  <div className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                    {slide.title}
                  </div>
                  {slide.subtitle && (
                    <div className="text-[9px] text-stone-400 line-clamp-1">
                      {slide.subtitle}
                    </div>
                  )}
                </div>

                {/* Bottom status */}
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                  <span>{slide.notes ? 'Speaker notes' : 'No notes'}</span>
                  {isCurrent && (
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Check className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div>Shortcut: Press <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-stone-300 font-mono">G</kbd> to toggle this slide index anytime</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
