import type { Metadata } from "next";
import Link from "next/link";
import { getUltimosResultados } from "@/lib/caixa";
import { calcularFrequencias, calcularAtrasos } from "@/lib/estatisticas";
import FrequenciaBarChart from "@/components/FrequenciaBarChart";
import AtrasoList from "@/components/AtrasoList";
import AdSlot from "@/components/AdSlot";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const dynamic = "force-dynamic";

const QUANTIDADE_ANALISADA = 100;

export const metadata: Metadata = {
  title: "Estatísticas da Lotofácil — números mais e menos sorteados",
  description: `Ranking das dezenas mais e menos sorteadas da Lotofácil, com base nos últimos ${QUANTIDADE_ANALISADA} concursos.`,
};

export default async function EstatisticasPage() {
  let resultados;
  try {
    resultados = await getUltimosResultados(QUANTIDADE_ANALISADA);
  } catch {
    return <DadosIndisponiveis />;
  }
  const frequencias = calcularFrequencias(resultados);
  const maisSorteadas = frequencias.slice(0, 10);
  const menosSorteadas = [...frequencias].sort((a, b) => a.vezes - b.vezes).slice(0, 10);
  const maisAtrasadas = calcularAtrasos(resultados).slice(0, 10);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">

      <h1 className="mb-2 text-2xl font-extrabold">Estatísticas da Lotofácil</h1>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        Análise baseada nos últimos {resultados.length} concursos sorteados. Frequência não
        garante resultado futuro — a Lotofácil é um sorteio aleatório.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <FrequenciaBarChart dados={maisSorteadas} titulo="Dezenas mais sorteadas" />
        <FrequenciaBarChart dados={menosSorteadas} titulo="Dezenas menos sorteadas" />
      </div>

      <div className="mt-8">
        <AtrasoList dados={maisAtrasadas} titulo="Números atrasados (há mais tempo sem sair)" />
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Atraso não muda a chance do próximo sorteio — cada concurso é independente. Entenda o
          porquê no{" "}
          <Link
            href="/lotofacil/blog/pares-impares-numeros-atrasados-o-que-diz-a-estatistica"
            className="text-forest hover:underline dark:text-gold"
          >
            artigo do blog
          </Link>
          .
        </p>
      </div>

      <AdSlot id="ad-estatisticas" label="Espaço publicitário" className="mt-10 h-24 w-full" />
    </div>
  );
}
