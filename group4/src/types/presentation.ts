export type SlideLayoutType =
  | 'hero_title'
  | 'rotating_wheel'
  | 'team_members'
  | 'problem_breakdown'
  | 'solution_architecture'
  | 'intangible_heritage'
  | 'hanoi_summary'
  | 'mystery_challenge'
  | 'thank_you'
  | 'data_metrics'
  | 'comparative_matrix'
  | 'interactive_timeline'
  | 'deep_dive_quote'
  | 'interactive_simulator'
  | 'action_call';

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  duties?: string[];
  iconType?: 'owner' | 'presenter' | 'research' | 'developer';
  accentColor?: string;
}

export interface WheelPartItem {
  id: string;
  partNumber: string;
  label: string;
  title: string;
  description: string;
  moreInfo?: string;
  bullets?: string[];
  kpi?: string;
  kpiLabel?: string;
  accentColor?: string;
  bgImage?: string;
}

export type FontPairing =
  | 'bevietnam-jetbrains'
  | 'inter-jetbrains'
  | 'lora-bevietnam'
  | 'sourceserif-inter'
  | 'jakarta-jetbrains'
  | 'lexend-inter'
  | 'montserrat-bevietnam';

export type DeckTheme =
  | 'editorial-stone'
  | 'midnight-cyan'
  | 'emerald-nature'
  | 'crimson-bold'
  | 'minimal-light';

export type ViewMode = 'normal' | 'sorter' | 'reading' | 'slideshow';

export interface RootCauseItem {
  title: string;
  desc: string;
  severity: 'Critical' | 'High' | 'Medium';
  stat: string;
}

export interface PillarItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  context: string;
}

export interface ComparisonItem {
  aspect: string;
  currentApproach: string;
  newSolution: string;
  impact: string;
}

export interface TimelineStep {
  phase: string;
  period: string;
  title: string;
  description: string;
  deliverables: string[];
  status?: 'Completed' | 'In Progress' | 'Planned';
}

export interface SimulatorVariable {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface Slide {
  id: string;
  type: SlideLayoutType;
  title: string;
  subtitle?: string;
  categoryKicker?: string;
  notes: string;
  timeRecommendationSeconds?: number;
  backgroundImage?: string;
  data: {
    // For hero_title
    authorName?: string;
    authorTitle?: string;
    organization?: string;
    heroHighlights?: string[];

    // For rotating_wheel
    wheelParts?: WheelPartItem[];
    activePartIndex?: number;

    // For team_members
    teamMembers?: TeamMemberItem[];

    // For problem_breakdown
    problemSummary?: string;
    rootCauses?: RootCauseItem[];
    impactStatement?: string;

    // For solution_architecture
    solutionOverview?: string;
    pillars?: PillarItem[];

    // For data_metrics
    chartTitle?: string;
    chartSubtitle?: string;
    metrics?: MetricItem[];
    chartData?: { label: string; value: number; benchmark?: number }[];
    chartUnit?: string;

    // For comparative_matrix
    matrixTitle?: string;
    currentLabel?: string;
    newLabel?: string;
    comparisons?: ComparisonItem[];

    // For interactive_timeline
    timelineSteps?: TimelineStep[];

    // For deep_dive_quote
    quote?: string;
    quoteAuthor?: string;
    quoteRole?: string;
    quoteContext?: string;
    takeawayPoints?: string[];

    // For interactive_simulator
    simulatorTitle?: string;
    simulatorDescription?: string;
    baseCalculationType?: 'traffic_congestion' | 'roi_tech' | 'carbon_reduction';

    // For action_call
    actionPoints?: { step: string; title: string; desc: string; owner: string }[];
    contactInfo?: { email: string; phone?: string; website?: string };
    finalMessage?: string;
  };
}

export interface PresentationDeck {
  id: string;
  title: string;
  topic: string;
  description: string;
  author: string;
  authorRole: string;
  organization: string;
  date: string;
  readTimeMinutes: number;
  category: 'Problem & Solution' | 'Strategy & Business' | 'Tech & Innovation' | 'Policy & Society' | 'Science & Research';
  theme: DeckTheme;
  fontPairing?: FontPairing;
  coverImage: string;
  slides: Slide[];
}
