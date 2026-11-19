import { useEffect, useState } from 'react';

interface ResilientPhotoProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackChinese?: string;
  className?: string;
  imgClassName?: string;
}

export function ResilientPhoto({
  src,
  alt,
  fallbackTitle,
  fallbackChinese = '留影纪念',
  className = '',
  imgClassName = 'w-full h-full object-cover',
}: ResilientPhotoProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center text-center p-6 overflow-hidden select-none ${className}`}
        style={{
          background:
            'radial-gradient(circle at 30% 25%, rgba(214,183,124,0.18) 0%, rgba(150,60,76,0.22) 55%, rgba(54,19,30,0.92) 100%)',
        }}
      >
        {/* Decorative Guofeng inner border */}
        <div className="absolute inset-3 border border-gold/30 pointer-events-none" />

        {/* Subtle plum blossom SVG mark */}
        <svg viewBox="0 0 64 64" className="w-11 h-11 mb-3 text-gold/80" aria-hidden="true">
          <circle cx="32" cy="18" r="8" fill="currentColor" fillOpacity="0.22" />
          <circle cx="45" cy="28" r="8" fill="currentColor" fillOpacity="0.22" />
          <circle cx="40" cy="43" r="8" fill="currentColor" fillOpacity="0.22" />
          <circle cx="24" cy="43" r="8" fill="currentColor" fillOpacity="0.22" />
          <circle cx="19" cy="28" r="8" fill="currentColor" fillOpacity="0.22" />
          <circle cx="32" cy="32" r="4.5" fill="#D6B77C" />
        </svg>

        <p className="font-chinese text-base text-gold/90 tracking-widest mb-1">
          {fallbackChinese}
        </p>
        <p className="font-display text-lg text-ivory/95 leading-snug">
          {fallbackTitle}
        </p>
        <p lang="zh-CN" className="mt-1.5 font-chinese text-xs text-ivory/65 max-w-[20ch]">
          照片即将呈现
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className={imgClassName}
    />
  );
}
