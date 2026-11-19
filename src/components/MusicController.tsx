import { useEffect, useRef, useState } from 'react';
import { Pause, Play, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';

interface MusicControllerProps {
  hasStarted: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (val: number) => void;
  isLightScene: boolean;
}

export function MusicController({
  hasStarted,
  isPlaying,
  isMuted,
  volume,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
  isLightScene,
}: MusicControllerProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [panelOpen]);

  const btnTone = isLightScene
    ? 'text-ink hover:text-burgundy border-ink/15 bg-ivory/80'
    : 'text-ivory hover:text-gold border-gold/25 bg-wine/70';

  return (
    <div ref={containerRef} className="relative flex items-center gap-1.5 shrink-0">
      {/* Permanent visible music toggle */}
      <button
        type="button"
        onClick={() => {
          if (!hasStarted) {
            onTogglePlay();
          } else {
            onToggleMute();
          }
        }}
        aria-label={
          !hasStarted
            ? 'Start gentle soundtrack'
            : isMuted
              ? 'Unmute music'
              : 'Mute music'
        }
        title={!hasStarted ? 'Start gentle soundtrack' : isMuted ? 'Unmute music' : 'Mute music'}
        className={`min-h-11 min-w-11 px-2.5 flex items-center justify-center gap-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold ${btnTone}`}
      >
        {isMuted || !isPlaying ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
        <span className="hidden sm:inline text-xs font-medium">
          {!hasStarted ? 'Sound' : isMuted ? 'Muted' : 'Music'}
        </span>
      </button>

      {/* Expandable audio settings popover */}
      <button
        type="button"
        onClick={() => setPanelOpen((prev) => !prev)}
        aria-expanded={panelOpen}
        aria-label="Audio controls"
        className={`min-h-11 min-w-11 flex items-center justify-center rounded-lg border transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-gold ${btnTone}`}
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>

      {panelOpen && (
        <div
          role="dialog"
          aria-label="Soundtrack controls"
          className="absolute right-0 top-13 w-64 rounded-xl border border-gold/30 bg-wine/95 backdrop-blur-md p-4 shadow-2xl text-ivory z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-base text-gold">Soundtrack</span>
            <button
              type="button"
              onClick={onTogglePlay}
              className="min-h-10 px-3 py-1.5 rounded-md border border-gold/35 bg-burgundy/80 text-xs font-medium text-ivory hover:bg-crimson/60 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-gold whitespace-nowrap"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Play
                </>
              )}
            </button>
          </div>

          <label className="block text-xs text-ivory/80 mb-1.5" htmlFor="audio-volume-slider">
            Volume ({Math.round((isMuted ? 0 : volume) * 100)}%)
          </label>
          <input
            id="audio-volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-gold cursor-pointer h-6"
          />

          <div className="mt-3 pt-3 border-t border-gold/15 flex items-center justify-between">
            <span className="text-[11px] text-ivory/65">
              {isMuted ? 'Audio muted' : isPlaying ? 'Guzheng ambience' : 'Paused'}
            </span>
            <button
              type="button"
              onClick={onToggleMute}
              className="text-xs text-gold hover:underline min-h-9 px-2 focus-visible:outline-2 focus-visible:outline-gold"
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
