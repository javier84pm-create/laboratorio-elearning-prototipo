type SfxName = "tap" | "xp" | "correct" | "wrong" | "complete" | "levelup" | "streak";

let ctx: AudioContext | null = null;
let unlocked = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

/** Llamar tras un gesto del usuario para desbloquear audio en iOS/Safari. */
export async function unlockSfx() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") {
    try {
      await audio.resume();
    } catch {
      // ignore
    }
  }
  unlocked = audio.state === "running";
}

function tone(
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.08,
) {
  const audio = getCtx();
  if (!audio || !unlocked) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audio.currentTime + start);
  g.gain.setValueAtTime(0.0001, audio.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, audio.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(audio.currentTime + start);
  osc.stop(audio.currentTime + start + duration + 0.02);
}

export function playSfx(name: SfxName, enabled = true) {
  if (!enabled || typeof window === "undefined") return;
  void unlockSfx().then(() => {
    switch (name) {
      case "tap":
        tone(520, 0, 0.06, "triangle", 0.05);
        break;
      case "xp":
        tone(660, 0, 0.08, "sine", 0.07);
        tone(880, 0.07, 0.1, "sine", 0.06);
        break;
      case "correct":
        tone(523, 0, 0.1, "sine", 0.08);
        tone(659, 0.09, 0.1, "sine", 0.08);
        tone(784, 0.18, 0.16, "sine", 0.09);
        break;
      case "wrong":
        tone(220, 0, 0.14, "sawtooth", 0.045);
        tone(180, 0.1, 0.16, "triangle", 0.04);
        break;
      case "complete":
        tone(523, 0, 0.1, "sine", 0.07);
        tone(659, 0.1, 0.1, "sine", 0.07);
        tone(784, 0.2, 0.1, "sine", 0.08);
        tone(1046, 0.32, 0.28, "triangle", 0.09);
        tone(784, 0.55, 0.2, "sine", 0.05);
        break;
      case "levelup":
        tone(392, 0, 0.1, "triangle", 0.07);
        tone(523, 0.1, 0.1, "triangle", 0.07);
        tone(659, 0.2, 0.12, "triangle", 0.08);
        tone(784, 0.34, 0.22, "sine", 0.09);
        break;
      case "streak":
        tone(440, 0, 0.08, "sine", 0.06);
        tone(554, 0.08, 0.08, "sine", 0.06);
        tone(659, 0.16, 0.14, "triangle", 0.07);
        break;
      default:
        break;
    }
  });
}

export type { SfxName };
