"use client";

import { useMemo, useState } from "react";
import {
  DEZENAS_MAX,
  DEZENAS_MIN,
  custoApostaLotofacil,
} from "@/lib/apostas";
import { formatarMoeda } from "@/lib/caixa";

const OPCOES_DEZENAS = Array.from(
  { length: DEZENAS_MAX - DEZENAS_MIN + 1 },
  (_, i) => DEZENAS_MIN + i
);

export default function BolaoCalculadora({
  estimativaPremio,
}: {
  estimativaPremio: number | null;
}) {
  const [dezenas, setDezenas] = useState(17);
  const [participantes, setParticipantes] = useState(10);

  const custoTotal = useMemo(() => custoApostaLotofacil(dezenas), [dezenas]);
  const custoPorCota = custoTotal / Math.max(1, participantes);
  const premioPorCota =
    estimativaPremio != null ? estimativaPremio / Math.max(1, participantes) : null;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-forest-deep/50">
      <div className="bg-gradient-to-br from-forest to-forest-deep px-6 py-6 text-white sm:px-8 sm:py-8">
        <h2 className="text-lg font-bold sm:text-xl">Monte seu bolão</h2>
        <p className="mt-1 text-sm text-paper/85">
          Ajuste as dezenas marcadas e o número de participantes para ver o custo por cota.
        </p>
      </div>

      <div className="flex flex-col gap-8 px-6 py-6 sm:px-8 sm:py-8">
        <div>
          <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Quantas dezenas marcar
          </label>
          <div className="flex flex-wrap gap-2">
            {OPCOES_DEZENAS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setDezenas(n)}
                aria-pressed={dezenas === n}
                className={`h-11 w-11 rounded-full text-sm font-bold transition-all duration-150 ${
                  dezenas === n
                    ? "scale-105 bg-forest text-white shadow-md"
                    : "bg-paper-dim text-gray-700 hover:bg-gold/15 dark:bg-forest-deep/40 dark:text-gray-200 dark:hover:bg-forest-deep/60"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="participantes"
            className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Quantos participantes no bolão
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setParticipantes((p) => Math.max(2, p - 1))}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-dim text-lg font-bold text-gray-700 transition-colors hover:bg-gold/15 dark:bg-forest-deep/40 dark:text-gray-200 dark:hover:bg-forest-deep/60"
              aria-label="Diminuir participantes"
            >
              −
            </button>
            <input
              id="participantes"
              type="number"
              min={2}
              value={participantes}
              onChange={(e) =>
                setParticipantes(Math.max(2, Number(e.target.value) || 2))
              }
              className="h-11 w-20 rounded-xl border border-gray-200 text-center text-lg font-bold tabular-nums dark:border-gray-800 dark:bg-forest-deep/30"
            />
            <button
              type="button"
              onClick={() => setParticipantes((p) => p + 1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-dim text-lg font-bold text-gray-700 transition-colors hover:bg-gold/15 dark:bg-forest-deep/40 dark:text-gray-200 dark:hover:bg-forest-deep/60"
              aria-label="Aumentar participantes"
            >
              +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-paper-dim p-5 dark:bg-forest-deep/30 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Custo total da aposta
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-gray-900 dark:text-gray-50">
              {formatarMoeda(custoTotal)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Valor por cota
            </p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-forest dark:text-gold">
              {formatarMoeda(custoPorCota)}
            </p>
          </div>

          {premioPorCota != null && (
            <div className="sm:col-span-2">
              <div className="my-1 h-px bg-gold/20 dark:bg-forest-deep/40" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Se essa cota acertasse os 15 pontos, sozinha ganharia
              </p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums text-gold">
                {formatarMoeda(premioPorCota)}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Estimativa baseada no prêmio estimado do próximo concurso, dividido
                igualmente entre as cotas — o valor real muda se houver mais de um bolão ou
                aposta ganhadora.
              </p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-600">
          Valores calculados com base no preço vigente da aposta mínima (R$ 3,50 para 15
          dezenas). A Caixa pode reajustar os preços — confirme o valor final na hora de
          apostar.
        </p>
      </div>
    </div>
  );
}
