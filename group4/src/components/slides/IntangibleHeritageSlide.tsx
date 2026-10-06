import React, { useState, useEffect, useRef } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../../utils/soundEffects';

interface Props {
  slide: Slide;
  theme?: ThemeStyles;
  stepIndex?: number;
  onSetStepIndex?: (step: number) => void;
  onRegisterSteps?: (totalSteps: number) => void;
  onNextAction?: () => void;
}

interface IntangibleHeritageItem {
  id: string;
  title: string;
  subtitle: string;
  fullNarrative: string;
  accentColor: string;
  images: { src: string; caption: string }[];
}

const INTANGIBLE_HERITAGE_ITEMS: IntangibleHeritageItem[] = [
  {
    id: 'intangible-1',
    title: 'Ca Tru Chamber Music (Ca Tru Singing)',
    subtitle: 'UNESCO Intangible Cultural Heritage',
    fullNarrative:
      'An exquisite thousand-year-old vocal art where poetry meets pure soul. A master vocalist sings while striking bamboo clappers, joined by the deep resonating timbre of the three-stringed Dan Day lute and the rhythmic beats of a praise drum. It is an aristocratic dialogue between lyricism, scholarly philosophy, and passion.',
    accentColor: '#fbbf24',
    images: [
      {
        src: '/src/assets/images/catru.jpg',
        caption: 'Ca Tru Singing · Traditional Chamber Art'
      },
      {
        src: '/src/assets/images/catru2.jpg',
        caption: 'Master Vocalist, Dan Day Lute & Praise Drum'
      }
    ]
  },
  {
    id: 'intangible-2',
    title: 'Thang Long Water Puppetry (Mua Roi Nuoc)',
    subtitle: 'Ancient Red River Delta Living Folk Art',
    fullNarrative:
      'Born on flooded rice paddies in the 11th century, this is pure storytelling on water. Hidden puppeteers bring hand-carved lacquered wooden figures to life across shimmering liquid stages. Led by the witty, smiling jester Chu Teu to the rhythm of live folk drums, it turns village lore and mythical dragons into pure magic.',
    accentColor: '#38bdf8',
    images: [
      {
        src: '/src/assets/images/roinuoc.jpeg',
        caption: 'Thang Long Water Puppetry · Liquid Stage'
      },
      {
        src: '/src/assets/images/roinuoc2.jpg',
        caption: 'Chu Teu & Lacquered Wooden Puppets'
      }
    ]
  },
  {
    id: 'intangible-3',
    title: 'Giong Festival of Phu Dong and Soc Temples',
    subtitle: 'UNESCO Representative Heritage of Humanity',
    fullNarrative:
      'An epic spring festival celebrating Saint Giong, the mythical child hero who rode an iron horse to defend the ancient kingdom. Through thunderous battle reenactments, sacred flag dances, and vibrant community rituals across Phu Dong and Soc Temples, it keeps the timeless flame of courage, solidarity, and patriotic spirit burning bright across generations.',
    accentColor: '#34d399',
    images: [
      {
        src: '/src/assets/images/giongfes.jfif',
        caption: 'Giong Festival · Sacred Processions'
      },
      {
        src: '/src/assets/images/giongfes2.jpg',
        caption: 'Phu Dong & Soc Temples Historic Rituals'
      }
    ]
  }
];

export const IntangibleHeritageSlide: React.FC<Props> = ({
  slide,
  stepIndex = 0,
  onSetStepIndex,
  onRegisterSteps,
  onNextAction,
}) => {
  const totalSteps = 7;

  let currentItemIdx = -1;
  let showPhotos = false;

  if (stepIndex === 1) {
    currentItemIdx = 0;
    showPhotos = false;
  } else if (stepIndex === 2) {
    currentItemIdx = 0;
    showPhotos = true;
  } else if (stepIndex === 3) {
    currentItemIdx = 1;
    showPhotos = false;
  } else if (stepIndex === 4) {
    currentItemIdx = 1;
    showPhotos = true;
  } else if (stepIndex === 5) {
    currentItemIdx = 2;
    showPhotos = false;
  } else if (stepIndex >= 6) {
    currentItemIdx = 2;
    showPhotos = true;
  }

  const currentItem =
    currentItemIdx >= 0 && currentItemIdx < INTANGIBLE_HERITAGE_ITEMS.length
      ? INTANGIBLE_HERITAGE_ITEMS[currentItemIdx]
      : null;

  const [typedText, setTypedText] = useState('');
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onRegisterSteps?.(totalSteps);
  }, [totalSteps, onRegisterSteps]);

  useEffect(() => {
    if (stepIndex === 2 || stepIndex === 4 || stepIndex >= 6) {
      if (currentItem) {
        setTypedText(currentItem.fullNarrative);
        setIsTypingDone(true);
        setIsTypingActive(false);
      }
      return;
    }

    setTypedText('');
    setIsTypingActive(false);
    setIsTypingDone(false);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
  }, [stepIndex, currentItemIdx]);

  const startTypewriter = () => {
    if (!currentItem) return;
    setTypedText('');
    setIsTypingActive(true);
    setIsTypingDone(false);
    let curLen = 0;
    const fullText = currentItem.fullNarrative;

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

    if (currentItem) {
      if (!showPhotos && !isTypingActive && !isTypingDone && typedText.length === 0) {
        startTypewriter();
        return;
      }

      if (isTypingActive && !isTypingDone) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setTypedText(currentItem.fullNarrative);
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
            2. Intangible Cultural Heritage
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
          {currentItem && (
            <motion.div
              key={currentItem.id}
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
                    {currentItem.subtitle}
                  </span>
                </div>

                <h2 className="font-jetbrains text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-snug drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  {currentItem.title}
                </h2>

                <div className="min-h-[140px] sm:min-h-[165px] pt-1">
                  <p className="font-sans text-base sm:text-lg md:text-xl lg:text-[1.32rem] text-stone-100 font-normal leading-relaxed sm:leading-relaxed md:leading-relaxed tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                    {typedText}
                    {isTypingActive && (
                      <span
                        className="inline-block w-2.5 sm:w-3 h-5 sm:h-6 ml-1.5 align-middle animate-pulse shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: currentItem.accentColor, color: currentItem.accentColor }}
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
                      {currentItem.images.map((photo, pIdx) => (
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
                              background: `linear-gradient(90deg, transparent, ${currentItem.accentColor}, transparent)`
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
                                fallback.innerHTML = `<span class="font-bold mb-1">${photo.caption}</span><span class="text-stone-400 text-[10px]">Intangible Heritage</span>`;
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
                              style={{ backgroundColor: currentItem.accentColor, color: currentItem.accentColor }}
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
