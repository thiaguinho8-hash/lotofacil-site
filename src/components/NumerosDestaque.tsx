import { type ResultadoLotofacil } from "@/lib/caixa";
import { calcularFrequencias } from "@/lib/estatisticas";
import { combinacao } from "@/lib/apostas";
import LotteryBalls from "./LotteryBalls";

/** Widget de resumo estatístico pro rodapé do blog: último concurso, dezenas
 * mais/menos sorteadas e a probabilidade oficial de acertar os 15 números. */
export default function NumerosDestaque({ resultados }: { resultados: ResultadoLotofacil[] }) {
  const [ultimo] = resultados;
  const frequencias = calcularFrequencias(resultados, 1, 25);
  const maisSorteados = frequencias.slice(0, 5);
  const menosSorteados = [...frequencias].sort((a, b) => a.vezes - b.vezes).slice(0, 5);
  const combinacoesTotais = combinacao(25, 15);
  const probabilidadePercentual = (1 / combinacoesTotais) * 100;

  return (
    <section className="rounded-2xl border border-gold-deep/25 bg-paper-dim/60 p-6 dark:border-gold/10 dark:bg-forest-deep/30">
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-gold-deep dark:text-gold">
        Números em destaque
      </h2>
      <div className="grid gap-6 sm:grid-cols-4">
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Último concurso</p>
          <p className="mb-1 text-2xl font-extrabold">{ultimo.numero}</p>
          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">{ultimo.dataApuracao}</p>
          <LotteryBalls dezenas={ultimo.listaDezenas} size="sm" />
        </div>

        <div>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            Mais sorteados (últimos {resultados.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {maisSorteados.map((f) => (
              <span
                key={f.dezena}
                className="loteria-esfera flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              >
                {String(f.dezena).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            Menos sorteados (últimos {resultados.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {menosSorteados.map((f) => (
              <span
                key={f.dezena}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-500 ring-1 ring-black/10 dark:bg-forest-deep/50 dark:text-gray-400"
              >
                {String(f.dezena).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            Probabilidade de acertar 15 números
          </p>
          <p className="text-lg font-extrabold text-gold-deep dark:text-gold-bright">
            1 em {combinacoesTotais.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ({probabilidadePercentual.toLocaleString("pt-BR", { maximumSignificantDigits: 3 })}%)
          </p>
        </div>
      </div>
    </section>
  );
}
