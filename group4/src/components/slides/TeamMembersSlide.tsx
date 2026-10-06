import React, { useState, useEffect, useRef } from 'react';
import { Slide, TeamMemberItem } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';
import { Crown, Mic, Search, Code2 } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

const DEFAULT_MEMBERS: TeamMemberItem[] = [
  {
    id: 'mem-1',
    name: 'CHERRY',
    role: 'LEADER & RESEARCH',
    avatar: '/src/assets/images/avt1.jpg',
    iconType: 'owner',
    accentColor: '#fbbf24' // Amber Gold
  },
  {
    id: 'mem-2',
    name: 'BANANA',
    role: 'Presenter',
    avatar: '/src/assets/images/avt2.jpg',
    iconType: 'presenter',
    accentColor: '#38bdf8' // Sky Blue
  },
  {
    id: 'mem-3',
    name: 'BILL',
    role: 'Research',
    avatar: '/src/assets/images/avt3.jpg',
    iconType: 'research',
    accentColor: '#a855f7' // Purple
  },
  {
    id: 'mem-4',
    name: 'KING',
    role: 'Developer',
    avatar: '/src/assets/images/avt4.jpg',
    iconType: 'developer',
    accentColor: '#34d399' // Emerald Green
  }
];

const WHY_HANOI_TEXT = `We chose Hanoi as our presentation topic for its unique blend of a thousand-year-old culture and modern life. Our focus will be the historic Old Quarter, featuring ancient architecture and its renowned street food scene with pho, bun cha, and egg coffee. Through this, we aim to honor these heritage values and convey a meaningful message about preserving our cultural identity`;

export const TeamMembersSlide: React.FC<Props> = ({
  slide,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const members = slide.data?.teamMembers && slide.data.teamMembers.length > 0
    ? slide.data.teamMembers
    : DEFAULT_MEMBERS;

  // Step 0: Title displayed
  // Step 1: Member 1 (CHERRY)
  // Step 2: Member 2 (BANANA)
  // Step 3: Member 3 (BILL)
  // Step 4: Member 4 (KING)
  // Step 5: Phase 2 - Slide left transition & Why we chose Hanoi (Ready to type on click)
  // Step 6: Advance to next slide
  const totalSteps = members.length + 2; // 6 steps (0 through 5)

  const isWhyHanoiPhase = stepIndex >= 5;

  // Typewriter state for Phase 2 (Manual click-to-type)
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onRegisterSteps?.(totalSteps);
  }, [totalSteps, onRegisterSteps]);

  // Reset when leaving Phase 2
  useEffect(() => {
    if (!isWhyHanoiPhase) {
      setDisplayedText('');
      setIsTypingActive(false);
      setIsTypingComplete(false);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    }
  }, [isWhyHanoiPhase]);

  const startTypewriter = () => {
    setDisplayedText('');
    setIsTypingActive(true);
    setIsTypingComplete(false);
    let currentIndex = 0;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (currentIndex < WHY_HANOI_TEXT.length) {
        currentIndex += 1;
        setDisplayedText(WHY_HANOI_TEXT.slice(0, currentIndex));
        
        // Play subtle typewriter key click every 2 chars
        if (currentIndex % 2 === 0) {
          soundEffects.playKeyClickSound();
        }
      } else {
        setIsTypingComplete(true);
        setIsTypingActive(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 16); // Fast, fluid typing animation
  };

  const bgImage = slide.backgroundImage || '/src/assets/images/bg1.jpg';

  const handleAdvance = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // In Phase 2:
    if (isWhyHanoiPhase) {
      // 1. If not yet started typing, click starts the typing!
      if (!isTypingActive && !isTypingComplete && displayedText.length === 0) {
        startTypewriter();
        return;
      }
      // 2. If actively typing, click immediately completes the text
      if (isTypingActive && !isTypingComplete) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setDisplayedText(WHY_HANOI_TEXT);
        setIsTypingComplete(true);
        setIsTypingActive(false);
        soundEffects.playKeyClickSound();
        return;
      }
    }

    soundEffects.playRotateSound();
    if (stepIndex < totalSteps - 1) {
      onSetStepIndex?.(stepIndex + 1);
    } else {
      onNextAction?.();
    }
  };

  const renderRoleBadgeIcon = (iconType?: string, roleName?: string) => {
    const roleLower = (roleName || '').toLowerCase();
    if (iconType === 'owner' || iconType === 'leader' || roleLower.includes('leader') || roleLower.includes('owner')) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.35)] backdrop-blur-md">
          <Crown className="w-4 h-4 text-amber-300 drop-shadow" />
          <Search className="w-3.5 h-3.5 text-amber-200" />
        </div>
      );
    }
    if (iconType === 'presenter' || roleLower.includes('presenter') || roleLower.includes('thuyết trình')) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.35)] backdrop-blur-md">
          <Mic className="w-4 h-4 text-sky-300 drop-shadow" />
        </div>
      );
    }
    if (iconType === 'developer' || roleLower.includes('develop')) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.35)] backdrop-blur-md">
          <Code2 className="w-4 h-4 text-emerald-300 drop-shadow" />
        </div>
      );
    }
    // Default / Research
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.35)] backdrop-blur-md">
        <Search className="w-4 h-4 text-purple-300 drop-shadow" />
      </div>
    );
  };

  return (
    <div
      onClick={handleAdvance}
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden font-sans select-none cursor-pointer"
      title="Click anywhere to proceed"
    >
      {/* 1. Background with High Transparency for Vivid Image Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Slide Background"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle, highly transparent overlay so bg image is very clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/20 to-stone-950/45" />
      </div>

      {/* 2. Top-Left Title: I.Introduction + Subtitle (Dynamic: Member List or Why we chose Hanoi) */}
      <div className="relative z-10 flex flex-col items-start max-w-3xl">
        {/* Main Title strictly I.Introduction */}
        <motion.h1
          initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="font-jetbrains text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] whitespace-nowrap"
        >
          I.Introduction
        </motion.h1>

        {/* Subtitle: Spaced 2 lines below with Smooth Crossfade & Slide */}
        <div className="h-10 sm:h-12 flex items-center mt-5 sm:mt-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isWhyHanoiPhase ? (
              <motion.span
                key="subtitle-members"
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-jetbrains text-lg sm:text-xl md:text-2xl text-amber-300 font-semibold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] whitespace-nowrap"
              >
                Member List
              </motion.span>
            ) : (
              <motion.span
                key="subtitle-why-hanoi"
                initial={{ opacity: 0, x: 50, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-jetbrains text-lg sm:text-xl md:text-2xl text-amber-300 font-semibold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] whitespace-nowrap"
              >
                Why we chose Hanoi
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Clean Glowing Horizon Accent Underline (No Magnifying Glass icon) */}
        <div className="relative mt-2 flex items-center justify-start w-full max-w-xs sm:max-w-sm">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent origin-left shadow-[0_0_16px_rgba(251,191,36,0.95)]"
          />
        </div>
      </div>

      {/* 3. Center Dynamic Stage: Transition between Member List and Why We Chose Hanoi */}
      <div className="relative z-10 w-full my-auto pt-4 sm:pt-6 min-h-[320px] flex items-center">
        <AnimatePresence mode="wait">
          {/* Phase 1: 4 Team Member Glass Cards */}
          {!isWhyHanoiPhase ? (
            <motion.div
              key="phase-members"
              initial={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: -80,
                filter: 'blur(10px)',
                transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
              }}
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            >
              {members.map((member, index) => {
                const isVisible = stepIndex >= index + 1;

                return (
                  <div key={member.id} className="relative min-h-[220px]">
                    <AnimatePresence>
                      {isVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: 40, scale: 0.88, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)' }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                            mass: 0.85
                          }}
                          className="group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md border bg-stone-950/25 border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:border-amber-400/60 hover:bg-stone-950/40 hover:shadow-[0_16px_40px_rgba(245,158,11,0.3)] transition-all duration-300 overflow-hidden h-full"
                        >
                          {/* Top ambient highlight gradient line */}
                          <div
                            className="absolute top-0 inset-x-0 h-1 opacity-90"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${member.accentColor || '#fbbf24'}, transparent)`
                            }}
                          />

                          {/* Avatar Section & Role Badge Header */}
                          <div className="flex items-center justify-between gap-3 mb-5">
                            {/* Avatar with Circular Glowing Ring */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-white/60 to-amber-200/40 shadow-[0_0_18px_rgba(251,191,36,0.4)] shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full bg-stone-950/50"
                                onError={(e) => {
                                  const target = e.target as HTMLElement;
                                  target.style.display = 'none';
                                  if (target.parentElement) {
                                    const fallbackDiv = document.createElement('div');
                                    fallbackDiv.className = 'w-full h-full rounded-full bg-stone-900/80 flex items-center justify-center font-jetbrains font-black text-2xl text-amber-300';
                                    fallbackDiv.innerText = member.name.charAt(0);
                                    target.parentElement.appendChild(fallbackDiv);
                                  }
                                }}
                              />
                            </div>

                            {/* Right Role Vector Logo Badge */}
                            <div className="flex flex-col items-end gap-1.5">
                              {renderRoleBadgeIcon(member.iconType, member.role)}
                              <span className="font-jetbrains text-[11px] sm:text-xs text-stone-300 uppercase tracking-wider font-semibold drop-shadow">
                                ROLE
                              </span>
                            </div>
                          </div>

                          {/* Member Name (ALL CAPS) & Role Title */}
                          <div className="flex flex-col text-left space-y-1 mt-auto">
                            <span className="font-jetbrains text-2xl sm:text-3xl font-black text-white tracking-wider uppercase drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                              {member.name}
                            </span>

                            {/* Role Description */}
                            <div className="flex items-center gap-2">
                              <span
                                className="font-jetbrains text-sm sm:text-base font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                                style={{ color: member.accentColor || '#f59e0b' }}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            /* Phase 2: Why We Chose Hanoi with Click-to-Type & Font Inter (No Border, 1 Step Smaller Font) */
            <motion.div
              key="phase-why-hanoi"
              initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl mx-auto p-4 sm:p-8 relative"
            >
              {/* Typewriter Narrative Paragraph in font Inter - Clean borderless */}
              <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl text-stone-100 font-normal leading-relaxed sm:leading-loose tracking-normal drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)] text-left min-h-[140px]">
                {displayedText}
                {isTypingActive && (
                  <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 bg-amber-400 ml-1.5 align-middle animate-pulse shadow-[0_0_10px_#fbbf24]" />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
