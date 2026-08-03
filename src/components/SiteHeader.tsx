import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/lotofacil/todos-resultados", label: "Todos os resultados" },
  { href: "/lotofacil/estatisticas", label: "Estatísticas" },
  { href: "/lotofacil/conferidor", label: "Conferidor" },
  { href: "/lotofacil/blog", label: "Blog" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-forest/15 bg-paper/80 backdrop-blur dark:border-gold/10 dark:bg-ink/70">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-forest transition-colors hover:text-forest-deep dark:text-gold dark:hover:text-gold-bright">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Navegação principal" className="hidden gap-6 text-sm font-medium sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 transition-colors hover:text-forest dark:text-gray-300 dark:hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Navegação principal mobile" className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm font-medium sm:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap text-gray-600 transition-colors hover:text-forest dark:text-gray-300 dark:hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
