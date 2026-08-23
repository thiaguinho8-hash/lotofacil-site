import Link from "next/link";

/**
 * Banner de auto-promoção — ocupa um AdSlot enquanto não há anúncio real
 * (AdSense ainda não aprovado), mas em vez de espaço vazio leva o
 * visitante pra outra página do próprio site.
 */
export default function HouseAd({
  href,
  title,
  description,
  cta,
  className = "",
}: {
  href: string;
  title: string;
  description: string;
  cta: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-4 rounded-lg border border-gold/40 bg-gradient-to-r from-forest to-forest-deep px-5 text-paper transition-colors hover:border-gold ${className}`}
    >
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-gold-bright">{title}</span>
        <span className="text-xs text-paper/80">{description}</span>
      </span>
      <span className="shrink-0 text-sm font-semibold text-gold-bright transition-transform group-hover:translate-x-1">
        {cta} →
      </span>
    </Link>
  );
}
