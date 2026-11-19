import {useReducedMotionPreference} from '../hooks/useReducedMotionPreference';

interface LanternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  illuminated?: boolean;
  delay?: number;
}

export function Lantern({
  className = '',
  size = 'md',
  illuminated = false,
  delay = 0,
}: LanternProps) {
  const reducedMotion = useReducedMotionPreference();

  const dimensions =
    size === 'sm'
      ? 'w-12 h-24 sm:w-14 sm:h-28'
      : size === 'lg'
        ? 'w-20 h-40 sm:w-24 sm:h-48'
        : 'w-16 h-32 sm:w-18 sm:h-36';

  return (
    <div
      className={`pointer-events-none select-none ${dimensions} ${
        reducedMotion ? '' : 'animate-lantern-sway'
      } ${className}`}
      style={reducedMotion ? undefined : {animationDelay: `${delay}s`}}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 240" className="w-full h-full overflow-visible">
        <defs>
          <radialGradient id="lanternGlow" cx="50%" cy="48%" r="55%">
            <stop
              offset="0%"
              stopColor={illuminated ? '#FFE7B3' : '#EAB6AD'}
              stopOpacity={illuminated ? '0.85' : '0.45'}
            />
            <stop
              offset="55%"
              stopColor="#963C4C"
              stopOpacity={illuminated ? '0.35' : '0.18'}
            />
            <stop offset="100%" stopColor="#36131E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="silkBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={illuminated ? '#C94E5E' : '#963C4C'} />
            <stop offset="55%" stopColor="#7A2637" />
            <stop offset="100%" stopColor="#541C2B" />
          </linearGradient>
        </defs>

        {/* Ambient lantern halo */}
        <circle cx="60" cy="108" r={illuminated ? '78' : '60'} fill="url(#lanternGlow)" />

        {/* Hanging cord */}
        <line x1="60" y1="0" x2="60" y2="48" stroke="#D6B77C" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* Top brass ring */}
        <circle cx="60" cy="48" r="4" fill="none" stroke="#D6B77C" strokeWidth="1.5" />

        {/* Upper cap */}
        <rect x="42" y="52" width="36" height="8" rx="2" fill="#36131E" stroke="#D6B77C" strokeWidth="1.2" />

        {/* Silk lantern body */}
        <ellipse
          cx="60"
          cy="104"
          rx="36"
          ry="44"
          fill="url(#silkBody)"
          stroke="#D6B77C"
          strokeWidth="1.4"
        />

        {/* Curved bamboo ribs */}
        <ellipse
          cx="60"
          cy="104"
          rx="22"
          ry="43.5"
          fill="none"
          stroke="#D6B77C"
          strokeWidth="0.9"
          strokeOpacity="0.55"
        />
        <ellipse
          cx="60"
          cy="104"
          rx="10"
          ry="44"
          fill="none"
          stroke="#D6B77C"
          strokeWidth="0.9"
          strokeOpacity="0.45"
        />

        {/* Warm inner candle core */}
        <ellipse
          cx="60"
          cy="106"
          rx={illuminated ? '17' : '11'}
          ry={illuminated ? '22' : '14'}
          fill={illuminated ? '#FFF1CF' : '#F8D49A'}
          opacity={illuminated ? '0.55' : '0.32'}
        />

        {/* Traditional gold character medallion */}
        <rect
          x="49"
          y="92"
          width="22"
          height="22"
          rx="3"
          fill="none"
          stroke="#D6B77C"
          strokeWidth="1"
          strokeOpacity="0.8"
          transform="rotate(45 60 103)"
        />

        {/* Bottom cap */}
        <rect x="44" y="146" width="32" height="7" rx="2" fill="#36131E" stroke="#D6B77C" strokeWidth="1.2" />

        {/* Gold knot & silk tassels */}
        <circle cx="60" cy="160" r="4.5" fill="#D6B77C" />
        <path
          d="M55 165 L52 214 M58 165 L57 222 M60 165 L60 226 M62 165 L63 222 M65 165 L68 214"
          stroke="#963C4C"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M57 165 L57 216 M63 165 L63 216"
          stroke="#D6B77C"
          strokeWidth="0.8"
          strokeOpacity="0.65"
        />
      </svg>
    </div>
  );
}
