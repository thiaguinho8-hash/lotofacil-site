import type { Metadata } from "next";
import Link from "next/link";
import { getUltimosResultados, formatarDezenas, dataProximoConcursoParaIso } from "@/lib/caixa";
import ResultadoCard from "@/components/ResultadoCard";
import LotteryBalls from "@/components/LotteryBalls";
import AdSlot from "@/components/AdSlot";
import AffiliateButton from "@/components/AffiliateButton";
import WhatsAppShareButton from "@/components/WhatsAppShareButton";
import CountdownFlip from "@/components/CountdownFlip";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Renderização dinâmica: busca os dados a cada requisição em vez de no
// build, para o deploy nunca falhar se a API da Caixa estiver bloqueando o
// servidor de build. O fetch em lib/caixa.ts já define seu próprio
// next.revalidate, então os dados continuam cacheados/atualizados por trás.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [ultimo] = await getUltimosResultados(1);
    const dezenas = formatarDezenas(ultimo.listaDezenas).join(", ");

    return {
      title: `Resultado Lotofácil hoje — Concurso ${ultimo.numero} (${ultimo.dataApuracao})`,
      description: `Resultado da Lotofácil concurso ${ultimo.numero}, sorteado em ${ultimo.dataApuracao}: ${dezenas}. Veja premiação e o histórico dos últimos concursos.`,
    };
  } catch {
    return {
      title: "Resultado Lotofácil hoje",
      description: "Veja o resultado mais recente da Lotofácil, premiação e histórico dos últimos concursos.",
    };
  }
}

export default async function Home() {
  let resultados;
  try {
    resultados = await getUltimosResultados(11);
  } catch {
    return <DadosIndisponiveis />;
  }
  const [ultimo, ...historico] = resultados;
  const alvoProximoSorteioIso = ultimo.dataProximoConcurso
    ? dataProximoConcursoParaIso(ultimo.dataProximoConcurso)
    : null;

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_240px]">
    <div className="min-w-0 max-w-4xl">
      <section aria-labelledby="resultado-atual">
        <h1 id="resultado-atual" className="mb-5 text-center text-2xl font-extrabold tracking-tight sm:text-left sm:text-3xl">
          Resultado da Lotofácil de hoje
        </h1>

        {alvoProximoSorteioIso && (
          <div className="mb-6 flex flex-col items-center gap-3 rounded-2xl border border-gold/25 bg-paper-dim p-5 dark:border-gold/15 dark:bg-forest-deep/30 sm:items-start">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Próximo sorteio em
            </p>
            <CountdownFlip alvoIso={alvoProximoSorteioIso} />
          </div>
        )}

        <ResultadoCard resultado={ultimo} destaque />
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <AffiliateButton />
            <WhatsAppShareButton
              texto={`Resultado da Lotofácil de hoje (concurso ${ultimo.numero}): ${formatarDezenas(
                ultimo.listaDezenas
              )
                .map((n) => String(n).padStart(2, "0"))
                .join(" - ")}. Confira em ${SITE_URL}/lotofacil/${ultimo.numero}`}
            />
          </div>
          <Link
            href={`/lotofacil/${ultimo.numero}`}
            className="text-sm font-semibold text-forest transition-colors hover:text-forest-deep hover:underline dark:text-gold dark:hover:text-gold-bright"
          >
            Ver premiação completa do concurso {ultimo.numero} →
          </Link>
        </div>
      </section>

      <AdSlot id="ad-home-topo" label="Espaço publicitário" className="my-10 h-24 w-full" />

      <section className="rounded-2xl border border-gray-200 bg-gold/10 p-5 dark:border-gray-800 dark:bg-forest-deep/30 sm:p-6">
        <h2 className="mb-2 text-lg font-bold tracking-tight">Receba o resultado assim que sair</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Cadastre seu e-mail ou WhatsApp e avisamos você todo dia que sai novo sorteio.
        </p>
        <EmailCaptureForm />
      </section>

      <AdSlot id="ad-home-meio" label="Espaço publicitário" className="my-10 h-24 w-full" />

      <section aria-labelledby="historico" className="mt-4">
        <h2 id="historico" className="mb-5 text-xl font-bold tracking-tight">
          Últimos 10 concursos
        </h2>
        <ul className="flex flex-col gap-3">
          {historico.map((resultado) => (
            <li
              key={resultado.numero}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 transition-colors hover:border-gold/40 hover:bg-gold/10/40 dark:border-gray-800 dark:hover:border-forest-deep dark:hover:bg-forest-deep/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <Link
                href={`/lotofacil/${resultado.numero}`}
                className="font-semibold transition-colors hover:text-forest dark:hover:text-gold"
              >
                Concurso {resultado.numero} — {resultado.dataApuracao}
              </Link>
              <LotteryBalls dezenas={resultado.listaDezenas} size="sm" />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-forest dark:text-gold">
          <Link href="/lotofacil/todos-resultados" className="transition-colors hover:text-forest-deep hover:underline dark:hover:text-gold-bright">
            Ver todos os resultados →
          </Link>
          <Link href="/lotofacil/estatisticas" className="transition-colors hover:text-forest-deep hover:underline dark:hover:text-gold-bright">
            Ver estatísticas →
          </Link>
          <Link href="/lotofacil/conferidor" className="transition-colors hover:text-forest-deep hover:underline dark:hover:text-gold-bright">
            Conferir meu jogo →
          </Link>
          <Link href="/lotofacil/como-jogar" className="transition-colors hover:text-forest-deep hover:underline dark:hover:text-gold-bright">
            Como jogar →
          </Link>
          <Link
            href="/lotofacil/perguntas-frequentes"
            className="transition-colors hover:text-forest-deep hover:underline dark:hover:text-gold-bright"
          >
            Perguntas frequentes →
          </Link>
        </div>
      </section>

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-600">
        {SITE_NAME} não é o site oficial da Caixa Econômica Federal. Os resultados aqui são
        replicados automaticamente da API pública da Caixa para consulta rápida.
      </p>
    </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <AdSlot id="ad-home-sidebar" label="Espaço publicitário (sidebar)" className="h-[600px] w-full" />
        </div>
      </aside>
    </div>
  );
}
