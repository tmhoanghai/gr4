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

export const ThankYouSlide: React.FC<Props> = ({
  onRegisterSteps,
}) => {
  const FULL_TEXT = "THANK YOU\nFOR LISTENING";
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    onRegisterSteps?.(1);

    setTypedText('');
    setIsTypingDone(false);
    let curLen = 0;

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      if (curLen < FULL_TEXT.length) {
        curLen += 1;
        setTypedText(FULL_TEXT.slice(0, curLen));
        if (FULL_TEXT[curLen - 1] !== '\n') {
          soundEffects.playKeyClickSound();
        }
      } else {
        setIsTypingDone(true);
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      }
    }, 135);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [onRegisterSteps]);

  const handleSkipTyping = () => {
    if (!isTypingDone) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setTypedText(FULL_TEXT);
      setIsTypingDone(true);
      soundEffects.playKeyClickSound();
    }
  };

  return (
    <div
      onClick={handleSkipTyping}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black font-sans select-none text-white cursor-pointer p-6 sm:p-12 md:p-16"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.98)_75%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl mx-auto space-y-8 sm:space-y-14">
        <h1 className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white tracking-widest leading-[1.15] drop-shadow-[0_0_50px_rgba(255,255,255,0.95)] whitespace-pre-line">
          {typedText}
          {!isTypingDone && (
            <span className="inline-block w-4 sm:w-6 h-12 sm:h-20 ml-2 align-middle bg-white animate-pulse shadow-[0_0_20px_#ffffff]" />
          )}
        </h1>

        <AnimatePresence>
          {isTypingDone && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="flex items-center justify-center gap-6 sm:gap-10 pt-4 w-full"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="max-w-[120px] sm:max-w-[180px] md:max-w-[240px] h-[3px] bg-gradient-to-r from-transparent to-amber-400 shadow-[0_0_16px_#fbbf24]"
              />

              <span className="font-mono text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.25em] text-amber-400 uppercase drop-shadow-[0_0_30px_rgba(251,191,36,0.95)] shrink-0">
                themaster
              </span>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="max-w-[120px] sm:max-w-[180px] md:max-w-[240px] h-[3px] bg-gradient-to-l from-transparent to-amber-400 shadow-[0_0_16px_#fbbf24]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
