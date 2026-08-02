"use client";

import { useState } from "react";

const TODAS_DEZENAS = Array.from({ length: 25 }, (_, i) => i + 1);

export default function Conferidor({
  numeroConcurso,
  dezenasSorteadas,
}: {
  numeroConcurso: number;
  dezenasSorteadas: number[];
}) {
  const [selecionadas, setSelecionadas] = useState<Set<number>>(new Set());
  const [conferido, setConferido] = useState(false);

  function alternar(numero: number) {
    setConferido(false);
    setSelecionadas((atual) => {
      const nova = new Set(atual);
      if (nova.has(numero)) {
        nova.delete(numero);
      } else if (nova.size < 20) {
        nova.add(numero);
      }
      return nova;
    });
  }

  const acertos = dezenasSorteadas.filter((d) => selecionadas.has(d));

  return (
    <div>
      <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Marque os números que você jogou ({selecionadas.size} selecionados) e confira contra o
        concurso {numeroConcurso}.
      </p>

      <div className="mb-6 grid grid-cols-5 gap-2 sm:grid-cols-8">
        {TODAS_DEZENAS.map((numero) => {
          const ativo = selecionadas.has(numero);
          return (
            <button
              key={numero}
              type="button"
              onClick={() => alternar(numero)}
              className={`h-11 w-11 rounded-full text-sm font-bold transition duration-150 ease-out active:scale-95 ${
                ativo
                  ? "bg-blue-700 text-white hover:bg-blue-800"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {String(numero).padStart(2, "0")}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setConferido(true)}
        disabled={selecionadas.size === 0}
        className="rounded-full bg-amber-600 px-6 py-2.5 font-semibold text-white transition duration-150 ease-out hover:bg-amber-700 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
      >
        Conferir
      </button>

      {conferido && (
        <div className="mt-6 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
          <p className="text-lg font-bold">
            Você acertou {acertos.length} de {selecionadas.size} número
            {selecionadas.size === 1 ? "" : "s"} jogado{selecionadas.size === 1 ? "" : "s"}.
          </p>
          {acertos.length > 0 && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Acertos: {acertos.sort((a, b) => a - b).map((n) => String(n).padStart(2, "0")).join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
