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
      {numeros.map((numero) => (
        <li
          key={numero}
          className={`${sizeClasses} flex items-center justify-center rounded-full bg-black font-bold text-white shadow-sm transition-transform duration-150 hover:scale-110`}
        >
          {String(numero).padStart(2, "0")}
        </li>
      ))}
    </ul>
  );
}
