import type { Metadata } from "next";
import Link from "next/link";
import LotofacilTabs from "@/components/LotofacilTabs";
import BolaoCalculadora from "@/components/BolaoCalculadora";
import AdSlot from "@/components/AdSlot";
import { getUltimoResultado } from "@/lib/caixa";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Calculadora de bolão da Lotofácil",
  description:
    "Calcule o valor por cota e a divisão do prêmio de um bolão da Lotofácil de acordo com o número de dezenas marcadas e de participantes.",
};

export default async function BolaoPage() {
  let estimativaPremio: number | null = null;
  try {
    const ultimo = await getUltimoResultado();
    estimativaPremio = ultimo.valorEstimadoProximoConcurso;
  } catch {
    estimativaPremio = null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <LotofacilTabs active="bolao" />

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Calculadora de bolão</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        Descubra quanto cada participante paga e quanto pode ganhar, de acordo com quantas
        dezenas o bolão marca e quantas pessoas entram na divisão. Veja também{" "}
        <Link
          href="/lotofacil/blog/bolao-da-lotofacil-como-funciona"
          className="text-blue-700 hover:underline dark:text-blue-400"
        >
          como organizar um bolão com segurança
        </Link>
        .
      </p>

      <BolaoCalculadora estimativaPremio={estimativaPremio} />

      <AdSlot id="ad-bolao" label="Espaço publicitário" className="my-10 h-24 w-full" />
    </div>
  );
}
