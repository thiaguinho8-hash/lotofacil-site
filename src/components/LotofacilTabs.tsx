import Link from "next/link";

type TabKey = "resultado" | "estatisticas" | "como-jogar" | "faq";

const TABS: { key: TabKey; href: string; label: string }[] = [
  { key: "resultado", href: "/lotofacil/resultado-de-hoje", label: "Resultado" },
  { key: "estatisticas", href: "/lotofacil/estatisticas", label: "Estatísticas" },
  { key: "como-jogar", href: "/lotofacil/como-jogar", label: "Como Jogar" },
  { key: "faq", href: "/lotofacil/perguntas-frequentes", label: "Perguntas Frequentes" },
];

export default function LotofacilTabs({ active }: { active: TabKey }) {
  return (
    <nav aria-label="Seções da Lotofácil" className="-mx-4 mb-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-1 border-b border-gray-200 dark:border-gray-800">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <li key={tab.key}>
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-block whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-150 ${
                  isActive
                    ? "border-blue-700 text-blue-700 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
