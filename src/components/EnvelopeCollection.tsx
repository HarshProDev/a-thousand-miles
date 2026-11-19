import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, MailOpen } from 'lucide-react';
import { ENVELOPE_COLLECTION_CONTENT } from '../data/content';

interface EnvelopeCollectionProps {
  openedEnvelopes: Record<string, boolean>;
  onToggleEnvelope: (id: string) => void;
  onPlayEnvelopeSound: () => void;
  onContinue: () => void;
}

export function EnvelopeCollection({
  openedEnvelopes,
  onToggleEnvelope,
  onPlayEnvelopeSound,
  onContinue,
}: EnvelopeCollectionProps) {
  const openedCount = Object.values(openedEnvelopes).filter(Boolean).length;

  const handleClickEnvelope = (id: string) => {
    if (!openedEnvelopes[id]) {
      onPlayEnvelopeSound();
    }
    onToggleEnvelope(id);
  };

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full px-5 sm:px-8 pt-7 pb-12 parchment-surface text-ink">
      {/* Subtle decorative plum blossom corner ink motif */}
      <svg
        viewBox="0 0 240 160"
        className="pointer-events-none absolute top-0 right-0 w-44 sm:w-64 opacity-25"
        aria-hidden="true"
      >
        <path
          d="M240 24 Q170 46 115 36 T24 72"
          fill="none"
          stroke="#49302E"
          strokeWidth="1.5"
        />
        <circle cx="156" cy="40" r="7" fill="#BD8584" />
        <circle cx="96" cy="44" r="9" fill="#EAB6AD" />
        <circle cx="48" cy="64" r="6" fill="#BD8584" />
      </svg>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl"
        >
          <p className="font-chinese text-base sm:text-lg text-crimson tracking-[0.25em]">
            {ENVELOPE_COLLECTION_CONTENT.chineseAccent}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-burgundy">
            {ENVELOPE_COLLECTION_CONTENT.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink/80 leading-relaxed">
            {ENVELOPE_COLLECTION_CONTENT.subtitle}
          </p>
          <p lang="zh-CN" className="mt-2 font-chinese text-sm sm:text-base text-ink/70 leading-relaxed">
            {ENVELOPE_COLLECTION_CONTENT.chineseSubtitle}
          </p>
          <p className="mt-2 text-xs text-crimson/80 tabular-nums">
            {openedCount} of {ENVELOPE_COLLECTION_CONTENT.envelopes.length} opened
            <span aria-hidden="true"> · </span>
            Open in any order
          </p>
        </motion.div>

        {/* Five Independent Envelopes Grid */}
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ENVELOPE_COLLECTION_CONTENT.envelopes.map((item, idx) => {
            const isOpen = Boolean(openedEnvelopes[item.id]);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * idx }}
                className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <button
                  type="button"
                  onClick={() => handleClickEnvelope(item.id)}
                  aria-expanded={isOpen}
                  className="w-full h-full text-left rounded-xl border border-gold/65 bg-white/60 hover:bg-white/85 transition-colors shadow-sm overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy flex flex-col"
                >
                  {/* Envelope Top Flap & Header */}
                  <div
                    className="relative px-5 py-4 transition-colors"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, #6E2333 0%, #541C2B 100%)'
                        : 'linear-gradient(135deg, #963C4C 0%, #6D2332 100%)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-xs text-gold/90">
                          <span className="tabular-nums">{item.indexLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-chinese">{item.chineseTheme}</span>
                        </div>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-ivory">
                          {item.theme}
                        </h3>
                      </div>

                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen
                            ? 'bg-gold/20 border-gold text-gold rotate-12'
                            : 'bg-gold text-wine border-ivory/40'
                          }`}
                      >
                        {isOpen ? (
                          <MailOpen className="w-4 h-4" />
                        ) : (
                          <span className="font-chinese text-sm font-semibold">启</span>
                        )}
                      </div>
                    </div>

                    {/* Subtle triangular flap fold */}
                    <motion.div
                      initial={false}
                      animate={{ scaleY: isOpen ? -1 : 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-3 h-px bg-gold/45 origin-center"
                    />
                  </div>

                  {/* Envelope Body / Parchment Message */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="font-display text-lg sm:text-xl text-ink leading-relaxed">
                            “{item.message}”
                          </p>
                          <p lang="zh-CN" className="mt-3 font-chinese text-sm sm:text-base text-ink/75 leading-relaxed">
                            {item.chineseMessage}
                          </p>
                          <p className="mt-3 text-xs text-crimson/75 font-medium">
                            Opened · Tap to fold
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-3 flex items-center justify-between text-sm text-ink/70"
                        >
                          <span>Sealed note waiting for you</span>
                          <span className="text-crimson font-medium">Tap to open</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 pb-safe"
        >
          <button
            type="button"
            onClick={onContinue}
            className="min-h-12 px-7 py-3 rounded-lg bg-burgundy text-ivory font-semibold text-sm sm:text-base inline-flex items-center gap-2 shadow-md hover:bg-crimson transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-burgundy whitespace-nowrap"
          >
            <span>{ENVELOPE_COLLECTION_CONTENT.nextButtonLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
