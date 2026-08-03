import Link from "next/link";
import { ResultadoLotofacil, formatarMoeda } from "@/lib/caixa";
import LotteryBalls from "./LotteryBalls";

export default function ResultadoCard({
  resultado,
  destaque = false,
}: {
  resultado: ResultadoLotofacil;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow dark:border-gray-800 dark:bg-forest-deep/50 sm:p-8 ${
        destaque ? "ring-2 ring-forest hover:shadow-md" : "hover:shadow-md"
      }`}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className={destaque ? "text-2xl font-extrabold tracking-tight sm:text-3xl" : "text-xl font-bold tracking-tight"}>
          <Link
            href={`/lotofacil/${resultado.numero}`}
            className="transition-colors hover:text-forest dark:hover:text-gold"
          >
            Concurso {resultado.numero}
          </Link>
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{resultado.dataApuracao}</span>
      </div>

      <LotteryBalls dezenas={resultado.listaDezenas} size={destaque ? "lg" : "md"} />

      <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-gray-100 pt-5 text-sm dark:border-gray-800 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">Acumulou?</dt>
          <dd className="mt-1 font-semibold">{resultado.acumulado ? "Sim" : "Não"}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">Próximo concurso</dt>
          <dd className="mt-1 font-semibold">{resultado.dataProximoConcurso ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-gray-400 uppercase dark:text-gray-500">
            Estimativa próximo prêmio
          </dt>
          <dd className="mt-1 font-semibold text-forest dark:text-gold">
            {formatarMoeda(resultado.valorEstimadoProximoConcurso)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
