import React, { useState } from 'react';
import { PresentationDeck, Slide, SlideLayoutType, DeckTheme } from '../types/presentation';
import { THEMES, FONT_PAIRINGS } from './ThemeManager';
import { X, Plus, Trash2, Copy, Save, LayoutTemplate, Palette, ArrowUp, ArrowDown, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deck: PresentationDeck;
  currentSlideIndex: number;
  onUpdateDeck: (updatedDeck: PresentationDeck) => void;
  onSelectSlide: (index: number) => void;
}

export const SlideEditorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  deck,
  currentSlideIndex,
  onUpdateDeck,
  onSelectSlide,
}) => {
  const [activeTab, setActiveTab] = useState<'edit_slide' | 'manage_deck' | 'theme'>('edit_slide');
  const [localDeck, setLocalDeck] = useState<PresentationDeck>(deck);
  const [editingIndex, setEditingIndex] = useState<number>(currentSlideIndex);

  if (!isOpen) return null;

  const currentSlide = localDeck.slides[editingIndex] || localDeck.slides[0];

  const handleSlideFieldChange = (field: keyof Slide, value: any) => {
    const updatedSlides = [...localDeck.slides];
    updatedSlides[editingIndex] = {
      ...updatedSlides[editingIndex],
      [field]: value,
    };
    const updated = { ...localDeck, slides: updatedSlides };
    setLocalDeck(updated);
    onUpdateDeck(updated);
  };

  const handleAddNewSlide = (type: SlideLayoutType) => {
    const newSlide: Slide = {
      id: `custom-slide-${Date.now()}`,
      type,
      title: `New Slide Title (Slide ${localDeck.slides.length + 1})`,
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

    const updatedSlides = [...localDeck.slides, newSlide];
    const updated = { ...localDeck, slides: updatedSlides };
    setLocalDeck(updated);
    onUpdateDeck(updated);
    setEditingIndex(updatedSlides.length - 1);
    onSelectSlide(updatedSlides.length - 1);
  };

  const handleDuplicateSlide = (index: number) => {
    const slideToCopy = localDeck.slides[index];
    const newSlide = {
      ...slideToCopy,
      id: `copy-${Date.now()}`,
      title: `${slideToCopy.title} (Copy)`
    };
    const updatedSlides = [
      ...localDeck.slides.slice(0, index + 1),
      newSlide,
      ...localDeck.slides.slice(index + 1)
    ];
    const updated = { ...localDeck, slides: updatedSlides };
    setLocalDeck(updated);
    onUpdateDeck(updated);
  };

  const handleDeleteSlide = (index: number) => {
    if (localDeck.slides.length <= 1) return;
    const updatedSlides = localDeck.slides.filter((_, i) => i !== index);
    const newIndex = Math.min(editingIndex, updatedSlides.length - 1);
    const updated = { ...localDeck, slides: updatedSlides };
    setLocalDeck(updated);
    onUpdateDeck(updated);
    setEditingIndex(newIndex);
    onSelectSlide(newIndex);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= localDeck.slides.length) return;

    const updatedSlides = [...localDeck.slides];
    const temp = updatedSlides[index];
    updatedSlides[index] = updatedSlides[targetIndex];
    updatedSlides[targetIndex] = temp;

    const updated = { ...localDeck, slides: updatedSlides };
    setLocalDeck(updated);
    onUpdateDeck(updated);
    setEditingIndex(targetIndex);
    onSelectSlide(targetIndex);
  };

  const handleThemeSelect = (themeId: DeckTheme) => {
    const updated = { ...localDeck, theme: themeId };
    setLocalDeck(updated);
    onUpdateDeck(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header & Tabs */}
        <header className="px-6 py-4 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <LayoutTemplate className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Slide Deck Editor & Customizer</h2>
          </div>

          <div className="flex items-center gap-2 p-1 bg-stone-950 border border-stone-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('edit_slide')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'edit_slide' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Edit Slide Content
            </button>
            <button
              onClick={() => setActiveTab('manage_deck')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'manage_deck' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Add & Reorder ({localDeck.slides.length})
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'theme' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Typography & Theme
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: EDIT CURRENT SLIDE */}
          {activeTab === 'edit_slide' && currentSlide && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Slide Selector Mini Rail */}
              <div className="lg:col-span-4 space-y-2 border-r border-stone-800 pr-4 max-h-[60vh] overflow-y-auto">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  Slides in Deck:
                </div>
                {localDeck.slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setEditingIndex(idx);
                      onSelectSlide(idx);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                      editingIndex === idx
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-semibold'
                        : 'bg-stone-950 text-stone-400 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <span className="font-mono text-[10px] text-stone-500 mr-1.5">0{idx + 1}.</span>
                      <span>{s.title}</span>
                    </div>
                    <span className="text-[9px] font-mono uppercase text-stone-500 shrink-0">
                      {s.type.slice(0, 8)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Slide Fields Editor Form */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <span className="text-xs font-mono text-amber-400 font-bold">
                    Editing Slide {editingIndex + 1}: {currentSlide.type}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDuplicateSlide(editingIndex)}
                      className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1 cursor-pointer"
                      title="Duplicate this slide"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>
                    {localDeck.slides.length > 1 && (
                      <button
                        onClick={() => handleDeleteSlide(editingIndex)}
                        className="p-1.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 text-xs flex items-center gap-1 cursor-pointer"
                        title="Delete this slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Slide Title</label>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => handleSlideFieldChange('title', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Subtitle / Context Lead</label>
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => handleSlideFieldChange('subtitle', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-sm text-stone-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">Category Kicker</label>
                    <input
                      type="text"
                      value={currentSlide.categoryKicker || ''}
                      onChange={(e) => handleSlideFieldChange('categoryKicker', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300">Pacing Recommendation (Seconds)</label>
                    <input
                      type="number"
                      value={currentSlide.timeRecommendationSeconds || 120}
                      onChange={(e) => handleSlideFieldChange('timeRecommendationSeconds', Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Speaker Talking Notes & Board Cues (Private)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={currentSlide.notes}
                    onChange={(e) => handleSlideFieldChange('notes', e.target.value)}
                    placeholder="Enter private cues, statistics, and prompts for the presenter view..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs md:text-sm text-stone-200 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE & ADD NEW TEMPLATES */}
          {activeTab === 'manage_deck' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Insert Slide from Pre-Architected Templates:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { type: 'hero_title' as SlideLayoutType, label: 'Executive Cover (Hero Title)', desc: 'Large title, animated welcome, strategic highlights' },
                    { type: 'rotating_wheel' as SlideLayoutType, label: 'Rotating Radial Wheel (Multi-Part)', desc: '360° rotating dial with PART 01-04, divider, & More Info' },
                    { type: 'problem_breakdown' as SlideLayoutType, label: 'Problem Diagnostics', desc: '5 Whys deconstruction, severity tags, and impact data' },
                    { type: 'solution_architecture' as SlideLayoutType, label: '3-Pillar Solution Architecture', desc: '3 core pillars with actionable initiatives' },
                    { type: 'data_metrics' as SlideLayoutType, label: 'Empirical Data & KPI Metrics', desc: 'Interactive bar chart and 3 KPI metric cards' },
                    { type: 'comparative_matrix' as SlideLayoutType, label: 'Before vs After Matrix', desc: 'Direct benchmark gap analysis against legacy status quo' },
                    { type: 'interactive_timeline' as SlideLayoutType, label: 'Phased Execution Roadmap', desc: '4-phase milestone deliverables and progress status' },
                    { type: 'interactive_simulator' as SlideLayoutType, label: 'Scenario Simulator Widget', desc: 'Interactive sliders calculating real-time economic returns' },
                    { type: 'deep_dive_quote' as SlideLayoutType, label: 'Philosophy & Pull Quote', desc: 'High-impact thought leadership quote with author attribution' },
                    { type: 'action_call' as SlideLayoutType, label: 'Action Checklist & Q&A', desc: 'Next milestones, accountable owners, and contact info' },
                  ].map((tpl) => (
                    <button
                      key={tpl.type}
                      onClick={() => handleAddNewSlide(tpl.type)}
                      className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 hover:border-amber-500 text-left transition-all hover:bg-stone-800/80 cursor-pointer space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{tpl.label}</span>
                        <Plus className="w-4 h-4 text-amber-400" />
                      </div>
                      <p className="text-[11px] text-stone-400">{tpl.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reorder Slides Section */}
              <div className="pt-4 border-t border-stone-800">
                <h3 className="text-sm font-bold text-white mb-2">Reorder & Organize Slides ({localDeck.slides.length}):</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {localDeck.slides.map((s, idx) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-stone-500 font-bold w-6">0{idx + 1}.</span>
                        <div>
                          <div className="font-semibold text-white">{s.title}</div>
                          <div className="text-[10px] font-mono text-stone-400 uppercase">{s.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveSlide(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-20 text-stone-300 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveSlide(idx, 'down')}
                          disabled={idx === localDeck.slides.length - 1}
                          className="p-1 rounded bg-stone-800 hover:bg-stone-700 disabled:opacity-20 text-stone-300 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        {localDeck.slides.length > 1 && (
                          <button
                            onClick={() => handleDeleteSlide(idx)}
                            className="p-1 rounded bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800/40 ml-1 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THEMES & STYLING */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              {/* Font Selection */}
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Typography Pairing</h3>
                <p className="text-xs text-stone-400 mb-3">Select the calibrated font pairing for the entire presentation deck</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.values(FONT_PAIRINGS).map((font) => {
                    const isSelected = (localDeck.fontPairing || 'bevietnam-jetbrains') === font.id;
                    return (
                      <button
                        key={font.id}
                        onClick={() => {
                          const updated = { ...localDeck, fontPairing: font.id };
                          setLocalDeck(updated);
                          onUpdateDeck(updated);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-stone-800 text-white ring-2 ring-amber-500/40'
                            : 'border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{font.name}</span>
                          {isSelected && <span className="text-[10px] text-amber-400 font-mono">Active</span>}
                        </div>
                        <p className="text-[11px] text-stone-400">{font.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme Color Selection */}
              <div className="pt-4 border-t border-stone-800">
                <h3 className="text-sm font-bold text-white mb-1">Deck Color Palette (Theme)</h3>
                <p className="text-xs text-stone-400 mb-3">Apply a synchronized color scheme across all slide layouts</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.values(THEMES).map((themeOption) => {
                    const isSelected = localDeck.theme === themeOption.id;
                    return (
                      <button
                        key={themeOption.id}
                        onClick={() => handleThemeSelect(themeOption.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-3 ${
                          isSelected
                            ? 'border-amber-500 ring-2 ring-amber-500/50 bg-stone-800'
                            : 'border-stone-800 bg-stone-950 hover:border-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{themeOption.name}</span>
                          {isSelected && <span className="text-xs text-amber-400 font-mono">Selected</span>}
                        </div>

                        {/* Theme preview swatch */}
                        <div className="h-10 rounded-lg p-2 flex items-center justify-between border border-white/10" style={{ background: themeOption.id === 'minimal-light' ? '#F9F8F6' : '#181615' }}>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-3.5 h-3.5 rounded-full ${themeOption.chartBarPrimary}`} />
                            <span className={`text-xs font-bold ${themeOption.id === 'minimal-light' ? 'text-stone-900' : 'text-stone-100'}`}>
                              Aa 123
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono ${themeOption.accentText}`}>Accent</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-stone-800 flex items-center justify-between bg-stone-900 shrink-0">
          <div className="text-xs text-stone-400 font-mono">
            Changes are saved live to the active session
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Return</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
