"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function pickSpanishVoice(voices: SpeechSynthesisVoice[]) {
  const preferred = [
    "Paulina",
    "Sabina",
    "Monica",
    "Google español",
    "Google Español",
    "Microsoft Sabina",
    "es-MX",
    "es-ES",
    "es-US",
    "es-CL",
  ];

  for (const name of preferred) {
    const match = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith("es") &&
        (v.name.includes(name) || v.lang.includes(name)),
    );
    if (match) return match;
  }

  return voices.find((v) => v.lang.toLowerCase().startsWith("es")) ?? null;
}

export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) setVoicesReady(true);
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setSpeaking(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setSpeaking(true);
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const clean = text.trim();
      if (!clean) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = "es-ES";
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const voice = pickSpanishVoice(voices);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        utteranceRef.current = null;
      };
      utterance.onerror = () => {
        setSpeaking(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      // Chrome sometimes needs a tiny delay after cancel
      window.setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 40);
    },
    [],
  );

  return { supported, speaking, voicesReady, speak, stop, pause, resume };
}
