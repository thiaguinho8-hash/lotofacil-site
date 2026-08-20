import Link from "next/link";
import { formatarMoeda } from "@/lib/caixa";

export interface DezenaComFrequencia {
  numero: number;
  /** Quantas vezes essa dezena saiu dentro de `totalAnalisado` concursos. */
  frequencia: number;
  totalAnalisado: number;
}

export interface LotteryCardProps {
  titulo: string;
  data: string;
  dezenas: DezenaComFrequencia[];
  estimativaProximoPremio: number;
  href?: string;
}

/**
 * "Quente"/"fria" comparam a frequência da dezena com a média do próprio
 * conjunto sorteado (não um limiar fixo) — a frequência típica muda muito
 * entre loterias (Lotofácil sorteia 15 de 25, Quina só 5 de 80), então um
 * corte fixo tipo "80%" deixaria toda dezena da Quina sempre "fria".
 */
function ehQuente(d: DezenaComFrequencia, mediaDoConjunto: number): boolean {
  return d.frequencia >= mediaDoConjunto * 1.25;
}

function ehFria(d: DezenaComFrequencia, mediaDoConjunto: number): boolean {
  return d.frequencia <= mediaDoConjunto * 0.75;
}

function Esfera({ dezena, mediaDoConjunto }: { dezena: DezenaComFrequencia; mediaDoConjunto: number }) {
  const quente = ehQuente(dezena, mediaDoConjunto);
  const fria = !quente && ehFria(dezena, mediaDoConjunto);

  const anelClasse = quente
    ? "ring-2 ring-gold-bright shadow-[0_0_10px_2px_rgba(224,172,72,0.55)]"
    : fria
      ? "ring-2 ring-cyan-300/70 shadow-[0_0_10px_2px_rgba(103,232,249,0.4)]"
      : "ring-1 ring-black/20";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`loteria-esfera flex h-11 w-11 items-center justify-center rounded-full font-mono text-sm font-bold transition-transform duration-300 hover:scale-110 sm:h-12 sm:w-12 sm:text-base ${anelClasse}`}
      >
        {String(dezena.numero).padStart(2, "0")}
      </div>
      <span className="rounded-full bg-black/30 px-2 py-0.5 font-mono text-[10px] text-gold-bright/90">
        Freq: {dezena.frequencia}/{dezena.totalAnalisado}
      </span>
    </div>
  );
}

/** Card "premium" com dezenas sorteadas, frequência de cada uma e estimativa do próximo prêmio. */
export default function LotteryCard({
  titulo,
  data,
  dezenas,
  estimativaProximoPremio,
  href,
}: LotteryCardProps) {
  const mediaDoConjunto =
    dezenas.length > 0 ? dezenas.reduce((soma, d) => soma + d.frequencia, 0) / dezenas.length : 0;

  const conteudo = (
    <div className="rounded-3xl border border-gold-deep/40 bg-forest-deep/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.015] hover:border-gold/60 hover:shadow-gold/10 sm:p-7">
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-bold tracking-tight text-paper sm:text-2xl">
          {titulo}
        </h3>
        <span className="text-xs text-paper/60 sm:text-sm">{data}</span>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 sm:gap-x-4">
        {dezenas.map((dezena) => (
          <Esfera key={dezena.numero} dezena={dezena} mediaDoConjunto={mediaDoConjunto} />
        ))}
      </div>

      <div className="mt-7 border-t border-gold-deep/25 pt-5 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-paper/50">
          Estimativa próximo prêmio
        </p>
        <p className="led-display inline-block rounded-lg px-4 py-2 font-mono text-xl font-bold tracking-wider sm:text-2xl">
          {formatarMoeda(estimativaProximoPremio)}
        </p>
      </div>
    </div>
  );

  if (!href) return conteudo;

  return (
    <Link href={href} className="block">
      {conteudo}
    </Link>
  );
}
