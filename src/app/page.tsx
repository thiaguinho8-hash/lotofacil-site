import type { Metadata } from "next";
import Link from "next/link";
import { getUltimosResultados, formatarDezenas } from "@/lib/caixa";
import type { ResultadoLotofacil } from "@/lib/caixa";
import { getUltimosResultadosQuina, QUINA_DEZENA_MIN, QUINA_DEZENA_MAX, type ResultadoQuina } from "@/lib/quina";
import { calcularFrequencias } from "@/lib/estatisticas";
import LotteryCard, { type DezenaComFrequencia } from "@/components/LotteryCard";
import AdSlot from "@/components/AdSlot";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import { SITE_NAME } from "@/lib/site";

// Renderização dinâmica: busca os dados a cada requisição (ver comentário
// equivalente em src/lib/caixa.ts).
export const dynamic = "force-dynamic";

// Quantos concursos usar pra calcular a frequência de cada dezena sorteada
// (o card mostra "Freq: X/50").
const QUANTIDADE_ANALISADA = 50;

export const metadata: Metadata = {
  title: `${SITE_NAME} — resultados de Lotofácil e Quina`,
  description:
    "Resultado de hoje da Lotofácil e da Quina, atualizado assim que sai o sorteio: dezenas, premiação e estatísticas de cada loteria.",
};

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
          Resultados de loteria, atualizados assim que saem
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Escolha a loteria pra ver o resultado de hoje, histórico e estatísticas.
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

      <AdSlot id="ad-home-meio" label="Espaço publicitário" className="my-10 h-24 w-full" />

      <section className="rounded-2xl border border-gray-200 bg-gold/10 p-5 dark:border-gray-800 dark:bg-forest-deep/30 sm:p-6">
        <h2 className="mb-2 text-lg font-bold tracking-tight">Receba o resultado assim que sair</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Cadastre seu e-mail ou WhatsApp e avisamos você todo dia que sai novo sorteio (Lotofácil
          e Quina).
        </p>
        <EmailCaptureForm />
      </section>

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
        {SITE_NAME} não é o site oficial da Caixa Econômica Federal. Os resultados aqui são
        replicados automaticamente da API pública da Caixa para consulta rápida.
      </p>
    </div>
  );
}
