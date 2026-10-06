import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TEMPLATE_DECKS } from './data/mockDecks';
import { PresentationDeck, FontPairing, DeckTheme, SlideLayoutType, Slide, ViewMode } from './types/presentation';
import { THEMES, FONT_PAIRINGS, ThemeStyles } from './components/ThemeManager';
import { SlideRenderer } from './components/SlideRenderer';
import { LaserPointer } from './components/LaserPointer';
import { PresenterModal } from './components/PresenterModal';
import { SlideOverviewGrid } from './components/SlideOverviewGrid';
import { SlideEditorModal } from './components/SlideEditorModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { HomeView } from './components/HomeView';
import { PowerPointRibbon, RibbonTab } from './components/PowerPointRibbon';
import { SlideFilmstrip } from './components/SlideFilmstrip';
import { PowerPointStatusBar } from './components/PowerPointStatusBar';
import { SlideSorterView } from './components/SlideSorterView';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from './utils/soundEffects';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  BookOpen,
  Layout,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Sparkles,
  Play,
  X
} from 'lucide-react';

const slideTransitionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
    transition: {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0] as [number, number, number, number],
    },
  }),
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState<'home' | 'presentation'>('presentation');
  const [activeRibbonTab, setActiveRibbonTab] = useState<RibbonTab>('slides');
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [decks, setDecks] = useState<PresentationDeck[]>(TEMPLATE_DECKS);
  const [currentDeckId, setCurrentDeckId] = useState<string>(TEMPLATE_DECKS[0].id);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [slideAnimationStep, setSlideAnimationStep] = useState<number>(0);
  const [currentSlideTotalSteps, setCurrentSlideTotalSteps] = useState<number>(1);

  // Zoom level state (PowerPoint zoom slider)
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Presentation State
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isBlackout, setIsBlackout] = useState<boolean>(false);
  const [laserEnabled, setLaserEnabled] = useState<boolean>(false);
  const [spotlightEnabled, setSpotlightEnabled] = useState<boolean>(false);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [showLeftFilmstrip, setShowLeftFilmstrip] = useState<boolean>(true);
  const [showEntranceAnimation, setShowEntranceAnimation] = useState<boolean>(false);

  // Auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoPlayIntervalSeconds, setAutoPlayIntervalSeconds] = useState<number>(20);

  // Modals
  const [showPresenterModal, setShowPresenterModal] = useState<boolean>(false);
  const [showOverviewGrid, setShowOverviewGrid] = useState<boolean>(false);
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const currentDeck = decks.find((d) => d.id === currentDeckId) || decks[0];
  const currentSlide = currentDeck.slides[currentSlideIndex] || currentDeck.slides[0];
  const currentFontPairing: FontPairing = currentDeck.fontPairing || 'bevietnam-jetbrains';
  const theme: ThemeStyles = THEMES[currentDeck.theme] || THEMES['editorial-stone'];

  // Automatic 'Fit to Window' zoom calculation
  const handleFitZoom = useCallback(() => {
    if (!canvasContainerRef.current) return;
    const rect = canvasContainerRef.current.getBoundingClientRect();
    const availableWidth = rect.width - 40;
    const availableHeight = rect.height - (showNotesDrawer ? 180 : 90);

    if (availableWidth <= 0 || availableHeight <= 0) return;

    const baseWidth = 1024;
    const baseHeight = 576;

    const scaleX = availableWidth / baseWidth;
    const scaleY = availableHeight / baseHeight;
    const fitScale = Math.min(scaleX, scaleY);

    const optimalZoom = Math.max(50, Math.min(130, Math.round(fitScale * 100)));
    setZoomLevel(optimalZoom);
  }, [showNotesDrawer]);

  useEffect(() => {
    // Initial and responsive fit
    const timer = setTimeout(() => handleFitZoom(), 50);
    const onResize = () => handleFitZoom();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [handleFitZoom, viewMode, showLeftFilmstrip, showNotesDrawer]);

  // Start presentation with cinematic entrance animation (Key B / F5)
  const startPresentationMode = useCallback(() => {
    setActiveMenu('presentation');
    setViewMode('slideshow');
    setShowEntranceAnimation(true);
    setTimeout(() => {
      setShowEntranceAnimation(false);
    }, 1400);

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    }
  }, []);

  // Slide navigation & animation stepping handlers (PowerPoint-style)
  const handleAdvance = useCallback(() => {
    if (slideAnimationStep < currentSlideTotalSteps - 1) {
      // Advance to the next animation step / part (sound effect)
      soundEffects.playRotateSound();
      setSlideAnimationStep((prev) => prev + 1);
    } else {
      // Reached the end of effects on this slide -> advance to the next slide!
      soundEffects.playSlideSound();
      setSlideDirection(1);
      if (currentSlideIndex < currentDeck.slides.length - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
        setSlideAnimationStep(0);
        setCurrentSlideTotalSteps(1);
      } else if (isAutoPlaying) {
        setCurrentSlideIndex(0); // Loop back
        setSlideAnimationStep(0);
        setCurrentSlideTotalSteps(1);
      }
    }
  }, [slideAnimationStep, currentSlideTotalSteps, currentSlideIndex, currentDeck.slides.length, isAutoPlaying]);

  const handleStepBack = useCallback(() => {
    if (slideAnimationStep > 0) {
      // Step backwards through the animation step
      soundEffects.playRotateSound();
      setSlideAnimationStep((prev) => prev - 1);
    } else {
      // Go to previous slide
      soundEffects.playSlideSound();
      setSlideDirection(-1);
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex((prev) => prev - 1);
        setSlideAnimationStep(0);
        setCurrentSlideTotalSteps(1);
      }
    }
  }, [slideAnimationStep, currentSlideIndex]);

  const nextSlide = useCallback(() => {
    setSlideDirection(1);
    if (currentSlideIndex < currentDeck.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setSlideAnimationStep(0);
      setCurrentSlideTotalSteps(1);
    } else if (isAutoPlaying) {
      setCurrentSlideIndex(0);
      setSlideAnimationStep(0);
      setCurrentSlideTotalSteps(1);
    }
  }, [currentSlideIndex, currentDeck.slides.length, isAutoPlaying]);

  const prevSlide = useCallback(() => {
    setSlideDirection(-1);
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setSlideAnimationStep(0);
      setCurrentSlideTotalSteps(1);
    }
  }, [currentSlideIndex]);

  // Autoplay Timer
  useEffect(() => {
    let timer: any = null;
    if (isAutoPlaying && activeMenu === 'presentation') {
      timer = setInterval(() => {
        handleAdvance();
      }, autoPlayIntervalSeconds * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, autoPlayIntervalSeconds, handleAdvance, activeMenu]);

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (activeMenu !== 'presentation') {
        if (e.key === 'Escape') setActiveMenu('presentation');
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          handleAdvance();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          handleStepBack();
          break;
        case 'f':
        case 'F':
        case 'F5':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          startPresentationMode();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          setLaserEnabled((prev) => !prev);
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setViewMode((prev) => (prev === 'slideshow' ? 'normal' : 'slideshow'));
          break;
        case 'g':
        case 'G':
          e.preventDefault();
          setShowOverviewGrid((prev) => !prev);
          break;
        case 'e':
        case 'E':
          e.preventDefault();
          setShowEditorModal((prev) => !prev);
          break;
        case '?':
          e.preventDefault();
          setShowShortcutsModal(true);
          break;
        case 'Escape':
          setViewMode('normal');
          setIsBlackout(false);
          setShowNotesDrawer(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAdvance, handleStepBack, activeMenu, startPresentationMode]);

  const handleSelectDeck = (deckId: string) => {
    setCurrentDeckId(deckId);
    setCurrentSlideIndex(0);
  };

  const handleCreateNewDeck = (newDeck: PresentationDeck) => {
    setDecks((prev) => [newDeck, ...prev]);
    setCurrentDeckId(newDeck.id);
    setCurrentSlideIndex(0);
    setActiveMenu('presentation');
    setViewMode('normal');
  };

  const handleUpdateDeck = (updatedDeck: PresentationDeck) => {
    setDecks((prev) => prev.map((d) => (d.id === updatedDeck.id ? updatedDeck : d)));
  };

  const handleFontChange = (fontId: FontPairing) => {
    const updated = { ...currentDeck, fontPairing: fontId };
    handleUpdateDeck(updated);
  };

  const handleThemeChange = (themeId: DeckTheme) => {
    const updated = { ...currentDeck, theme: themeId };
    handleUpdateDeck(updated);
  };

  const handleAddSlide = (type: SlideLayoutType) => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      type,
      title: `New Strategic Slide (Slide ${currentDeck.slides.length + 1})`,
      subtitle: 'Provide supporting context and analysis for this strategic topic',
      categoryKicker: 'STRATEGIC ARGUMENT',
      notes: 'Speaker talking cues: Present the governing thesis with clarity.',
      timeRecommendationSeconds: 120,
      data: {
        problemSummary: 'Summary of the governing strategic challenge or operational dilemma.',
        solutionOverview: 'Integrated target solution architecture addressing root causes.',
        finalMessage: 'Key strategic takeaway and call to action.',
        pillars: [
          { number: '01', title: 'Pillar 1', subtitle: 'Workstream A', description: 'Detailed workstream initiative description', keyPoints: ['Deliverable 1', 'Deliverable 2'] },
          { number: '02', title: 'Pillar 2', subtitle: 'Workstream B', description: 'Detailed workstream initiative description', keyPoints: ['Deliverable 1', 'Deliverable 2'] },
          { number: '03', title: 'Pillar 3', subtitle: 'Workstream C', description: 'Detailed workstream initiative description', keyPoints: ['Deliverable 1', 'Deliverable 2'] }
        ],
        metrics: [
          { label: 'KPI Metric 1', value: '85%', change: '+15%', changePositive: true, context: 'YoY Growth rate' },
          { label: 'KPI Metric 2', value: '2.4x', change: '+35%', changePositive: true, context: 'Capital efficiency multiple' }
        ],
        chartData: [
          { label: 'Baseline Approach', value: 45 },
          { label: 'Target Strategy', value: 85 }
        ]
      }
    };

    const updatedSlides = [...currentDeck.slides, newSlide];
    const updated = { ...currentDeck, slides: updatedSlides };
    handleUpdateDeck(updated);
    setCurrentSlideIndex(updatedSlides.length - 1);
  };

  const handleDuplicateSlide = (index: number) => {
    const slideToCopy = currentDeck.slides[index];
    const newSlide = {
      ...slideToCopy,
      id: `copy-${Date.now()}`,
      title: `${slideToCopy.title} (Copy)`
    };
    const updatedSlides = [
      ...currentDeck.slides.slice(0, index + 1),
      newSlide,
      ...currentDeck.slides.slice(index + 1)
    ];
    const updated = { ...currentDeck, slides: updatedSlides };
    handleUpdateDeck(updated);
    setCurrentSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (currentDeck.slides.length <= 1) return;
    const updatedSlides = currentDeck.slides.filter((_, i) => i !== index);
    const newIndex = Math.min(currentSlideIndex, updatedSlides.length - 1);
    const updated = { ...currentDeck, slides: updatedSlides };
    handleUpdateDeck(updated);
    setCurrentSlideIndex(newIndex);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentDeck.slides.length) return;

    const updatedSlides = [...currentDeck.slides];
    const temp = updatedSlides[index];
    updatedSlides[index] = updatedSlides[targetIndex];
    updatedSlides[targetIndex] = temp;

    const updated = { ...currentDeck, slides: updatedSlides };
    handleUpdateDeck(updated);
    setCurrentSlideIndex(targetIndex);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Laser Pointer Overlay */}
      <LaserPointer enabled={laserEnabled} spotlightMode={spotlightEnabled} />

      {/* Cinematic Entrance Animation Overlay when Key B or Present is pressed */}
      <AnimatePresence>
        {showEntranceAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-3"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase font-sans">
                THEMASTER PRESENTATION
              </div>
              <div className="text-xs font-mono text-amber-400 tracking-wider uppercase">
                {currentDeck.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POWERPOINT-STYLE TOP RIBBON */}
      <PowerPointRibbon
        activeTab={activeRibbonTab}
        onTabChange={setActiveRibbonTab}
        deck={currentDeck}
        decks={decks}
        onSelectDeck={handleSelectDeck}
        currentSlideIndex={currentSlideIndex}
        onAddSlide={handleAddSlide}
        onDuplicateCurrentSlide={() => handleDuplicateSlide(currentSlideIndex)}
        onDeleteCurrentSlide={() => handleDeleteSlide(currentSlideIndex)}
        onFontChange={handleFontChange}
        onThemeChange={handleThemeChange}
        onOpenOverview={() => setShowOverviewGrid(true)}
        onOpenEditor={() => setShowEditorModal(true)}
        onOpenPresenter={() => setShowPresenterModal(true)}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        laserEnabled={laserEnabled}
        onToggleLaser={() => {
          setLaserEnabled(!laserEnabled);
          setSpotlightEnabled(false);
        }}
        isBlackout={isBlackout}
        onToggleBlackout={() => setIsBlackout(!isBlackout)}
        isAutoPlaying={isAutoPlaying}
        onToggleAutoPlay={() => setIsAutoPlaying(!isAutoPlaying)}
        autoPlayInterval={autoPlayIntervalSeconds}
        onAutoPlayIntervalChange={setAutoPlayIntervalSeconds}
        showNotes={showNotesDrawer}
        onToggleNotes={() => setShowNotesDrawer(!showNotesDrawer)}
        onOpenShortcuts={() => setShowShortcutsModal(true)}
        onPrint={handlePrint}
        onShare={handleShare}
        onGoHome={() => setActiveMenu('home')}
        showLeftFilmstrip={showLeftFilmstrip}
        onToggleLeftFilmstrip={() => setShowLeftFilmstrip(!showLeftFilmstrip)}
        onToggleSlideshow={() => setViewMode((prev) => (prev === 'slideshow' ? 'normal' : 'slideshow'))}
      />

      {/* VIEW 1: HOME & DECK CREATOR */}
      {activeMenu === 'home' && (
        <main className="flex-1 overflow-y-auto">
          <HomeView
            decks={decks}
            onSelectDeck={handleSelectDeck}
            onCreateNewDeck={handleCreateNewDeck}
            onGoToCurrentPresentation={() => {
              setActiveMenu('presentation');
              setViewMode('normal');
            }}
            currentDeckId={currentDeckId}
          />
        </main>
      )}

      {/* VIEW 2: PRESENTATION WORKSPACE */}
      {activeMenu === 'presentation' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 1. SLIDE SORTER VIEW (PowerPoint Grid Mode) */}
          {viewMode === 'sorter' && (
            <SlideSorterView
              deck={currentDeck}
              currentSlideIndex={currentSlideIndex}
              onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
              onAddSlide={handleAddSlide}
              onDuplicateSlide={handleDuplicateSlide}
              onDeleteSlide={handleDeleteSlide}
              onMoveSlide={handleMoveSlide}
              onSwitchToNormalView={() => setViewMode('normal')}
            />
          )}

          {/* 2. FULL-SCREEN SLIDESHOW VIEW (Edge-to-Edge True Full Screen) */}
          {viewMode === 'slideshow' && (
            <div
              className="fixed inset-0 z-50 bg-stone-950 flex items-center justify-center cursor-pointer select-none overflow-hidden p-0"
              onClick={handleAdvance}
            >
              {/* Minimalist Exit 'X' Button in Slideshow view */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setViewMode('normal');
                }}
                className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-900 border border-white/10 hover:border-white/30 text-stone-400 hover:text-white shadow-2xl opacity-40 hover:opacity-100 transition-all cursor-pointer backdrop-blur-md"
                title="Thoát chế độ Thuyết trình (Esc / Phím N)"
                aria-label="Thoát chế độ Thuyết trình"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full flex flex-col overflow-hidden relative">
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={currentSlide.id}
                    custom={slideDirection}
                    variants={slideTransitionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full h-full flex flex-col overflow-hidden relative"
                  >
                    <SlideRenderer
                      slide={currentSlide}
                      theme={theme}
                      fontPairing={currentFontPairing}
                      stepIndex={slideAnimationStep}
                      onSetStepIndex={setSlideAnimationStep}
                      onRegisterSteps={setCurrentSlideTotalSteps}
                      onNextAction={handleAdvance}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* 3. READING VIEW (Distraction-Free) */}
          {viewMode === 'reading' && (
            <main className="flex-1 flex flex-col justify-center items-center p-6 bg-stone-950 overflow-y-auto">
              <div className="w-full max-w-5xl aspect-video my-auto rounded-2xl overflow-hidden border border-stone-800 shadow-2xl cursor-pointer" onClick={handleAdvance}>
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={currentSlide.id}
                    custom={slideDirection}
                    variants={slideTransitionVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`w-full h-full ${theme.slideBg} flex flex-col overflow-hidden relative`}
                  >
                    <SlideRenderer
                      slide={currentSlide}
                      theme={theme}
                      fontPairing={currentFontPairing}
                      stepIndex={slideAnimationStep}
                      onSetStepIndex={setSlideAnimationStep}
                      onRegisterSteps={setCurrentSlideTotalSteps}
                      onNextAction={handleAdvance}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          )}

          {/* 3. NORMAL VIEW (Standard Stage + Left Filmstrip) */}
          {viewMode === 'normal' && (
            <div className="flex-1 flex overflow-hidden">
              {/* Left Filmstrip Rail */}
              {showLeftFilmstrip && (
                <SlideFilmstrip
                  deck={currentDeck}
                  currentSlideIndex={currentSlideIndex}
                  onSelectSlide={(idx) => {
                    setSlideDirection(idx >= currentSlideIndex ? 1 : -1);
                    setCurrentSlideIndex(idx);
                    setSlideAnimationStep(0);
                    setCurrentSlideTotalSteps(1);
                  }}
                  onAddSlide={handleAddSlide}
                  onDuplicateSlide={handleDuplicateSlide}
                  onDeleteSlide={handleDeleteSlide}
                  onMoveSlide={handleMoveSlide}
                />
              )}

              {/* Main Center Canvas with dynamic Fit to Window ref */}
              <main
                ref={canvasContainerRef}
                className="flex-1 flex flex-col justify-between items-center p-3 sm:p-5 relative overflow-hidden bg-stone-950"
              >
                {/* Blackout Screen Cover when 'B' is pressed */}
                {isBlackout && (
                  <div
                    onClick={() => setIsBlackout(false)}
                    className="fixed inset-0 z-40 bg-black flex items-center justify-center cursor-pointer text-stone-600 text-xs font-mono"
                  >
                    <span>[Black Screen Mode Active. Press 'B' or click anywhere to resume presentation]</span>
                  </div>
                )}

                {/* Top Action Bar: Slide Info + Prominent Presentation Mode Button */}
                <div className="w-full max-w-5xl flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-stone-400">
                      Slide {currentSlideIndex + 1} of {currentDeck.slides.length}
                    </span>
                    <span className="text-stone-700">·</span>
                    <span className="text-xs font-semibold text-stone-300 truncate max-w-xs sm:max-w-md">
                      {currentSlide.title}
                    </span>
                  </div>

                  {/* Prominent Presentation Button matching Key N */}
                  <button
                    onClick={() => setViewMode('slideshow')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer hover:scale-105 active:scale-95 border border-amber-400/40"
                    title="Bật chế độ Thuyết trình toàn màn hình (Phím N)"
                  >
                    <MonitorPlay className="w-4 h-4 fill-stone-950" />
                    <span>Chế độ thuyết trình (Phím N)</span>
                  </button>
                </div>

                {/* 16:9 Slide Stage */}
                <div
                  className="w-full max-w-5xl aspect-video max-h-[75vh] my-auto flex flex-col relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl transition-all duration-300"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                >
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={currentSlide.id}
                      custom={slideDirection}
                      variants={slideTransitionVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className={`w-full h-full ${theme.slideBg} flex flex-col overflow-hidden relative`}
                    >
                      <SlideRenderer
                        slide={currentSlide}
                        theme={theme}
                        fontPairing={currentFontPairing}
                        stepIndex={slideAnimationStep}
                        onSetStepIndex={setSlideAnimationStep}
                        onRegisterSteps={setCurrentSlideTotalSteps}
                        onNextAction={handleAdvance}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Speaker Notes Drawer */}
                {showNotesDrawer && (
                  <div className="no-print mt-2 w-full max-w-5xl p-3.5 bg-stone-900 border border-stone-800 rounded-xl flex items-start justify-between gap-4 text-xs text-stone-200 shadow-lg">
                    <div className="space-y-1">
                      <span className="font-bold text-amber-400 uppercase tracking-wider block text-[11px]">
                        Speaker Talking Cues for Slide {currentSlideIndex + 1}:
                      </span>
                      <p className="leading-relaxed font-light whitespace-pre-wrap">
                        {currentSlide.notes || 'No notes added for this slide.'}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNotesDrawer(false)}
                      className="p-1 text-stone-400 hover:text-white shrink-0 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </main>
            </div>
          )}

          {/* POWERPOINT BOTTOM STATUS BAR (With 4 View Mode Switchers & Zoom Slider) */}
          <PowerPointStatusBar
            currentSlideIndex={currentSlideIndex}
            totalSlides={currentDeck.slides.length}
            topic={currentDeck.topic}
            readTimeMinutes={currentDeck.readTimeMinutes}
            viewMode={viewMode}
            onViewModeChange={(mode) => setViewMode(mode)}
            showNotes={showNotesDrawer}
            onToggleNotes={() => setShowNotesDrawer(!showNotesDrawer)}
            laserEnabled={laserEnabled}
            onToggleLaser={() => {
              setLaserEnabled(!laserEnabled);
              setSpotlightEnabled(false);
            }}
            onOpenPresenter={() => setShowPresenterModal(true)}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onPrevSlide={handleStepBack}
            onNextSlide={handleAdvance}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            onFitZoom={handleFitZoom}
          />
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-16 right-8 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>Deck share link copied to clipboard!</span>
        </div>
      )}

      {/* PRINT VIEW: Sequential slides for clean PDF generation */}
      {isPrinting && (
        <div className="hidden print:block">
          {currentDeck.slides.map((slide, idx) => (
            <div key={slide.id} className="print-slide aspect-video w-full h-screen p-8 bg-stone-950 text-white flex flex-col justify-between">
              <div className="text-xs font-mono text-stone-400 pb-2 border-b border-stone-800">
                Slide {idx + 1} of {currentDeck.slides.length} · {currentDeck.title}
              </div>
              <div className="flex-1 py-4">
                <SlideRenderer slide={slide} theme={theme} fontPairing={currentFontPairing} />
              </div>
              {slide.notes && (
                <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-800 italic">
                  Speaker notes: {slide.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODALS */}
      <SlideOverviewGrid
        isOpen={showOverviewGrid}
        onClose={() => setShowOverviewGrid(false)}
        deck={currentDeck}
        currentSlideIndex={currentSlideIndex}
        onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
      />

      <SlideEditorModal
        isOpen={showEditorModal}
        onClose={() => setShowEditorModal(false)}
        deck={currentDeck}
        currentSlideIndex={currentSlideIndex}
        onUpdateDeck={handleUpdateDeck}
        onSelectSlide={(idx) => setCurrentSlideIndex(idx)}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
    </div>
  );
}
