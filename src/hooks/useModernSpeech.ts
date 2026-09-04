import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Splits text into natural sentence and clause chunks under maxLength characters
 * for seamless neural audio streaming.
 */
function splitIntoChunks(text: string, maxLength = 160): string[] {
  // Normalize fill-in-the-blank placeholders and clean quotation marks for natural enunciation
  const cleaned = text
    .replace(/_{2,}/g, 'blank')
    .replace(/["“”]/g, '')
    .trim();
  if (!cleaned) return [];

  const sentences = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleaned];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if ((current + ' ' + trimmed).trim().length <= maxLength) {
      current = (current + ' ' + trimmed).trim();
    } else {
      if (current) chunks.push(current);
      if (trimmed.length <= maxLength) {
        current = trimmed;
      } else {
        const words = trimmed.split(' ');
        current = '';
        for (const word of words) {
          if ((current + ' ' + word).trim().length <= maxLength) {
            current = (current + ' ' + word).trim();
          } else {
            if (current) chunks.push(current);
            current = word;
          }
        }
      }
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function useModernSpeech() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasVoiceSupport] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return typeof Audio !== 'undefined' || 'speechSynthesis' in window;
  });

  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const isPlayingRef = useRef<boolean>(false);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Helper to find the best modern voice for SpeechSynthesis fallback
  const resolveBestVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return null;
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Natural online voices (Edge / Windows 11)
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Online'))
    );
    if (naturalVoice) return naturalVoice;

    // 2. Google neural/cloud voices (Chrome)
    const googleVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Google') || v.name.includes('Neural'))
    );
    if (googleVoice) return googleVoice;

    // 3. Apple premium/enhanced voices (Safari / macOS / iOS)
    const appleEnhanced = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Premium') || v.name.includes('Enhanced'))
    );
    if (appleEnhanced) return appleEnhanced;

    // 4. Standard en-US
    const standardUs = voices.find((v) => v.lang === 'en-US');
    if (standardUs) return standardUs;

    // 5. Any English voice
    return voices.find((v) => v.lang.startsWith('en')) || null;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    selectedVoiceRef.current = resolveBestVoice();

    const handleVoicesChanged = () => {
      selectedVoiceRef.current = resolveBestVoice();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      }
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.src = '';
        activeAudioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [resolveBestVoice]);

  const stop = useCallback(() => {
    isPlayingRef.current = false;
    queueRef.current = [];

    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.src = '';
      activeAudioRef.current = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsPlaying(false);
  }, []);

  // Graceful browser speech synthesis fallback
  const speakWithSynthesis = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const cleaned = text.replace(/_{2,}/g, 'blank').trim();
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = 'en-US';

      const voice = selectedVoiceRef.current || resolveBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      // Slightly relaxed pace for optimal enunciation
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        isPlayingRef.current = true;
        setIsPlaying(true);
      };
      utterance.onend = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [resolveBestVoice]
  );

  const playNextChunkRef = useRef<() => void>(() => {});

  // Sequentially stream audio chunks with proactive preloading
  const playNextChunk = useCallback(() => {
    if (!isPlayingRef.current || queueRef.current.length === 0) {
      stop();
      return;
    }

    const chunk = queueRef.current.shift();
    if (!chunk) {
      stop();
      return;
    }

    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(
      chunk
    )}`;

    const audio = new Audio(audioUrl);
    activeAudioRef.current = audio;

    // Preload next sentence chunk in background to eliminate pauses
    if (queueRef.current.length > 0) {
      const nextChunk = queueRef.current[0];
      const nextUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(
        nextChunk
      )}`;
      const preloadAudio = new Audio();
      preloadAudio.preload = 'auto';
      preloadAudio.src = nextUrl;
    }

    audio.onended = () => {
      playNextChunkRef.current();
    };

    audio.onerror = () => {
      // If audio element network fails, fallback seamlessly to SpeechSynthesis
      const remainingText = [chunk, ...queueRef.current].join(' ');
      speakWithSynthesis(remainingText);
    };

    audio.play().catch(() => {
      // Browser autoplay restriction or fetch error fallback
      const remainingText = [chunk, ...queueRef.current].join(' ');
      speakWithSynthesis(remainingText);
    });
  }, [speakWithSynthesis, stop]);

  useEffect(() => {
    playNextChunkRef.current = playNextChunk;
  }, [playNextChunk]);

  const speak = useCallback(
    (text: string) => {
      stop();

      const chunks = splitIntoChunks(text);
      if (chunks.length === 0) return;

      isPlayingRef.current = true;
      setIsPlaying(true);
      queueRef.current = chunks;
      playNextChunk();
    },
    [playNextChunk, stop]
  );

  const toggle = useCallback(
    (text: string) => {
      if (isPlaying) {
        stop();
      } else {
        speak(text);
      }
    },
    [isPlaying, speak, stop]
  );

  return {
    isPlaying,
    hasVoiceSupport,
    speak,
    stop,
    toggle,
  };
}
