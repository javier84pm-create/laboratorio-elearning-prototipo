"use client";

import { useCallback } from "react";
import { playSfx, unlockSfx, type SfxName } from "@/lib/sfx";
import { useDemo } from "@/context/DemoContext";

export function useSfx() {
  const { sfxEnabled } = useDemo();

  const play = useCallback(
    (name: SfxName) => {
      playSfx(name, sfxEnabled);
    },
    [sfxEnabled],
  );

  const unlock = useCallback(() => {
    void unlockSfx();
  }, []);

  return { play, unlock, sfxEnabled };
}
