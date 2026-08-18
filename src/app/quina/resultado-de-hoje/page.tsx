import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUltimoResultadoQuina } from "@/lib/quina";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resultado da Quina de hoje",
  description: "Veja agora o resultado mais recente da Quina, direto da Caixa Econômica Federal.",
};

export default async function ResultadoDeHojeQuinaPage() {
  let ultimo;
  try {
    ultimo = await getUltimoResultadoQuina();
  } catch {
    return <DadosIndisponiveis />;
  }
  redirect(`/quina/${ultimo.numero}`);
}
