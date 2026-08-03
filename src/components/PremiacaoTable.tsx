import { RateioPremio, formatarMoeda } from "@/lib/caixa";

export default function PremiacaoTable({ faixas }: { faixas: RateioPremio[] }) {
  if (faixas.length === 0) {
    return <p className="text-sm text-gray-500">Sem dados de premiação para este concurso.</p>;
  }

  const menorFaixa = Math.min(...faixas.map((f) => f.faixa));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="w-full text-sm">
        <thead className="bg-paper-dim text-left dark:bg-forest-deep/30">
          <tr>
            <th className="px-4 py-2 font-semibold">Faixa</th>
            <th className="px-4 py-2 font-semibold">Ganhadores</th>
            <th className="px-4 py-2 font-semibold">Prêmio por ganhador</th>
          </tr>
        </thead>
        <tbody>
          {faixas.map((faixa) => {
            const principal = faixa.faixa === menorFaixa;
            return (
              <tr
                key={faixa.faixa}
                className={`border-t border-gray-100 transition-colors dark:border-gray-800 ${
                  principal ? "bg-gold/10 hover:bg-gold/20 dark:bg-gold/20 dark:hover:bg-gold/40" : "hover:bg-paper-dim dark:hover:bg-forest-deep/40"
                }`}
              >
                <td className="px-4 py-2">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    {principal && <span aria-hidden="true">🏆</span>}
                    {faixa.descricaoFaixa}
                  </span>
                </td>
                <td className="px-4 py-2">{faixa.numeroDeGanhadores.toLocaleString("pt-BR")}</td>
                <td className={`px-4 py-2 font-semibold ${principal ? "text-gold-deep dark:text-gold-bright" : ""}`}>
                  {formatarMoeda(faixa.valorPremio)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
