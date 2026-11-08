import type { Metadata } from "next";
import Link from "next/link";
import { getUltimosResultados, getUltimoResultado, formatarDezenas } from "@/lib/caixa";
import type { ResultadoLotofacil } from "@/lib/caixa";
import { getUltimosResultadosQuina, getUltimoResultadoQuina, QUINA_DEZENA_MIN, QUINA_DEZENA_MAX, type ResultadoQuina } from "@/lib/quina";
import { calcularFrequencias } from "@/lib/estatisticas";
import LotteryCard, { type DezenaComFrequencia } from "@/components/LotteryCard";
import HouseAd from "@/components/HouseAd";
import { SITE_NAME } from "@/lib/site";

// Página em cache por 5 min (ISR): o cron revalida na hora quando sai
// resultado novo, então não precisa buscar 100 concursos a cada visita.
export const revalidate = 300;

// Quantos concursos usar pra calcular a frequência de cada dezena sorteada
// (o card mostra "Freq: X/50").
const QUANTIDADE_ANALISADA = 50;

const DESCRICAO_PADRAO =
  "Resultado de hoje da Lotofácil e da Quina, atualizado assim que sai o sorteio: dezenas, premiação, estatísticas e conferidor de cada loteria.";

export async function generateMetadata(): Promise<Metadata> {
  const [lotofacil, quina] = await Promise.all([
    getUltimoResultado().catch(() => null),
    getUltimoResultadoQuina().catch(() => null),
  ]);

  if (!lotofacil || !quina) {
    return {
      title: "Resultado da Lotofácil e da Quina hoje",
      description: DESCRICAO_PADRAO,
    };
  }

  return {
    title: `Resultado da Lotofácil e da Quina hoje — Concursos ${lotofacil.numero} e ${quina.numero}`,
    description: `Resultado da Lotofácil (concurso ${lotofacil.numero}) e da Quina (concurso ${quina.numero}) de hoje, atualizado assim que sai o sorteio: dezenas, premiação, estatísticas e conferidor.`,
  };
}

/** Monta a lista de dezenas sorteadas + quantas vezes cada uma saiu no histórico analisado. */
function montarDezenasComFrequencia(
  resultados: (ResultadoLotofacil | ResultadoQuina)[],
  dezenaMin: number,
  dezenaMax: number
): DezenaComFrequencia[] {
  const [ultimo] = resultados;
  const frequencias = calcularFrequencias(resultados, dezenaMin, dezenaMax);
  const mapaFrequencia = new Map(frequencias.map((f) => [f.dezena, f.vezes]));

  return formatarDezenas(ultimo.listaDezenas).map((numero) => ({
    numero,
    frequencia: mapaFrequencia.get(numero) ?? 0,
    totalAnalisado: resultados.length,
  }));
}

export default async function Home() {
  const [lotofacilResultados, quinaResultados] = await Promise.all([
    getUltimosResultados(QUANTIDADE_ANALISADA).catch(() => null),
    getUltimosResultadosQuina(QUANTIDADE_ANALISADA).catch(() => null),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <section className="mb-10 text-center">
        <h1 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Resultado da Lotofácil e da Quina de hoje
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Atualizado assim que sai o sorteio. Escolha a loteria pra ver as dezenas, a premiação, o histórico e as estatísticas.
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-lg font-bold tracking-tight">Lotofácil</h2>
          {lotofacilResultados ? (
            <>
              <LotteryCard
                titulo={`Concurso ${lotofacilResultados[0].numero}`}
                data={lotofacilResultados[0].dataApuracao}
                dezenas={montarDezenasComFrequencia(lotofacilResultados, 1, 25)}
                acumulado={lotofacilResultados[0].acumulado}
                proximoConcurso={lotofacilResultados[0].dataProximoConcurso}
                estimativaProximoPremio={lotofacilResultados[0].valorEstimadoProximoConcurso}
                href="/lotofacil"
              />
              <Link
                href="/lotofacil"
                className="mt-3 inline-block text-sm font-semibold text-forest transition-colors hover:text-forest-deep hover:underline dark:text-gold dark:hover:text-gold-bright"
              >
                Ver tudo sobre a Lotofácil →
              </Link>
            </>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Não conseguimos buscar o resultado da Lotofácil agora.{" "}
              <Link href="/lotofacil" className="text-forest hover:underline dark:text-gold">
                Ver página da Lotofácil
              </Link>
              .
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold tracking-tight">Quina</h2>
          {quinaResultados ? (
            <>
              <LotteryCard
                titulo={`Concurso ${quinaResultados[0].numero}`}
                data={quinaResultados[0].dataApuracao}
                dezenas={montarDezenasComFrequencia(quinaResultados, QUINA_DEZENA_MIN, QUINA_DEZENA_MAX)}
                acumulado={quinaResultados[0].acumulado}
                proximoConcurso={quinaResultados[0].dataProximoConcurso}
                estimativaProximoPremio={quinaResultados[0].valorEstimadoProximoConcurso}
                href="/quina"
              />
              <Link
                href="/quina"
                className="mt-3 inline-block text-sm font-semibold text-forest transition-colors hover:text-forest-deep hover:underline dark:text-gold dark:hover:text-gold-bright"
              >
                Ver tudo sobre a Quina →
              </Link>
            </>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Não conseguimos buscar o resultado da Quina agora.{" "}
              <Link href="/quina" className="text-forest hover:underline dark:text-gold">
                Ver página da Quina
              </Link>
              .
            </p>
          )}
        </div>
      </div>

      <HouseAd
        href="/lotofacil/blog"
        title="Bolão, probabilidade, fechamento e mais"
        description="Confira os artigos do blog sobre como funciona cada estratégia — sem prometer fórmula mágica."
        cta="Ler artigos"
        className="my-10 h-24 w-full"
      />

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
        {SITE_NAME} não é o site oficial da Caixa Econômica Federal. Os resultados aqui são
        replicados automaticamente da API pública da Caixa para consulta rápida.
      </p>
    </div>
  );
}
