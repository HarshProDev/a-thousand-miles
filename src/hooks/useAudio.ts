import {useCallback, useEffect, useRef, useState} from 'react';
import {Howl, Howler} from 'howler';
import {AUDIO_PATHS} from '../data/content';

const AUDIO_PREFS_KEY = 'zai_birthday_audio_prefs_v1';

interface AudioPrefs {
  isMuted: boolean;
  volume: number;
}

function loadAudioPrefs(): AudioPrefs {
  try {
    const raw = localStorage.getItem(AUDIO_PREFS_KEY);
    if (!raw) return {isMuted: false, volume: 0.65};
    const parsed = JSON.parse(raw) as Partial<AudioPrefs>;
    return {
      isMuted: Boolean(parsed.isMuted),
      volume: typeof parsed.volume === 'number' ? Math.min(1, Math.max(0, parsed.volume)) : 0.65,
    };
  } catch {
    return {isMuted: false, volume: 0.65};
  }
}

async function isRealAudioAsset(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {method: 'HEAD'});
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    return ct.startsWith('audio/') || ct.includes('octet-stream');
  } catch {
    return false;
  }
}

// D-major pentatonic frequencies (guzheng-inspired serene scale)
const PENTATONIC_PHRASE = [
  293.66, // D4
  329.63, // E4
  369.99, // F#4
  440.0,  // A4
  587.33, // D5
  493.88, // B4
  440.0,  // A4
  369.99, // F#4
  329.63, // E4
  440.0,  // A4
  369.99, // F#4
  293.66, // D4
  220.0,  // A3
  293.66, // D4
  369.99, // F#4
  440.0,  // A4
];

export function useAudio(currentChapter: number) {
  const initialPrefs = useRef(loadAudioPrefs());
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(initialPrefs.current.isMuted);
  const [volume, setVolumeState] = useState(initialPrefs.current.volume);
  const [engineMode, setEngineMode] = useState<'mp3' | 'synth'>('synth');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bgHowlRef = useRef<Howl | null>(null);
  const sfxHowlsRef = useRef<Partial<Record<'envelope' | 'chime' | 'celebration', Howl>>>({});
  const synthTimerRef = useRef<number | null>(null);
  const phraseStepRef = useRef<number>(0);

  // Scene-based gentle volume ducking factor
  const getSceneFactor = useCallback((chapter: number): number => {
    if (chapter === 2) return 0.72; // Chapter 03: lower background during envelopes
    if (chapter === 3) return 0.58; // Chapter 04: intimate lower background for rose
    return 1;
  }, []);

  // Persist user preferences
  useEffect(() => {
    try {
      localStorage.setItem(AUDIO_PREFS_KEY, JSON.stringify({isMuted, volume}));
    } catch {
      // Ignore storage failures
    }
  }, [isMuted, volume]);

  // Ensure AudioContext exists after user gesture
  const ensureAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!audioCtxRef.current) {
      const ctx = new AudioContextClass();
      const master = ctx.createGain();
      master.gain.value = isMuted ? 0 : volume * getSceneFactor(currentChapter);
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }

    if (audioCtxRef.current.state === 'suspended') {
      void audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [currentChapter, getSceneFactor, isMuted, volume]);

  // Sync volume & mute across both Howler and Web Audio synth
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume * getSceneFactor(currentChapter);
    Howler.mute(isMuted);
    if (bgHowlRef.current) {
      bgHowlRef.current.volume(effectiveVol * 0.6);
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        effectiveVol,
        audioCtxRef.current.currentTime,
        0.18
      );
    }
  }, [currentChapter, getSceneFactor, isMuted, volume]);

  // Pluck a single warm guzheng-like string note
  const pluckGuzhengNote = useCallback((freq: number, gainLevel = 0.12, duration = 2.6) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const env = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(3400, freq * 4.5), now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(420, freq * 1.2), now + duration * 0.7);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(gainLevel, now + 0.018);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.28;

    osc1.connect(filter);
    osc2.connect(osc2Gain);
    osc2Gain.connect(filter);
    filter.connect(env);
    env.connect(master);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  }, []);

  // Soft warm ambient drone chord note
  const playWarmPad = useCallback((freq: number, duration = 5.2) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.045, now + 1.4);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(env);
    env.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }, []);

  const stopSynthLoop = useCallback(() => {
    if (synthTimerRef.current !== null) {
      window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const startSynthLoop = useCallback(() => {
    stopSynthLoop();
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const tick = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
      const step = phraseStepRef.current;
      const freq = PENTATONIC_PHRASE[step % PENTATONIC_PHRASE.length];
      pluckGuzhengNote(freq, 0.11, 2.8);

      // Gentle soft drone on downbeats
      if (step % 4 === 0) {
        playWarmPad(step % 8 === 0 ? 146.83 : 110.0, 4.8);
      }

      // Occasional delicate octave shimmer
      if (step % 6 === 3) {
        window.setTimeout(() => {
          pluckGuzhengNote(freq * 1.5, 0.05, 1.9);
        }, 280);
      }

      phraseStepRef.current = step + 1;
    };

    tick();
    synthTimerRef.current = window.setInterval(tick, 1150);
  }, [ensureAudioContext, playWarmPad, pluckGuzhengNote, stopSynthLoop]);

  // Probe optional local MP3 assets silently without causing decode console errors
  useEffect(() => {
    let mounted = true;
    async function probeAssets() {
      const [hasBg, hasEnv, hasChime, hasCeleb] = await Promise.all([
        isRealAudioAsset(AUDIO_PATHS.background),
        isRealAudioAsset(AUDIO_PATHS.envelope),
        isRealAudioAsset(AUDIO_PATHS.chime),
        isRealAudioAsset(AUDIO_PATHS.celebration),
      ]);

      if (!mounted) return;

      if (hasBg) {
        setEngineMode('mp3');
        bgHowlRef.current = new Howl({
          src: [AUDIO_PATHS.background],
          loop: true,
          volume: isMuted ? 0 : volume * 0.6,
          onloaderror: () => {
            setEngineMode('synth');
          },
        });
      }

      if (hasEnv) {
        sfxHowlsRef.current.envelope = new Howl({
          src: [AUDIO_PATHS.envelope],
          volume: 0.55,
        });
      }
      if (hasChime) {
        sfxHowlsRef.current.chime = new Howl({
          src: [AUDIO_PATHS.chime],
          volume: 0.6,
        });
      }
      if (hasCeleb) {
        sfxHowlsRef.current.celebration = new Howl({
          src: [AUDIO_PATHS.celebration],
          volume: 0.65,
        });
      }
    }

    void probeAssets();

    return () => {
      mounted = false;
      stopSynthLoop();
      bgHowlRef.current?.unload();
      sfxHowlsRef.current.envelope?.unload();
      sfxHowlsRef.current.chime?.unload();
      sfxHowlsRef.current.celebration?.unload();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startExperienceAudio = useCallback(() => {
    setHasStarted(true);
    setIsPlaying(true);

    if (engineMode === 'mp3' && bgHowlRef.current) {
      if (!bgHowlRef.current.playing()) {
        bgHowlRef.current.play();
      }
    } else {
      startSynthLoop();
    }
  }, [engineMode, startSynthLoop]);

  const togglePlay = useCallback(() => {
    if (!hasStarted) {
      startExperienceAudio();
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      bgHowlRef.current?.pause();
      stopSynthLoop();
    } else {
      setIsPlaying(true);
      if (engineMode === 'mp3' && bgHowlRef.current) {
        bgHowlRef.current.play();
      } else {
        startSynthLoop();
      }
    }
  }, [engineMode, hasStarted, isPlaying, startExperienceAudio, startSynthLoop, stopSynthLoop]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const playEnvelopeSound = useCallback(() => {
    if (isMuted) return;
    if (sfxHowlsRef.current.envelope) {
      sfxHowlsRef.current.envelope.volume(volume * 0.65);
      sfxHowlsRef.current.envelope.play();
      return;
    }

    const ctx = ensureAudioContext();
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    // Gentle paper-opening whisper + warm wood pluck
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.22);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    noise.start(now);

    pluckGuzhengNote(440, 0.09, 1.1);
    window.setTimeout(() => pluckGuzhengNote(587.33, 0.08, 1.4), 90);
  }, [ensureAudioContext, isMuted, pluckGuzhengNote, volume]);

  const playChimeSound = useCallback(() => {
    if (isMuted) return;
    if (sfxHowlsRef.current.chime) {
      sfxHowlsRef.current.chime.volume(volume * 0.7);
      sfxHowlsRef.current.chime.play();
      return;
    }

    const ctx = ensureAudioContext();
    if (!ctx) return;

    const notes = [587.33, 739.99, 880.0, 1174.66];
    notes.forEach((freq, idx) => {
      window.setTimeout(() => {
        pluckGuzhengNote(freq, 0.09, 2.2);
      }, idx * 140);
    });
  }, [ensureAudioContext, isMuted, pluckGuzhengNote, volume]);

  const playCelebrationSound = useCallback(() => {
    if (isMuted) return;
    if (sfxHowlsRef.current.celebration) {
      sfxHowlsRef.current.celebration.volume(volume * 0.75);
      sfxHowlsRef.current.celebration.play();
      return;
    }

    const ctx = ensureAudioContext();
    if (!ctx) return;

    const cascade = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0, 1174.66];
    cascade.forEach((freq, idx) => {
      window.setTimeout(() => {
        pluckGuzhengNote(freq, 0.1, 2.5);
      }, idx * 95);
    });
  }, [ensureAudioContext, isMuted, pluckGuzhengNote, volume]);

  return {
    hasStarted,
    isPlaying,
    isMuted,
    volume,
    engineMode,
    startExperienceAudio,
    togglePlay,
    toggleMute,
    setVolume,
    playEnvelopeSound,
    playChimeSound,
    playCelebrationSound,
  };
}
