import type { Metadata } from "next";
import { getUltimosResultadosQuina } from "@/lib/quina";
import TodosResultadosTable from "@/components/TodosResultadosTable";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const dynamic = "force-dynamic";

const QUANTIDADE_EXIBIDA = 60;

export const metadata: Metadata = {
  title: "Todos os resultados da Quina",
  description: `Histórico dos últimos ${QUANTIDADE_EXIBIDA} concursos da Quina, com filtro por ano e busca por número de concurso.`,
};

export default async function TodosResultadosQuinaPage() {
  let resultados;
  try {
    resultados = await getUltimosResultadosQuina(QUANTIDADE_EXIBIDA);
  } catch {
    return <DadosIndisponiveis />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-extrabold">Todos os resultados da Quina</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Mostrando os {resultados.length} concursos mais recentes. Use o filtro para achar um
        concurso específico.
      </p>
      <TodosResultadosTable resultados={resultados} basePath="/quina" />
    </div>
  );
}
