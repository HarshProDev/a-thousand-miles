import { AnimatePresence, motion } from 'motion/react';
import { PROJECT_IDENTITY } from './data/content';
import { useAudio } from './hooks/useAudio';
import { useExperience } from './hooks/useExperience';
import { ChineseLandscape } from './components/ChineseLandscape';
import { EnvelopeCollection } from './components/EnvelopeCollection';
import { FinalLetter } from './components/FinalLetter';
import { Fireflies } from './components/Fireflies';
import { FloatingPetals } from './components/FloatingPetals';
import { Garden } from './components/Garden';
import { Invitation } from './components/Invitation';
import { MusicController } from './components/MusicController';
import { ProgressIndicator } from './components/ProgressIndicator';
import { RoseReveal } from './components/RoseReveal';
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  const experience = useExperience();
  const audio = useAudio(experience.currentChapter);

  const isLightScene =
    experience.currentChapter === 2 || experience.currentChapter === 4;

  const backgroundClass =
    experience.currentChapter === 0
      ? 'silk-night-surface text-ivory'
      : experience.currentChapter === 1 || experience.currentChapter === 3
        ? 'garden-twilight-surface text-ivory'
        : 'parchment-surface text-ink';

  return (
    <>

      <div
        className={`min-h-dvh flex flex-col transition-colors duration-700 ${backgroundClass}`}
      >
        {/* Compact Top Navigation + Audio Bar (under 15% mobile height) */}
        <header
          className={`sticky top-0 z-40 h-14 pt-safe px-3 sm:px-6 flex items-center justify-between gap-3 backdrop-blur-md border-b transition-colors duration-500 ${isLightScene
            ? 'bg-ivory/88 border-ink/10'
            : 'bg-wine/82 border-gold/20'
            }`}
        >
          <ProgressIndicator
            currentChapter={experience.currentChapter}
            highestUnlocked={experience.highestUnlocked}
            onSelectChapter={experience.navigateToChapter}
            isLightScene={isLightScene}
          />

          <MusicController
            hasStarted={audio.hasStarted}
            isPlaying={audio.isPlaying}
            isMuted={audio.isMuted}
            volume={audio.volume}
            onTogglePlay={audio.togglePlay}
            onToggleMute={audio.toggleMute}
            onVolumeChange={audio.setVolume}
            isLightScene={isLightScene}
          />
        </header>

        {/* Atmospheric Background Layers for Dark Scenes */}
        {!isLightScene && (
          <>
            <ChineseLandscape
              showMoon={experience.currentChapter >= 1}
              showPavilion={experience.currentChapter === 1}
            />
            <FloatingPetals
              variant="peach"
              count={experience.currentChapter === 0 ? 11 : 13}
            />
            {experience.currentChapter >= 1 && <Fireflies count={16} />}
          </>
        )}

        {/* Main Story Stage */}
        <main className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {experience.currentChapter === 0 && (
              <motion.div
                key="chapter-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="flex-1 flex flex-col"
              >
                <Invitation
                  onPlayEnvelopeSound={audio.playEnvelopeSound}
                  onStartAudio={audio.startExperienceAudio}
                  onOpenSurprise={() => {
                    experience.setInvitationOpened(true);
                    experience.unlockAndGoToChapter(1);
                  }}
                />
              </motion.div>
            )}

            {experience.currentChapter === 1 && (
              <motion.div
                key="chapter-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <Garden
                  onContinue={() => experience.unlockAndGoToChapter(2)}
                />
              </motion.div>
            )}

            {experience.currentChapter === 2 && (
              <motion.div
                key="chapter-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <EnvelopeCollection
                  openedEnvelopes={experience.openedEnvelopes}
                  onToggleEnvelope={experience.toggleEnvelope}
                  onPlayEnvelopeSound={audio.playEnvelopeSound}
                  onContinue={() => experience.unlockAndGoToChapter(3)}
                />
              </motion.div>
            )}

            {experience.currentChapter === 3 && (
              <motion.div
                key="chapter-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55 }}
                className="flex-1 flex flex-col"
              >
                <RoseReveal
                  isRevealed={experience.roseRevealed}
                  onTouchRose={() => experience.setRoseRevealed(true)}
                  onPlayChimeSound={audio.playChimeSound}
                  onContinue={() => experience.unlockAndGoToChapter(4)}
                />
              </motion.div>
            )}

            {experience.currentChapter === 4 && (
              <motion.div
                key="chapter-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
              >
                <FinalLetter
                  letterOpened={experience.letterOpened}
                  letterRevealedAll={experience.letterRevealedAll}
                  celebrationActive={experience.celebrationActive}
                  onOpenLetter={() => experience.setLetterOpened(true)}
                  onFinishReveal={() => experience.setLetterRevealedAll(true)}
                  onActivateCelebration={() => experience.setCelebrationActive(true)}
                  onPlayEnvelopeSound={audio.playEnvelopeSound}
                  onPlayCelebrationSound={audio.playCelebrationSound}
                  onReplay={experience.resetExperience}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Subtle Footer Signature */}
        <footer
          className={`relative z-20 py-4 px-5 text-center text-xs border-t ${isLightScene
            ? 'border-ink/10 text-ink/65 bg-ivory/60'
            : 'border-gold/15 text-ivory/60 bg-wine/50'
            }`}
        >
          <span>{PROJECT_IDENTITY.title}</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span className="font-chinese">{PROJECT_IDENTITY.chineseSubtitle}</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>{PROJECT_IDENTITY.footerSignature}</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span lang="zh-CN" className="font-chinese">
            {PROJECT_IDENTITY.chineseFooterSignature}
          </span>
        </footer>
      </div>
      <Analytics />
    </>
  );
}
