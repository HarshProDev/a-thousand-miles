import {useMemo} from 'react';
import {motion} from 'motion/react';
import {useReducedMotionPreference} from '../hooks/useReducedMotionPreference';

interface FloatingPetalsProps {
  variant?: 'peach' | 'rose' | 'celebration';
  count?: number;
}

interface PetalSeed {
  id: number;
  leftPercent: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rotateEnd: number;
  opacity: number;
}

export function FloatingPetals({variant = 'peach', count = 14}: FloatingPetalsProps) {
  const reducedMotion = useReducedMotionPreference();

  const petals = useMemo<PetalSeed[]>(() => {
    return Array.from({length: count}, (_, i) => {
      const seed = (i * 37 + 13) % 100;
      return {
        id: i,
        leftPercent: (i * (100 / count) + (seed % 9)) % 98,
        size: 10 + (seed % 10),
        duration: 11 + (seed % 8),
        delay: (i * 0.9) % 7,
        driftX: (seed % 2 === 0 ? 1 : -1) * (25 + (seed % 45)),
        rotateEnd: 140 + (seed % 180),
        opacity: variant === 'rose' ? 0.8 : 0.62,
      };
    });
  }, [count, variant]);

  if (reducedMotion) {
    return null;
  }

  const fillColor =
    variant === 'rose'
      ? '#963C4C'
      : variant === 'celebration'
        ? '#F2B8B0'
        : '#EAB6AD';

  const accentColor =
    variant === 'rose' ? '#BD8584' : '#F8F0E2';

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -40,
            x: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '108vh'],
            x: [0, petal.driftX, petal.driftX * 0.4],
            rotate: [0, petal.rotateEnd],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${petal.leftPercent}%`,
            top: '-24px',
            width: petal.size,
            height: petal.size * 1.25,
          }}
        >
          <svg viewBox="0 0 24 30" className="w-full h-full">
            <path
              d="M12 2 C19 6, 22 16, 15 25 C12 28, 8 27, 5 23 C1 16, 4 6, 12 2 Z"
              fill={fillColor}
              fillOpacity="0.88"
            />
            <path
              d="M12 5 C14 11, 14 18, 11 24"
              stroke={accentColor}
              strokeWidth="0.9"
              strokeOpacity="0.45"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
