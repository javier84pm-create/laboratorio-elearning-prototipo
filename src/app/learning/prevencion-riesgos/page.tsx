"use client";

import { useRouter } from "next/navigation";
import { LearningPlayer } from "@/components/LearningPlayer";
import { capsuleContent } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";

export default function CapsulePlayerPage() {
  const router = useRouter();
  const { audioMode, setAudioMode, startCourse } = useDemo();

  return (
    <div className="page-wrap space-y-4">
      <header>
        <p className="chip mb-2">Prevención de Riesgos — Nivel 1</p>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Microcápsula</h1>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          Contenido breve con apoyo de IA y opción de audio.
        </p>
      </header>

      <LearningPlayer
        stepLabel={capsuleContent.stepLabel}
        title={capsuleContent.title}
        body={capsuleContent.body}
        remainingSeconds={capsuleContent.remainingSeconds}
        audioMode={audioMode}
        onAudioModeChange={setAudioMode}
        onContinue={() => {
          startCourse();
          router.push("/learning/prevencion-riesgos/quiz");
        }}
      />
    </div>
  );
}
