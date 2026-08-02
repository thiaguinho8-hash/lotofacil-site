import { FrequenciaDezena } from "@/lib/estatisticas";

export default function FrequenciaBarChart({
  dados,
  titulo,
}: {
  dados: FrequenciaDezena[];
  titulo: string;
}) {
  const max = Math.max(...dados.map((d) => d.vezes), 1);

  return (
    <div>
      <h3 className="mb-3 font-semibold">{titulo}</h3>
      <ul className="flex flex-col gap-1.5">
        {dados.map(({ dezena, vezes }) => (
          <li key={dezena} className="flex items-center gap-3 text-sm">
            <span className="w-6 shrink-0 text-right font-mono text-gray-500 dark:text-gray-400">
              {String(dezena).padStart(2, "0")}
            </span>
            <div className="h-4 flex-1 rounded-full bg-gray-100 dark:bg-gray-900">
              <div
                className="h-4 rounded-full bg-blue-600"
                style={{ width: `${Math.max((vezes / max) * 100, 4)}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-gray-500 dark:text-gray-400">{vezes}x</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
