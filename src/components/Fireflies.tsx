import {useMemo} from 'react';
import {motion} from 'motion/react';
import {useReducedMotionPreference} from '../hooks/useReducedMotionPreference';

interface FirefliesProps {
  count?: number;
}

export function Fireflies({count = 18}: FirefliesProps) {
  const reducedMotion = useReducedMotionPreference();

  const specks = useMemo(() => {
    return Array.from({length: count}, (_, i) => {
      const seed = (i * 53 + 19) % 100;
      return {
        id: i,
        left: `${6 + ((i * 19 + seed) % 88)}%`,
        top: `${12 + ((i * 23 + seed) % 76)}%`,
        size: 3 + (seed % 4),
        duration: 4 + (seed % 5),
        delay: (i * 0.45) % 4,
        dx: (seed % 2 === 0 ? 1 : -1) * (10 + (seed % 16)),
        dy: -12 - (seed % 18),
      };
    });
  }, [count]);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-10"
      aria-hidden="true"
    >
      {specks.map((s) => (
        <motion.span
          key={s.id}
          initial={{opacity: 0.15, x: 0, y: 0, scale: 0.85}}
          animate={{
            opacity: [0.15, 0.85, 0.25, 0.75, 0.15],
            x: [0, s.dx, -s.dx * 0.5, 0],
            y: [0, s.dy, s.dy * 0.4, 0],
            scale: [0.85, 1.2, 0.9, 1.15, 0.85],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            borderRadius: '9999px',
            backgroundColor: '#D6B77C',
            boxShadow: '0 0 10px 2px rgba(214, 183, 124, 0.55)',
          }}
        />
      ))}
    </div>
  );
}
