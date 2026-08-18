import {
  criarClienteLoteria,
  type ResultadoLoteria,
  type RateioPremio,
  type GanhadorMunicipio,
  CaixaApiError,
  formatarDezenas,
  formatarMoeda,
  formatarDataCurta,
  dataProximoConcursoParaIso,
} from "./loteriaCore";

// Fallback gratuito e de terceiros usado quando a API oficial bloqueia (403)
// requisições vindas de IP de datacenter (Vercel, AWS, etc — ver AGENTS.md /
// resumo do projeto para o histórico desse bloqueio). Mantido pela comunidade
// (github.com/guto-alves/loterias-api), sem SLA garantido.
const cliente = criarClienteLoteria({
  tipoJogo: "LOTOFACIL",
  oficialBaseUrl: "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil",
  fallbackBaseUrl: "https://loteriascaixa-api.herokuapp.com/api/lotofacil",
});

export type ResultadoLotofacil = ResultadoLoteria;
export type { RateioPremio, GanhadorMunicipio };
export { CaixaApiError, formatarDezenas, formatarMoeda, formatarDataCurta, dataProximoConcursoParaIso };

/** Busca o resultado do concurso mais recente. */
export const getUltimoResultado = cliente.getUltimoResultado;

/**
 * Igual a `getUltimoResultado`, mas sem cache — usado pelo cron para saber
 * na hora se saiu um resultado novo, sem esperar o revalidate de 10 minutos.
 */
export const getUltimoResultadoSemCache = cliente.getUltimoResultadoSemCache;

/** Busca o resultado de um concurso específico pelo número. */
export const getResultadoPorConcurso = cliente.getResultadoPorConcurso;

/**
 * Busca vários concursos recentes em paralelo, a partir do número mais
 * recente, contando N para trás. Usado na home, em todos-resultados e nas
 * estatísticas. Concursos individuais que falharem são ignorados (não
 * derrubam a página inteira).
 */
export const getUltimosResultados = cliente.getUltimosResultados;
