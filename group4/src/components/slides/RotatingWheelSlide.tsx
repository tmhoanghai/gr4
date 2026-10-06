import React, { useState } from 'react';
import { Slide, WheelPartItem } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';
import { Search, Compass, Utensils, Star, MapPin, Building2, Flame, Users, HelpCircle } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

const DEFAULT_PARTS: (WheelPartItem & { bgImage: string; bullets: string[] })[] = [
  {
    id: 'part-01',
    partNumber: 'PART 01',
    label: 'Introduction',
    title: 'Introduction',
    description: '',
    bullets: ['Member List', 'Why We Chose Hanoi'],
    bgImage: '/src/assets/images/bg2.jpg'
  },
  {
    id: 'part-02',
    partNumber: 'PART 02',
    label: 'Body',
    title: 'Body',
    description: '',
    bullets: ['Culture', 'Culinary', 'Summary: Essence of Hanoi'],
    bgImage: '/src/assets/images/bg3.jpg'
  },
  {
    id: 'part-03',
    partNumber: 'PART 03',
    label: '???',
    title: '???',
    description: '???',
    bullets: ['???'],
    bgImage: '/src/assets/images/bg4.jpg'
  }
];

// Helper to calculate total steps and decode active state
function computeSlideStepPlan(parts: (WheelPartItem & { bullets?: string[] })[]) {
  // Step 0: Blank state
  // Step 1..N: Each part gets 1 step for title/underline + 1 step for each bullet item
  let totalSteps = 1; // step 0
  for (const p of parts) {
    const bCount = p.bullets && p.bullets.length > 0 ? p.bullets.length : (p.description ? 1 : 0);
    totalSteps += 1 + bCount;
  }
  return totalSteps;
}

function resolveActiveStepState(stepIndex: number, parts: (WheelPartItem & { bullets?: string[] })[]) {
  if (stepIndex <= 0) {
    return { activePartIndex: 0, isStarted: false, visibleBulletsCount: 0 };
  }

  let accumulated = 1;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const bCount = part.bullets && part.bullets.length > 0 ? part.bullets.length : (part.description ? 1 : 0);
    const subSteps = 1 + bCount;

    if (stepIndex < accumulated + subSteps) {
      const stepInsidePart = stepIndex - accumulated; // 0: only title, 1: 1st bullet, 2: 2nd bullet...
      return {
        activePartIndex: i,
        isStarted: true,
        visibleBulletsCount: stepInsidePart
      };
    }
    accumulated += subSteps;
  }

  const lastIdx = parts.length - 1;
  const lastBCount = parts[lastIdx].bullets?.length || 1;
  return {
    activePartIndex: lastIdx,
    isStarted: true,
    visibleBulletsCount: lastBCount
  };
}

export const RotatingWheelSlide: React.FC<Props> = ({
  slide,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const rawParts = (slide.data?.wheelParts && slide.data.wheelParts.length > 0)
    ? slide.data.wheelParts
    : DEFAULT_PARTS;

  const bgList = [
    '/src/assets/images/bg2.jpg',
    '/src/assets/images/bg3.jpg',
    '/src/assets/images/bg4.jpg'
  ];

  const parts = rawParts.map((p, idx) => ({
    ...p,
    bullets: p.bullets && p.bullets.length > 0 ? p.bullets : (DEFAULT_PARTS[idx]?.bullets || (p.description ? [p.description] : [])),
    bgImage: (p as any).bgImage || bgList[idx % bgList.length]
  }));

  const totalParts = parts.length; // 3 parts
  const totalSlideSteps = computeSlideStepPlan(parts);

  React.useEffect(() => {
    onRegisterSteps?.(totalSlideSteps);
  }, [totalSlideSteps, onRegisterSteps]);

  const { activePartIndex, isStarted, visibleBulletsCount } = resolveActiveStepState(stepIndex, parts);
  const [isRetracting, setIsRetracting] = useState<boolean>(false);

  const activePart = parts[activePartIndex] || parts[0];
  const currentBg = isStarted ? activePart.bgImage : '/src/assets/images/bg2.jpg';

  const sliceAngle = 360 / totalParts; // 120 deg for 3 parts
  const rotationAngle = isStarted ? -(activePartIndex * sliceAngle) : 0;

  const handleNextStep = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isRetracting) return;
    soundEffects.playRotateSound();
    if (stepIndex < totalSlideSteps - 1) {
      onSetStepIndex ? onSetStepIndex(stepIndex + 1) : null;
    } else {
      // Coordinated Retraction Animation
      setIsRetracting(true);
      setTimeout(() => {
        onNextAction ? onNextAction() : null;
      }, 550);
    }
  };

  const handleSelectPart = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRetracting) return;
    soundEffects.playRotateSound();
    // Compute step index to jump to the title of that part
    let targetStep = 1;
    for (let i = 0; i < index; i++) {
      const bCount = parts[i].bullets?.length || 1;
      targetStep += 1 + bCount;
    }
    onSetStepIndex ? onSetStepIndex(targetStep) : null;
  };

  // Distinct entrance animations for each bullet item index
  const getBulletAnimationVariants = (index: number) => {
    switch (index) {
      case 0:
        // Effect 1: Kinetic Slide & Elastic Snap from Left
        return {
          initial: { opacity: 0, x: -70, filter: 'blur(10px)', scale: 0.92 },
          animate: { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1.0 },
          transition: { type: 'spring' as const, stiffness: 220, damping: 13, mass: 0.8 }
        };
      case 1:
        // Effect 2: Diagonal Elevate & Prismatic Glow Pop
        return {
          initial: { opacity: 0, y: 40, x: 30, filter: 'blur(12px)', scale: 0.9 },
          animate: { opacity: 1, y: 0, x: 0, filter: 'blur(0px)', scale: 1.0 },
          transition: { duration: 0.6, ease: 'easeOut' as const }
        };
      case 2:
        // Effect 3: 3D Tilt Flip & Sparkle Burst Reveal
        return {
          initial: { opacity: 0, scale: 0.7, rotateX: 65, filter: 'blur(10px)' },
          animate: { opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)' },
          transition: { type: 'spring' as const, stiffness: 240, damping: 15 }
        };
      default:
        // Effect 4 (or single items like KOL Idol): Grand Shimmer & Pulse Pop
        return {
          initial: { opacity: 0, y: 30, scale: 0.85, filter: 'blur(14px)' },
          animate: { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' },
          transition: { duration: 0.65, ease: 'easeOut' as const }
        };
    }
  };

  const getBulletIcon = (bulletText: string, index: number) => {
    const textLower = bulletText.toLowerCase();
    if (textLower.includes('member') || textLower.includes('team') || textLower.includes('list')) {
      return <Users className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]" />;
    }
    if (textLower.includes('why') || textLower.includes('chose') || textLower.includes('reason')) {
      return <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-sky-300 drop-shadow-[0_0_12px_rgba(125,211,252,0.9)]" />;
    }
    if (textLower.includes('culture')) return <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]" />;
    if (textLower.includes('culinary')) return <Utensils className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300 drop-shadow-[0_0_12px_rgba(110,231,183,0.9)]" />;
    if (textLower.includes('hidden')) return <Search className="w-6 h-6 sm:w-7 sm:h-7 text-violet-300 drop-shadow-[0_0_12px_rgba(216,180,254,0.9)]" />;
    if (textLower.includes('kol') || textLower.includes('idol')) return <Star className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.95)] fill-amber-300/25" />;
    if (textLower.includes('quarter')) return <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-sky-300 drop-shadow-[0_0_12px_rgba(125,211,252,0.9)]" />;
    if (textLower.includes('architecture')) return <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-300 drop-shadow-[0_0_12px_rgba(165,180,252,0.9)]" />;
    if (textLower.includes('city') || textLower.includes('life')) return <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(253,164,175,0.9)]" />;
    
    // Default fallback icons by index
    if (index === 0) return <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(252,211,77,0.9)]" />;
    if (index === 1) return <Utensils className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300 drop-shadow-[0_0_12px_rgba(110,231,183,0.9)]" />;
    return <Search className="w-6 h-6 sm:w-7 sm:h-7 text-violet-300 drop-shadow-[0_0_12px_rgba(216,180,254,0.9)]" />;
  };

  return (
    <div
      onClick={handleNextStep}
      className="relative w-full h-full flex items-center justify-between overflow-hidden font-sans select-none cursor-pointer"
      title="Click anywhere to reveal next item / rotate dial"
    >
      {/* 1. Dynamic Background Crossfade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            initial={{ opacity: 0.35, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.0 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            src={currentBg}
            alt="Slide Background"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </AnimatePresence>
        {/* Subtle readable vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-stone-950/85" />
      </div>

      {/* 2. Left Zone: The 3-Part Rotating Radial Dial */}
      <div className="relative z-10 w-1/2 h-full flex items-center justify-center pl-4 sm:pl-8 md:pl-12">
        <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] flex items-center justify-center">
          
          {/* Subtle Outer Concentric Ring */}
          <div className="absolute inset-[-14px] rounded-full border border-white/10 pointer-events-none" />

          {/* Rotating SVG Disc */}
          <motion.div
            animate={{
              rotate: rotationAngle,
              scale: isRetracting ? 0.75 : 1.0,
              opacity: isRetracting ? 0 : 1
            }}
            transition={{
              rotate: {
                type: 'spring',
                stiffness: 110,
                damping: 20,
                mass: 0.9
              },
              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.45 }
            }}
            className="w-full h-full relative"
          >
            <svg
              viewBox="-50 -50 100 100"
              className="w-full h-full drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)] overflow-visible"
            >
              {/* Outer Dial Rim */}
              <circle
                cx="0"
                cy="0"
                r="46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="0.5"
              />

              {/* Inner Dial Rim */}
              <circle
                cx="0"
                cy="0"
                r="18"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="0.5"
              />

              {/* Center Hub */}
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="rgba(20, 20, 20, 0.85)"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="0.75"
              />
              <circle
                cx="0"
                cy="0"
                r="3"
                fill="#ffffff"
                className="shadow-[0_0_10px_#ffffff]"
              />

              {/* 3 Annular Sector Segments (120 deg each) */}
              {parts.map((part, index) => {
                const isActive = isStarted && index === activePartIndex;
                const angleDeg = index * sliceAngle; // 0, 120, 240
                const halfSlice = sliceAngle / 2; // 60 deg
                const startAngle = (angleDeg - halfSlice) * (Math.PI / 180);
                const endAngle = (angleDeg + halfSlice) * (Math.PI / 180);

                const rOuter = 46;
                const rInner = 18;

                // Outer Arc Points
                const x1 = rOuter * Math.cos(startAngle);
                const y1 = rOuter * Math.sin(startAngle);
                const x2 = rOuter * Math.cos(endAngle);
                const y2 = rOuter * Math.sin(endAngle);

                // Inner Arc Points
                const x3 = rInner * Math.cos(endAngle);
                const y3 = rInner * Math.sin(endAngle);
                const x4 = rInner * Math.cos(startAngle);
                const y4 = rInner * Math.sin(startAngle);

                const pathData = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;

                // Radial divider stroke
                const divX1 = rInner * Math.cos(startAngle);
                const divY1 = rInner * Math.sin(startAngle);
                const divX2 = rOuter * Math.cos(startAngle);
                const divY2 = rOuter * Math.sin(startAngle);

                // Text center position inside sector
                const textR = (rOuter + rInner) / 2;
                const textX = textR * Math.cos(angleDeg * (Math.PI / 180));
                const textY = textR * Math.sin(angleDeg * (Math.PI / 180));

                return (
                  <g
                    key={part.id}
                    onClick={(e) => handleSelectPart(index, e)}
                    className="cursor-pointer group"
                  >
                    {/* Radial Divider Stroke */}
                    <line
                      x1={divX1}
                      y1={divY1}
                      x2={divX2}
                      y2={divY2}
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="0.5"
                    />

                    {/* Sector Fill & Glowing Active Border */}
                    <path
                      d={pathData}
                      fill={isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent'}
                      stroke={isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.25)'}
                      strokeWidth={isActive ? '1.0' : '0.25'}
                      className="transition-all duration-300 hover:fill-white/10"
                    />

                    {/* Unified PART text positioned directly inside its sector */}
                    <text
                      x={textX}
                      y={textY}
                      transform={`rotate(${angleDeg + 90}, ${textX}, ${textY})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.75)'}
                      fontSize="3.4"
                      fontWeight="900"
                      letterSpacing="0.08em"
                      className="transition-all duration-300 select-none font-sans"
                      style={{
                        filter: isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.95))' : 'none'
                      }}
                    >
                      {part.partNumber}
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 3. Right Zone: Main Title, Underline Bar & Individual Line-by-Line Revealed Items */}
      <div className="relative z-10 w-1/2 h-full flex flex-col justify-center pr-6 sm:pr-10 md:pr-14 pl-4 sm:pl-6 lg:pl-8 text-left overflow-visible">
        <AnimatePresence mode="wait">
          {isStarted && (
            <motion.div
              key={activePart.id}
              initial={{ opacity: 0, x: 35, filter: 'blur(10px)', scale: 0.96 }}
              animate={{
                opacity: isRetracting ? 0 : 1,
                x: isRetracting ? 50 : 0,
                scale: isRetracting ? 0.88 : 1.0,
                filter: isRetracting ? 'blur(12px)' : 'blur(0px)'
              }}
              exit={{ opacity: 0, x: -25, filter: 'blur(6px)', scale: 0.96 }}
              transition={{
                duration: isRetracting ? 0.48 : 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="max-w-xl flex flex-col items-start"
            >
              {/* Main Title: JetBrains Mono, whitespace-nowrap prevents line break */}
              <motion.h1
                initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-jetbrains text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] whitespace-nowrap"
              >
                {activePart.title}
              </motion.h1>

              {/* Glowing Horizontal Underline Bar */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 140, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="h-[3.5px] bg-white rounded-full shadow-[0_0_14px_rgba(255,255,255,0.85)] mb-6"
              />

              {/* Sub-items list: Stacked line-by-line, each revealed with its own distinct animation per click */}
              <div className="flex flex-col gap-3 sm:gap-4 w-full">
                {activePart.bullets.map((bullet, idx) => {
                  const isVisible = idx < visibleBulletsCount;
                  if (!isVisible) return null;

                  const anim = getBulletAnimationVariants(idx);

                  return (
                    <motion.div
                      key={`${activePart.id}-bullet-${idx}`}
                      initial={anim.initial}
                      animate={anim.animate}
                      transition={anim.transition}
                      className="flex items-center gap-3.5 sm:gap-4 group"
                    >
                      {/* Clean Graphic Icon with Glow (No dark border box) */}
                      <div className="shrink-0 flex items-center justify-center transition-transform group-hover:scale-115">
                        {getBulletIcon(bullet, idx)}
                      </div>

                      {/* Line Text: JetBrains Mono, crisp readable size */}
                      <span className="font-jetbrains text-xl sm:text-2xl md:text-3xl text-stone-100 font-medium tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] whitespace-nowrap">
                        {bullet}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
