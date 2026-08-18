import type { Metadata } from "next";
import { formatarDezenas } from "@/lib/caixa";
import { getUltimoResultadoQuina, QUINA_DEZENA_MIN, QUINA_DEZENA_MAX, QUINA_APOSTA_MAX } from "@/lib/quina";
import Conferidor from "@/components/Conferidor";
import LotteryBalls from "@/components/LotteryBalls";
import AdSlot from "@/components/AdSlot";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Conferidor da Quina",
  description: "Confira online quantos números você acertou no último concurso da Quina.",
};

export default async function ConferidorQuinaPage() {
  let ultimo;
  try {
    ultimo = await getUltimoResultadoQuina();
  } catch {
    return <DadosIndisponiveis />;
  }
  const dezenasSorteadas = formatarDezenas(ultimo.listaDezenas);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-extrabold">Conferidor da Quina</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Comparando com o concurso {ultimo.numero}, sorteado em {ultimo.dataApuracao}.
      </p>

      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold">Dezenas sorteadas:</p>
        <LotteryBalls dezenas={ultimo.listaDezenas} size="sm" />
      </div>

      <Conferidor
        numeroConcurso={ultimo.numero}
        dezenasSorteadas={dezenasSorteadas}
        dezenaMin={QUINA_DEZENA_MIN}
        dezenaMax={QUINA_DEZENA_MAX}
        maxSelecionadas={QUINA_APOSTA_MAX}
      />

      <AdSlot id="ad-quina-conferidor" label="Espaço publicitário" className="mt-10 h-24 w-full" />
    </div>
  );
}
