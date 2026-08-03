import type { Metadata } from "next";
import LotofacilTabs from "@/components/LotofacilTabs";
import GlossarioBusca from "@/components/GlossarioBusca";
import AdSlot from "@/components/AdSlot";
import { GLOSSARIO } from "@/lib/glossario";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossário da Lotofácil — termos explicados",
  description:
    "O que é bolão, fechamento, teimosinha, cota, concurso acumulado e outros termos da Lotofácil, explicados de forma simples.",
};

export default function GlossarioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glossário da Lotofácil",
    url: `${SITE_URL}/lotofacil/glossario`,
    hasDefinedTerm: GLOSSARIO.map((t) => ({
      "@type": "DefinedTerm",
      name: t.termo,
      description: t.definicao,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LotofacilTabs active="glossario" />

      <h1 className="mb-2 text-2xl font-extrabold sm:text-3xl">Glossário da Lotofácil</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        O que significa cada termo que você vê por aí — sem enrolação.
      </p>

      <GlossarioBusca termos={GLOSSARIO} />

      <AdSlot id="ad-glossario" label="Espaço publicitário" className="my-10 h-24 w-full" />
    </div>
  );
}
