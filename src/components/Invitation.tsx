import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { INVITATION_CONTENT } from '../data/content';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { Lantern } from './Lantern';

interface InvitationProps {
  onOpenSurprise: () => void;
  onPlayEnvelopeSound: () => void;
  onStartAudio: () => void;
}

const GOLD_SPARKS = [
  { x: -75, y: -65, size: 6, delay: 0.05 },
  { x: 82, y: -58, size: 5, delay: 0.1 },
  { x: -45, y: -92, size: 4, delay: 0.14 },
  { x: 42, y: -98, size: 7, delay: 0.08 },
  { x: -102, y: -18, size: 5, delay: 0.18 },
  { x: 105, y: -22, size: 5, delay: 0.12 },
  { x: -58, y: 34, size: 4, delay: 0.2 },
  { x: 64, y: 38, size: 6, delay: 0.16 },
  { x: 0, y: -112, size: 6, delay: 0.04 },
];

export function Invitation({
  onOpenSurprise,
  onPlayEnvelopeSound,
  onStartAudio,
}: InvitationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  const handleTriggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    onPlayEnvelopeSound();
    onStartAudio();

    const waitMs = reducedMotion ? 150 : 950;
    window.setTimeout(() => {
      onOpenSurprise();
    }, waitMs);
  };

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full flex flex-col items-center justify-center px-5 py-10 overflow-hidden">
      {/* Swaying Lanterns */}
      <Lantern
        size="md"
        className="absolute -top-2 left-3 sm:left-14 opacity-90"
        delay={0}
      />
      <Lantern
        size="sm"
        className="hidden sm:block absolute -top-2 right-14 opacity-80"
        delay={1.4}
      />

      <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-xs sm:text-sm tracking-[0.2em] text-gold/90 font-medium"
        >
          {INVITATION_CONTENT.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mt-3 font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-ivory tracking-tight"
        >
          {INVITATION_CONTENT.heading}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-2 font-chinese text-2xl sm:text-3xl text-peach tracking-[0.22em]"
        >
          {INVITATION_CONTENT.chineseSubtitle}
        </motion.p>

        {/* Traditional Red Envelope with Gold Wax Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mt-8 mb-7"
        >
          {/* Emerging gold particles when opening */}
          <AnimatePresence>
            {isOpening && !reducedMotion && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center z-30"
                aria-hidden="true"
              >
                {GOLD_SPARKS.map((spark, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.3, 1.25, 0.6],
                      x: spark.x,
                      y: spark.y,
                    }}
                    transition={{
                      duration: 0.85,
                      delay: spark.delay,
                      ease: 'easeOut',
                    }}
                    style={{
                      position: 'absolute',
                      width: spark.size,
                      height: spark.size,
                      borderRadius: '9999px',
                      backgroundColor: '#D6B77C',
                      boxShadow: '0 0 12px 3px rgba(214, 183, 124, 0.7)',
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={handleTriggerOpen}
            disabled={isOpening}
            aria-label="Open sealed red birthday envelope"
            className="group relative block w-64 h-44 sm:w-80 sm:h-52 cursor-pointer focus-visible:outline-2 focus-visible:outline-gold rounded-xl transition-transform duration-300 hover:-translate-y-1 active:scale-[0.98]"
            style={{ perspective: '1000px' }}
          >
            {/* Envelope Body */}
            <div
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gold/55"
              style={{
                background:
                  'linear-gradient(155deg, #8F2F3F 0%, #6B1F2E 52%, #4C1521 100%)',
              }}
            >
              {/* Subtle antique gold corner frame */}
              <div className="absolute inset-2.5 rounded-lg border border-gold/30 pointer-events-none" />

              {/* Rising inner ivory card peek */}
              <motion.div
                initial={false}
                animate={isOpening ? { y: -36, opacity: 1 } : { y: 8, opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-5 right-5 top-4 h-24 rounded-t-md bg-ivory border border-gold/50 shadow-md flex items-center justify-center"
              >
                <span className="font-chinese text-burgundy text-sm tracking-widest">
                  千里之谊
                </span>
              </motion.div>

              {/* Lower envelope fold lines */}
              <svg
                viewBox="0 0 320 208"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 208 L160 108 L320 208 Z"
                  fill="#5E1A28"
                  fillOpacity="0.65"
                />
                <path
                  d="M0 0 L160 112 L320 0"
                  fill="none"
                  stroke="#D6B77C"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Top Flap with 3D rotation */}
              <motion.div
                initial={false}
                animate={
                  isOpening
                    ? { rotateX: 168, filter: 'brightness(0.85)' }
                    : { rotateX: 0, filter: 'brightness(1)' }
                }
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                className="absolute top-0 left-0 right-0 h-[56%] z-10"
              >
                <svg
                  viewBox="0 0 320 118"
                  className="w-full h-full drop-shadow-md"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0 L320 0 L160 112 Z"
                    fill="#7D2737"
                    stroke="#D6B77C"
                    strokeOpacity="0.55"
                    strokeWidth="1.2"
                  />
                </svg>
              </motion.div>

              {/* Gold Wax Seal */}
              <motion.div
                initial={false}
                animate={
                  isOpening
                    ? { scale: 1.28, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.32 }}
                className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border border-ivory/40 group-hover:scale-105 transition-transform"
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, #F1D79B 0%, #D6B77C 52%, #A68449 100%)',
                }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-wine/35 flex items-center justify-center">
                  <span className="font-chinese text-lg sm:text-xl font-semibold text-wine">
                    礼
                  </span>
                </div>
              </motion.div>
            </div>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="max-w-md text-sm sm:text-base text-ivory/85 leading-relaxed"
        >
          {INVITATION_CONTENT.supportingText}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          lang="zh-CN"
          className="mt-2 font-chinese text-sm sm:text-base text-peach/90 leading-relaxed"
        >
          {INVITATION_CONTENT.chineseSupportingText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-7"
        >
          <button
            type="button"
            onClick={handleTriggerOpen}
            disabled={isOpening}
            className="s px-7 py-3 rounded-lg bg-gold text-wine font-semibold text-sm sm:text-base tracking-wide shadow-lg hover:bg-ivory transition-colors cursor-pointer disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-ivory whitespace-nowrap"
          >
            {isOpening ? 'Opening...' : INVITATION_CONTENT.buttonLabel}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
