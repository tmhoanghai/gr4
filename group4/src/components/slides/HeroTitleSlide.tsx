import React from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

export const HeroTitleSlide: React.FC<Props> = ({
  slide,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const bgImage = slide.backgroundImage || '/src/assets/images/bghanoi.jpg';

  // Stepwise reveal:
  // Step 0: Blank scenic background (bghanoi.jpg)
  // Step 1: Group 4 (slides from left) + Hanoi (slides from right)
  // Next click -> advances directly to Slide 2 (RotatingWheelSlide)
  const totalSlideSteps = 2;

  React.useEffect(() => {
    onRegisterSteps?.(totalSlideSteps);
  }, [totalSlideSteps, onRegisterSteps]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playRotateSound();
    if (stepIndex < totalSlideSteps - 1) {
      onSetStepIndex ? onSetStepIndex(stepIndex + 1) : null;
    } else {
      onNextAction ? onNextAction() : null;
    }
  };

  const titleText = slide.title || 'Hanoi';

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full flex flex-col justify-start p-8 sm:p-14 md:p-16 lg:p-20 overflow-hidden font-sans select-none cursor-pointer"
      title="Click to reveal title / advance slide"
    >
      {/* 1. Cinematic Background (bghanoi.jpg) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: stepIndex > 0 ? 1.0 : 1.03 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={bgImage}
          alt="Hanoi Background"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/bg1.jpg';
          }}
        />
        {/* Subtle readable vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-stone-950/30" />
      </div>

      {/* 2. Top-Right Corner Title Block: Group 4 & Hanoi */}
      <div className="relative z-10 w-full flex justify-end items-start pt-4 sm:pt-8 md:pt-10 pr-2 sm:pr-6 md:pr-10">
        <AnimatePresence>
          {stepIndex >= 1 && (
            <div className="relative overflow-visible flex flex-col items-start max-w-lg lg:max-w-2xl">
              
              {/* Subtle ambient glow behind title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1.2 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute -inset-10 bg-radial from-amber-500/20 via-sky-500/10 to-transparent blur-3xl pointer-events-none -z-10"
              />

              {/* Group 4: Appears FIRST - High-speed slide from LEFT with kinetic braking & recoil settle */}
              <motion.div
                initial={{ opacity: 0, x: -260, rotate: -3.5, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 12,
                  mass: 0.75,
                  delay: 0.06
                }}
                className="mb-1 sm:mb-2"
              >
                <span className="font-lachic text-3xl sm:text-4xl md:text-5xl lg:text-6xl italic tracking-wider text-amber-300 drop-shadow-[0_2px_16px_rgba(245,158,11,0.5)]">
                  Group 4
                </span>
              </motion.div>

              {/* Hanoi: Appears SECOND - High-speed slide from RIGHT with kinetic braking & overshoot recoil */}
              <motion.h1
                initial={{ opacity: 0, x: 300, rotate: 2.5, filter: 'blur(12px)' }}
                animate={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 165,
                  damping: 11.5,
                  mass: 0.85,
                  delay: 0.45
                }}
                className="font-rethinker text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] select-none"
              >
                {titleText}
              </motion.h1>

              {/* Horizon Accent Underline with glowing diamond (Deploys right after Hanoi completes braking) */}
              <div className="relative mt-3 sm:mt-4 flex items-center justify-start w-full max-w-sm sm:max-w-md">
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2.5px] w-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent origin-left shadow-[0_0_12px_rgba(251,191,36,0.7)]"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                  transition={{ duration: 0.45, delay: 1.05, ease: 'easeOut' }}
                  className="w-2.5 h-2.5 rotate-45 bg-amber-300 shadow-[0_0_12px_#fbbf24] -ml-1 shrink-0"
                />
              </div>

            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
