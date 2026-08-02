const BASE_URL = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil";

// Fallback gratuito e de terceiros usado quando a API oficial bloqueia (403)
// requisições vindas de IP de datacenter (Vercel, AWS, etc — ver AGENTS.md /
// resumo do projeto para o histórico desse bloqueio). Mantido pela comunidade
// (github.com/guto-alves/loterias-api), sem SLA garantido.
const FALLBACK_BASE_URL = "https://loteriascaixa-api.herokuapp.com/api/lotofacil";

// Revalidação padrão dos dados: 10 minutos. Resultado do concurso mais
// recente muda pouco (sorteios saem por volta das 20h, seg-sáb), mas um
// valor curto evita servir dado velho caso o cron falhe.
const DEFAULT_REVALIDATE_SECONDS = 600;
// Concursos passados nunca mudam — cache "para sempre" (1 ano), reduz carga
// na API da Caixa em páginas antigas de alto tráfego (long-tail SEO).
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

export interface ResultadoLotofacil {
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

interface FallbackResultadoLotofacil {
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

/** Converte a resposta da API alternativa para o mesmo formato usado no resto do site. */
function mapFallbackParaResultado(
  fallback: FallbackResultadoLotofacil
): ResultadoLotofacil {
  const idxLocal = fallback.local.lastIndexOf(" em ");
  const localSorteio =
    idxLocal === -1 ? fallback.local : fallback.local.slice(0, idxLocal);
  const nomeMunicipioUFSorteio =
    idxLocal === -1 ? "" : fallback.local.slice(idxLocal + 4);

  return {
    numero: fallback.concurso,
    numeroConcursoAnterior: fallback.concurso > 1 ? fallback.concurso - 1 : null,
    numeroConcursoProximo: fallback.proximoConcurso,
    tipoJogo: "LOTOFACIL",
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

async function fetchResultadoOficial(
  path: string,
  revalidate: number
): Promise<ResultadoLotofacil> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LotofacilResultadosBot/1.0)",
        Accept: "application/json",
      },
      next: { revalidate },
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

  const data = (await response.json()) as ResultadoLotofacil;

  if (!data || typeof data.numero !== "number" || !Array.isArray(data.listaDezenas)) {
    throw new CaixaApiError(
      `Formato de resposta inesperado da API da Caixa em ${path}.`
    );
  }

  return data;
}

async function fetchResultadoFallback(
  path: string,
  revalidate: number
): Promise<ResultadoLotofacil> {
  let response: Response;
  try {
    response = await fetch(`${FALLBACK_BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
      next: { revalidate },
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

  const data = (await response.json()) as FallbackResultadoLotofacil;

  if (!data || typeof data.concurso !== "number" || !Array.isArray(data.dezenas)) {
    throw new CaixaApiError(
      `Formato de resposta inesperado da API alternativa em ${path}.`
    );
  }

  return mapFallbackParaResultado(data);
}

/**
 * Busca um resultado tentando primeiro a API oficial da Caixa; se falhar
 * (ex: bloqueio 403 de IP de datacenter em produção), cai para a API
 * alternativa gratuita mantida pela comunidade.
 */
async function fetchResultado(
  pathOficial: string,
  pathFallback: string,
  revalidate: number
): Promise<ResultadoLotofacil> {
  try {
    return await fetchResultadoOficial(pathOficial, revalidate);
  } catch (erroOficial) {
    try {
      return await fetchResultadoFallback(pathFallback, revalidate);
    } catch (erroFallback) {
      throw new CaixaApiError(
        `Falha na API oficial (${(erroOficial as Error).message}) e na API ` +
          `alternativa (${(erroFallback as Error).message}).`
      );
    }
  }
}

/** Busca o resultado do concurso mais recente. */
export async function getUltimoResultado(): Promise<ResultadoLotofacil> {
  return fetchResultado("/", "/latest", DEFAULT_REVALIDATE_SECONDS);
}

/** Busca o resultado de um concurso específico pelo número. */
export async function getResultadoPorConcurso(
  numero: number
): Promise<ResultadoLotofacil> {
  return fetchResultado(`/${numero}`, `/${numero}`, IMMUTABLE_REVALIDATE_SECONDS);
}

/**
 * Busca vários concursos recentes em paralelo, a partir do número mais
 * recente, contando N para trás. Usado na home, em todos-resultados e nas
 * estatísticas. Concursos individuais que falharem são ignorados (não
 * derrubam a página inteira).
 */
export async function getUltimosResultados(
  quantidade: number
): Promise<ResultadoLotofacil[]> {
  const ultimo = await getUltimoResultado();
  const numeros: number[] = [ultimo.numero];
  for (let i = 1; i < quantidade; i++) {
    const numero = ultimo.numero - i;
    if (numero < 1) break;
    numeros.push(numero);
  }

  const resultados = await Promise.all(
    numeros.slice(1).map((numero) =>
      getResultadoPorConcurso(numero).catch(() => null)
    )
  );

  return [ultimo, ...resultados.filter((r): r is ResultadoLotofacil => r !== null)];
}

export function formatarDezenas(dezenas: string[]): number[] {
  return dezenas.map((d) => parseInt(d, 10)).sort((a, b) => a - b);
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarDataCurta(data: string): string {
  // API retorna dd/MM/yyyy — já no formato pt-BR esperado.
  return data;
}
