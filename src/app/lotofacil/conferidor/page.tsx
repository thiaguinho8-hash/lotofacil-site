import type { Metadata } from "next";
import { getUltimoResultado, formatarDezenas } from "@/lib/caixa";
import Conferidor from "@/components/Conferidor";
import LotteryBalls from "@/components/LotteryBalls";
import AdSlot from "@/components/AdSlot";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Conferidor da Lotofácil",
  description: "Confira online quantos números você acertou no último concurso da Lotofácil.",
};

export default async function ConferidorPage() {
  const ultimo = await getUltimoResultado();
  const dezenasSorteadas = formatarDezenas(ultimo.listaDezenas);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-extrabold">Conferidor da Lotofácil</h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        Comparando com o concurso {ultimo.numero}, sorteado em {ultimo.dataApuracao}.
      </p>

      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold">Dezenas sorteadas:</p>
        <LotteryBalls dezenas={ultimo.listaDezenas} size="sm" />
      </div>

      <Conferidor numeroConcurso={ultimo.numero} dezenasSorteadas={dezenasSorteadas} />

      <AdSlot id="ad-conferidor" label="Espaço publicitário" className="mt-10 h-24 w-full" />
    </div>
  );
}
