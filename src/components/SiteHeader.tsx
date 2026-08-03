"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/lotofacil/todos-resultados", label: "Todos os resultados" },
  { href: "/lotofacil/estatisticas", label: "Estatísticas" },
  { href: "/lotofacil/bolao", label: "Bolão" },
  { href: "/lotofacil/conferidor", label: "Conferidor" },
  { href: "/lotofacil/blog", label: "Blog" },
  { href: "/lotofacil/glossario", label: "Glossário" },
  { href: "/lotofacil/como-jogar", label: "Como Jogar" },
  { href: "/lotofacil/perguntas-frequentes", label: "Perguntas Frequentes" },
];

function ehAtivo(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-forest/15 bg-paper/80 backdrop-blur dark:border-gold/10 dark:bg-ink/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-forest transition-colors hover:text-forest-deep dark:text-gold dark:hover:text-gold-bright"
          >
            {SITE_NAME}
          </Link>
          <ThemeToggle />
        </div>

        <nav
          aria-label="Navegação principal"
          className="hidden flex-wrap gap-x-5 gap-y-2 text-sm font-medium sm:flex"
        >
          {NAV_LINKS.map((link) => {
            const ativo = ehAtivo(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={ativo ? "page" : undefined}
                className={`transition-colors ${
                  ativo
                    ? "font-semibold text-forest dark:text-gold"
                    : "text-gray-600 hover:text-forest dark:text-gray-300 dark:hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <nav
        aria-label="Navegação principal mobile"
        className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm font-medium sm:hidden"
      >
        {NAV_LINKS.map((link) => {
          const ativo = ehAtivo(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={ativo ? "page" : undefined}
              className={`whitespace-nowrap transition-colors ${
                ativo
                  ? "font-semibold text-forest dark:text-gold"
                  : "text-gray-600 hover:text-forest dark:text-gray-300 dark:hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
