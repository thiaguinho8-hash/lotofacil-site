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
  acumulado: boolean;
  proximoConcurso: string | null;
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
      <span className="rounded-full bg-black/30 px-2 py-0.5 text-[11px] font-medium text-gold-bright/90">
        Freq: {dezena.frequencia}/{dezena.totalAnalisado}
      </span>
    </div>
  );
}

/** Card "premium" com dezenas sorteadas, frequência de cada uma e dados do próximo concurso. */
export default function LotteryCard({
  titulo,
  data,
  dezenas,
  acumulado,
  proximoConcurso,
  estimativaProximoPremio,
  href,
}: LotteryCardProps) {
  const mediaDoConjunto =
    dezenas.length > 0 ? dezenas.reduce((soma, d) => soma + d.frequencia, 0) / dezenas.length : 0;

  const conteudo = (
    <div className="relative overflow-hidden rounded-3xl border border-gold-deep/40 bg-forest-deep/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_45px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.015] hover:border-gold/60 hover:shadow-gold/10 sm:p-7">
      {/* Camada sutil de brilho no topo, reforça o efeito de vidro em camadas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

      <div className="relative mb-6 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-bold tracking-tight text-paper sm:text-2xl">
          {titulo}
        </h3>
        <span className="text-xs text-paper/60 sm:text-sm">{data}</span>
      </div>

      <div className="relative grid grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-5 sm:gap-x-4">
        {dezenas.map((dezena) => (
          <Esfera key={dezena.numero} dezena={dezena} mediaDoConjunto={mediaDoConjunto} />
        ))}
      </div>

      <dl className="relative mt-7 grid grid-cols-3 gap-2 border-t border-gold-deep/25 pt-5 text-center">
        <div>
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-paper/50 sm:text-xs">
            Acumulou?
          </dt>
          <dd className="text-sm font-bold text-paper sm:text-base">{acumulado ? "Sim" : "Não"}</dd>
        </div>
        <div>
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-paper/50 sm:text-xs">
            Próximo concurso
          </dt>
          <dd className="text-sm font-bold text-paper sm:text-base">{proximoConcurso ?? "—"}</dd>
        </div>
        <div>
          <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-paper/50 sm:text-xs">
            Estimativa prêmio
          </dt>
          <dd className="led-display inline-block rounded-md px-2 py-1 text-[11px] font-bold tracking-wide sm:text-sm">
            {formatarMoeda(estimativaProximoPremio)}
          </dd>
        </div>
      </dl>
    </div>
  );

  if (!href) return conteudo;

  return (
    <Link href={href} className="block">
      {conteudo}
    </Link>
  );
}
