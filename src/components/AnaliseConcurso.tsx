import type { ResultadoLoteria } from "@/lib/loteriaCore";
import { gerarAnaliseConcurso } from "@/lib/analiseConcurso";

/** Resumo descritivo do concurso, calculado dos dados oficiais (não é previsão). */
export default function AnaliseConcurso({
  resultado,
  anterior,
  nomeLoteria,
}: {
  resultado: ResultadoLoteria;
  anterior: ResultadoLoteria | null;
  nomeLoteria: string;
}) {
  const paragrafos = gerarAnaliseConcurso(resultado, anterior, nomeLoteria);
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-bold">Análise do concurso {resultado.numero}</h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        {paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Dados descritivos do sorteio. Cada concurso é independente, então isso não indica o próximo resultado.
      </p>
    </section>
  );
}
