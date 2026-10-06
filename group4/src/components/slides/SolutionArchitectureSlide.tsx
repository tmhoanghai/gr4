import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';
import { MapPin } from 'lucide-react';

interface Props {
  slide: Slide;
  theme?: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

interface HeritageSite {
  id: string;
  title: string;
  subtitle: string;
  address: string;
  historyText: string;
  accentColor: string;
  images: { src: string; caption: string }[];
}

const HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'site-1',
    title: 'Imperial Citadel of Thang Long',
    subtitle: 'UNESCO World Heritage Site',
    address: '19C Hoang Dieu Street, Ba Dinh District, Hanoi',
    historyText:
      'Founded in 1010 by Emperor Ly Thai To after witnessing an auspicious golden dragon soar into the sky above the Red River, this monumental fortress was the beating heart of Vietnamese royal sovereignty, military strategy, and culture for 13 consecutive centuries. Buried beneath its tranquil lawns lie archaeological strata spanning the Ly, Tran, and Le dynasties, anchored by the towering Doan Mon Royal Gate and the sacred 15th-century stone dragon steps of Kinh Thien Palace.',
    accentColor: '#fbbf24',
    images: [
      {
        src: '/src/assets/images/thanglong1.jpg',
        caption: 'Imperial Citadel · Main Royal Gate'
      },
      {
        src: '/src/assets/images/thanglong2.jpg',
        caption: 'Ancient Dragon Steps & Architecture'
      }
    ]
  },
  {
    id: 'site-2',
    title: 'Temple of Literature & Imperial Academy',
    subtitle: "Vietnam's First National University",
    address: '58 Quoc Tu Giam Street, Dong Da District, Hanoi',
    historyText:
      "Established in 1070 under Emperor Ly Thanh Tong to honor Confucius, and expanded in 1076 as Vietnam's very first imperial university, this sacred scholarly oasis educated princes, mandarins, and the nation's brightest minds for over seven centuries. Tranquil stone courtyards guide visitors through the iconic Khue Van Cac pavilion and the Well of Heavenly Clarity to 82 revered stone turtle doctor steles, forever immortalizing the names and moral virtues of Vietnam's historic laureates.",
    accentColor: '#38bdf8',
    images: [
      {
        src: '/src/assets/images/quoctugiam.jfif',
        caption: 'Temple of Literature · Khue Van Cac'
      },
      {
        src: '/src/assets/images/quoctugiam2.jpg',
        caption: 'Doctor Steles on Stone Turtles'
      }
    ]
  },
  {
    id: 'site-3',
    title: 'Hanoi Old Quarter (The 36 Old Streets)',
    subtitle: 'Centuries-Old Artisan & Cultural Heart',
    address: 'Hoan Kiem District, Hanoi (North & West of Sword Lake)',
    historyText:
      'Dating back to the 11th century as specialized merchant guilds established outside the royal citadel, the 36 Old Streets evolved into an enchanting commercial and cultural labyrinth along the Red River. Each street took the name of the specific trade mastered by its craftsmen—from silversmiths on Hang Bac to silk weavers on Hang Gai. Characterized by narrow traditional "tube houses" and an intoxicating sidewalk street food culture, it remains the living, breathing soul of Hanoi.',
    accentColor: '#34d399',
    images: [
      {
        src: '/src/assets/images/36pho2.jfif',
        caption: 'The 36 Historic Guild Streets'
      },
      {
        src: '/src/assets/images/36pho.jpg',
        caption: 'Ancient Tube Houses & Vibrant Alleys'
      }
    ]
  }
];

export const SolutionArchitectureSlide: React.FC<Props> = ({
  slide,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const totalSteps = 7;

  let currentSiteIdx = -1;
  let showPhotos = false;

  if (stepIndex === 1) {
    currentSiteIdx = 0;
    showPhotos = false;
  } else if (stepIndex === 2) {
    currentSiteIdx = 0;
    showPhotos = true;
  } else if (stepIndex === 3) {
    currentSiteIdx = 1;
    showPhotos = false;
  } else if (stepIndex === 4) {
    currentSiteIdx = 1;
    showPhotos = true;
  } else if (stepIndex === 5) {
    currentSiteIdx = 2;
    showPhotos = false;
  } else if (stepIndex >= 6) {
    currentSiteIdx = 2;
    showPhotos = true;
  }

  const currentSite = currentSiteIdx >= 0 && currentSiteIdx < HERITAGE_SITES.length ? HERITAGE_SITES[currentSiteIdx] : null;

  const [typedText, setTypedText] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onRegisterSteps?.(totalSteps);
  }, [totalSteps, onRegisterSteps]);

  useEffect(() => {
    if (stepIndex === 2 || stepIndex === 4 || stepIndex >= 6) {
      if (currentSite) {
        setTypedText(currentSite.historyText);
        setIsTypingDone(true);
        setIsTypingActive(false);
      }
      return;
    }

    setTypedText('');
    setIsTypingActive(false);
    setIsTypingDone(false);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
  }, [stepIndex, currentSiteIdx]);

  const startTypewriter = () => {
    if (!currentSite) return;
    setTypedText('');
    setIsTypingActive(true);
    setIsTypingDone(false);
    let curLen = 0;
    const fullText = currentSite.historyText;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (curLen < fullText.length) {
        curLen += 1;
        setTypedText(fullText.slice(0, curLen));

        if (curLen % 2 === 0) {
          soundEffects.playKeyClickSound();
        }
      } else {
        setIsTypingDone(true);
        setIsTypingActive(false);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 16);
  };

  const bgImage = slide.backgroundImage || '/src/assets/images/bg3.jpg';

  const handleAdvance = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (currentSite) {
      if (!showPhotos && !isTypingActive && !isTypingDone && typedText.length === 0) {
        startTypewriter();
        return;
      }

      if (isTypingActive && !isTypingDone) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setTypedText(currentSite.historyText);
        setIsTypingDone(true);
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

  return (
    <div
      onClick={handleAdvance}
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden font-sans select-none cursor-pointer"
      title="Click anywhere to proceed"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Slide Background"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/20 to-stone-950/45" />
      </div>

      <div className="relative z-10 flex flex-col items-start max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -60, rotateX: 45, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-jetbrains text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] whitespace-nowrap">
            II.Body
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8, letterSpacing: '0.3em' }}
          animate={{ opacity: 1, y: 0, scale: 1, letterSpacing: '0.05em' }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-5 sm:mt-6"
        >
          <span className="font-jetbrains text-lg sm:text-xl md:text-2xl text-amber-300 font-bold tracking-wider drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
            Culture
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mt-2"
        >
          <span className="font-jetbrains text-base sm:text-lg md:text-xl text-stone-200 font-semibold tracking-wide drop-shadow">
            1. Tangible Cultural Heritage
          </span>
        </motion.div>

        <div className="relative mt-2.5 flex items-center justify-start w-full max-w-xs sm:max-w-md">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="h-[3px] w-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent origin-left shadow-[0_0_16px_rgba(251,191,36,0.95)]"
          />
        </div>
      </div>

      <div className="relative z-10 w-full my-auto pt-3 sm:pt-5 min-h-[340px] flex items-center">
        <AnimatePresence mode="wait">
          {currentSite && (
            <motion.div
              key={currentSite.id}
              initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                x: -80,
                scale: 0.95,
                filter: 'blur(10px)',
                transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] }
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center"
            >
              <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-jetbrains text-xs sm:text-sm md:text-base text-stone-200 uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-white/20 backdrop-blur-md">
                    {currentSite.subtitle}
                  </span>
                </div>

                <h2 className="font-jetbrains text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  {currentSite.title}
                </h2>

                <div className="flex items-center gap-2 text-amber-300 font-sans text-sm sm:text-base md:text-lg lg:text-xl font-semibold drop-shadow">
                  <MapPin className="w-5 h-5 shrink-0 text-amber-400" />
                  <span>{currentSite.address}</span>
                </div>

                <div className="min-h-[140px] sm:min-h-[165px] pt-1">
                  <p className="font-sans text-base sm:text-lg md:text-xl lg:text-[1.32rem] text-stone-100 font-normal leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    {typedText}
                    {isTypingActive && (
                      <span
                        className="inline-block w-2.5 sm:w-3 h-5 sm:h-6 ml-1.5 align-middle animate-pulse shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: currentSite.accentColor, color: currentSite.accentColor }}
                      />
                    )}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center min-h-[260px]">
                <AnimatePresence>
                  {showPhotos && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, x: 50, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 16,
                        mass: 0.9
                      }}
                      className="w-full flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center"
                    >
                      {currentSite.images.map((photo, pIdx) => (
                        <motion.div
                          key={pIdx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: pIdx * 0.15,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="group relative w-full max-w-[360px] sm:max-w-[320px] lg:max-w-[400px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 bg-stone-950/40 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.55)] hover:border-amber-400/60 hover:shadow-[0_16px_36px_rgba(251,191,36,0.25)] transition-all duration-300"
                        >
                          <div
                            className="absolute top-0 inset-x-0 h-1 opacity-85 z-10"
                            style={{
                              background: `linear-gradient(90deg, transparent, ${currentSite.accentColor}, transparent)`
                            }}
                          />

                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex flex-col items-center justify-center bg-stone-900/90 text-amber-300 p-4 text-center font-jetbrains text-xs';
                                fallback.innerHTML = `<span class="font-bold mb-1">${photo.caption}</span><span class="text-stone-400 text-[10px]">Heritage Site</span>`;
                                target.parentElement.appendChild(fallback);
                              }
                            }}
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-3 sm:p-3.5 flex items-center justify-between z-10">
                            <span className="font-jetbrains text-xs sm:text-sm md:text-base text-stone-200 font-bold tracking-wide drop-shadow">
                              {photo.caption}
                            </span>
                            <span
                              className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                              style={{ backgroundColor: currentSite.accentColor, color: currentSite.accentColor }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
