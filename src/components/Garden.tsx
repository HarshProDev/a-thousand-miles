import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { GARDEN_CONTENT, type PhotoEntry } from '../data/content';
import { Lantern } from './Lantern';
import { PhotoGallery } from './PhotoGallery';
import { PhotoModal } from './PhotoModal';

interface GardenProps {
  onContinue: () => void;
}

export function Garden({
  onContinue,
}: GardenProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEntry | null>(null);

  return (
    <section className="relative min-h-[calc(100dvh-56px)] w-full px-5 sm:px-8 pt-6 pb-12 flex flex-col items-center justify-between">
      <Lantern
        size="sm"
        className="hidden sm:block absolute -top-2 left-8 opacity-85"
        delay={0.6}
      />

      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <p className="font-chinese text-lg sm:text-xl text-gold tracking-[0.25em]">
            {GARDEN_CONTENT.chineseSubtitle}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-ivory">
            {GARDEN_CONTENT.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ivory/80 leading-relaxed">
            {GARDEN_CONTENT.supportingText}
          </p>
          <p lang="zh-CN" className="mt-2 font-chinese text-sm sm:text-base text-peach/90 leading-relaxed">
            {GARDEN_CONTENT.chineseSupportingText}
          </p>
        </motion.div>

        <div className="mt-9 w-full">
          <PhotoGallery
            photos={GARDEN_CONTENT.photos}
            onSelectPhoto={setSelectedPhoto}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mt-10 pb-safe"
        >
          <button
            type="button"
            onClick={onContinue}
            className="min-h-12 px-7 py-3 rounded-lg bg-gold text-wine font-semibold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg hover:bg-ivory transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ivory whitespace-nowrap"
          >
            <span>{GARDEN_CONTENT.nextButtonLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
