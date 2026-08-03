"use client";

import { useEffect, useState } from "react";

function calcularRestante(alvoMs: number): [number, number, number, number] {
  const diffMs = Math.max(0, alvoMs - Date.now());
  const totalSegundos = Math.floor(diffMs / 1000);
  const dias = Math.floor(totalSegundos / 86400);
  const horas = Math.floor((totalSegundos % 86400) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  return [dias, horas, minutos, segundos];
}

function FlipUnit({ valor, label }: { valor: number; label: string }) {
  const texto = String(valor).padStart(2, "0");
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        key={texto}
        style={{ perspective: "300px" }}
        className="relative h-14 w-12 sm:h-16 sm:w-14"
      >
        <div
          className="animate-flip-in absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-b from-forest to-forest-deep font-mono text-2xl font-extrabold tabular-nums text-gold-bright shadow-lg ring-1 ring-gold/30 sm:text-3xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {texto}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/25" />
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

/** Contador regressivo até o próximo sorteio, com flip 3D a cada mudança de unidade. */
export default function CountdownFlip({ alvoIso }: { alvoIso: string }) {
  const alvoMs = new Date(alvoIso).getTime();
  const [restante, setRestante] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    setRestante(calcularRestante(alvoMs));
    const intervalo = setInterval(() => {
      setRestante(calcularRestante(alvoMs));
    }, 1000);
    return () => clearInterval(intervalo);
  }, [alvoMs]);

  if (!restante) {
    // Evita mismatch de hidratação: nada de tempo relativo no primeiro render do servidor.
    return <div className="h-14 sm:h-16" aria-hidden="true" />;
  }

  const [dias, horas, minutos, segundos] = restante;
  const encerrado = dias === 0 && horas === 0 && minutos === 0 && segundos === 0;

  if (encerrado) {
    return (
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
        O sorteio de hoje já pode ter saído — confira o resultado mais recente.
      </p>
    );
  }

  return (
    <div className="flex items-start gap-2 sm:gap-3" role="timer" aria-live="off">
      <FlipUnit valor={dias} label="dias" />
      <span className="mt-2.5 text-xl font-bold text-gray-400 sm:mt-3">:</span>
      <FlipUnit valor={horas} label="horas" />
      <span className="mt-2.5 text-xl font-bold text-gray-400 sm:mt-3">:</span>
      <FlipUnit valor={minutos} label="min" />
      <span className="mt-2.5 text-xl font-bold text-gray-400 sm:mt-3">:</span>
      <FlipUnit valor={segundos} label="seg" />
    </div>
  );
}
