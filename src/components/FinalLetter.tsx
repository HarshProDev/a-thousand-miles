import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { LETTER_CONTENT } from '../data/content';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { Celebration } from './Celebration';

interface FinalLetterProps {
  letterOpened: boolean;
  letterRevealedAll: boolean;
  celebrationActive: boolean;
  onOpenLetter: () => void;
  onFinishReveal: () => void;
  onActivateCelebration: () => void;
  onPlayEnvelopeSound: () => void;
  onPlayCelebrationSound: () => void;
  onReplay: () => void;
}

export function FinalLetter({
  letterOpened,
  letterRevealedAll,
  celebrationActive,
  onOpenLetter,
  onFinishReveal,
  onActivateCelebration,
  onPlayEnvelopeSound,
  onPlayCelebrationSound,
  onReplay,
}: FinalLetterProps) {
  const reducedMotion = useReducedMotionPreference();
  const totalParagraphs = LETTER_CONTENT.paragraphs.length;
  const [visibleCount, setVisibleCount] = useState<number>(
    letterRevealedAll ? totalParagraphs : 0
  );

  // Staggered paragraph-by-paragraph reveal (gentle, readable pace)
  useEffect(() => {
    if (!letterOpened) {
      setVisibleCount(0);
      return;
    }

    if (letterRevealedAll || reducedMotion) {
      setVisibleCount(totalParagraphs);
      onFinishReveal();
      return;
    }

    if (visibleCount >= totalParagraphs) {
      onFinishReveal();
      return;
    }

    const timer = window.setTimeout(
      () => {
        setVisibleCount((prev) => Math.min(totalParagraphs, prev + 1));
      },
      visibleCount === 0 ? 350 : 620
    );

    return () => window.clearTimeout(timer);
  }, [
    letterOpened,
    letterRevealedAll,
    onFinishReveal,
    reducedMotion,
    totalParagraphs,
    visibleCount,
  ]);

  // Automatically blossom into the Final Celebration shortly after the letter finishes revealing
  useEffect(() => {
    if (!letterOpened || !letterRevealedAll || celebrationActive) return;
    const timer = window.setTimeout(() => {
      onActivateCelebration();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [celebrationActive, letterOpened, letterRevealedAll, onActivateCelebration]);

  const handleOpen = () => {
    onPlayEnvelopeSound();
    onOpenLetter();
  };

  const handleSkip = () => {
    setVisibleCount(totalParagraphs);
    onFinishReveal();
  };

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full px-5 sm:px-8 pt-7 pb-14 parchment-surface text-ink">
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-burgundy">
            {LETTER_CONTENT.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ink/75">
            {LETTER_CONTENT.subtitle}
          </p>
          <p lang="zh-CN" className="mt-1 font-chinese text-sm sm:text-base text-ink/70">
            {LETTER_CONTENT.chineseSubtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!letterOpened ? (
            /* Sealed Letter State */
            <motion.div
              key="sealed-letter"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="mt-10 w-full max-w-md"
            >
              <div className="relative rounded-xl border border-gold/75 bg-white/70 p-8 sm:p-10 shadow-xl text-center">
                <div className="pointer-events-none absolute inset-3 rounded-lg border border-gold/35" />

                {/* Red Wax Seal */}
                <div
                  className="mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-gold/65"
                  style={{
                    background:
                      'radial-gradient(circle at 35% 30%, #B3485B 0%, #963C4C 55%, #541C2B 100%)',
                  }}
                >
                  <span className="font-chinese text-3xl font-semibold text-ivory">
                    {LETTER_CONTENT.chineseSeal}
                  </span>
                </div>

                <p className="mt-6 font-display text-xl sm:text-2xl text-burgundy">
                  Sealed for Zai Zai
                </p>
                <p className="mt-2 text-sm text-ink/75">
                  Break the wax seal to unfold your birthday letter.
                </p>

                <button
                  type="button"
                  onClick={handleOpen}
                  className="mt-7 min-h-12 px-7 py-3 rounded-lg bg-burgundy text-ivory font-semibold text-sm sm:text-base shadow-md hover:bg-crimson transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy whitespace-nowrap"
                >
                  {LETTER_CONTENT.openButtonLabel}
                </button>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Stationery Letter */
            <motion.article
              key="unfolded-letter"
              initial={{ opacity: 0, scaleY: 0.92, y: 12 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center' }}
              className="mt-8 w-full rounded-xl border border-gold/80 bg-[#FFFDF8] p-6 sm:p-12 shadow-xl relative"
            >
              <div className="pointer-events-none absolute inset-3 rounded-lg border border-gold/30" />

              {/* Top decorative seal mark + optional Skip animation control */}
              <div className="relative z-10 flex items-center justify-between gap-4 pb-5 mb-6 border-b border-gold/35">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-crimson text-ivory flex items-center justify-center font-chinese text-sm font-semibold border border-gold/60">
                    {LETTER_CONTENT.chineseSeal}
                  </div>
                  <span className="text-xs text-crimson font-medium tracking-wide">
                    A letter from Harsh
                  </span>
                </div>

                {!letterRevealedAll && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="min-h-10 px-3 py-1.5 rounded-md border border-ink/15 text-xs font-medium text-ink/75 hover:text-burgundy hover:border-burgundy/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy whitespace-nowrap"
                  >
                    {LETTER_CONTENT.skipButtonLabel}
                  </button>
                )}
              </div>

              {/* Letter Paragraphs */}
              <div className="relative z-10 space-y-4 sm:space-y-5 font-display text-lg sm:text-[22px] text-ink leading-[1.7] max-w-[65ch]">
                {LETTER_CONTENT.paragraphs.map((para, idx) => {
                  const isVisible = idx < visibleCount;
                  const isSignature = idx === LETTER_CONTENT.paragraphs.length - 1;
                  return (
                    <motion.p
                      key={idx}
                      initial={false}
                      animate={
                        isVisible
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 8 }
                      }
                      transition={{ duration: 0.55 }}
                      className={`whitespace-pre-line ${idx === 0
                          ? 'font-semibold text-burgundy text-xl sm:text-2xl'
                          : isSignature
                            ? 'pt-3 font-semibold text-burgundy'
                            : ''
                        }`}
                    >
                      {para}
                      <span lang="zh-CN" className="mt-1 block font-chinese text-sm sm:text-base font-normal text-ink/75">
                        {LETTER_CONTENT.chineseParagraphs[idx]}
                      </span>
                    </motion.p>
                  );
                })}
              </div>

              {/* Manual trigger button if celebration hasn't popped yet */}
              {letterRevealedAll && !celebrationActive && (
                <div className="relative z-10 mt-8 pt-4 text-center">
                  <button
                    type="button"
                    onClick={onActivateCelebration}
                    className="min-h-12 px-6 py-3 rounded-lg bg-crimson text-ivory font-semibold text-sm inline-flex items-center gap-2 hover:bg-burgundy transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{LETTER_CONTENT.celebrateButtonLabel}</span>
                  </button>
                </div>
              )}
            </motion.article>
          )}
        </AnimatePresence>

        {/* Final Celebration Panel */}
        {celebrationActive && (
          <div className="w-full pb-safe">
            <Celebration
              onReplay={onReplay}
              onPlayCelebrationSound={onPlayCelebrationSound}
            />
          </div>
        )}
      </div>
    </section>
  );
}
