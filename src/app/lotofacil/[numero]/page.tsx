import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResultadoPorConcurso,
  getUltimoResultado,
  formatarDezenas,
  formatarMoeda,
} from "@/lib/caixa";
import LotteryBalls from "@/components/LotteryBalls";
import PremiacaoTable from "@/components/PremiacaoTable";
import AdSlot from "@/components/AdSlot";
import AffiliateButton from "@/components/AffiliateButton";
import WhatsAppShareButton from "@/components/WhatsAppShareButton";
import LotofacilTabs from "@/components/LotofacilTabs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 3600;

type Params = { numero: string };

export async function generateStaticParams() {
  try {
    const ultimo = await getUltimoResultado();
    const quantidade = 10;
    return Array.from({ length: quantidade }, (_, i) => ({
      numero: String(ultimo.numero - i),
    })).filter((p) => Number(p.numero) > 0);
  } catch {
    // API da Caixa indisponível no build: nenhuma página é pré-gerada agora,
    // mas dynamicParams=true faz cada concurso ser gerado sob demanda na
    // primeira visita e cacheado a partir daí (ISR).
    return [];
  }
}

function parseNumero(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const numero = Number(raw);
  return numero > 0 ? numero : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { numero: raw } = await params;
  const numero = parseNumero(raw);
  if (!numero) return {};

  try {
    const resultado = await getResultadoPorConcurso(numero);
    const dezenas = formatarDezenas(resultado.listaDezenas).join(", ");
    const title = `Resultado Lotofácil ${resultado.numero} — ${resultado.dataApuracao}`;
    const description = `Dezenas sorteadas no concurso ${resultado.numero} da Lotofácil (${resultado.dataApuracao}): ${dezenas}. Veja premiação por faixa e ganhadores.`;

    return {
      title,
      description,
      alternates: { canonical: `/lotofacil/${resultado.numero}` },
      openGraph: { title, description },
    };
  } catch {
    return {};
  }
}

export default async function ConcursoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { numero: raw } = await params;
  const numero = parseNumero(raw);
  if (!numero) notFound();

  let resultado;
  try {
    resultado = await getResultadoPorConcurso(numero);
  } catch {
    notFound();
  }

  const dezenas = formatarDezenas(resultado.listaDezenas);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Resultado Lotofácil concurso ${resultado.numero}`,
    description: `Dezenas sorteadas: ${dezenas.join(", ")}. Data do sorteio: ${resultado.dataApuracao}.`,
    datePublished: resultado.dataApuracao,
    url: `${SITE_URL}/lotofacil/${resultado.numero}`,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    variableMeasured: "Dezenas sorteadas da Lotofácil",
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <LotofacilTabs active="resultado" />

      <nav aria-label="breadcrumb" className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          Início
        </Link>{" "}
        / Concurso {resultado.numero}
      </nav>

      <h1 className="mb-1 text-2xl font-extrabold sm:text-3xl">
        Resultado Lotofácil — Concurso {resultado.numero}
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">
        Sorteio realizado em {resultado.dataApuracao} · {resultado.localSorteio},{" "}
        {resultado.nomeMunicipioUFSorteio}
      </p>

      <LotteryBalls dezenas={resultado.listaDezenas} size="lg" />

      <div className="my-6 flex flex-wrap justify-center gap-3">
        <AffiliateButton />
        <WhatsAppShareButton
          texto={`Resultado da Lotofácil — Concurso ${resultado.numero} (${resultado.dataApuracao}): ${dezenas
            .map((n) => String(n).padStart(2, "0"))
            .join(" - ")}. Confira em ${SITE_URL}/lotofacil/${resultado.numero}`}
        />
      </div>

      <AdSlot id={`ad-concurso-${resultado.numero}`} label="Espaço publicitário" className="my-8 h-24 w-full" />

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 p-5 text-sm dark:border-gray-800 sm:grid-cols-4">
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Acumulou?</dt>
          <dd className="font-semibold">{resultado.acumulado ? "Sim" : "Não"}</dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Arrecadação total</dt>
          <dd className="font-semibold">{formatarMoeda(resultado.valorArrecadado)}</dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Próximo concurso</dt>
          <dd className="font-semibold">{resultado.dataProximoConcurso ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-gray-500 dark:text-gray-400">Estimativa próximo prêmio</dt>
          <dd className="font-semibold">{formatarMoeda(resultado.valorEstimadoProximoConcurso)}</dd>
        </div>
      </dl>

      <h2 className="mb-3 mt-8 text-xl font-bold">Premiação por faixa de acerto</h2>
      <PremiacaoTable faixas={resultado.listaRateioPremio} />

      {resultado.listaMunicipioUFGanhadores.length > 0 && (
        <>
          <h2 className="mb-3 mt-8 text-xl font-bold">Onde saíram os ganhadores (15 acertos)</h2>
          <ul className="flex flex-wrap gap-2 text-sm">
            {resultado.listaMunicipioUFGanhadores.map((g, i) => (
              <li
                key={i}
                className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-900"
              >
                {g.municipio}
                {g.uf && g.uf !== "--" ? `/${g.uf}` : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      <nav className="mt-10 flex justify-between text-sm font-semibold text-blue-700 dark:text-blue-400">
        {resultado.numeroConcursoAnterior ? (
          <Link href={`/lotofacil/${resultado.numeroConcursoAnterior}`} className="hover:underline">
            ← Concurso {resultado.numeroConcursoAnterior}
          </Link>
        ) : (
          <span />
        )}
        {!resultado.ultimoConcurso && resultado.numeroConcursoProximo && (
          <Link href={`/lotofacil/${resultado.numeroConcursoProximo}`} className="hover:underline">
            Concurso {resultado.numeroConcursoProximo} →
          </Link>
        )}
      </nav>
    </div>
  );
}
