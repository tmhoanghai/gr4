import React from 'react';
import { PresentationDeck, SlideLayoutType } from '../types/presentation';
import { THEMES } from './ThemeManager';
import { SlideRenderer } from './SlideRenderer';
import { Plus, Copy, Trash2, ArrowUp, ArrowDown, Play, Layout } from 'lucide-react';

interface Props {
  deck: PresentationDeck;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: (type: SlideLayoutType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
  onSwitchToNormalView: () => void;
}

export const SlideSorterView: React.FC<Props> = ({
  deck,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
  onSwitchToNormalView,
}) => {
  const theme = THEMES[deck.theme] || THEMES['editorial-stone'];

  return (
    <div className="flex-1 bg-stone-950 p-6 sm:p-10 overflow-y-auto space-y-6 select-none">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
            <Layout className="w-3.5 h-3.5" />
            <span>PowerPoint Slide Sorter View</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            {deck.title} ({deck.slides.length} Slides)
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Double-click or select any slide to open in Normal View. Use toolbar buttons to reorder, duplicate or add new slides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onAddSlide('problem_breakdown')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Slide</span>
          </button>

          <button
            onClick={onSwitchToNormalView}
            className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-200 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Normal View</span>
          </button>
        </div>
      </div>

      {/* Grid of All Slides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deck.slides.map((slide, idx) => {
          const isSelected = currentSlideIndex === idx;
          return (
            <div
              key={slide.id}
              onClick={() => onSelectSlide(idx)}
              onDoubleClick={() => {
                onSelectSlide(idx);
                onSwitchToNormalView();
              }}
              className={`group relative rounded-2xl border p-3 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-900 border-amber-500 ring-2 ring-amber-500/50 shadow-2xl scale-[1.02]'
                  : 'bg-stone-900/50 border-stone-800/80 hover:border-stone-600 hover:bg-stone-900'
              }`}
            >
              {/* Top Meta & Action Bar */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                  isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                }`}>
                  Slide {idx + 1}
                </span>

                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'up');
                    }}
                    disabled={idx === 0}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-20 cursor-pointer"
                    title="Move Left / Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'down');
                    }}
                    disabled={idx === deck.slides.length - 1}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-20 cursor-pointer"
                    title="Move Right / Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSlide(idx);
                    }}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                    title="Duplicate Slide"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {deck.slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSlide(idx);
                      }}
                      className="p-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/40 cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scaled Preview Box */}
              <div className="w-full aspect-video rounded-xl bg-stone-950 border border-stone-800 overflow-hidden relative p-3 flex flex-col justify-center space-y-1.5 shadow-inner">
                <div className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {slide.title}
                </div>
                {slide.subtitle && (
                  <div className="text-[10px] text-stone-400 line-clamp-2">
                    {slide.subtitle}
                  </div>
                )}
                <div className="text-[9px] font-mono uppercase text-amber-400/80 pt-1">
                  Layout: {slide.type.replace('_', ' ')}
                </div>
              </div>

              {/* Footer status */}
              <div className="pt-2 text-[10px] text-stone-400 flex items-center justify-between">
                <span>{slide.notes ? 'Has speaker notes' : 'No notes'}</span>
                <span className="font-mono text-stone-500">~{Math.round((slide.timeRecommendationSeconds || 120) / 60)} min</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
