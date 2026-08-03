import { formatarDezenas } from "@/lib/caixa";

export default function LotteryBalls({
  dezenas,
  size = "md",
}: {
  dezenas: string[];
  size?: "sm" | "md" | "lg";
}) {
  const numeros = formatarDezenas(dezenas);

  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-10 w-10 text-sm sm:h-12 sm:w-12 sm:text-base",
    lg: "h-12 w-12 text-base sm:h-16 sm:w-16 sm:text-xl",
  }[size];

  return (
    <ul className="flex flex-wrap justify-center gap-2 sm:gap-3" aria-label="Dezenas sorteadas">
      {numeros.map((numero, i) => (
        <li
          key={numero}
          style={{ animationDelay: `${i * 30}ms` }}
          className={`${sizeClasses} animate-stamp-in flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_28%,var(--color-forest-light),var(--color-forest)_55%,var(--color-forest-deep)_100%)] font-mono font-bold text-gold-bright shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-2px_3px_rgba(0,0,0,0.4)] ring-2 ring-gold/70 transition-transform duration-150 hover:scale-110 hover:ring-gold-bright`}
        >
          {String(numero).padStart(2, "0")}
        </li>
      ))}
    </ul>
  );
}
