import { CHAPTERS } from '../data/content';

interface ProgressIndicatorProps {
  currentChapter: number;
  highestUnlocked: number;
  onSelectChapter: (index: number) => void;
  isLightScene: boolean;
}

export function ProgressIndicator({
  currentChapter,
  highestUnlocked,
  onSelectChapter,
  isLightScene,
}: ProgressIndicatorProps) {
  return (
    <nav
      aria-label="Story chapters"
      className="flex items-center gap-1 sm:gap-3 overflow-x-auto no-scrollbar"
    >
      {CHAPTERS.map((chapter) => {
        const isCurrent = chapter.index === currentChapter;
        const isUnlocked = chapter.index <= highestUnlocked;

        const baseColor = isLightScene
          ? isCurrent
            ? 'text-burgundy font-semibold'
            : isUnlocked
              ? 'text-ink/75 hover:text-burgundy'
              : 'text-ink/30'
          : isCurrent
            ? 'text-gold font-semibold'
            : isUnlocked
              ? 'text-ivory/80 hover:text-gold'
              : 'text-ivory/30';

        const underlineColor = isLightScene ? 'bg-crimson' : 'bg-gold';

        return (
          <button
            key={chapter.code}
            type="button"
            disabled={!isUnlocked}
            onClick={() => isUnlocked && onSelectChapter(chapter.index)}
            aria-current={isCurrent ? 'step' : undefined}
            title={`${chapter.code} — ${chapter.title}`}
            className={`relative min-h-11 px-2 sm:px-2.5 flex items-center gap-1.5 text-xs tracking-wide transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-gold rounded ${isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'
              } ${baseColor}`}
          >
            <span className="tabular-nums">{chapter.code}</span>
            <span className="hidden md:inline" aria-hidden="true">
              —
            </span>
            <span className="hidden md:inline">{chapter.title}</span>
            <span className="inline md:hidden">
              {isCurrent ? chapter.shortTitle : ''}
            </span>
            {isCurrent && (
              <span
                className={`absolute bottom-1.5 left-2 right-2 h-[1.5px] ${underlineColor}`}
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
