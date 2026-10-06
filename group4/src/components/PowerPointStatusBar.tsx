import React from 'react';
import { ViewMode } from '../types/presentation';
import {
  Layout,
  Grid,
  BookOpen,
  MonitorPlay,
  Flame,
  Tv,
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Props {
  currentSlideIndex: number;
  totalSlides: number;
  topic: string;
  readTimeMinutes: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  laserEnabled: boolean;
  onToggleLaser: () => void;
  onOpenPresenter: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  onFitZoom: () => void;
}

export const PowerPointStatusBar: React.FC<Props> = ({
  currentSlideIndex,
  totalSlides,
  topic,
  readTimeMinutes,
  viewMode,
  onViewModeChange,
  showNotes,
  onToggleNotes,
  laserEnabled,
  onToggleLaser,
  onOpenPresenter,
  isFullscreen,
  onToggleFullscreen,
  onPrevSlide,
  onNextSlide,
  zoomLevel,
  onZoomChange,
  onFitZoom,
}) => {
  return (
    <footer className="no-print h-9 bg-stone-900 border-t border-stone-800 px-4 flex items-center justify-between text-xs text-stone-300 select-none shrink-0 z-30 font-sans">
      {/* Left Zone: Slide X of Y, Topic, Speaking Duration */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-stone-200">
          <span>Slide</span>
          <span className="text-amber-400 font-bold">{currentSlideIndex + 1}</span>
          <span>of</span>
          <span>{totalSlides}</span>
        </div>

        <span className="text-stone-700 hidden sm:inline">|</span>

        <span className="text-[11px] text-stone-400 truncate max-w-[200px] hidden md:inline">
          {topic}
        </span>

        <span className="text-stone-700 hidden lg:inline">|</span>

        <span className="text-[11px] text-stone-400 font-mono hidden lg:inline">
          ~{readTimeMinutes} min pacing
        </span>
      </div>

      {/* Center Zone: Quick Steppers & Notes Toggle */}
      <div className="flex items-center gap-3">
        {/* Previous / Next Stepper buttons */}
        <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded px-1 py-0.5">
          <button
            onClick={onPrevSlide}
            disabled={currentSlideIndex === 0}
            className="p-1 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
            title="Previous Slide (← / PageUp)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono px-1 text-stone-400">
            {currentSlideIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={onNextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
            title="Next Slide (→ / Space / PageDown)"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Notes Toggle */}
        <button
          onClick={onToggleNotes}
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            showNotes
              ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
              : 'hover:bg-stone-800 text-stone-300'
          }`}
          title="Toggle Speaker Talking Notes Drawer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Notes</span>
        </button>

        {/* Laser Pointer Shortcut */}
        <button
          onClick={onToggleLaser}
          className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            laserEnabled
              ? 'bg-rose-600 text-white font-bold shadow-xs'
              : 'hover:bg-stone-800 text-stone-300'
          }`}
          title="Toggle Red Laser Pointer (L)"
        >
          <Flame className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden sm:inline">Laser</span>
        </button>
      </div>

      {/* Right Zone: PowerPoint 4 View Switchers & Zoom Slider */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 4 PowerPoint View Mode Switchers */}
        <div className="flex items-center bg-stone-950 border border-stone-800 rounded p-0.5">
          {/* 1. Normal View */}
          <button
            onClick={() => onViewModeChange('normal')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'normal'
                ? 'bg-stone-800 text-amber-400 shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Normal View (Filmstrip + Active Slide Canvas)"
          >
            <Layout className="w-3.5 h-3.5" />
          </button>

          {/* 2. Slide Sorter View */}
          <button
            onClick={() => onViewModeChange('sorter')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'sorter'
                ? 'bg-stone-800 text-amber-400 shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Slide Sorter View (Grid of all slides)"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* 3. Reading View */}
          <button
            onClick={() => onViewModeChange('reading')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'reading'
                ? 'bg-stone-800 text-amber-400 shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Reading View (Distraction-free reading)"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* 4. Slide Show (Fullscreen) */}
          <button
            onClick={() => onViewModeChange('slideshow')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewMode === 'slideshow'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="Chế độ Thuyết trình toàn màn hình (Phím N)"
          >
            <MonitorPlay className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls (PowerPoint Zoom Slider) */}
        <div className="hidden lg:flex items-center gap-1 bg-stone-950 border border-stone-800 rounded px-2 py-0.5 text-[11px] font-mono">
          <button
            onClick={() => onZoomChange(Math.max(60, zoomLevel - 10))}
            className="p-0.5 text-stone-400 hover:text-white cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>

          <button
            onClick={onFitZoom}
            className="text-stone-300 hover:text-amber-400 px-1 cursor-pointer font-semibold"
            title="Fit Slide to Window"
          >
            {zoomLevel}%
          </button>

          <button
            onClick={() => onZoomChange(Math.min(140, zoomLevel + 10))}
            className="p-0.5 text-stone-400 hover:text-white cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (F)'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </footer>
  );
};
