import { AtrasoDezena } from "@/lib/estatisticas";

export default function AtrasoList({
  dados,
  titulo,
}: {
  dados: AtrasoDezena[];
  titulo: string;
}) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">{titulo}</h3>
      <ul className="flex flex-col gap-1.5">
        {dados.map(({ dezena, atraso, saiuNoIntervalo }) => (
          <li
            key={dezena}
            className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
          >
            <span className="font-mono font-semibold">{String(dezena).padStart(2, "0")}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {atraso === 0
                ? "saiu no último concurso"
                : `${atraso} concurso${atraso > 1 ? "s" : ""} sem sair${
                    saiuNoIntervalo ? "" : "+"
                  }`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
