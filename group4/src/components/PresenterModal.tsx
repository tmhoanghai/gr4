import React, { useState, useEffect } from 'react';
import { PresentationDeck, Slide } from '../types/presentation';
import { THEMES, ThemeStyles } from './ThemeManager';
import { SlideRenderer } from './SlideRenderer';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, X, Clock, HelpCircle, Eye } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deck: PresentationDeck;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onAdvance?: () => void;
  onStepBack?: () => void;
}

export const PresenterModal: React.FC<Props> = ({
  isOpen,
  onClose,
  deck,
  currentSlideIndex,
  onSlideChange,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onAdvance,
  onStepBack,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  const currentSlide: Slide | undefined = deck.slides[currentSlideIndex];
  const nextSlide: Slide | undefined = deck.slides[currentSlideIndex + 1];
  const theme: ThemeStyles = THEMES[deck.theme] || THEMES['editorial-stone'];

  useEffect(() => {
    let interval: any = null;
    if (isOpen && isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isTimerRunning]);

  // Keyboard navigation inside Presenter View
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        onAdvance ? onAdvance() : onSlideChange(Math.min(deck.slides.length - 1, currentSlideIndex + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        onStepBack ? onStepBack() : onSlideChange(Math.max(0, currentSlideIndex - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onAdvance, onStepBack, onSlideChange, deck.slides.length, currentSlideIndex, onClose]);

  if (!isOpen || !currentSlide) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainderSecs.toString().padStart(2, '0')}`;
  };

  const recommendedTime = currentSlide.timeRecommendationSeconds || 120;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col overflow-hidden font-sans">
      {/* Top Bar for Presenter View */}
      <header className="h-14 bg-stone-900 border-b border-stone-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-amber-400">TheMaster</span>
            <span className="text-xs text-stone-500">|</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-300">Presenter Console</span>
          </div>
          <span className="text-xs text-stone-400 hidden md:inline truncate max-w-sm">
            {deck.title}
          </span>
        </div>

        {/* Stopwatch & Elapsed Timer */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
            <div className="flex items-center gap-1 border-l border-stone-800 pl-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 hover:text-amber-400 text-stone-400 transition-colors"
                title={isTimerRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setElapsedSeconds(0)}
                className="p-1 hover:text-amber-400 text-stone-400 transition-colors"
                title="Reset Stopwatch"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-xs font-mono text-stone-400 hidden sm:block">
            Slide {currentSlideIndex + 1} / {deck.slides.length}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Exit Presenter</span>
          </button>
        </div>
      </header>

      {/* Main Split Layout: Left 60% Slide View, Right 40% Next Slide & Notes */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Left 7 Columns: Current Slide Live Display */}
        <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden bg-black/40 rounded-xl border border-stone-800 p-2">
          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-stone-400">
            <span className="font-medium text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Audience View (Live)
            </span>
            <span className="font-mono">{currentSlide.type}</span>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
            <div className={`w-full aspect-video rounded-lg overflow-hidden border border-stone-800 shadow-2xl ${theme.slideBg} cursor-pointer`} onClick={() => onAdvance ? onAdvance() : onSlideChange(currentSlideIndex + 1)}>
              <SlideRenderer
                slide={currentSlide}
                theme={theme}
                fontPairing={deck.fontPairing}
                stepIndex={stepIndex}
                onSetStepIndex={onSetStepIndex}
                onRegisterSteps={onRegisterSteps}
                onNextAction={onAdvance}
              />
            </div>
          </div>

          {/* Navigation Buttons for Presenter */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-stone-800/60">
            <button
              onClick={() => onStepBack ? onStepBack() : onSlideChange(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0 && stepIndex === 0}
              className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous (←)</span>
            </button>

            <span className="font-mono text-xs text-stone-400">
              Pacing recommendation: ~{Math.round(recommendedTime / 60)} min
            </span>

            <button
              onClick={() => onAdvance ? onAdvance() : onSlideChange(Math.min(deck.slides.length - 1, currentSlideIndex + 1))}
              className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span>Next (→ / Space)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 5 Columns: Speaker Notes & Next Slide Preview */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 overflow-hidden">
          {/* Speaker Notes Area (Top) */}
          <div className="flex-1 bg-stone-900 border border-stone-800 rounded-xl p-5 overflow-y-auto space-y-3 flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                Speaker Talking Points & Cues
              </span>
              <span className="text-[11px] text-stone-500 font-mono">Private View</span>
            </div>

            <div className="flex-1 text-sm md:text-base font-light text-stone-200 leading-relaxed space-y-3 whitespace-pre-wrap">
              {currentSlide.notes ? (
                currentSlide.notes
              ) : (
                <span className="text-stone-500 italic">No notes added for this slide. Click "Edit Content" in the toolbar to add private talking points.</span>
              )}
            </div>

            <div className="pt-3 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
              <span>Tip: Maintain steady pacing and eye contact with the board</span>
              <span className="font-mono text-amber-400/80">TheMaster Presenter Assistant</span>
            </div>
          </div>

          {/* Next Slide Preview (Bottom) */}
          <div className="h-48 bg-stone-900 border border-stone-800 rounded-xl p-3 flex flex-col justify-between shrink-0">
            <div className="flex items-center justify-between text-xs text-stone-400 pb-1 border-b border-stone-800/80">
              <span className="font-semibold text-stone-300 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-stone-400" />
                Next Slide ({currentSlideIndex + 2} of {deck.slides.length})
              </span>
              <span className="text-[11px] font-mono text-stone-500">
                {nextSlide ? nextSlide.type : 'End of Presentation'}
              </span>
            </div>

            {nextSlide ? (
              <div className="flex-1 flex items-center gap-3 overflow-hidden pt-2">
                <div className="w-36 aspect-video rounded bg-stone-950 border border-stone-700 overflow-hidden shrink-0 flex items-center justify-center p-1 text-[8px] text-stone-400 text-center">
                  {nextSlide.title}
                </div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  <div className="text-xs font-bold text-white line-clamp-2">
                    {nextSlide.title}
                  </div>
                  {nextSlide.subtitle && (
                    <div className="text-[11px] text-stone-400 line-clamp-2">
                      {nextSlide.subtitle}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-stone-500 italic">
                This is the final slide of the presentation.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
