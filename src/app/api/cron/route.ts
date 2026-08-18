import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getUltimoResultadoSemCache, type ResultadoLotofacil } from "@/lib/caixa";
import { getUltimoResultadoQuinaSemCache } from "@/lib/quina";
import { getUltimoConcursoProcessado, setUltimoConcursoProcessado } from "@/lib/lastConcurso";
import { notificarNovoResultado, type ConfigNotificacao } from "@/lib/notify";

export const dynamic = "force-dynamic";

function autorizado(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Sem CRON_SECRET configurado: permite apenas em desenvolvimento local.
    // Em produção, a ausência da variável bloqueia a rota (fail-closed).
    return process.env.NODE_ENV !== "production";
  }
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

interface JogoConfig extends ConfigNotificacao {
  jogo: string;
  buscarUltimoSemCache: () => Promise<ResultadoLotofacil>;
  caminhosParaRevalidar: (numero: number) => string[];
}

const JOGOS: JogoConfig[] = [
  {
    jogo: "lotofacil",
    nomeLoteria: "Lotofácil",
    basePath: "/lotofacil",
    buscarUltimoSemCache: getUltimoResultadoSemCache,
    caminhosParaRevalidar: (numero) => [
      "/",
      "/lotofacil",
      `/lotofacil/${numero}`,
      "/lotofacil/resultado-de-hoje",
      "/lotofacil/todos-resultados",
      "/lotofacil/estatisticas",
      "/lotofacil/conferidor",
    ],
  },
  {
    jogo: "quina",
    nomeLoteria: "Quina",
    basePath: "/quina",
    buscarUltimoSemCache: getUltimoResultadoQuinaSemCache,
    caminhosParaRevalidar: (numero) => [
      "/",
      "/quina",
      `/quina/${numero}`,
      "/quina/resultado-de-hoje",
      "/quina/todos-resultados",
      "/quina/estatisticas",
      "/quina/conferidor",
    ],
  },
];

async function processarJogo(config: JogoConfig) {
  const ultimo = await config.buscarUltimoSemCache();
  const processadoAnteriormente = await getUltimoConcursoProcessado(config.jogo);
  const houveNovoResultado = ultimo.numero !== processadoAnteriormente;

  if (houveNovoResultado) {
    for (const caminho of config.caminhosParaRevalidar(ultimo.numero)) {
      revalidatePath(caminho);
    }
    revalidatePath("/sitemap.xml");

    await setUltimoConcursoProcessado(config.jogo, ultimo.numero);
    await notificarNovoResultado(ultimo, config).catch((error) =>
      console.error(`Falha ao notificar assinantes (${config.jogo}):`, error)
    );
  }

  return { concursoAtual: ultimo.numero, novoResultado: houveNovoResultado };
}

export async function GET(request: NextRequest) {
  if (!autorizado(request)) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const resultados: Record<string, { concursoAtual: number; novoResultado: boolean } | { erro: string }> = {};

  for (const config of JOGOS) {
    try {
      resultados[config.jogo] = await processarJogo(config);
    } catch (error) {
      resultados[config.jogo] = { erro: (error as Error).message };
    }
  }

  return NextResponse.json({ ok: true, ...resultados });
}
