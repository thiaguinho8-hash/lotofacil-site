const BASE_URL = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil";

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

async function fetchResultado(
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
      `Formato de resposta inesperado da API da Caixa em ${path}. ` +
        `A Caixa pode ter mudado o contrato da API — verificar plano B (scraper/npm loterias-brasil).`
    );
  }

  return data;
}

/** Busca o resultado do concurso mais recente. */
export async function getUltimoResultado(): Promise<ResultadoLotofacil> {
  return fetchResultado("/", DEFAULT_REVALIDATE_SECONDS);
}

/** Busca o resultado de um concurso específico pelo número. */
export async function getResultadoPorConcurso(
  numero: number
): Promise<ResultadoLotofacil> {
  return fetchResultado(`/${numero}`, IMMUTABLE_REVALIDATE_SECONDS);
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
