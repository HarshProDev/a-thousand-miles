import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { PhotoEntry } from '../data/content';
import { ResilientPhoto } from './ResilientPhoto';

interface PhotoModalProps {
  photo: PhotoEntry | null;
  onClose: () => void;
}

export function PhotoModal({
  photo,
  onClose,
}: PhotoModalProps) {
  useEffect(() => {
    if (!photo) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [photo, onClose]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-wine/88 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl bg-ivory text-ink border border-gold/50 shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photograph modal"
              className="absolute top-3 right-3 z-10 min-h-11 min-w-11 rounded-full bg-wine/85 text-ivory hover:bg-burgundy flex items-center justify-center border border-gold/40 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 sm:p-6">
              <div className="relative aspect-4/5 max-h-[60vh] w-full mx-auto overflow-hidden rounded-lg border border-gold/40 bg-wine/90">
                <ResilientPhoto
                  src={photo.src}
                  alt={photo.alt}
                  fallbackTitle={photo.title}
                  fallbackChinese={photo.chineseNote}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                />
              </div>

              <div className="mt-5 text-center px-2">
                <div className="flex items-center justify-center gap-2 text-xs text-crimson font-medium">
                  <span>{photo.title}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-chinese">{photo.chineseNote}</span>
                </div>
                <p className="mt-2 font-display text-xl sm:text-2xl text-ink leading-relaxed">
                  {photo.caption}
                </p>
                <p lang="zh-CN" className="mt-2 font-chinese text-sm sm:text-base text-ink/75 leading-relaxed">
                  {photo.chineseCaption}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
