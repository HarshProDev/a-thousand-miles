import {useCallback, useState} from 'react';

export interface ExperienceState {
  currentChapter: number;
  highestUnlocked: number;
  invitationOpened: boolean;
  openedEnvelopes: Record<string, boolean>;
  roseRevealed: boolean;
  letterOpened: boolean;
  letterRevealedAll: boolean;
  celebrationActive: boolean;
}

export function useExperience() {
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [highestUnlocked, setHighestUnlocked] = useState<number>(0);
  const [invitationOpened, setInvitationOpened] = useState<boolean>(false);
  const [openedEnvelopes, setOpenedEnvelopes] = useState<Record<string, boolean>>({});
  const [roseRevealed, setRoseRevealed] = useState<boolean>(false);
  const [letterOpened, setLetterOpened] = useState<boolean>(false);
  const [letterRevealedAll, setLetterRevealedAll] = useState<boolean>(false);
  const [celebrationActive, setCelebrationActive] = useState<boolean>(false);
  const unlockAndGoToChapter = useCallback((chapterIndex: number) => {
    const clamped = Math.max(0, Math.min(4, chapterIndex));
    setHighestUnlocked((prev) => Math.max(prev, clamped));
    setCurrentChapter(clamped);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  const navigateToChapter = useCallback(
    (chapterIndex: number) => {
      if (chapterIndex <= highestUnlocked && chapterIndex >= 0 && chapterIndex <= 4) {
        setCurrentChapter(chapterIndex);
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    },
    [highestUnlocked]
  );

  const toggleEnvelope = useCallback((id: string) => {
    setOpenedEnvelopes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const resetExperience = useCallback(() => {
    setCurrentChapter(0);
    setHighestUnlocked(0);
    setInvitationOpened(false);
    setOpenedEnvelopes({});
    setRoseRevealed(false);
    setLetterOpened(false);
    setLetterRevealedAll(false);
    setCelebrationActive(false);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return {
    currentChapter,
    highestUnlocked,
    invitationOpened,
    openedEnvelopes,
    roseRevealed,
    letterOpened,
    letterRevealedAll,
    celebrationActive,
    setInvitationOpened,
    unlockAndGoToChapter,
    navigateToChapter,
    toggleEnvelope,
    setRoseRevealed,
    setLetterOpened,
    setLetterRevealedAll,
    setCelebrationActive,
    resetExperience,
  };
}
