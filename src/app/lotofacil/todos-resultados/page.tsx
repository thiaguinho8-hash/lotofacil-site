import type { Metadata } from "next";
import { getUltimosResultados } from "@/lib/caixa";
import TodosResultadosTable from "@/components/TodosResultadosTable";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const revalidate = 3600;

// Quantidade de concursos recentes exibidos na listagem. A API da Caixa não
// tem endpoint de listagem em lote — cada concurso é uma requisição própria,
// então mantemos uma janela recente em vez de baixar o histórico completo
// (~3750 concursos) a cada revalidação. Pode crescer no futuro com um cache
// próprio (banco/arquivo) alimentado pelo cron.
const QUANTIDADE_EXIBIDA = 60;

export const metadata: Metadata = {
  title: "Todos os resultados da Lotofácil",
  description: `Histórico dos últimos ${QUANTIDADE_EXIBIDA} concursos da Lotofácil, com filtro por ano e busca por número de concurso.`,
};

export default async function TodosResultadosPage() {
  let resultados;
  try {
    resultados = await getUltimosResultados(QUANTIDADE_EXIBIDA);
  } catch {
    return <DadosIndisponiveis />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-extrabold">Todos os resultados da Lotofácil</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Mostrando os {resultados.length} concursos mais recentes. Use o filtro para achar um
        concurso específico.
      </p>
      <TodosResultadosTable resultados={resultados} />
    </div>
  );
}
