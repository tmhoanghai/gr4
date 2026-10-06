import React from 'react';
import { Slide, FontPairing } from '../types/presentation';
import { ThemeStyles, FONT_PAIRINGS } from './ThemeManager';
import { HeroTitleSlide } from './slides/HeroTitleSlide';
import { RotatingWheelSlide } from './slides/RotatingWheelSlide';
import { TeamMembersSlide } from './slides/TeamMembersSlide';
import { ProblemBreakdownSlide } from './slides/ProblemBreakdownSlide';
import { SolutionArchitectureSlide } from './slides/SolutionArchitectureSlide';
import { IntangibleHeritageSlide } from './slides/IntangibleHeritageSlide';
import { HanoiSummarySlide } from './slides/HanoiSummarySlide';
import { MysteryChallengeSlide } from './slides/MysteryChallengeSlide';
import { DataMetricsSlide } from './slides/DataMetricsSlide';
import { ComparativeMatrixSlide } from './slides/ComparativeMatrixSlide';
import { InteractiveTimelineSlide } from './slides/InteractiveTimelineSlide';
import { DeepDiveQuoteSlide } from './slides/DeepDiveQuoteSlide';
import { InteractiveSimulatorSlide } from './slides/InteractiveSimulatorSlide';
import { ActionCallSlide } from './slides/ActionCallSlide';
import { ThankYouSlide } from './slides/ThankYouSlide';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
  fontPairing?: FontPairing;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

export const SlideRenderer: React.FC<Props> = ({
  slide,
  theme,
  fontPairing = 'bevietnam-jetbrains',
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const fontConfig = FONT_PAIRINGS[fontPairing] || FONT_PAIRINGS['bevietnam-jetbrains'];

  const renderContent = () => {
    switch (slide.type) {
      case 'hero_title':
        return (
          <HeroTitleSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'rotating_wheel':
        return (
          <RotatingWheelSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'team_members':
        return (
          <TeamMembersSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'problem_breakdown':
        return (
          <ProblemBreakdownSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'solution_architecture':
        return (
          <SolutionArchitectureSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'intangible_heritage':
        return (
          <IntangibleHeritageSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'hanoi_summary':
        return (
          <HanoiSummarySlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'mystery_challenge':
        return (
          <MysteryChallengeSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      case 'data_metrics':
        return <DataMetricsSlide slide={slide} theme={theme} />;
      case 'comparative_matrix':
        return <ComparativeMatrixSlide slide={slide} theme={theme} />;
      case 'interactive_timeline':
        return <InteractiveTimelineSlide slide={slide} theme={theme} />;
      case 'deep_dive_quote':
        return <DeepDiveQuoteSlide slide={slide} theme={theme} />;
      case 'interactive_simulator':
        return <InteractiveSimulatorSlide slide={slide} theme={theme} />;
      case 'action_call':
        return <ActionCallSlide slide={slide} theme={theme} />;
      case 'thank_you':
        return (
          <ThankYouSlide
            slide={slide}
            theme={theme}
            stepIndex={stepIndex}
            onSetStepIndex={onSetStepIndex}
            onRegisterSteps={onRegisterSteps}
            onNextAction={onNextAction}
          />
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-12 text-stone-400">
            Slide layout không xác định: {slide.type}
          </div>
        );
    }
  };

  return (
    <div className={`w-full h-full ${fontConfig.bodyClass}`}>
      {renderContent()}
    </div>
  );
};

