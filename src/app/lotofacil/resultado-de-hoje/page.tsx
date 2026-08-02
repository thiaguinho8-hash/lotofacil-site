import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUltimoResultado } from "@/lib/caixa";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Resultado da Lotofácil de hoje",
  description: "Veja agora o resultado mais recente da Lotofácil, direto da Caixa Econômica Federal.",
};

export default async function ResultadoDeHojePage() {
  const ultimo = await getUltimoResultado();
  redirect(`/lotofacil/${ultimo.numero}`);
}
