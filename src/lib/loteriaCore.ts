// Núcleo genérico de acesso a resultados de loteria da Caixa, compartilhado
// entre lotofacil.ts e quina.ts. Cada loteria só precisa informar sua URL
// base oficial/fallback e o nome do tipo de jogo — toda a lógica de
// busca-com-fallback, cache e mapeamento de resposta é a mesma.

const DEFAULT_REVALIDATE_SECONDS = 600;
const IMMUTABLE_REVALIDATE_SECONDS = 60 * 60 * 24 * 365;

export interface GanhadorMunicipio {
  ganhadores: number;
  municipio: string;
  uf: string;
  posicao: number;
  serie?: string;
  nomeFatansiaUL?: string;
}

export interface RateioPremio {
  faixa: number;
  descricaoFaixa: string;
  numeroDeGanhadores: number;
  valorPremio: number;
}

export interface ResultadoLoteria {
  numero: number;
  numeroConcursoAnterior: number | null;
  numeroConcursoProximo: number | null;
  tipoJogo: string;
  dataApuracao: string;
  dataProximoConcurso: string | null;
  acumulado: boolean;
  listaDezenas: string[];
  dezenasSorteadasOrdemSorteio: string[];
  listaRateioPremio: RateioPremio[];
  listaMunicipioUFGanhadores: GanhadorMunicipio[];
  valorArrecadado: number;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
  localSorteio: string;
  nomeMunicipioUFSorteio: string;
  ultimoConcurso: boolean;
}

export class CaixaApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "CaixaApiError";
  }
}

interface FallbackRateioPremio {
  descricao: string;
  faixa: number;
  ganhadores: number;
  valorPremio: number;
}

interface FallbackResultado {
  concurso: number;
  data: string;
  local: string;
  dezenasOrdemSorteio: string[];
  dezenas: string[];
  premiacoes: FallbackRateioPremio[];
  acumulou: boolean;
  proximoConcurso: number | null;
  dataProximoConcurso: string | null;
  localGanhadores: GanhadorMunicipio[];
  valorArrecadado: number;
  valorAcumuladoProximoConcurso: number;
  valorEstimadoProximoConcurso: number;
}

function mapFallbackParaResultado(
  fallback: FallbackResultado,
  tipoJogo: string
): ResultadoLoteria {
  const idxLocal = fallback.local.lastIndexOf(" em ");
  const localSorteio =
    idxLocal === -1 ? fallback.local : fallback.local.slice(0, idxLocal);
  const nomeMunicipioUFSorteio =
    idxLocal === -1 ? "" : fallback.local.slice(idxLocal + 4);

  return {
    numero: fallback.concurso,
    numeroConcursoAnterior: fallback.concurso > 1 ? fallback.concurso - 1 : null,
    numeroConcursoProximo: fallback.proximoConcurso,
    tipoJogo,
    dataApuracao: fallback.data,
    dataProximoConcurso: fallback.dataProximoConcurso,
    acumulado: fallback.acumulou,
    listaDezenas: fallback.dezenas,
    dezenasSorteadasOrdemSorteio: fallback.dezenasOrdemSorteio,
    listaRateioPremio: fallback.premiacoes.map((p) => ({
      faixa: p.faixa,
      descricaoFaixa: p.descricao,
      numeroDeGanhadores: p.ganhadores,
      valorPremio: p.valorPremio,
    })),
    listaMunicipioUFGanhadores: fallback.localGanhadores,
    valorArrecadado: fallback.valorArrecadado,
    valorAcumuladoProximoConcurso: fallback.valorAcumuladoProximoConcurso,
    valorEstimadoProximoConcurso: fallback.valorEstimadoProximoConcurso,
    localSorteio,
    nomeMunicipioUFSorteio,
    ultimoConcurso: fallback.proximoConcurso === null,
  };
}

type OpcoesCache = { next: { revalidate: number } } | { cache: "no-store" };

export interface ConfigLoteria {
  /** Nome usado no campo tipoJogo do resultado (ex: "LOTOFACIL", "QUINA"). */
  tipoJogo: string;
  /** URL base da API oficial da Caixa, sem barra final (ex: .../api/quina). */
  oficialBaseUrl: string;
  /** URL base da API de fallback, sem barra final (ex: .../api/quina). */
  fallbackBaseUrl: string;
}

async function fetchResultadoOficial(
  config: ConfigLoteria,
  path: string,
  opcoesCache: OpcoesCache
): Promise<ResultadoLoteria> {
  let response: Response;
  try {
    response = await fetch(`${config.oficialBaseUrl}${path}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LotofacilResultadosBot/1.0)",
        Accept: "application/json",
      },
      ...opcoesCache,
    });
  } catch (error) {
    throw new CaixaApiError(
      `Falha de rede ao acessar a API da Caixa: ${(error as Error).message}`
    );
  }

  if (!response.ok) {
    throw new CaixaApiError(
      `API da Caixa retornou status ${response.status} em ${path}`,
      response.status
    );
  }

  const data = (await response.json()) as ResultadoLoteria;

  if (!data || typeof data.numero !== "number" || !Array.isArray(data.listaDezenas)) {
    throw new CaixaApiError(
      `Formato de resposta inesperado da API da Caixa em ${path}.`
    );
  }

  return data;
}

async function fetchResultadoFallback(
  config: ConfigLoteria,
  path: string,
  opcoesCache: OpcoesCache
): Promise<ResultadoLoteria> {
  let response: Response;
  try {
    response = await fetch(`${config.fallbackBaseUrl}${path}`, {
      headers: { Accept: "application/json" },
      ...opcoesCache,
    });
  } catch (error) {
    throw new CaixaApiError(
      `Falha de rede ao acessar a API alternativa: ${(error as Error).message}`
    );
  }

  if (!response.ok) {
    throw new CaixaApiError(
      `API alternativa retornou status ${response.status} em ${path}`,
      response.status
    );
  }

  const data = (await response.json()) as FallbackResultado;

  if (!data || typeof data.concurso !== "number" || !Array.isArray(data.dezenas)) {
    throw new CaixaApiError(
      `Formato de resposta inesperado da API alternativa em ${path}.`
    );
  }

  return mapFallbackParaResultado(data, config.tipoJogo);
}

async function fetchResultado(
  config: ConfigLoteria,
  pathOficial: string,
  pathFallback: string,
  opcoesCache: OpcoesCache
): Promise<ResultadoLoteria> {
  try {
    return await fetchResultadoOficial(config, pathOficial, opcoesCache);
  } catch (erroOficial) {
    try {
      return await fetchResultadoFallback(config, pathFallback, opcoesCache);
    } catch (erroFallback) {
      throw new CaixaApiError(
        `Falha na API oficial (${(erroOficial as Error).message}) e na API ` +
          `alternativa (${(erroFallback as Error).message}).`
      );
    }
  }
}

export interface ClienteLoteria {
  getUltimoResultado(): Promise<ResultadoLoteria>;
  getUltimoResultadoSemCache(): Promise<ResultadoLoteria>;
  getResultadoPorConcurso(numero: number): Promise<ResultadoLoteria>;
  getUltimosResultados(quantidade: number): Promise<ResultadoLoteria[]>;
}

/** Cria as funções de busca de resultado para uma loteria específica. */
export function criarClienteLoteria(config: ConfigLoteria): ClienteLoteria {
  function getUltimoResultado(): Promise<ResultadoLoteria> {
    return fetchResultado(config, "/", "/latest", {
      next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
    });
  }

  function getUltimoResultadoSemCache(): Promise<ResultadoLoteria> {
    return fetchResultado(config, "/", "/latest", { cache: "no-store" });
  }

  function getResultadoPorConcurso(numero: number): Promise<ResultadoLoteria> {
    return fetchResultado(config, `/${numero}`, `/${numero}`, {
      next: { revalidate: IMMUTABLE_REVALIDATE_SECONDS },
    });
  }

  async function getUltimosResultados(quantidade: number): Promise<ResultadoLoteria[]> {
    const ultimo = await getUltimoResultado();
    const numeros: number[] = [ultimo.numero];
    for (let i = 1; i < quantidade; i++) {
      const numero = ultimo.numero - i;
      if (numero < 1) break;
      numeros.push(numero);
    }

    const resultados = await Promise.all(
      numeros.slice(1).map((numero) => getResultadoPorConcurso(numero).catch(() => null))
    );

    return [ultimo, ...resultados.filter((r): r is ResultadoLoteria => r !== null)];
  }

  return {
    getUltimoResultado,
    getUltimoResultadoSemCache,
    getResultadoPorConcurso,
    getUltimosResultados,
  };
}

export function formatarDezenas(dezenas: string[]): number[] {
  return dezenas.map((d) => parseInt(d, 10)).sort((a, b) => a - b);
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarDataCurta(data: string): string {
  return data;
}

/**
 * Converte "dd/MM/yyyy" em ISO com um horário de sorteio em Brasília, como
 * instante absoluto (-03:00) — independe do fuso horário do servidor que
 * renderiza a página. `horarioSemana`/`horarioDomingo` permitem cada loteria
 * informar seu próprio horário usual de sorteio.
 */
export function dataProximoConcursoParaIso(
  dataBr: string,
  horarioSemana = "21:00:00",
  horarioDomingo = "11:00:00"
): string | null {
  const match = dataBr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const diaDaSemana = new Date(`${yyyy}-${mm}-${dd}T12:00:00-03:00`).getUTCDay(); // 0 = domingo
  const horario = diaDaSemana === 0 ? horarioDomingo : horarioSemana;
  return `${yyyy}-${mm}-${dd}T${horario}-03:00`;
}
