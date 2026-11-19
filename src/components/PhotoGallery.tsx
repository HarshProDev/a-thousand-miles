import { motion } from 'motion/react';
import { Expand } from 'lucide-react';
import type { PhotoEntry } from '../data/content';
import { ResilientPhoto } from './ResilientPhoto';

interface PhotoGalleryProps {
  photos: PhotoEntry[];
  onSelectPhoto: (photo: PhotoEntry) => void;
}

export function PhotoGallery({
  photos,
  onSelectPhoto,
}: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl mx-auto">
      {photos.map((photo, idx) => (
        <motion.article
          key={photo.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 + idx * 0.1 }}
          className={`flex justify-center ${photo.tiltClass} md:hover:rotate-0 transition-transform duration-300`}
        >
          <div className="w-full max-w-75 bg-ivory text-ink p-3 sm:p-3.5 pb-4 rounded-lg shadow-2xl border border-gold/55 transition-all duration-200 hover:-translate-y-1.5">
            <button
              type="button"
              onClick={() => onSelectPhoto(photo)}
              aria-label={`Open ${photo.title} in larger view`}
              className="group block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-gold rounded-sm"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-wine border border-ink/10">
                <ResilientPhoto
                  src={photo.src}
                  alt={photo.alt}
                  fallbackTitle={photo.title}
                  fallbackChinese={photo.chineseNote}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <span
                  className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-wine/75 text-ivory flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity border border-gold/40"
                  aria-hidden="true"
                >
                  <Expand className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="mt-3.5 px-1 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-burgundy leading-tight">
                    {photo.title}
                  </p>
                  <p className="mt-0.5 text-xs text-ink/70 truncate">
                    Tap to view caption · 点击查看
                  </p>
                </div>
                <span className="font-chinese text-sm text-crimson shrink-0">
                  {photo.chineseNote}
                </span>
              </div>
            </button>

          </div>
        </motion.article>
      ))}
    </div>
  );
}
