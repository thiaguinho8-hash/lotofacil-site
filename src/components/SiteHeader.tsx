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
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Navegação principal" className="hidden gap-6 text-sm font-medium sm:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
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
            className="whitespace-nowrap text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
