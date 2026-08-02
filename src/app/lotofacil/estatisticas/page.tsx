import type { Metadata } from "next";
import { getUltimosResultados } from "@/lib/caixa";
import { calcularFrequencias } from "@/lib/estatisticas";
import FrequenciaBarChart from "@/components/FrequenciaBarChart";
import AdSlot from "@/components/AdSlot";
import LotofacilTabs from "@/components/LotofacilTabs";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const revalidate = 3600;

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <LotofacilTabs active="estatisticas" />

      <h1 className="mb-2 text-2xl font-extrabold">Estatísticas da Lotofácil</h1>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        Análise baseada nos últimos {resultados.length} concursos sorteados. Frequência não
        garante resultado futuro — a Lotofácil é um sorteio aleatório.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <FrequenciaBarChart dados={maisSorteadas} titulo="Dezenas mais sorteadas" />
        <FrequenciaBarChart dados={menosSorteadas} titulo="Dezenas menos sorteadas" />
      </div>

      <AdSlot id="ad-estatisticas" label="Espaço publicitário" className="mt-10 h-24 w-full" />
    </div>
  );
}
