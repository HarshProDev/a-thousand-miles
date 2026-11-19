interface ChineseLandscapeProps {
  showMoon?: boolean;
  showPavilion?: boolean;
}

export function ChineseLandscape({
  showMoon = true,
  showPavilion = true,
}: ChineseLandscapeProps) {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* Full moon */}
      {showMoon && (
        <div className="absolute top-14 right-8 sm:top-16 sm:right-20 w-28 h-28 sm:w-40 sm:h-40">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(248,240,226,0.92) 0%, rgba(214,183,124,0.38) 55%, rgba(214,183,124,0) 74%)',
            }}
          />
        </div>
      )}

      {/* Subtle plum blossom branch top-left */}
      <svg
        viewBox="0 0 320 220"
        className="absolute -top-4 -left-8 w-56 sm:w-80 opacity-45"
      >
        <path
          d="M0 36 Q 85 54, 155 38 T 285 68"
          fill="none"
          stroke="#D6B77C"
          strokeWidth="1.6"
          strokeOpacity="0.65"
        />
        <path
          d="M80 46 Q 112 85, 148 102"
          fill="none"
          stroke="#D6B77C"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        {[
          {x: 68, y: 42, r: 7},
          {x: 120, y: 46, r: 9},
          {x: 185, y: 44, r: 6.5},
          {x: 142, y: 98, r: 8},
          {x: 245, y: 60, r: 7.5},
        ].map((b, idx) => (
          <g key={idx}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="#EAB6AD" fillOpacity="0.55" />
            <circle cx={b.x} cy={b.y} r={b.r * 0.3} fill="#D6B77C" fillOpacity="0.9" />
          </g>
        ))}
      </svg>

      {/* Distant misty mountains + traditional pavilion silhouette */}
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-44 sm:h-64 opacity-60"
      >
        {/* Distant mountain range */}
        <path
          d="M0 360 L0 230 Q180 140 360 215 T740 185 T1120 210 T1440 165 L1440 360 Z"
          fill="#4A1726"
          fillOpacity="0.55"
        />
        {/* Mid-ground misty ridge */}
        <path
          d="M0 360 L0 265 Q240 205 490 255 T960 230 T1440 250 L1440 360 Z"
          fill="#320F1B"
          fillOpacity="0.82"
        />

        {/* Traditional Chinese garden pavilion silhouette on right */}
        {showPavilion && (
          <g transform="translate(1100, 145)" fill="#220912">
            {/* Upper curved roof */}
            <path d="M40 35 Q85 18 110 2 Q135 18 180 35 Q145 32 110 34 Q75 32 40 35 Z" />
            {/* Lower double eaves */}
            <path d="M22 60 Q75 46 110 38 Q145 46 198 60 Q155 56 110 58 Q65 56 22 60 Z" />
            {/* Columns */}
            <rect x="64" y="58" width="6" height="58" />
            <rect x="107" y="58" width="6" height="58" />
            <rect x="148" y="58" width="6" height="58" />
            {/* Balustrade & stone base */}
            <rect x="44" y="102" width="132" height="6" />
            <rect x="34" y="116" width="152" height="18" />
          </g>
        )}

        {/* Foreground mist band */}
        <rect x="0" y="305" width="1440" height="55" fill="#230A13" fillOpacity="0.7" />
      </svg>
    </div>
  );
}
