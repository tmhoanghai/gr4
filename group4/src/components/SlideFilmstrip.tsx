import React from 'react';
import { PresentationDeck, SlideLayoutType } from '../types/presentation';
import { Plus, Copy, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface Props {
  deck: PresentationDeck;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
  onAddSlide: (type: SlideLayoutType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
}

export const SlideFilmstrip: React.FC<Props> = ({
  deck,
  currentSlideIndex,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
}) => {
  return (
    <aside className="no-print w-60 bg-stone-900/90 border-r border-stone-800 flex flex-col justify-between shrink-0 select-none overflow-hidden font-sans">
      {/* Top Header of Filmstrip */}
      <div className="p-3 border-b border-stone-800/80 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
          Slides ({deck.slides.length})
        </span>

        <button
          onClick={() => onAddSlide('problem_breakdown')}
          className="p-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-0.5 cursor-pointer shadow-xs"
          title="Add New Slide"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      {/* Vertical Scrollable Slides List */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {deck.slides.map((slide, idx) => {
          const isSelected = currentSlideIndex === idx;
          return (
            <div
              key={slide.id}
              onClick={() => onSelectSlide(idx)}
              className={`group relative rounded-xl border p-2.5 transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-800 border-amber-500 ring-2 ring-amber-500/40 shadow-md scale-[1.01]'
                  : 'bg-stone-950/70 border-stone-800/80 hover:border-stone-600 hover:bg-stone-800/50'
              }`}
            >
              {/* Slide Number & Quick Options */}
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                  isSelected ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Hover Quick Actions */}
                <div className="hidden group-hover:flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'up');
                    }}
                    disabled={idx === 0}
                    className="p-0.5 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSlide(idx, 'down');
                    }}
                    disabled={idx === deck.slides.length - 1}
                    className="p-0.5 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSlide(idx);
                    }}
                    className="p-0.5 rounded bg-stone-700 hover:bg-stone-600 text-stone-300 cursor-pointer"
                    title="Duplicate Slide"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {deck.slides.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSlide(idx);
                      }}
                      className="p-0.5 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/40 cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Mini Slide Thumbnail Canvas */}
              <div className="aspect-video w-full rounded bg-stone-900 border border-stone-800 p-2 flex flex-col justify-center space-y-1 overflow-hidden">
                <div className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                  {slide.title}
                </div>
                {slide.subtitle && (
                  <div className="text-[8px] text-stone-400 line-clamp-1">
                    {slide.subtitle}
                  </div>
                )}
              </div>

              {/* Layout Type Tag */}
              <div className="text-[9px] font-mono uppercase text-stone-500 mt-1 truncate">
                {slide.type.replace('_', ' ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Strip */}
      <div className="p-3 border-t border-stone-800/80 bg-stone-950/40 text-[11px] text-stone-400 flex items-center justify-between">
        <span>Total: {deck.slides.length} slides</span>
        <span className="font-mono text-amber-400">~{deck.readTimeMinutes} min</span>
      </div>
    </aside>
  );
};
