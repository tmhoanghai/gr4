import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';
import { Heart, Check, X } from 'lucide-react';

interface Props {
  slide: Slide;
  theme?: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

export const HanoiSummarySlide: React.FC<Props> = ({
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const totalSteps = 4;

  const showPhotos = stepIndex >= 2 && stepIndex < 3;
  const showClimax = stepIndex >= 2 && stepIndex < 3;
  const isHorrorBlackout = stepIndex === 3;

  const summaryText =
    "Hanoi is not merely a geographic point on a map; it is a thousand-year-old living soul where sacred royal stone dragons meet the intoxicating aroma of sizzling charcoal-grilled Bun Cha and morning Pho. Here, shaded lotus courtyards echo with scholarly virtues, water puppets dance across shimmering emerald waters, and the labyrinthine 36 Old Streets weave centuries of artisan pride into everyday life. We chose Hanoi because it is one of the rare capitals on earth where deep ancestral history, world-class gastronomy, and vibrant youth culture exist in effortless, poetic harmony.";

  const climaxSentence =
    "That is why we choose Hanoi — not just a city you visit, but a timeless feeling you fall in love with and carry in your heart forever.";

  const TEXT_Q1 = "Do you think it's the end?";
  const TEXT_Q2 = "Someone needs your help.\nAnswer their questions before the end.";
  const TEXT_NOTE =
    "Note: The questions and answers will contain places not mentioned in this presentation. Use your brain before answering!";
  const TEXT_READY = "Are you ready?";
  const TEXT_ONLY_YES = "Only choose YES.";
  const TEXT_GREAT_JOB = "GREAT JOB!";

  const [typedText, setTypedText] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [horrorScreen, setHorrorScreen] = useState<number>(1);
  const [screenDisplay, setScreenDisplay] = useState<string>('');
  const [isScreenTyping, setIsScreenTyping] = useState<boolean>(false);
  const [, setIsScreenDone] = useState<boolean>(false);
  const [hideNoButton, setHideNoButton] = useState<boolean>(false);
  const [onlyYesMessage, setOnlyYesMessage] = useState<string>('');
  const horrorTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onRegisterSteps?.(totalSteps);
  }, [totalSteps, onRegisterSteps]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (stepIndex === 0) {
      soundEffects.stopKindredBgm();
      setTypedText('');
      setIsTypingActive(false);
      setIsTypingDone(false);
      setHorrorScreen(1);
      setScreenDisplay('');
      setIsScreenTyping(false);
      setIsScreenDone(false);
      setHideNoButton(false);
      setOnlyYesMessage('');
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
    } else if (stepIndex === 1) {
      soundEffects.stopKindredBgm();
      setTypedText('');
      setIsTypingActive(false);
      setIsTypingDone(false);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    } else if (stepIndex === 2) {
      soundEffects.stopKindredBgm();
      setTypedText(summaryText);
      setIsTypingDone(true);
      setIsTypingActive(false);
    } else if (stepIndex === 3) {
      soundEffects.playKindredBgm(true);
      setHorrorScreen(1);
      setHideNoButton(false);
      setOnlyYesMessage('');
      typeHorrorText(TEXT_Q1, 90, () => {
        setIsScreenDone(true);
      });
    }
  }, [stepIndex]);

  const typeHorrorText = (target: string, speedMs: number, onComplete: () => void) => {
    if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
    setScreenDisplay('');
    setIsScreenTyping(true);
    setIsScreenDone(false);
    let curLen = 0;

    const step = () => {
      if (curLen < target.length) {
        curLen += 1;
        setScreenDisplay(target.slice(0, curLen));
        soundEffects.playKeyClickSound();
        horrorTimerRef.current = setTimeout(step, speedMs);
      } else {
        setIsScreenTyping(false);
        onComplete();
      }
    };
    step();
  };

  const startSummaryTypewriter = () => {
    setTypedText('');
    setIsTypingActive(true);
    setIsTypingDone(false);
    let curLen = 0;
    const fullText = summaryText;

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
    }, 14);
  };

  const bgImage = '/src/assets/images/bg1.jpg';

  const handleAdvance = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (stepIndex === 1) {
      if (!isTypingActive && !isTypingDone && typedText.length === 0) {
        startSummaryTypewriter();
        return;
      }
      if (isTypingActive && !isTypingDone) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setTypedText(summaryText);
        setIsTypingDone(true);
        setIsTypingActive(false);
        soundEffects.playKeyClickSound();
        return;
      }
    }

    if (stepIndex === 3) {
      if (horrorScreen === 1) {
        if (isScreenTyping) {
          if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
          setScreenDisplay(TEXT_Q1);
          setIsScreenTyping(false);
          setIsScreenDone(true);
          return;
        }
        setHorrorScreen(2);
        typeHorrorText(TEXT_Q2, 70, () => {
          setIsScreenDone(true);
          horrorTimerRef.current = setTimeout(() => {
            setHorrorScreen(3);
            typeHorrorText(TEXT_NOTE, 50, () => {
              setIsScreenDone(true);
            });
          }, 3000);
        });
        return;
      }

      if (horrorScreen === 2) {
        if (isScreenTyping) {
          if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
          setScreenDisplay(TEXT_Q2);
          setIsScreenTyping(false);
          setIsScreenDone(true);
          return;
        }
        if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
        setHorrorScreen(3);
        typeHorrorText(TEXT_NOTE, 50, () => {
          setIsScreenDone(true);
        });
        return;
      }

      if (horrorScreen === 3) {
        if (isScreenTyping) {
          if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
          setScreenDisplay(TEXT_NOTE);
          setIsScreenTyping(false);
          setIsScreenDone(true);
          return;
        }
        setHorrorScreen(4);
        setScreenDisplay(TEXT_READY);
        setIsScreenDone(true);
        return;
      }

      if (horrorScreen === 5) {
        if (horrorTimerRef.current) clearTimeout(horrorTimerRef.current);
        soundEffects.playRotateSound();
        onNextAction?.();
        return;
      }

      return;
    }

    soundEffects.playRotateSound();
    if (stepIndex < totalSteps - 1) {
      onSetStepIndex?.(stepIndex + 1);
    } else {
      onNextAction?.();
    }
  };

  const handleChooseNo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHideNoButton(true);
    setOnlyYesMessage('');
    let curLen = 0;
    const target = TEXT_ONLY_YES;
    const step = () => {
      if (curLen < target.length) {
        curLen += 1;
        setOnlyYesMessage(target.slice(0, curLen));
        setTimeout(step, 60);
      }
    };
    step();
  };

  const [isGreatJobFadingOut, setIsGreatJobFadingOut] = useState<boolean>(false);

  const handleChooseYes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHorrorScreen(5);
    setIsGreatJobFadingOut(false);
    setScreenDisplay('');

    typeHorrorText(TEXT_GREAT_JOB, 75, () => {
      horrorTimerRef.current = setTimeout(() => {
        setIsGreatJobFadingOut(true);
        setTimeout(() => {
          soundEffects.playRotateSound();
          onNextAction?.();
        }, 700);
      }, 1200);
    });
  };

  const summaryPhotos = [
    {
      src: '/src/assets/images/quoctugiam.jfif',
      caption: 'Temple of Literature · Ancient Scholar Sages'
    },
    {
      src: '/src/assets/images/36pho.jpg',
      caption: 'The 36 Old Streets · Vibrant Living Soul'
    }
  ];

  return (
    <div
      onClick={handleAdvance}
      className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden font-sans select-none cursor-pointer"
      title="Click anywhere to proceed"
    >
      {!isHorrorBlackout && (
        <>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={bgImage}
              alt="Slide Background"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/30 to-stone-950/55" />
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
                Summary
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mt-2"
            >
              <span className="font-jetbrains text-sm sm:text-base md:text-lg text-stone-200 font-semibold tracking-wide drop-shadow">
                The Essence of Hanoi
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

          <div className="relative z-10 w-full my-auto pt-3 sm:pt-5 min-h-[350px] flex items-center">
            {stepIndex >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center"
              >
                <div className="lg:col-span-7 flex flex-col space-y-3 sm:space-y-4 text-left">
                  <h2 className="font-jetbrains text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)]">
                    Why We Chose Hanoi
                  </h2>

                  <div className="min-h-[125px] sm:min-h-[145px]">
                    <p className="font-sans text-base sm:text-lg md:text-xl lg:text-[1.32rem] text-stone-100 font-normal leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                      {typedText}
                      {isTypingActive && (
                        <span className="inline-block w-2.5 sm:w-3 h-5 sm:h-6 ml-1.5 align-middle bg-amber-400 text-amber-400 animate-pulse shadow-[0_0_10px_#fbbf24]" />
                      )}
                    </p>
                  </div>

                  <AnimatePresence>
                    {showClimax && (
                      <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 220,
                          damping: 18
                        }}
                        className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/30 via-amber-600/20 to-stone-900/90 border border-amber-400/60 shadow-[0_0_32px_rgba(251,191,36,0.35)] backdrop-blur-md relative overflow-hidden"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="p-2.5 rounded-xl bg-amber-500/35 text-amber-300 shrink-0 mt-0.5 border border-amber-400/50 shadow-[0_0_16px_rgba(251,191,36,0.6)]">
                            <Heart className="w-5 h-5 fill-current" />
                          </div>
                          <p className="font-sans text-lg sm:text-xl md:text-2xl font-bold text-amber-200 leading-snug drop-shadow">
                            {climaxSentence}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center min-h-[280px]">
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
                        {summaryPhotos.map((photo, pIdx) => (
                          <motion.div
                            key={pIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.45,
                              delay: pIdx * 0.15,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            className="group relative w-full max-w-[360px] sm:max-w-[320px] lg:max-w-[390px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 bg-stone-950/40 backdrop-blur-md shadow-[0_14px_36px_rgba(0,0,0,0.6)] hover:border-amber-400/60 hover:shadow-[0_18px_40px_rgba(251,191,36,0.3)] transition-all duration-300"
                          >
                            <div className="absolute top-0 inset-x-0 h-1 opacity-90 z-10 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                            <img
                              src={photo.src}
                              alt={photo.caption}
                              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLElement;
                                target.style.display = 'none';
                                if (target.parentElement) {
                                  const fallback = document.createElement('div');
                                  fallback.className =
                                    'w-full h-full flex flex-col items-center justify-center bg-stone-900/90 text-amber-300 p-4 text-center font-jetbrains text-xs';
                                  fallback.innerHTML = `<span class="font-bold mb-1">${photo.caption}</span><span class="text-stone-400 text-[10px]">Hanoi Heritage</span>`;
                                  target.parentElement.appendChild(fallback);
                                }
                              }}
                            />

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-3 flex items-center justify-between z-10">
                              <span className="font-jetbrains text-xs sm:text-sm md:text-base text-stone-200 font-bold tracking-wide drop-shadow">
                                {photo.caption}
                              </span>
                              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}

      {isHorrorBlackout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 sm:p-12 text-center select-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.98)_75%)] pointer-events-none" />

          <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center min-h-[260px]">
            <AnimatePresence mode="wait">
              {horrorScreen === 1 && (
                <motion.div
                  key="screen-1"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55 }}
                  className="flex flex-col items-center justify-center"
                >
                  <h2 className="font-mono text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.9)] leading-tight">
                    {screenDisplay}
                    {isScreenTyping && (
                      <span className="inline-block w-3 sm:w-4 h-8 sm:h-12 ml-2 align-middle bg-white animate-pulse shadow-[0_0_16px_#ffffff]" />
                    )}
                  </h2>
                </motion.div>
              )}

              {horrorScreen === 2 && (
                <motion.div
                  key="screen-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55 }}
                  className="flex flex-col items-center justify-center"
                >
                  <h2 className="font-mono text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.85)] leading-relaxed whitespace-pre-wrap">
                    {screenDisplay}
                    {isScreenTyping && (
                      <span className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-10 ml-2 align-middle bg-white animate-pulse shadow-[0_0_14px_#ffffff]" />
                    )}
                  </h2>
                </motion.div>
              )}

              {horrorScreen === 3 && (
                <motion.div
                  key="screen-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55 }}
                  className="max-w-3xl mx-auto p-6 text-center"
                >
                  <p className="font-mono text-base sm:text-lg md:text-xl text-white font-normal leading-relaxed tracking-wide drop-shadow-[0_0_24px_rgba(255,255,255,0.7)]">
                    {screenDisplay}
                    {isScreenTyping && (
                      <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 ml-1.5 align-middle bg-white animate-pulse shadow-[0_0_10px_#ffffff]" />
                    )}
                  </p>
                </motion.div>
              )}

              {horrorScreen === 4 && (
                <motion.div
                  key="screen-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55 }}
                  className="flex flex-col items-center space-y-8"
                >
                  <h2 className="font-mono text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.95)]">
                    {TEXT_READY}
                  </h2>

                  <div className="flex items-center gap-6 sm:gap-10 pt-2">
                    <button
                      onClick={handleChooseYes}
                      className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-stone-950 font-mono font-black text-lg sm:text-2xl border border-white/40 hover:border-white shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 flex items-center gap-2"
                    >
                      <Check className="w-6 h-6" />
                      <span>YES</span>
                    </button>

                    {!hideNoButton && (
                      <button
                        onClick={handleChooseNo}
                        className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl bg-red-950/40 hover:bg-red-900/70 text-red-300 font-mono font-black text-lg sm:text-2xl border border-red-500/40 hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
                      >
                        <X className="w-6 h-6" />
                        <span>NO</span>
                      </button>
                    )}
                  </div>

                  {onlyYesMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-mono text-base sm:text-xl text-red-400 font-bold tracking-widest drop-shadow-[0_0_16px_rgba(239,68,68,0.8)] pt-2"
                    >
                      {onlyYesMessage}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {horrorScreen === 5 && (
                <motion.div
                  key="screen-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: isGreatJobFadingOut ? 0 : 1,
                    scale: isGreatJobFadingOut ? 1.05 : 1,
                    filter: isGreatJobFadingOut ? 'blur(10px)' : 'blur(0px)'
                  }}
                  transition={{ duration: 0.65 }}
                  className="flex flex-col items-center justify-center space-y-4"
                >
                  <h2 className="font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.95)]">
                    {screenDisplay}
                    {isScreenTyping && (
                      <span className="inline-block w-4 sm:w-6 h-12 sm:h-16 ml-3 align-middle bg-white animate-pulse shadow-[0_0_20px_#ffffff]" />
                    )}
                  </h2>
                  <div className="w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_24px_#ffffff]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};
