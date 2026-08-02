import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUltimoResultado } from "@/lib/caixa";
import DadosIndisponiveis from "@/components/DadosIndisponiveis";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resultado da Lotofácil de hoje",
  description: "Veja agora o resultado mais recente da Lotofácil, direto da Caixa Econômica Federal.",
};

export default async function ResultadoDeHojePage() {
  let ultimo;
  try {
    ultimo = await getUltimoResultado();
  } catch {
    return <DadosIndisponiveis />;
  }
  redirect(`/lotofacil/${ultimo.numero}`);
}
