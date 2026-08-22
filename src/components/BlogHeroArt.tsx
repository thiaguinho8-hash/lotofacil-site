/** Pequena ilustração decorativa do card em destaque do blog: bolinha + linha
 * de tendência, reaproveitando a mesma esfera metálica usada nos resultados. */
export default function BlogHeroArt() {
  return (
    <div className="relative hidden h-28 w-36 shrink-0 items-center justify-center sm:flex">
      <svg
        viewBox="0 0 160 100"
        className="absolute inset-0 h-full w-full opacity-60"
        aria-hidden="true"
      >
        <polyline
          points="10,80 45,55 80,65 115,25 150,15"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="loteria-esfera relative z-10 flex h-16 w-16 items-center justify-center rounded-full font-mono text-lg font-bold ring-1 ring-black/20">
        15
      </div>
    </div>
  );
}
