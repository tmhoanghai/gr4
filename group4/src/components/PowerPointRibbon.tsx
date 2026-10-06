import React from 'react';
import { PresentationDeck, FontPairing, DeckTheme, SlideLayoutType } from '../types/presentation';
import { THEMES, FONT_PAIRINGS } from './ThemeManager';
import {
  Home,
  Plus,
  Play,
  Tv,
  Layers,
  Edit3,
  Flame,
  Printer,
  HelpCircle,
  Share2,
  Type,
  Palette,
  BookOpen,
  Copy,
  Trash2,
  MonitorPlay,
  Maximize2,
  Eye,
  Sliders,
  FileText,
  Clock
} from 'lucide-react';

export type RibbonTab = 'home' | 'slides' | 'design' | 'slideshow' | 'tools';

interface Props {
  activeTab: RibbonTab;
  onTabChange: (tab: RibbonTab) => void;
  deck: PresentationDeck;
  decks: PresentationDeck[];
  onSelectDeck: (deckId: string) => void;
  currentSlideIndex: number;
  onAddSlide: (type: SlideLayoutType) => void;
  onDuplicateCurrentSlide: () => void;
  onDeleteCurrentSlide: () => void;
  onFontChange: (font: FontPairing) => void;
  onThemeChange: (theme: DeckTheme) => void;
  onOpenOverview: () => void;
  onOpenEditor: () => void;
  onOpenPresenter: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  laserEnabled: boolean;
  onToggleLaser: () => void;
  isBlackout: boolean;
  onToggleBlackout: () => void;
  isAutoPlaying: boolean;
  onToggleAutoPlay: () => void;
  autoPlayInterval: number;
  onAutoPlayIntervalChange: (seconds: number) => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  onOpenShortcuts: () => void;
  onPrint: () => void;
  onShare: () => void;
  onGoHome: () => void;
  showLeftFilmstrip: boolean;
  onToggleLeftFilmstrip: () => void;
  onToggleSlideshow?: () => void;
}

export const PowerPointRibbon: React.FC<Props> = ({
  activeTab,
  onTabChange,
  deck,
  decks,
  onSelectDeck,
  currentSlideIndex,
  onAddSlide,
  onDuplicateCurrentSlide,
  onDeleteCurrentSlide,
  onFontChange,
  onThemeChange,
  onOpenOverview,
  onOpenEditor,
  onOpenPresenter,
  onToggleFullscreen,
  isFullscreen,
  laserEnabled,
  onToggleLaser,
  isBlackout,
  onToggleBlackout,
  isAutoPlaying,
  onToggleAutoPlay,
  autoPlayInterval,
  onAutoPlayIntervalChange,
  showNotes,
  onToggleNotes,
  onOpenShortcuts,
  onPrint,
  onShare,
  onGoHome,
  showLeftFilmstrip,
  onToggleLeftFilmstrip,
  onToggleSlideshow,
}) => {
  return (
    <div className="no-print bg-stone-900 border-b border-stone-800 text-stone-200 select-none shrink-0 z-30 font-sans">
      {/* 1. TOP TITLE BAR (PowerPoint Header) */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-stone-800/80 text-xs">
        {/* Left: Brand + Presentation Title Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm tracking-tight text-amber-400">TheMaster</span>
            <span className="text-stone-600">|</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 hidden sm:inline text-[11px]">Presentation:</span>
            <select
              value={deck.id}
              onChange={(e) => onSelectDeck(e.target.value)}
              className="bg-stone-950 border border-stone-700 text-white rounded px-2.5 py-0.5 text-xs font-semibold max-w-[240px] sm:max-w-xs truncate focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Dedicated Presentation Mode Button (matches Key N) */}
          <button
            onClick={onToggleSlideshow}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-md shadow-amber-500/20 active:scale-95"
            title="Bật chế độ Thuyết trình toàn màn hình (Phím N)"
          >
            <MonitorPlay className="w-3.5 h-3.5 fill-current" />
            <span>Thuyết trình (Phím N)</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors border border-stone-700"
            title="Start Full-Screen Slide Show (F5 / F)"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span className="hidden sm:inline">Toàn màn hình (F5)</span>
          </button>
        </div>
      </div>

      {/* 2. RIBBON TAB NAVIGATION (PowerPoint Tabs) */}
      <div className="px-4 flex items-center gap-1 bg-stone-950/60 border-b border-stone-800/80 text-xs">
        <button
          onClick={onGoHome}
          className="px-3 py-1.5 text-stone-400 hover:text-white font-medium flex items-center gap-1.5 border-b-2 border-transparent hover:border-stone-500 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-amber-400" />
          <span>Home / New Deck</span>
        </button>

        <button
          onClick={() => onTabChange('slides')}
          className={`px-3 py-1.5 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'slides'
              ? 'text-amber-400 border-amber-400 font-bold bg-stone-900'
              : 'text-stone-300 hover:text-white border-transparent'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Insert & Layout</span>
        </button>

        <button
          onClick={() => onTabChange('design')}
          className={`px-3 py-1.5 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'design'
              ? 'text-amber-400 border-amber-400 font-bold bg-stone-900'
              : 'text-stone-300 hover:text-white border-transparent'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Design & Fonts</span>
        </button>

        <button
          onClick={() => onTabChange('slideshow')}
          className={`px-3 py-1.5 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'slideshow'
              ? 'text-amber-400 border-amber-400 font-bold bg-stone-900'
              : 'text-stone-300 hover:text-white border-transparent'
          }`}
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          <span>Slide Show</span>
        </button>

        <button
          onClick={() => onTabChange('tools')}
          className={`px-3 py-1.5 font-medium flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'tools'
              ? 'text-amber-400 border-amber-400 font-bold bg-stone-900'
              : 'text-stone-300 hover:text-white border-transparent'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Presenter Tools</span>
        </button>
      </div>

      {/* 3. DYNAMIC RIBBON TOOLBAR PANEL */}
      <div className="px-4 py-2 bg-stone-900 flex flex-wrap items-center justify-between gap-4 text-xs min-h-[44px]">
        {/* TAB 1: INSERT & LAYOUT */}
        {activeTab === 'slides' && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 border-r border-stone-800 pr-3">
              <span className="text-[11px] text-stone-400 mr-1">+ New Slide:</span>
              <button
                onClick={() => onAddSlide('hero_title')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Title & Executive Cover Slide"
              >
                Cover
              </button>
              <button
                onClick={() => onAddSlide('rotating_wheel')}
                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-xs font-bold cursor-pointer"
                title="Rotating Radial Dial Slide (PART 01-04)"
              >
                Rotating Wheel
              </button>
              <button
                onClick={() => onAddSlide('problem_breakdown')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Problem & Root Cause Analysis Slide"
              >
                Problem
              </button>
              <button
                onClick={() => onAddSlide('solution_architecture')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="3-Pillar Solution Architecture Slide"
              >
                3 Pillars
              </button>
              <button
                onClick={() => onAddSlide('hanoi_summary')}
                className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-xs font-bold cursor-pointer"
                title="Summary & Why We Chose Hanoi Slide"
              >
                Summary
              </button>
              <button
                onClick={() => onAddSlide('data_metrics')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Empirical Data & KPI Metrics Slide"
              >
                Data KPI
              </button>
              <button
                onClick={() => onAddSlide('comparative_matrix')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Before vs After Comparative Matrix Slide"
              >
                Comparison
              </button>
              <button
                onClick={() => onAddSlide('interactive_timeline')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Phased Execution Roadmap Slide"
              >
                Timeline
              </button>
              <button
                onClick={() => onAddSlide('interactive_simulator')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Real-Time Parameter Simulator Slide"
              >
                Simulator
              </button>
              <button
                onClick={() => onAddSlide('action_call')}
                className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-200 text-xs font-medium cursor-pointer"
                title="Action Checklist & Q&A Slide"
              >
                Action
              </button>
            </div>

            {/* Slide Operations */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onDuplicateCurrentSlide}
                className="p-1.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-xs flex items-center gap-1 cursor-pointer"
                title="Duplicate Current Slide"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Duplicate</span>
              </button>

              {deck.slides.length > 1 && (
                <button
                  onClick={onDeleteCurrentSlide}
                  className="p-1.5 bg-rose-950/70 hover:bg-rose-900 rounded text-rose-300 border border-rose-800/40 text-xs flex items-center gap-1 cursor-pointer"
                  title="Delete Current Slide"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}

              <button
                onClick={onOpenEditor}
                className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 rounded text-cyan-300 text-xs font-medium flex items-center gap-1 cursor-pointer ml-1"
                title="Open Comprehensive Slide Content Editor (Key E)"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Content (E)</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: DESIGN & FONTS */}
        {activeTab === 'design' && (
          <div className="flex flex-wrap items-center gap-4">
            {/* Font Selector */}
            <div className="flex items-center gap-2 border-r border-stone-800 pr-4">
              <Type className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] text-stone-400">Typography Pairing:</span>
              <select
                value={deck.fontPairing || 'bevietnam-jetbrains'}
                onChange={(e) => onFontChange(e.target.value as FontPairing)}
                className="bg-stone-950 border border-stone-700 text-white rounded px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
              >
                {Object.values(FONT_PAIRINGS).map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme / Palette Selector */}
            <div className="flex items-center gap-2 border-r border-stone-800 pr-4">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] text-stone-400">Slide Theme:</span>
              <div className="flex items-center gap-1">
                {Object.values(THEMES).map((thm) => {
                  const isSelected = deck.theme === thm.id;
                  return (
                    <button
                      key={thm.id}
                      onClick={() => onThemeChange(thm.id)}
                      className={`px-2 py-1 rounded text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                      }`}
                      title={thm.name}
                    >
                      {thm.name.split(' (')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            <span className="text-[11px] text-stone-500 font-mono hidden xl:inline">
              16:9 Widescreen Presentation Display Standard
            </span>
          </div>
        )}

        {/* TAB 3: SLIDE SHOW */}
        {activeTab === 'slideshow' && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onToggleFullscreen}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start From Beginning (F5 / F)</span>
            </button>

            <button
              onClick={onToggleSlideshow}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Vào chế độ Thuyết trình toàn màn hình (Phím N)"
            >
              <MonitorPlay className="w-3.5 h-3.5 fill-current" />
              <span>Thuyết trình (Phím N)</span>
            </button>

            <button
              onClick={onOpenPresenter}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Presenter Window</span>
            </button>

            {/* Autoplay setting */}
            <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded px-2 py-0.5">
              <button
                onClick={onToggleAutoPlay}
                className={`text-xs font-medium cursor-pointer ${isAutoPlaying ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
              >
                {isAutoPlaying ? 'Stop Auto-Advance' : 'Auto-Advance Slides'}
              </button>
              <select
                value={autoPlayInterval}
                onChange={(e) => onAutoPlayIntervalChange(Number(e.target.value))}
                className="bg-transparent text-stone-300 text-[11px] font-mono focus:outline-none cursor-pointer"
              >
                <option value={10} className="bg-stone-900">10s</option>
                <option value={20} className="bg-stone-900">20s (PechaKucha)</option>
                <option value={30} className="bg-stone-900">30s</option>
                <option value={60} className="bg-stone-900">60s</option>
              </select>
            </div>

            <button
              onClick={onToggleBlackout}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                isBlackout ? 'bg-amber-600 text-stone-950 font-bold' : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Black screen mode to focus room attention on speaker (Key B)"
            >
              Black Screen (B)
            </button>
          </div>
        )}

        {/* TAB 4: PRESENTER TOOLS */}
        {activeTab === 'tools' && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onToggleLaser}
              className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                laserEnabled
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Toggle Red Glowing Laser Pointer (Key L)"
            >
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Laser Pointer (L)</span>
            </button>

            <button
              onClick={onToggleNotes}
              className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                showNotes
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
              title="Toggle Speaker Talking Notes Drawer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Speaker Notes</span>
            </button>

            <button
              onClick={onOpenOverview}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Slide Overview Grid (Key G)"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Slide Grid (G)</span>
            </button>

            <button
              onClick={onPrint}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Print or Export Slide Deck to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export PDF / Print</span>
            </button>

            <button
              onClick={onShare}
              className="px-3 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Copy Deck Share Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>

            <button
              onClick={onOpenShortcuts}
              className="p-1 bg-stone-800 hover:bg-stone-700 rounded text-amber-400 cursor-pointer"
              title="Keyboard Shortcuts Cheatsheet (Key ?)"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right side Toggle Filmstrip button */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onToggleLeftFilmstrip}
            className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer bg-stone-950 px-2 py-0.5 rounded border border-stone-800"
            title="Toggle left slide thumbnail filmstrip"
          >
            <Eye className="w-3 h-3" />
            <span>{showLeftFilmstrip ? 'Hide Filmstrip' : 'Show Filmstrip'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
