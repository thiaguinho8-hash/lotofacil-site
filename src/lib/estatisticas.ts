import { ResultadoLotofacil, formatarDezenas } from "@/lib/caixa";

export interface FrequenciaDezena {
  dezena: number;
  vezes: number;
}

export function calcularFrequencias(
  resultados: ResultadoLotofacil[],
  dezenaMin = 1,
  dezenaMax = 25
): FrequenciaDezena[] {
  const contagem = new Map<number, number>();
  for (let n = dezenaMin; n <= dezenaMax; n++) contagem.set(n, 0);

  for (const resultado of resultados) {
    for (const dezena of formatarDezenas(resultado.listaDezenas)) {
      contagem.set(dezena, (contagem.get(dezena) ?? 0) + 1);
    }
  }

  return Array.from(contagem.entries())
    .map(([dezena, vezes]) => ({ dezena, vezes }))
    .sort((a, b) => b.vezes - a.vezes);
}

export interface AtrasoDezena {
  dezena: number;
  /** Concursos desde a última vez que saiu (0 = saiu no concurso mais recente). */
  atraso: number;
  /** false quando a dezena não apareceu em nenhum concurso do intervalo analisado. */
  saiuNoIntervalo: boolean;
}

/** `resultados` deve vir do mais recente para o mais antigo (ordem padrão de getUltimosResultados). */
export function calcularAtrasos(
  resultados: ResultadoLotofacil[],
  dezenaMin = 1,
  dezenaMax = 25
): AtrasoDezena[] {
  const atrasoPorDezena = new Map<number, { atraso: number; saiuNoIntervalo: boolean }>();
  for (let n = dezenaMin; n <= dezenaMax; n++) {
    atrasoPorDezena.set(n, { atraso: resultados.length, saiuNoIntervalo: false });
  }

  const dezenasFaltando = new Set<number>(
    Array.from({ length: dezenaMax - dezenaMin + 1 }, (_, i) => dezenaMin + i)
  );
  for (let i = 0; i < resultados.length && dezenasFaltando.size > 0; i++) {
    for (const dezena of formatarDezenas(resultados[i].listaDezenas)) {
      if (dezenasFaltando.has(dezena)) {
        atrasoPorDezena.set(dezena, { atraso: i, saiuNoIntervalo: true });
        dezenasFaltando.delete(dezena);
      }
    }
  }

  return Array.from(atrasoPorDezena.entries())
    .map(([dezena, info]) => ({ dezena, ...info }))
    .sort((a, b) => b.atraso - a.atraso);
}
