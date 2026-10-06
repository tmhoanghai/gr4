import { DeckTheme, FontPairing } from '../types/presentation';

export interface ThemeStyles {
  id: DeckTheme;
  name: string;
  bgGradient: string;
  slideBg: string;
  headerColor: string;
  bodyColor: string;
  mutedColor: string;
  cardBg: string;
  cardBorder: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  highlightKicker: string;
  chartBarPrimary: string;
  chartBarBenchmark: string;
}

export interface FontPairingConfig {
  id: FontPairing;
  name: string;
  headingClass: string;
  bodyClass: string;
  monoClass: string;
  description: string;
}

export const FONT_PAIRINGS: Record<FontPairing, FontPairingConfig> = {
  'bevietnam-jetbrains': {
    id: 'bevietnam-jetbrains',
    name: 'Be Vietnam Pro + JetBrains Mono',
    headingClass: 'font-bevietnam font-bold',
    bodyClass: 'font-bevietnam',
    monoClass: 'font-jetbrains',
    description: 'Crisp geometric sans designed for flawless multilingual clarity',
  },
  'lora-bevietnam': {
    id: 'lora-bevietnam',
    name: 'Lora (Serif) + Be Vietnam Pro',
    headingClass: 'font-lora font-bold tracking-tight',
    bodyClass: 'font-bevietnam',
    monoClass: 'font-jetbrains',
    description: 'Distinguished editorial serif for authoritative keynote headlines',
  },
  'inter-jetbrains': {
    id: 'inter-jetbrains',
    name: 'Inter + JetBrains Mono',
    headingClass: 'font-inter font-bold tracking-tight',
    bodyClass: 'font-inter',
    monoClass: 'font-jetbrains',
    description: 'Modern, minimalist Silicon Valley tech & software standard',
  },
  'sourceserif-inter': {
    id: 'sourceserif-inter',
    name: 'Source Serif 4 + Inter',
    headingClass: 'font-sourceserif font-bold',
    bodyClass: 'font-inter',
    monoClass: 'font-jetbrains',
    description: 'Adobe institutional academic serif for research papers & reports',
  },
  'jakarta-jetbrains': {
    id: 'jakarta-jetbrains',
    name: 'Plus Jakarta Sans + JetBrains Mono',
    headingClass: 'font-jakarta font-bold',
    bodyClass: 'font-jakarta',
    monoClass: 'font-jetbrains',
    description: 'Contemporary rounded premium sans for digital product strategy',
  },
  'lexend-inter': {
    id: 'lexend-inter',
    name: 'Lexend + Inter',
    headingClass: 'font-lexend font-bold',
    bodyClass: 'font-inter',
    monoClass: 'font-jetbrains',
    description: 'Engineered specifically for maximum reading velocity & retention',
  },
  'montserrat-bevietnam': {
    id: 'montserrat-bevietnam',
    name: 'Montserrat + Be Vietnam Pro',
    headingClass: 'font-montserrat font-bold',
    bodyClass: 'font-bevietnam',
    monoClass: 'font-jetbrains',
    description: 'High-impact executive weight for board meetings & business pitch',
  },
};

export const THEMES: Record<DeckTheme, ThemeStyles> = {
  'editorial-stone': {
    id: 'editorial-stone',
    name: 'Editorial Stone (Executive)',
    bgGradient: 'from-stone-950 via-stone-900 to-stone-950',
    slideBg: 'bg-[#181615] text-[#FAF8F5]',
    headerColor: 'text-[#FAF8F5]',
    bodyColor: 'text-[#D6CEBE]',
    mutedColor: 'text-[#A8A095]',
    cardBg: 'bg-[#221F1D]/80 hover:bg-[#282522]',
    cardBorder: 'border-stone-700/60',
    accentBg: 'bg-amber-600',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    highlightKicker: 'text-amber-400',
    chartBarPrimary: 'bg-amber-500',
    chartBarBenchmark: 'bg-stone-700',
  },
  'midnight-cyan': {
    id: 'midnight-cyan',
    name: 'Midnight Cyan',
    bgGradient: 'from-slate-950 via-slate-900 to-sky-950',
    slideBg: 'bg-[#0B1120] text-[#F1F5F9]',
    headerColor: 'text-[#F8FAFC]',
    bodyColor: 'text-[#CBD5E1]',
    mutedColor: 'text-[#94A3B8]',
    cardBg: 'bg-[#111C33]/80 hover:bg-[#162444]',
    cardBorder: 'border-sky-900/60',
    accentBg: 'bg-cyan-500',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    highlightKicker: 'text-cyan-400',
    chartBarPrimary: 'bg-cyan-400',
    chartBarBenchmark: 'bg-slate-700',
  },
  'emerald-nature': {
    id: 'emerald-nature',
    name: 'Emerald Nature (CleanTech)',
    bgGradient: 'from-emerald-950 via-stone-950 to-teal-950',
    slideBg: 'bg-[#091B15] text-[#ECFDF5]',
    headerColor: 'text-[#F0FDF4]',
    bodyColor: 'text-[#D1FAE5]/90',
    mutedColor: 'text-[#6EE7B7]/70',
    cardBg: 'bg-[#0F2D24]/80 hover:bg-[#143B2F]',
    cardBorder: 'border-emerald-800/60',
    accentBg: 'bg-emerald-500',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/40',
    highlightKicker: 'text-emerald-400',
    chartBarPrimary: 'bg-emerald-400',
    chartBarBenchmark: 'bg-emerald-900/60',
  },
  'crimson-bold': {
    id: 'crimson-bold',
    name: 'Crimson Pitch (Venture Pitch)',
    bgGradient: 'from-rose-950 via-stone-950 to-neutral-950',
    slideBg: 'bg-[#150D0E] text-[#FFF1F2]',
    headerColor: 'text-[#FFF1F2]',
    bodyColor: 'text-[#FFE4E6]/90',
    mutedColor: 'text-[#FDA4AF]/70',
    cardBg: 'bg-[#261316]/80 hover:bg-[#331A1E]',
    cardBorder: 'border-rose-900/60',
    accentBg: 'bg-rose-500',
    accentText: 'text-rose-400',
    accentBorder: 'border-rose-500/40',
    highlightKicker: 'text-rose-400',
    chartBarPrimary: 'bg-rose-500',
    chartBarBenchmark: 'bg-stone-800',
  },
  'minimal-light': {
    id: 'minimal-light',
    name: 'Minimal Stark (Paper Light)',
    bgGradient: 'from-stone-100 via-stone-50 to-stone-100',
    slideBg: 'bg-[#F9F8F6] text-[#1C1917]',
    headerColor: 'text-[#1C1917]',
    bodyColor: 'text-[#44403C]',
    mutedColor: 'text-[#78716C]',
    cardBg: 'bg-[#FFFFFF] hover:bg-stone-50',
    cardBorder: 'border-stone-200 shadow-xs',
    accentBg: 'bg-stone-900 text-white',
    accentText: 'text-stone-900 font-semibold',
    accentBorder: 'border-stone-400',
    highlightKicker: 'text-stone-700 font-semibold',
    chartBarPrimary: 'bg-stone-900',
    chartBarBenchmark: 'bg-stone-300',
  }
};
