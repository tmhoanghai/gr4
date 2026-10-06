import React, { useState } from 'react';
import { PresentationDeck, DeckTheme, FontPairing } from '../types/presentation';
import { THEMES, FONT_PAIRINGS } from './ThemeManager';
import { Plus, ArrowRight, Play, LayoutTemplate, Type, Palette, Sparkles, Check, BookOpen } from 'lucide-react';

interface Props {
  decks: PresentationDeck[];
  onSelectDeck: (deckId: string) => void;
  onCreateNewDeck: (newDeck: PresentationDeck) => void;
  onGoToCurrentPresentation: () => void;
  currentDeckId: string;
}

export const HomeView: React.FC<Props> = ({
  decks,
  onSelectDeck,
  onCreateNewDeck,
  onGoToCurrentPresentation,
  currentDeckId,
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('Presenter');
  const [selectedTheme, setSelectedTheme] = useState<DeckTheme>('editorial-stone');
  const [selectedFont, setSelectedFont] = useState<FontPairing>('bevietnam-jetbrains');
  const [selectedCategory, setSelectedCategory] = useState<PresentationDeck['category']>('Problem & Solution');

  const currentDeck = decks.find((d) => d.id === currentDeckId) || decks[0];

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDeck: PresentationDeck = {
      id: `deck-${Date.now()}`,
      title: newTitle.trim(),
      topic: newTopic.trim() || 'Strategic Issue Brief',
      description: `Structured problem presentation and executive analysis: ${newTitle.trim()}`,
      author: newAuthor.trim() || 'Executive Presenter',
      authorRole: 'Lead Strategic Presenter',
      organization: 'TheMaster Strategy Platform',
      date: 'October 2026',
      readTimeMinutes: 15,
      category: selectedCategory,
      theme: selectedTheme,
      fontPairing: selectedFont,
      coverImage: '/src/assets/images/hero_urban_mobility_challenge_1791008116245.jpg',
      slides: [
        {
          id: `slide-hero-${Date.now()}`,
          type: 'hero_title',
          title: newTitle.trim(),
          subtitle: newTopic.trim() ? `Strategic Deconstruction: ${newTopic.trim()}` : 'A Comprehensive Framework for Executive Decision-Making',
          categoryKicker: 'EXECUTIVE STRATEGY DECK',
          notes: 'Opening: Introduce context, problem boundaries, and core objectives to achieve with the board.',
          timeRecommendationSeconds: 120,
          data: {
            authorName: newAuthor.trim() || 'Executive Presenter',
            authorTitle: 'Lead Strategic Presenter',
            organization: 'TheMaster Platform',
            heroHighlights: [
              'Identification of 3 Systemic Bottlenecks',
              'Integrated 3-Pillar Solution Architecture',
              'Quantifiable 4-Phase Phased Execution Plan'
            ]
          }
        },
        {
          id: `slide-prob-${Date.now()}`,
          type: 'problem_breakdown',
          title: 'Root Cause Breakdown: Systemic Vulnerabilities',
          subtitle: 'Why traditional piecemeal fixes fail to resolve the core dilemma',
          categoryKicker: '01. PROBLEM DIAGNOSTICS',
          notes: 'Highlight the 3 core root causes and the exponential cost of delayed action.',
          timeRecommendationSeconds: 150,
          data: {
            problemSummary: 'A concise synthesis of the systemic bottlenecks hindering operational progress or wasting organizational capital.',
            rootCauses: [
              { title: 'Root Cause 1: Process Disconnect', desc: 'Lack of synchronized workflow interoperability across core business units.', severity: 'Critical', stat: '70% Delay Factor' },
              { title: 'Root Cause 2: Data Latency', desc: 'Manual batch reporting leaves leadership blind to rapid market inflections.', severity: 'High', stat: '3x Hidden Costs' },
              { title: 'Root Cause 3: Fragmented Capital Allocation', desc: 'Spreading resources too thinly across marginal initiatives.', severity: 'Medium', stat: '45% Inefficiency' }
            ],
            impactStatement: 'Aggregate Risk: 35% productivity erosion and escalated long-term systemic exposure if unaddressed.'
          }
        },
        {
          id: `slide-sol-${Date.now()}`,
          type: 'solution_architecture',
          title: 'The 3-Pillar Strategic Solution Architecture',
          subtitle: 'Shifting from reactive firefighting to an autonomous, resilient operating model',
          categoryKicker: '02. TARGET SOLUTION',
          notes: 'Detail each pillar and their compounding mutual leverage.',
          timeRecommendationSeconds: 180,
          data: {
            solutionOverview: 'An integrated framework directly attacking the root bottlenecks identified in diagnostics.',
            pillars: [
              { number: '01', title: 'Core Foundation', subtitle: 'Standardize & De-bottleneck', description: 'Restructure operational workflows and eliminate obsolete dependencies.', keyPoints: ['50% cycle time reduction', 'Full governance transparency'] },
              { number: '02', title: 'Technology Leverage', subtitle: 'Real-Time Automation', description: 'Deploy live telemetry dashboards for instant executive visibility.', keyPoints: ['Zero manual reconciliation', 'Predictive anomaly alerts'] },
              { number: '03', title: 'People & Accountability', subtitle: 'Incentive Alignment', description: 'Tie clear ownership to verifiable quantitative KPI deliverables.', keyPoints: ['Targeted skill enablement', 'Outcome-driven compensation'] }
            ]
          }
        },
        {
          id: `slide-act-${Date.now()}`,
          type: 'action_call',
          title: 'Execution Plan & Governance Next Steps',
          subtitle: 'Clear ownership, accountable deliverables, and timeline commitments',
          categoryKicker: '03. IMMEDIATE ACTIONS',
          notes: 'Summarize core commitments and invite stakeholders to open discussion.',
          timeRecommendationSeconds: 100,
          data: {
            finalMessage: 'Decisive execution today establishes the resilient foundation for scalable long-term growth.',
            actionPoints: [
              { step: 'Weeks 1-2', title: 'Charter the Steering Committee', desc: 'Align executive sponsors and designate accountable workstream leads.', owner: 'Executive Board' },
              { step: 'Month 1', title: 'Launch Phase 1 Pilot Deployment', desc: 'Implement target operating model across priority pilot segment.', owner: 'Transformation PMO' },
              { step: 'Month 3', title: 'Enterprise-Wide Rollout', desc: 'Scale tested framework across all operating divisions.', owner: 'Operating Units' }
            ],
            contactInfo: {
              email: 'presenter@themaster.io',
              website: 'https://themaster.io'
            }
          }
        }
      ]
    };

    onCreateNewDeck(newDeck);
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 font-sans">
      {/* Hero Welcome Banner */}
      <div className="border-b border-stone-800/80 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span>TheMaster Presentation Engine</span>
            <span>·</span>
            <span>Executive Precision</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Executive Problem Structuring & Presentation
          </h1>
          <p className="text-sm sm:text-base text-stone-400 leading-relaxed font-light">
            Not just generic slides — TheMaster is engineered for structuring complex issues, defensible strategic arguments, empirical benchmarks, and clear execution roadmaps.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Presentation</span>
          </button>

          <button
            onClick={onGoToCurrentPresentation}
            className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:bg-stone-800 text-stone-200 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 text-amber-400" />
            <span>Open Active Deck</span>
          </button>
        </div>
      </div>

      {/* Currently Active Presentation Spotlight */}
      <div className="p-6 md:p-8 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono text-amber-400 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Active Presentation
          </span>
          <span className="text-stone-400">{currentDeck.slides.length} Slides · ~{currentDeck.readTimeMinutes} min pacing</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
              {currentDeck.title}
            </h2>
            <p className="text-sm text-stone-300 font-light leading-relaxed">
              {currentDeck.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 pt-2">
              <span>Presenter: <strong className="text-white">{currentDeck.author}</strong></span>
              <span>·</span>
              <span>Domain: <strong className="text-stone-300">{currentDeck.topic}</strong></span>
              <span>·</span>
              <span>Typography: <strong className="text-stone-300">{FONT_PAIRINGS[currentDeck.fontPairing || 'bevietnam-jetbrains']?.name || 'Be Vietnam Pro'}</strong></span>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={onGoToCurrentPresentation}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Present Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Library of Pre-Built Topic Templates */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Master Presentation Decks Library
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Choose an executive master deck below to inspect its structured logic and tailor it to your domain:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => {
            const isCurrent = deck.id === currentDeckId;
            return (
              <div
                key={deck.id}
                className={`group rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isCurrent
                    ? 'bg-stone-900 border-amber-500 ring-2 ring-amber-500/40 shadow-xl'
                    : 'bg-stone-900/40 border-stone-800/80 hover:border-stone-600 hover:bg-stone-900/80'
                }`}
                onClick={() => {
                  onSelectDeck(deck.id);
                  onGoToCurrentPresentation();
                }}
              >
                {/* Cover Image / Aspect Ratio */}
                <div className="aspect-video w-full relative overflow-hidden bg-stone-950 border-b border-stone-800">
                  <img
                    src={deck.coverImage}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                  <div className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-950/80 text-amber-400 border border-white/10">
                    {deck.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-medium text-stone-200 line-clamp-1">
                    {deck.topic}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {deck.title}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 font-light leading-relaxed">
                      {deck.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <span>{deck.slides.length} slides</span>
                      <span>·</span>
                      <span>{deck.readTimeMinutes} min</span>
                    </div>

                    <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isCurrent ? 'Active' : 'Open Deck'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography & Design Philosophy Info */}
      <div className="p-6 rounded-2xl bg-stone-900/30 border border-stone-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-stone-200">
            <Type className="w-4 h-4 text-amber-400" />
            <span>Curated Typography Engine</span>
          </div>
          <p className="text-stone-400 leading-relaxed font-light">
            Fully supports flawless multilingual typography (Inter, JetBrains Mono, Be Vietnam Pro, Lora, Source Serif, Lexend) with calibrated contrast.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-stone-200">
            <LayoutTemplate className="w-4 h-4 text-cyan-400" />
            <span>9 Strategic Problem Layouts</span>
          </div>
          <p className="text-stone-400 leading-relaxed font-light">
            From 5 Whys root cause diagnostics, 3-pillar architectures, Before vs After matrices to live interactive economic simulators.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-stone-200">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>PowerPoint Presenter Tools</span>
          </div>
          <p className="text-stone-400 leading-relaxed font-light">
            PowerPoint Ribbon, Slide Filmstrip, Slide Sorter matrix view, real-time stopwatch, red laser pointer, and blackout focus mode.
          </p>
        </div>
      </div>

      {/* CREATE NEW PRESENTATION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-stone-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Create New Presentation Deck</h2>
                <p className="text-xs text-stone-400">Initialize a structured problem deck with TheMaster executive architecture</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-300">Presentation Title / Core Problem Statement *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Generation Sustainable Logistics Strategy 2030"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Domain / Industry Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Urban Mobility & Clean Tech"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300">Lead Presenter / Team Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Alex Morgan"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Font Selection */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-stone-300">Typography Pairing</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.values(FONT_PAIRINGS).map((font) => (
                    <button
                      type="button"
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedFont === font.id
                          ? 'border-amber-500 bg-stone-800 text-white ring-1 ring-amber-500/50'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-200">{font.name}</div>
                      <div className="text-[10px] text-stone-400 line-clamp-1">{font.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-stone-300">Slide Theme & Color Palette</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.values(THEMES).map((thm) => (
                    <button
                      type="button"
                      key={thm.id}
                      onClick={() => setSelectedTheme(thm.id)}
                      className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedTheme === thm.id
                          ? 'border-amber-500 bg-stone-800 text-white'
                          : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <div className="text-xs font-semibold text-stone-200">{thm.name.split(' (')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  Create & Launch Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
