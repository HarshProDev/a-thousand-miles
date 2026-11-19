import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ROSE_CONTENT } from '../data/content';
import { FloatingPetals } from './FloatingPetals';
import { ResilientPhoto } from './ResilientPhoto';

interface RoseRevealProps {
  isRevealed: boolean;
  onTouchRose: () => void;
  onPlayChimeSound: () => void;
  onContinue: () => void;
}

export function RoseReveal({
  isRevealed,
  onTouchRose,
  onPlayChimeSound,
  onContinue,
}: RoseRevealProps) {
  const handleReveal = () => {
    if (isRevealed) return;
    onPlayChimeSound();
    onTouchRose();
  };

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full px-5 sm:px-8 pt-6 pb-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Delicate rose petal cascade once touched */}
      {isRevealed && <FloatingPetals variant="rose" count={18} />}

      <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Single Rose Motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
          aria-hidden="true"
        >
          <svg viewBox="0 0 64 64" className="w-11 h-11 text-peach">
            <path
              d="M32 34 C32 45, 32 52, 32 58"
              stroke="#D6B77C"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M32 46 C26 44, 23 40, 22 36 C27 37, 30 40, 32 46 Z"
              fill="#D6B77C"
              fillOpacity="0.45"
            />
            <path
              d="M32 10 C38 14, 42 22, 38 30 C35 34, 29 34, 26 30 C22 22, 26 14, 32 10 Z"
              fill="#963C4C"
              stroke="#EAB6AD"
              strokeWidth="1.1"
            />
            <path
              d="M27 18 C30 22, 34 22, 37 18 C35 25, 29 25, 27 18 Z"
              fill="#EAB6AD"
              fillOpacity="0.7"
            />
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-chinese text-base sm:text-lg text-gold tracking-[0.25em]"
        >
          {ROSE_CONTENT.chineseSubtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-1.5 font-display text-3xl sm:text-5xl font-semibold text-ivory"
        >
          {ROSE_CONTENT.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-3 max-w-lg text-sm sm:text-base text-ivory/85 leading-relaxed"
        >
          {ROSE_CONTENT.supportingText}
        </motion.p>
        <p lang="zh-CN" className="mt-2 max-w-lg font-chinese text-sm sm:text-base text-peach/90 leading-relaxed">
          {ROSE_CONTENT.chineseSupportingText}
        </p>

        {/* Central Framed Photograph (No Distortion, No Forced Cropping) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-7 w-full max-w-md"
        >
          <div
            className={`relative p-3 sm:p-4 rounded-xl bg-wine/85 transition-all duration-1000 ${isRevealed
                ? 'border-2 border-gold shadow-[0_0_45px_rgba(214,183,124,0.32)]'
                : 'border border-gold/40 shadow-2xl'
              }`}
          >
            {/* Subtle corner filigree lines */}
            <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-gold/25" />

            <div className="relative w-full min-h-70 max-h-[54vh] flex items-center justify-center overflow-hidden rounded-md bg-wine">
              <ResilientPhoto
                src={ROSE_CONTENT.imageSrc}
                alt={ROSE_CONTENT.imageAlt}
                fallbackTitle="A Rose From India"
                fallbackChinese="千里寄花"
                className="w-full min-h-70"
                imgClassName="max-h-[52vh] w-auto max-w-full object-contain mx-auto rounded-sm"
              />
            </div>
          </div>
        </motion.div>
        {/* Primary Interaction or Revealed Message */}
        <div className="mt-7 w-full max-w-lg pb-safe">
          {!isRevealed ? (
            <motion.button
              type="button"
              onClick={handleReveal}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="min-h-12 px-7 py-3 rounded-lg bg-gold text-wine font-semibold text-sm sm:text-base shadow-lg hover:bg-ivory transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ivory whitespace-nowrap"
            >
              {ROSE_CONTENT.buttonLabel}
            </motion.button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-gold/35 bg-wine/75 backdrop-blur-sm p-5 sm:p-6 shadow-xl"
              >
                <div className="space-y-3 font-display text-xl sm:text-2xl text-ivory leading-relaxed">
                  {ROSE_CONTENT.revealedMessage.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.45 }}
                      className={i === 1 ? 'text-gold font-semibold' : ''}
                    >
                      {line}
                    </motion.p>
                  ))}
                  <p lang="zh-CN" className="font-chinese text-sm sm:text-base text-peach/90">
                    {ROSE_CONTENT.chineseRevealedMessage}
                  </p>
                  <p className="pt-1 text-sm text-gold">
                    {ROSE_CONTENT.revealedSignature}
                    <span aria-hidden="true"> · </span>
                    <span lang="zh-CN" className="font-chinese">
                      {ROSE_CONTENT.chineseRevealedSignature}
                    </span>
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.95 }}
                  className="mt-6"
                >
                  <button
                    type="button"
                    onClick={onContinue}
                    className="min-h-12 px-7 py-3 rounded-lg bg-gold text-wine font-semibold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg hover:bg-ivory transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ivory whitespace-nowrap"
                  >
                    <span>{ROSE_CONTENT.nextButtonLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
