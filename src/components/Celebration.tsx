import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, Copy, Download, RotateCcw, Share2 } from 'lucide-react';
import { CELEBRATION_CONTENT, PROJECT_IDENTITY } from '../data/content';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';
import { downloadKeepsakeCard } from '../utils/keepsakeCard';
import { FloatingPetals } from './FloatingPetals';
import { Lantern } from './Lantern';

interface CelebrationProps {
  onReplay: () => void;
  onPlayCelebrationSound: () => void;
}

export function Celebration({
  onReplay,
  onPlayCelebrationSound,
}: CelebrationProps) {
  const reducedMotion = useReducedMotionPreference();
  const hasFiredRef = useRef(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [showKeepsakeOptions, setShowKeepsakeOptions] = useState(false);

  useEffect(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    onPlayCelebrationSound();

    if (reducedMotion) return;

    const palette = ['#D6B77C', '#963C4C', '#EAB6AD', '#F8F0E2'];
    confetti({
      particleCount: 55,
      spread: 72,
      origin: { y: 0.65 },
      colors: palette,
      disableForReducedMotion: true,
    });

    const timer = window.setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.68 },
        colors: palette,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.68 },
        colors: palette,
        disableForReducedMotion: true,
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [onPlayCelebrationSound, reducedMotion]);

  const handleShareLink = async () => {
    const shareUrl = window.location.href;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: PROJECT_IDENTITY.title,
          text: `${CELEBRATION_CONTENT.chineseHeading} — ${CELEBRATION_CONTENT.finalMessage}`,
          url: shareUrl,
        });
        setShareFeedback('Shared successfully');
        return;
      } catch {
        // User canceled or share unsupported; fall back to copy
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareFeedback('Link copied to clipboard');
    } catch {
      setShareFeedback('Ready to bookmark this page');
    }
  };

  const handleDownloadCard = async () => {
    await downloadKeepsakeCard();
    setShareFeedback('Keepsake card downloaded');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-10 w-full rounded-2xl border border-gold/55 bg-wine text-ivory p-6 sm:p-10 shadow-2xl overflow-hidden text-center"
    >
      <FloatingPetals variant="celebration" count={16} />

      {/* Illuminated Celebration Lanterns */}
      <Lantern
        size="sm"
        illuminated
        className="absolute -top-3 left-2 sm:left-8 opacity-95"
        delay={0}
      />
      <Lantern
        size="sm"
        illuminated
        className="absolute -top-3 right-2 sm:right-8 opacity-95"
        delay={1.2}
      />

      <div className="relative z-20 pt-8 sm:pt-4 max-w-lg mx-auto">
        <p className="font-chinese text-3xl sm:text-5xl font-semibold text-gold tracking-wide">
          {CELEBRATION_CONTENT.chineseHeading}
        </p>

        <h3 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-ivory">
          {CELEBRATION_CONTENT.englishHeading}
        </h3>

        <div className="my-5 mx-auto w-24 h-px bg-gold/45" aria-hidden="true" />

        <p className="font-display italic text-xl sm:text-2xl text-peach leading-relaxed">
          “{CELEBRATION_CONTENT.finalMessage}”
        </p>
        <p lang="zh-CN" className="mt-2 font-chinese text-sm sm:text-base text-gold/90">
          {CELEBRATION_CONTENT.chineseFinalMessage}
        </p>

        <p className="mt-4 text-xs sm:text-sm text-ivory/75 tracking-wide">
          {CELEBRATION_CONTENT.signature}
        </p>
        <p lang="zh-CN" className="mt-1 font-chinese text-xs sm:text-sm text-ivory/70">
          {CELEBRATION_CONTENT.chineseSignature}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReplay}
            className="w-full sm:w-auto min-h-12 px-6 py-3 rounded-lg border border-gold/45 bg-burgundy/70 text-ivory text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-crimson/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gold whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{CELEBRATION_CONTENT.replayButtonLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowKeepsakeOptions((prev) => !prev)}
            aria-expanded={showKeepsakeOptions}
            className="w-full sm:w-auto min-h-12 px-6 py-3 rounded-lg bg-gold text-wine text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-lg hover:bg-ivory transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ivory whitespace-nowrap"
          >
            <Share2 className="w-4 h-4" />
            <span>{CELEBRATION_CONTENT.keepsakeButtonLabel}</span>
          </button>
        </div>

        {/* Keepsake Actions Panel (Share Link + Download Keepsake Card) */}
        {showKeepsakeOptions && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 p-4 rounded-xl border border-gold/30 bg-burgundy/65 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={handleDownloadCard}
              className="w-full sm:w-auto min-h-11 px-4 py-2 rounded-lg bg-ivory text-wine text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-peach transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gold whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Save Keepsake Card (PNG)</span>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="w-full sm:w-auto min-h-11 px-4 py-2 rounded-lg border border-gold/40 text-ivory text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-wine/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-gold whitespace-nowrap"
            >
              <Copy className="w-4 h-4" />
              <span>Share or Copy Link</span>
            </button>
          </motion.div>
        )}

        {shareFeedback && (
          <p
            role="status"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold font-medium"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{shareFeedback}</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}
