import {
  criarClienteLoteria,
  type ResultadoLoteria,
  dataProximoConcursoParaIso,
} from "./loteriaCore";

// Mesmo padrão de fallback usado em caixa.ts (ver lib/loteriaCore.ts) — a
// API pública de terceiros (guto-alves/loterias-api) cobre Quina no mesmo
// formato, confirmado em /api/quina/latest antes de implementar isto.
const cliente = criarClienteLoteria({
  tipoJogo: "QUINA",
  oficialBaseUrl: "https://servicebus2.caixa.gov.br/portaldeloterias/api/quina",
  fallbackBaseUrl: "https://loteriascaixa-api.herokuapp.com/api/quina",
});

export type ResultadoQuina = ResultadoLoteria;

export const getUltimoResultadoQuina = cliente.getUltimoResultado;
export const getUltimoResultadoQuinaSemCache = cliente.getUltimoResultadoSemCache;
export const getResultadoQuinaPorConcurso = cliente.getResultadoPorConcurso;
export const getUltimosResultadosQuina = cliente.getUltimosResultados;

/** A Quina sorteia 5 dezenas dentre 80 (01 a 80). */
export const QUINA_QUANTIDADE_SORTEADAS = 5;
export const QUINA_DEZENA_MIN = 1;
export const QUINA_DEZENA_MAX = 80;
/** Aposta simples mínima e máxima de dezenas marcadas. */
export const QUINA_APOSTA_MIN = 5;
export const QUINA_APOSTA_MAX = 15;

/** Data/hora do próximo sorteio da Quina (mesmo horário usual da Lotofácil: 21h seg-sáb). */
export function dataProximoConcursoQuinaParaIso(dataBr: string): string | null {
  return dataProximoConcursoParaIso(dataBr, "21:00:00", "21:00:00");
}
